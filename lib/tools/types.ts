/**
 * Response shapes of the free tools API routes (app/api/tools/*). Shared by
 * the routes and the client components that render the results.
 */

export type ToolError = { error: string };

/** Public profile data used by the karma checker and the subreddit checker. */
export type RedditProfile = {
  username: string;
  avatarUrl: string | null;
  /** ISO date the account was created. */
  createdAt: string;
  accountAgeDays: number;
  totalKarma: number;
  postKarma: number;
  commentKarma: number;
  awarderKarma: number;
  awardeeKarma: number;
  hasVerifiedEmail: boolean | null;
  isModerator: boolean;
};

export type KarmaCheckResult = {
  profile: RedditProfile;
  /** Total karma divided by account age (at least one day). */
  karmaPerDay: number;
};

export type ShadowbanStatus =
  /** Profile is visible to logged-out visitors. */
  | "visible"
  /** Profile is hidden, but the username is taken: shadowbanned or deleted. */
  | "hidden"
  /** Reddit suspended the account. */
  | "suspended"
  /** The username is free: the account doesn't exist. */
  | "not_found";

export type ShadowbanCheckResult = {
  username: string;
  status: ShadowbanStatus;
  /** Only when the profile is visible. */
  profile: RedditProfile | null;
  /** Whether Reddit confirmed the username is taken. Null when that check failed. */
  usernameTaken: boolean | null;
  checkedAt: string;
};

export type KarmaType = "total" | "post" | "comment" | "subreddit";

/** A requirement found in the subreddit's rules or posting guidelines. */
export type StatedRequirement =
  | {
      kind: "karma";
      karmaType: KarmaType;
      value: number;
      source: string;
      excerpt: string;
    }
  | {
      kind: "account_age";
      /** Minimum account age in days. */
      days: number;
      /** Original wording, e.g. "2 weeks". */
      label: string;
      source: string;
      excerpt: string;
    }
  | {
      kind: "verified_email";
      source: string;
      excerpt: string;
    };

export type SubredditRule = {
  title: string;
  description: string;
  /** "link" (posts), "comment" or "all". */
  appliesTo: string;
  isSelfPromotion: boolean;
};

export type SubredditPostRequirements = {
  flairRequired: boolean | null;
  titleMinLength: number | null;
  titleMaxLength: number | null;
  /** "required", "notAllowed" or "none". */
  bodyPolicy: string | null;
  blockedDomainsCount: number;
  guidelines: string | null;
};

export type SubredditInfo = {
  name: string;
  title: string;
  description: string;
  iconUrl: string | null;
  subscribers: number;
  createdAt: string;
  /** "public", "restricted", "private", "archived"... */
  type: string;
  nsfw: boolean;
  /** "any", "link" or "self". */
  submissionType: string;
  allowImages: boolean;
  allowVideos: boolean;
  allowPolls: boolean;
};

export type EligibilityVerdict = "meets" | "below" | "unknown";

export type SubredditCheckResult = {
  subreddit: SubredditInfo;
  rules: SubredditRule[];
  postRequirements: SubredditPostRequirements | null;
  statedRequirements: StatedRequirement[];
  /** Only when a username was provided and the profile is public. */
  profile: RedditProfile | null;
  /** One verdict per stated requirement (same order), only with a profile. */
  eligibility: EligibilityVerdict[] | null;
  /** Set when a username was provided but its profile couldn't be read. */
  profileError: string | null;
};
