import { RedditApiError, redditFetch } from "@/lib/helpers/reddit";
import type {
  EligibilityVerdict,
  KarmaCheckResult,
  KarmaType,
  RedditProfile,
  ShadowbanCheckResult,
  StatedRequirement,
  SubredditCheckResult,
  SubredditInfo,
  SubredditPostRequirements,
  SubredditRule,
} from "@/lib/tools/types";
import { differenceInCalendarDays, fromUnixTime } from "date-fns";

/**
 * Data layer of the free tools (/tools). Everything here reads Reddit's
 * public JSON endpoints through `redditFetch` (app-only OAuth in production),
 * the same data a logged-out visitor sees. Nothing is stored.
 */

// ---------------------------------------------------------------------------
// Reddit response shapes (only the fields we read)
// ---------------------------------------------------------------------------

type RedditUserAbout = {
  kind?: string;
  data?: {
    name: string;
    is_suspended?: boolean;
    created_utc?: number;
    link_karma?: number;
    comment_karma?: number;
    total_karma?: number;
    awarder_karma?: number;
    awardee_karma?: number;
    icon_img?: string;
    snoovatar_img?: string;
    has_verified_email?: boolean | null;
    is_mod?: boolean;
  };
};

type RedditSubredditAbout = {
  kind?: string;
  data?: {
    display_name: string;
    title?: string;
    public_description?: string;
    submit_text?: string;
    community_icon?: string;
    icon_img?: string;
    subscribers?: number;
    created_utc?: number;
    subreddit_type?: string;
    over18?: boolean;
    submission_type?: string;
    allow_images?: boolean;
    allow_videos?: boolean;
    allow_polls?: boolean;
  };
};

type RedditRules = {
  rules?: {
    short_name?: string;
    description?: string;
    kind?: string;
  }[];
};

type RedditPostRequirements = {
  is_flair_required?: boolean;
  title_text_min_length?: number | null;
  title_text_max_length?: number | null;
  body_restriction_policy?: string;
  domain_blacklist?: string[];
  guidelines_text?: string | null;
};

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** Error with an HTTP status and a message safe to show to visitors. */
export class ToolError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ToolError";
  }
}

/** Maps a failed Reddit call to a visitor-friendly ToolError. */
export function toToolError(error: unknown): ToolError {
  if (error instanceof ToolError) return error;
  if (error instanceof RedditApiError && error.status === 429) {
    return new ToolError(
      503,
      "Reddit is limiting requests right now. Try again in a minute.",
    );
  }
  return new ToolError(
    502,
    "We couldn't reach Reddit. Try again in a few seconds.",
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x200B;": "",
};

/** Reddit returns text and URLs with HTML entities. */
function decodeEntities(value: string): string {
  return value.replace(/&(?:amp|lt|gt|quot|#39|#x200B);/g, (m) => ENTITIES[m] ?? m);
}

function cleanUrl(value: string | undefined): string | null {
  if (!value) return null;
  const url = decodeEntities(value);
  return url.startsWith("https://") ? url : null;
}

function isoFromUnix(seconds: number | undefined): string {
  return fromUnixTime(seconds ?? 0).toISOString();
}

// ---------------------------------------------------------------------------
// Profiles
// ---------------------------------------------------------------------------

function toProfile(data: NonNullable<RedditUserAbout["data"]>): RedditProfile {
  const created = fromUnixTime(data.created_utc ?? 0);
  const postKarma = data.link_karma ?? 0;
  const commentKarma = data.comment_karma ?? 0;
  const awarderKarma = data.awarder_karma ?? 0;
  const awardeeKarma = data.awardee_karma ?? 0;

  return {
    username: data.name,
    avatarUrl: cleanUrl(data.snoovatar_img) ?? cleanUrl(data.icon_img),
    createdAt: created.toISOString(),
    accountAgeDays: Math.max(0, differenceInCalendarDays(new Date(), created)),
    totalKarma:
      data.total_karma ?? postKarma + commentKarma + awarderKarma + awardeeKarma,
    postKarma,
    commentKarma,
    awarderKarma,
    awardeeKarma,
    hasVerifiedEmail: data.has_verified_email ?? null,
    isModerator: Boolean(data.is_mod),
  };
}

type ProfileLookup =
  | { state: "visible"; profile: RedditProfile }
  | { state: "suspended" }
  | { state: "missing" };

/** Reads `/user/<name>/about.json`. A 404 means hidden (shadowbanned/deleted) or nonexistent. */
async function lookupProfile(username: string): Promise<ProfileLookup> {
  try {
    const about = await redditFetch<RedditUserAbout>(
      `/user/${encodeURIComponent(username)}/about.json?raw_json=1`,
    );
    if (about.kind !== "t2" || !about.data) return { state: "missing" };
    if (about.data.is_suspended) return { state: "suspended" };
    return { state: "visible", profile: toProfile(about.data) };
  } catch (error) {
    if (error instanceof RedditApiError && error.status === 404) {
      return { state: "missing" };
    }
    throw error;
  }
}

/** `true` when the username is taken. Null when Reddit didn't answer clearly. */
async function isUsernameTaken(username: string): Promise<boolean | null> {
  try {
    const available = await redditFetch<unknown>(
      `/api/username_available.json?user=${encodeURIComponent(username)}`,
    );
    return typeof available === "boolean" ? !available : null;
  } catch {
    return null;
  }
}

export async function checkKarma(username: string): Promise<KarmaCheckResult> {
  const lookup = await lookupProfile(username);

  if (lookup.state === "suspended") {
    throw new ToolError(
      404,
      `u/${username} is suspended, so Reddit doesn't show its karma.`,
    );
  }
  if (lookup.state === "missing") {
    throw new ToolError(
      404,
      `We couldn't find u/${username}. The account may not exist, or it may be shadowbanned or deleted.`,
    );
  }

  const { profile } = lookup;
  const karmaPerDay = profile.totalKarma / Math.max(1, profile.accountAgeDays);
  return { profile, karmaPerDay: Math.round(karmaPerDay * 10) / 10 };
}

export async function checkShadowban(
  username: string,
): Promise<ShadowbanCheckResult> {
  const lookup = await lookupProfile(username);
  const checkedAt = new Date().toISOString();

  if (lookup.state === "visible") {
    return {
      username: lookup.profile.username,
      status: "visible",
      profile: lookup.profile,
      usernameTaken: true,
      checkedAt,
    };
  }

  if (lookup.state === "suspended") {
    return {
      username,
      status: "suspended",
      profile: null,
      usernameTaken: true,
      checkedAt,
    };
  }

  // Hidden profile: a taken username means the account exists (or existed)
  // but logged-out visitors can't see it.
  const usernameTaken = await isUsernameTaken(username);
  return {
    username,
    status: usernameTaken === false ? "not_found" : "hidden",
    profile: null,
    usernameTaken,
    checkedAt,
  };
}

// ---------------------------------------------------------------------------
// Subreddit requirements
// ---------------------------------------------------------------------------

const NUMBER = String.raw`(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?\s?k\b|\d+)`;
const KARMA_TYPE = String.raw`(post|link|comment|combined|total|overall|sub(?:reddit)?|community|local)`;
const AGE_NUMBER = String.raw`(\d+|one|two|three|four|five|six|seven|eight|nine|ten|fourteen|thirty)`;
const AGE_UNIT = String.raw`(day|week|month|year)s?`;

const KARMA_PATTERNS = [
  // "50 comment karma", "100+ karma", "1k karma"
  new RegExp(String.raw`(?<![-\d])${NUMBER}\s*\+?\s*(?:${KARMA_TYPE}\s+)?karma`, "gi"),
  // "comment karma of 50", "karma: 20", "karma above 10", "karma must be at least 100"
  new RegExp(
    String.raw`(?:${KARMA_TYPE}\s+)?karma\s*(?:score\s*)?(?:of|requirements?(?:\s+(?:of|is))?|threshold(?:\s+of)?|minimum(?:\s+of)?|above|over|greater than|more than|at least|>=?|:|must be(?:\s+(?:at least|over|above))?)\s*(?:at least\s*)?${NUMBER}`,
    "gi",
  ),
];
const POSITIVE_KARMA = new RegExp(
  String.raw`(?:positive|non-?negative)\s+(?:${KARMA_TYPE}\s+)?karma`,
  "gi",
);

const AGE_PATTERNS = [
  // "7 days old", "30-day-old account", "2 weeks of account age"
  new RegExp(
    String.raw`${AGE_NUMBER}\s*[- ]?\s*${AGE_UNIT}[- ]?\s*(?:old|of account age|account age)`,
    "gi",
  ),
  // "accounts must be at least 7 days", "account age: 30 days", "account older than 2 weeks"
  new RegExp(
    String.raw`accounts?(?:\s+age)?\s*(?:must be|needs? to be|should be|has to be|requirement(?:\s+of)?|minimum(?:\s+of)?|of at least|older than|:|>=?)\s*(?:at least\s*|older than\s*|over\s*)?${AGE_NUMBER}\s*[- ]?\s*${AGE_UNIT}`,
    "gi",
  ),
];

const VERIFIED_EMAIL = /verified\s+e-?mail/i;

const SELF_PROMOTION =
  /self[\s-]?promo|promot|advertis|\bspam|affiliate|referral|solicit|marketing|link[\s-]?drop|your own (?:product|site|website|blog|channel|app|business|content|startup)|\b9:1\b|\b10\s?%/i;

const WORD_NUMBERS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  fourteen: 14,
  thirty: 30,
};

const DAYS_PER_UNIT: Record<string, number> = {
  day: 1,
  week: 7,
  month: 30,
  year: 365,
};

function parseNumber(raw: string): number {
  const value = raw.toLowerCase().replace(/,/g, "").replace(/\s/g, "");
  if (value.endsWith("k")) return Math.round(parseFloat(value) * 1000);
  return WORD_NUMBERS[value] ?? parseFloat(value);
}

function toKarmaType(raw: string | undefined): KarmaType {
  const value = raw?.toLowerCase();
  if (value === "post" || value === "link") return "post";
  if (value === "comment") return "comment";
  if (value && /^(sub|subreddit|community|local)$/.test(value)) return "subreddit";
  return "total";
}

/** The sentence around a match, trimmed to a readable length. */
function excerptAround(text: string, index: number, length: number): string {
  const before = text.slice(0, index);
  const start = Math.max(
    before.lastIndexOf(". ") + 1,
    before.lastIndexOf("\n") + 1,
    before.lastIndexOf("! ") + 1,
    before.lastIndexOf("? ") + 1,
    0,
  );
  const rest = text.slice(index + length);
  const endMatch = rest.search(/[.!?](?:\s|$)|\n/);
  const end = endMatch === -1 ? text.length : index + length + endMatch + 1;
  const sentence = text
    .slice(start, end)
    .replace(/[*_#>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return sentence.length > 220 ? `${sentence.slice(0, 217).trimEnd()}…` : sentence;
}

/** Finds karma, account age and email requirements written in plain text. */
export function extractRequirements(
  sources: { source: string; text: string }[],
): StatedRequirement[] {
  const found: StatedRequirement[] = [];
  const seen = new Set<string>();

  const add = (key: string, requirement: StatedRequirement) => {
    if (seen.has(key)) return;
    seen.add(key);
    found.push(requirement);
  };

  for (const { source, text } of sources) {
    if (!text) continue;

    for (const pattern of KARMA_PATTERNS) {
      for (const match of text.matchAll(pattern)) {
        const numberRaw = match[1] && /\d/.test(match[1]) ? match[1] : match[2];
        const typeRaw = numberRaw === match[1] ? match[2] : match[1];
        const value = parseNumber(numberRaw ?? "");
        if (!Number.isFinite(value) || value <= 0 || value > 1_000_000) continue;
        const karmaType = toKarmaType(typeRaw);
        add(`karma:${karmaType}:${value}`, {
          kind: "karma",
          karmaType,
          value,
          source,
          excerpt: excerptAround(text, match.index ?? 0, match[0].length),
        });
      }
    }

    for (const match of text.matchAll(POSITIVE_KARMA)) {
      const karmaType = toKarmaType(match[1]);
      add(`karma:${karmaType}:1`, {
        kind: "karma",
        karmaType,
        value: 1,
        source,
        excerpt: excerptAround(text, match.index ?? 0, match[0].length),
      });
    }

    for (const pattern of AGE_PATTERNS) {
      for (const match of text.matchAll(pattern)) {
        const amount = parseNumber(match[1] ?? "");
        const unit = (match[2] ?? "").toLowerCase();
        const days = amount * (DAYS_PER_UNIT[unit] ?? 0);
        if (!Number.isFinite(days) || days <= 0 || days > 3650) continue;
        const excerpt = excerptAround(text, match.index ?? 0, match[0].length);
        // Skip "you must be 18 years old" and "posts older than 6 months".
        if (!/account/i.test(excerpt)) continue;
        add(`age:${days}`, {
          kind: "account_age",
          days,
          label: `${amount} ${unit}${amount === 1 ? "" : "s"}`,
          source,
          excerpt,
        });
      }
    }

    const email = text.match(VERIFIED_EMAIL);
    if (email) {
      add("email", {
        kind: "verified_email",
        source,
        excerpt: excerptAround(text, email.index ?? 0, email[0].length),
      });
    }
  }

  return found.slice(0, 8);
}

function judge(
  requirement: StatedRequirement,
  profile: RedditProfile,
): EligibilityVerdict {
  if (requirement.kind === "account_age") {
    return profile.accountAgeDays >= requirement.days ? "meets" : "below";
  }
  if (requirement.kind === "verified_email") {
    if (profile.hasVerifiedEmail === null) return "unknown";
    return profile.hasVerifiedEmail ? "meets" : "below";
  }
  const actual = {
    total: profile.totalKarma,
    post: profile.postKarma,
    comment: profile.commentKarma,
    subreddit: null,
  }[requirement.karmaType];
  if (actual === null) return "unknown";
  return actual >= requirement.value ? "meets" : "below";
}

async function fetchSubreddit(name: string): Promise<SubredditInfo & { submitText: string }> {
  let about: RedditSubredditAbout;
  try {
    about = await redditFetch<RedditSubredditAbout>(
      `/r/${encodeURIComponent(name)}/about.json?raw_json=1`,
    );
  } catch (error) {
    if (error instanceof RedditApiError && error.status === 403) {
      // Private and quarantined subreddits return 403, but so does Reddit when
      // it refuses a request, so don't claim more than we know.
      throw new ToolError(
        403,
        `We can't read r/${name}. It may be private or quarantined, or Reddit refused the request. Try again in a minute.`,
      );
    }
    if (error instanceof RedditApiError && error.status === 404) {
      throw new ToolError(404, `r/${name} doesn't exist or was banned.`);
    }
    throw error;
  }

  // Unknown subreddits redirect to a search listing instead of a "t5" object.
  const data = about.data;
  if (about.kind !== "t5" || !data) {
    throw new ToolError(404, `r/${name} doesn't exist or was banned.`);
  }

  return {
    name: data.display_name,
    title: decodeEntities(data.title ?? ""),
    description: decodeEntities(data.public_description ?? ""),
    iconUrl: cleanUrl(data.community_icon) ?? cleanUrl(data.icon_img),
    subscribers: data.subscribers ?? 0,
    createdAt: isoFromUnix(data.created_utc),
    type: data.subreddit_type ?? "public",
    nsfw: Boolean(data.over18),
    submissionType: data.submission_type ?? "any",
    allowImages: Boolean(data.allow_images),
    allowVideos: Boolean(data.allow_videos),
    allowPolls: Boolean(data.allow_polls),
    submitText: decodeEntities(data.submit_text ?? ""),
  };
}

async function fetchRules(name: string): Promise<SubredditRule[]> {
  const response = await redditFetch<RedditRules>(
    `/r/${encodeURIComponent(name)}/about/rules.json?raw_json=1`,
  );
  return (response.rules ?? []).map((rule) => {
    const title = decodeEntities(rule.short_name ?? "").trim();
    const description = decodeEntities(rule.description ?? "").trim();
    return {
      title,
      description,
      appliesTo: rule.kind ?? "all",
      isSelfPromotion: SELF_PROMOTION.test(`${title}\n${description}`),
    };
  });
}

async function fetchPostRequirements(
  name: string,
): Promise<SubredditPostRequirements> {
  const response = await redditFetch<RedditPostRequirements & { json?: unknown }>(
    `/api/v1/${encodeURIComponent(name)}/post_requirements.json?raw_json=1`,
  );
  // With an app-only OAuth token Reddit answers 200 + { json: { errors: [["USER_REQUIRED"…]] } }.
  if (response.json) throw new Error("Post requirements need a logged-in user");
  return {
    flairRequired:
      typeof response.is_flair_required === "boolean"
        ? response.is_flair_required
        : null,
    titleMinLength: response.title_text_min_length ?? null,
    titleMaxLength: response.title_text_max_length ?? null,
    bodyPolicy: response.body_restriction_policy ?? null,
    blockedDomainsCount: response.domain_blacklist?.length ?? 0,
    guidelines: response.guidelines_text
      ? decodeEntities(response.guidelines_text).trim()
      : null,
  };
}

export async function checkSubreddit(
  subredditName: string,
  username: string | null,
): Promise<SubredditCheckResult> {
  // The subreddit itself must exist; everything else is best effort.
  const [subredditResult, rulesResult, requirementsResult, profileResult] =
    await Promise.allSettled([
      fetchSubreddit(subredditName),
      fetchRules(subredditName),
      fetchPostRequirements(subredditName),
      username ? lookupProfile(username) : Promise.resolve(null),
    ]);

  if (subredditResult.status === "rejected") throw subredditResult.reason;

  const { submitText, ...subreddit } = subredditResult.value;
  const rules = rulesResult.status === "fulfilled" ? rulesResult.value : [];
  const postRequirements =
    requirementsResult.status === "fulfilled" ? requirementsResult.value : null;

  const statedRequirements = extractRequirements([
    ...rules.map((rule) => ({
      source: rule.title || "Subreddit rule",
      text: `${rule.title}. ${rule.description}`,
    })),
    { source: "Posting guidelines", text: submitText },
    { source: "Posting guidelines", text: postRequirements?.guidelines ?? "" },
    { source: "Community description", text: subreddit.description },
  ]);

  let profile: RedditProfile | null = null;
  let profileError: string | null = null;

  if (username) {
    if (profileResult.status === "rejected") {
      profileError = `We couldn't load u/${username} from Reddit. Try again in a minute.`;
    } else if (profileResult.value?.state === "visible") {
      profile = profileResult.value.profile;
    } else if (profileResult.value?.state === "suspended") {
      profileError = `u/${username} is suspended.`;
    } else {
      profileError = `We couldn't see u/${username}'s profile. The account may not exist, or it may be shadowbanned.`;
    }
  }

  return {
    subreddit,
    rules,
    postRequirements,
    statedRequirements,
    profile,
    eligibility: profile
      ? statedRequirements.map((requirement) => judge(requirement, profile))
      : null,
    profileError,
  };
}
