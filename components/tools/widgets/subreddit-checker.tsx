"use client";

import { MentiohuntLink } from "@/components/mentiohunt-link";
import { NextStep, NextSteps } from "@/components/tools/widgets/next-steps";
import {
  Avatar,
  ErrorNotice,
  ExampleChips,
  FieldError,
  formatAge,
  formatNumber,
  HandleInput,
  ResultSkeleton,
  SubmitButton,
  ToolFrame,
  useShareableQuery,
  useToolQuery,
} from "@/components/tools/widgets/shared";
import { parseSubreddit, parseUsername } from "@/lib/tools/reddit-input";
import type {
  EligibilityVerdict,
  RedditProfile,
  StatedRequirement,
  SubredditCheckResult,
  SubredditPostRequirements,
  SubredditInfo,
} from "@/lib/tools/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconAlertTriangle,
  IconChartBar,
  IconCheck,
  IconChevronDown,
  IconEyeCheck,
  IconInfoCircle,
  IconLink,
  IconSpeakerphone,
  IconX,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  subreddit: z
    .string()
    .trim()
    .min(1, "Enter a subreddit.")
    .refine((value) => parseSubreddit(value) !== null, {
      message: "Subreddit names are 2–21 letters, numbers or underscores.",
    }),
  username: z
    .string()
    .trim()
    .refine((value) => value === "" || parseUsername(value) !== null, {
      message: "Reddit usernames are 3–20 letters, numbers, dashes or underscores.",
    }),
});

type FormValues = z.infer<typeof schema>;

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const linkClass =
  "font-medium text-ink underline decoration-brand/60 underline-offset-4 hover:text-primary";

// ---------------------------------------------------------------------------
// Requirements
// ---------------------------------------------------------------------------

function requirementLabel(requirement: StatedRequirement): string {
  if (requirement.kind === "account_age") {
    return `Account at least ${requirement.label} old`;
  }
  if (requirement.kind === "verified_email") return "Verified email";
  const type = requirement.karmaType === "total" ? "" : `${requirement.karmaType} `;
  if (requirement.value === 1) return `Positive ${type}karma`;
  return `${formatNumber(requirement.value)}+ ${type}karma`;
}

function yourValue(requirement: StatedRequirement, profile: RedditProfile): string {
  if (requirement.kind === "account_age") return formatAge(profile.accountAgeDays);
  if (requirement.kind === "verified_email") {
    if (profile.hasVerifiedEmail === null) return "Not public";
    return profile.hasVerifiedEmail ? "Verified" : "Not verified";
  }
  const value = {
    total: profile.totalKarma,
    post: profile.postKarma,
    comment: profile.commentKarma,
    subreddit: null,
  }[requirement.karmaType];
  return value === null ? "Not public" : `${formatNumber(value)} karma`;
}

const VERDICT = {
  meets: { label: "Meets", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  below: { label: "Below", className: "bg-brand-tint text-primary border-brand-soft" },
  unknown: { label: "Can't check", className: "bg-white text-muted-foreground border-border" },
} satisfies Record<EligibilityVerdict, { label: string; className: string }>;

function Requirements({ result }: { result: SubredditCheckResult }) {
  const { statedRequirements, eligibility, profile, profileError, subreddit } = result;
  const below = eligibility?.filter((verdict) => verdict === "below").length ?? 0;

  return (
    <section aria-labelledby="requirements-title" className="rounded-xl border border-border bg-white">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-4 py-3">
        <h3 id="requirements-title" className="m-0 text-[14px] font-semibold text-ink">
          Published requirements
        </h3>
        {profile && statedRequirements.length > 0 && (
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[12px] font-semibold",
              below > 0 ? VERDICT.below.className : VERDICT.meets.className,
            )}
          >
            {below > 0
              ? `u/${profile.username} is below ${below} of ${statedRequirements.length}`
              : `u/${profile.username} meets what we could check`}
          </span>
        )}
      </header>

      {profileError && (
        <p className="m-0 flex items-start gap-2 border-b border-hairline px-4 py-3 text-[13px] leading-5 text-ink-secondary">
          <IconAlertTriangle size={15} className="mt-0.5 shrink-0 text-primary" />
          <span>
            {profileError}{" "}
            <Link href="/tools/reddit-shadowban-checker" className={linkClass}>
              Run a shadowban check
            </Link>
          </span>
        </p>
      )}

      {statedRequirements.length === 0 ? (
        <p className="m-0 flex items-start gap-2.5 px-4 py-4 text-[14px] leading-[22px] text-ink-secondary">
          <IconInfoCircle size={17} className="mt-0.5 shrink-0 text-muted-foreground" />
          <span>
            r/{subreddit.name} doesn&apos;t publish a karma or account age requirement in its
            rules or guidelines. It may still filter new or low-karma accounts with private
            AutoModerator rules, so{" "}
            <Link href="/blog/how-to-get-karma-on-reddit#how-to-find-a-subreddits-karma-requirement" className={linkClass}>
              build some comment karma first
            </Link>
            .
          </span>
        </p>
      ) : (
        <ul className="m-0 list-none p-0">
          {statedRequirements.map((requirement, index) => {
            const verdict = eligibility?.[index];
            return (
              <li
                key={`${requirement.kind}-${index}`}
                className="flex flex-col gap-2 border-b border-hairline px-4 py-3.5 last:border-b-0 sm:flex-row sm:items-start sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[15px] font-semibold text-ink">
                    {requirementLabel(requirement)}
                  </p>
                  <p className="m-0 mt-1 text-[13px] leading-5 text-muted-foreground">
                    <span className="font-medium text-ink-secondary">{requirement.source}:</span>{" "}
                    &ldquo;{requirement.excerpt}&rdquo;
                  </p>
                </div>
                {verdict && profile && (
                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
                    <span className={cn("rounded-full border px-2.5 py-0.5 text-[12px] font-semibold", VERDICT[verdict].className)}>
                      {VERDICT[verdict].label}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      You: {yourValue(requirement, profile)}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Post types
// ---------------------------------------------------------------------------

function PostTypes({
  subreddit,
  requirements,
}: {
  subreddit: SubredditInfo;
  requirements: SubredditPostRequirements | null;
}) {
  const allowsText = subreddit.submissionType !== "link";
  const allowsLinks = subreddit.submissionType !== "self";
  const types = [
    { label: "Text", allowed: allowsText },
    { label: "Links", allowed: allowsLinks },
    { label: "Images", allowed: subreddit.allowImages },
    { label: "Videos", allowed: subreddit.allowVideos },
    { label: "Polls", allowed: subreddit.allowPolls },
  ];

  const details: { label: string; value: string }[] = [];
  if (requirements?.flairRequired !== null && requirements?.flairRequired !== undefined) {
    details.push({ label: "Post flair", value: requirements.flairRequired ? "Required" : "Optional" });
  }
  if (requirements?.titleMinLength || requirements?.titleMaxLength) {
    details.push({
      label: "Title length",
      value: `${requirements.titleMinLength ?? 1}–${requirements.titleMaxLength ?? 300} characters`,
    });
  }
  if (requirements?.bodyPolicy && requirements.bodyPolicy !== "none") {
    details.push({
      label: "Post body",
      value: requirements.bodyPolicy === "required" ? "Required" : "Not allowed",
    });
  }
  if (requirements?.blockedDomainsCount) {
    details.push({
      label: "Blocked link domains",
      value: formatNumber(requirements.blockedDomainsCount),
    });
  }

  return (
    <section aria-labelledby="post-types-title" className="rounded-xl border border-border bg-white p-4">
      <h3 id="post-types-title" className="m-0 mb-3 text-[14px] font-semibold text-ink">
        What you can post
      </h3>
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {types.map(({ label, allowed }) => (
          <li
            key={label}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] font-medium",
              allowed ? "border-border bg-white text-ink" : "border-hairline bg-surface text-muted-foreground line-through",
            )}
          >
            {allowed ? (
              <IconCheck size={12} stroke={2.5} className="text-emerald-600" />
            ) : (
              <IconX size={12} stroke={2.5} />
            )}
            {label}
          </li>
        ))}
      </ul>
      {details.length > 0 && (
        <dl className="m-0 mt-3 grid gap-x-4 gap-y-1.5 border-t border-hairline pt-3 text-[13px] sm:grid-cols-2">
          {details.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-2">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="m-0 font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

function truncate(text: string, length: number): string {
  const clean = text.replace(/[*_#>`]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > length ? `${clean.slice(0, length - 1).trimEnd()}…` : clean;
}

function SelfPromotion({ result }: { result: SubredditCheckResult }) {
  const promoRules = result.rules.filter((rule) => rule.isSelfPromotion);

  return (
    <section aria-labelledby="promo-title" className="rounded-xl border border-border bg-white p-4">
      <h3 id="promo-title" className="m-0 mb-2 flex items-center gap-2 text-[14px] font-semibold text-ink">
        <IconSpeakerphone size={16} className="text-primary" />
        Self-promotion rules
      </h3>
      {promoRules.length === 0 ? (
        <p className="m-0 text-[14px] leading-[22px] text-ink-secondary">
          None of r/{result.subreddit.name}&apos;s rules mention self-promotion, ads or spam.
          Still read them before you share your own project.
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {promoRules.map((rule) => (
            <li key={rule.title} className="text-[14px] leading-[22px]">
              <p className="m-0 font-semibold text-ink">{rule.title}</p>
              {rule.description && (
                <p className="m-0 text-ink-secondary">{truncate(rule.description, 260)}</p>
              )}
            </li>
          ))}
        </ul>
      )}
      <p className="m-0 mt-3 flex items-start gap-2 border-t border-hairline pt-3 text-[13px] leading-5 text-ink-secondary">
        <IconLink size={15} className="mt-0.5 shrink-0 text-primary" />
        <span>
          Promoting a product? Reddit links are <code className="font-mono text-[12px]">nofollow</code>, so
          they won&apos;t lift your Google rankings.{" "}
          <MentiohuntLink
            placement="tools"
            content="subreddit_requirements_result"
            className={linkClass}
          >
            MentioHunt finds sites that can link to you
          </MentiohuntLink>
          .
        </span>
      </p>
    </section>
  );
}

function AllRules({ result }: { result: SubredditCheckResult }) {
  if (result.rules.length === 0) return null;

  return (
    <details className="group rounded-xl border border-border bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        All rules ({result.rules.length})
        <IconChevronDown size={16} className="text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <ol className="m-0 flex list-none flex-col border-t border-hairline p-0">
        {result.rules.map((rule, index) => (
          <li key={`${rule.title}-${index}`} className="flex gap-3 border-b border-hairline px-4 py-3 last:border-b-0">
            <span className="w-5 shrink-0 font-mono text-[13px] font-semibold text-muted-foreground tabular-nums">
              {index + 1}
            </span>
            <div className="min-w-0 text-[14px] leading-[22px]">
              <p className="m-0 font-semibold text-ink">{rule.title}</p>
              {rule.description && (
                <p className="m-0 text-ink-secondary">{truncate(rule.description, 400)}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}

// ---------------------------------------------------------------------------
// Result
// ---------------------------------------------------------------------------

const TYPE_LABELS: Record<string, string> = {
  public: "Public",
  restricted: "Restricted",
  private: "Private",
  archived: "Archived",
  gold_restricted: "Premium only",
  employees_only: "Employees only",
};

function SubredditResult({ result }: { result: SubredditCheckResult }) {
  const { subreddit } = result;
  const restricted = subreddit.type !== "public";

  return (
    <article aria-label={`Requirements of r/${subreddit.name}`} className="flex flex-col gap-4">
      <header className="flex flex-wrap items-center gap-3">
        <Avatar src={subreddit.iconUrl} name={subreddit.name} square />
        <div className="min-w-0 flex-1">
          <h2 className="m-0 truncate font-mono text-[17px] font-semibold text-ink">
            <a
              href={`https://www.reddit.com/r/${subreddit.name}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              r/{subreddit.name}
            </a>
          </h2>
          <p className="m-0 mt-0.5 flex flex-wrap items-center gap-x-2 text-[13px] text-muted-foreground">
            <span>{compact.format(subreddit.subscribers)} members</span>
            <span aria-hidden>·</span>
            <span>Created {format(parseISO(subreddit.createdAt), "MMM yyyy")}</span>
          </p>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[12px] font-semibold text-ink">
            {TYPE_LABELS[subreddit.type] ?? subreddit.type}
          </span>
          {subreddit.nsfw && (
            <span className="rounded-full border border-brand-soft bg-brand-tint px-2.5 py-1 text-[12px] font-semibold text-primary">
              NSFW
            </span>
          )}
        </div>
      </header>

      {restricted && (
        <ErrorNotice
          message={
            subreddit.type === "restricted"
              ? `r/${subreddit.name} is restricted: anyone can read it, but only users approved by the moderators can post.`
              : `r/${subreddit.name} is ${TYPE_LABELS[subreddit.type]?.toLowerCase() ?? subreddit.type}, so most accounts can't post there.`
          }
        />
      )}

      <Requirements result={result} />

      <div className="grid gap-4 md:grid-cols-2">
        <PostTypes subreddit={subreddit} requirements={result.postRequirements} />
        <SelfPromotion result={result} />
      </div>

      <AllRules result={result} />

      <p className="m-0 text-[12px] leading-5 text-muted-foreground">
        We read the rules, description and posting guidelines r/{subreddit.name} publishes.
        Private AutoModerator filters and Reddit&apos;s Contributor Quality Score aren&apos;t
        public, so a post can still be filtered.
      </p>

      <NextSteps>
        <NextStep
          href={
            result.profile
              ? `/tools/reddit-shadowban-checker?u=${result.profile.username}`
              : "/tools/reddit-shadowban-checker"
          }
          icon={IconEyeCheck}
          title="Make sure you're not shadowbanned"
        />
        <NextStep
          href={
            result.profile
              ? `/tools/reddit-karma-checker?u=${result.profile.username}`
              : "/tools/reddit-karma-checker"
          }
          icon={IconChartBar}
          title="See your karma breakdown"
        />
      </NextSteps>
    </article>
  );
}

export function SubredditChecker() {
  const searchParams = useSearchParams();
  const syncUrl = useShareableQuery();
  const { state, run } = useToolQuery<SubredditCheckResult>("/api/tools/subreddit");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subreddit: "", username: "" },
  });

  const check = (rawSubreddit: string, rawUsername: string) => {
    const subreddit = parseSubreddit(rawSubreddit);
    if (!subreddit) return;
    const username = rawUsername ? parseUsername(rawUsername) : null;
    syncUrl({ r: subreddit, u: username });
    void run(username ? { subreddit, username } : { subreddit });
  };

  // Shared links (?r=sub&u=name) run the check on load; ?u= alone prefills the username.
  useEffect(() => {
    const subreddit = parseSubreddit(searchParams.get("r") ?? "");
    const username = parseUsername(searchParams.get("u") ?? "");
    if (username) setValue("username", username);
    if (!subreddit) return;
    setValue("subreddit", subreddit);
    void run(username ? { subreddit, username } : { subreddit });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on first load
  }, []);

  const result =
    state.status === "loading" ? (
      <ResultSkeleton rows={2} />
    ) : state.status === "error" ? (
      <ErrorNotice message={state.error} />
    ) : state.status === "success" ? (
      <SubredditResult result={state.data} />
    ) : null;

  return (
    <ToolFrame label="Subreddit requirements" result={result}>
      <form
        noValidate
        onSubmit={handleSubmit(({ subreddit, username }) => check(subreddit, username))}
      >
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <label htmlFor="subreddit-name" className="mb-2 block text-[13px] font-medium text-ink">
              Subreddit
            </label>
            <HandleInput
              id="subreddit-name"
              prefix="r/"
              placeholder="SaaS"
              invalid={Boolean(errors.subreddit)}
              {...register("subreddit")}
            />
          </div>
          <div>
            <label htmlFor="subreddit-username" className="mb-2 block text-[13px] font-medium text-ink">
              Your username <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <HandleInput
              id="subreddit-username"
              prefix="u/"
              placeholder="username"
              invalid={Boolean(errors.username)}
              {...register("username")}
            />
          </div>
          <SubmitButton loading={state.status === "loading"}>Check</SubmitButton>
        </div>
        <FieldError message={errors.subreddit?.message ?? errors.username?.message} />
        <ExampleChips
          prefix="r/"
          examples={["SaaS", "SideProject", "Entrepreneur", "startups"]}
          onPick={(value) => {
            setValue("subreddit", value, { shouldValidate: true });
            check(value, getValues("username"));
          }}
        />
      </form>
    </ToolFrame>
  );
}
