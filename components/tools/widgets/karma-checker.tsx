"use client";

import {
  Avatar,
  ErrorNotice,
  ExampleChips,
  FieldError,
  formatAge,
  formatNumber,
  HandleInput,
  ResultSkeleton,
  StatTile,
  SubmitButton,
  ToolFrame,
  useShareableQuery,
  useToolQuery,
} from "@/components/tools/widgets/shared";
import { NextStep, NextSteps } from "@/components/tools/widgets/next-steps";
import { parseUsername } from "@/lib/tools/reddit-input";
import type { KarmaCheckResult } from "@/lib/tools/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBrandReddit,
  IconCake,
  IconEyeCheck,
  IconListCheck,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Enter a Reddit username.")
    .refine((value) => parseUsername(value) !== null, {
      message: "Reddit usernames are 3–20 letters, numbers, dashes or underscores.",
    }),
});

type FormValues = z.infer<typeof schema>;

/** Descriptive Karmicup tiers. Not an official Reddit rank. */
function karmaTier(total: number): string {
  if (total < 1) return "Brand new";
  if (total < 100) return "Getting started";
  if (total < 1_000) return "Regular";
  if (total < 10_000) return "Established";
  if (total < 100_000) return "Veteran";
  return "Power user";
}

function insights({ profile }: KarmaCheckResult) {
  const notes: { text: string; href?: string; cta?: string }[] = [];

  if (profile.accountAgeDays < 7) {
    notes.push({
      text: "This account is less than a week old. Many subreddits filter brand-new accounts, so spend the first days commenting before you post.",
    });
  }
  if (profile.totalKarma < 50) {
    notes.push({
      text: "Low karma: some communities automatically remove posts from low-karma accounts.",
      href: "/blog/how-to-get-karma-on-reddit",
      cta: "How to get karma the safe way",
    });
  }
  if (profile.postKarma > 100 && profile.commentKarma < profile.postKarma * 0.2) {
    notes.push({
      text: "Most of this karma comes from posts. Some subreddits only count comment karma, so commenting helps you qualify.",
    });
  }
  if (notes.length === 0) {
    notes.push({
      text: "This account has a solid history. Requirements still vary by community, so check the rules of the subreddit you want to post in.",
    });
  }
  return notes.slice(0, 3);
}

function KarmaResult({ result }: { result: KarmaCheckResult }) {
  const { profile, karmaPerDay } = result;
  const split = profile.postKarma + profile.commentKarma;
  const postShare = split > 0 ? Math.round((profile.postKarma / split) * 100) : 0;
  const awardKarma = profile.awardeeKarma + profile.awarderKarma;

  return (
    <article aria-label={`Karma of u/${profile.username}`} className="flex flex-col gap-5">
      <header className="flex flex-wrap items-center gap-3">
        <Avatar src={profile.avatarUrl} name={profile.username} />
        <div className="min-w-0 flex-1">
          <h2 className="m-0 truncate font-mono text-[17px] font-semibold text-ink">
            <a
              href={`https://www.reddit.com/user/${profile.username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              u/{profile.username}
            </a>
          </h2>
          <p className="m-0 mt-0.5 flex flex-wrap items-center gap-x-2 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <IconCake size={14} />
              Redditor since {format(parseISO(profile.createdAt), "MMM d, yyyy")}
            </span>
            <span aria-hidden>·</span>
            <span>{formatAge(profile.accountAgeDays)}</span>
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[12px] font-semibold text-ink">
          {karmaTier(profile.totalKarma)}
        </span>
      </header>

      <dl className="m-0 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total karma" value={formatNumber(profile.totalKarma)} accent />
        <StatTile label="Post karma" value={formatNumber(profile.postKarma)} />
        <StatTile label="Comment karma" value={formatNumber(profile.commentKarma)} />
        <StatTile
          label="Karma per day"
          value={formatNumber(karmaPerDay)}
          hint="Average since signup"
        />
      </dl>

      {split > 0 && (
        <figure className="m-0">
          <div
            className="flex h-2.5 overflow-hidden rounded-full bg-[#ECECEA]"
            role="img"
            aria-label={`${postShare}% post karma, ${100 - postShare}% comment karma`}
          >
            <span className="h-full bg-primary" style={{ width: `${postShare}%` }} />
            <span className="h-full bg-ink" style={{ width: `${100 - postShare}%` }} />
          </div>
          <figcaption className="mt-2 flex flex-wrap justify-between gap-2 text-[12px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary" />
              Posts {postShare}%
            </span>
            {awardKarma > 0 && (
              <span>+{formatNumber(awardKarma)} karma from awards</span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-ink" />
              Comments {100 - postShare}%
            </span>
          </figcaption>
        </figure>
      )}

      <section aria-label="What this means" className="rounded-xl border border-border bg-white p-4">
        <p className="m-0 mb-2 text-[13px] font-semibold text-ink">What this means</p>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {insights(result).map((note) => (
            <li key={note.text} className="flex gap-2.5 text-[14px] leading-[22px] text-ink-secondary">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
              <span>
                {note.text}{" "}
                {note.href && (
                  <Link href={note.href} className="font-medium text-ink underline decoration-brand/60 underline-offset-4 hover:text-primary">
                    {note.cta}
                  </Link>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <NextSteps>
        <NextStep
          href={`/tools/reddit-shadowban-checker?u=${profile.username}`}
          icon={IconEyeCheck}
          title="Is this account shadowbanned?"
        />
        <NextStep
          href={`/tools/subreddit-requirements-checker?u=${profile.username}`}
          icon={IconListCheck}
          title="Can it post in a subreddit?"
        />
      </NextSteps>
    </article>
  );
}

export function KarmaChecker() {
  const searchParams = useSearchParams();
  const syncUrl = useShareableQuery();
  const { state, run } = useToolQuery<KarmaCheckResult>("/api/tools/karma");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "" },
  });

  const check = (raw: string) => {
    const username = parseUsername(raw);
    if (!username) return;
    syncUrl({ u: username });
    void run({ username });
  };

  // Shared links (?u=name) run the check on load.
  useEffect(() => {
    const initial = parseUsername(searchParams.get("u") ?? "");
    if (!initial) return;
    setValue("username", initial);
    void run({ username: initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on first load
  }, []);

  const result =
    state.status === "loading" ? (
      <ResultSkeleton rows={3} />
    ) : state.status === "error" ? (
      <ErrorNotice message={state.error} />
    ) : state.status === "success" ? (
      <KarmaResult result={state.data} />
    ) : null;

  return (
    <ToolFrame label="Karma checker" result={result}>
      <form
        noValidate
        onSubmit={handleSubmit(({ username }) => check(username))}
      >
        <label htmlFor="karma-username" className="mb-2 flex items-center gap-1.5 text-[13px] font-medium text-ink">
          <IconBrandReddit size={15} className="text-[#FF4500]" />
          Reddit username
        </label>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <HandleInput
            id="karma-username"
            prefix="u/"
            placeholder="username"
            invalid={Boolean(errors.username)}
            {...register("username")}
          />
          <SubmitButton loading={state.status === "loading"}>Check karma</SubmitButton>
        </div>
        <FieldError message={errors.username?.message} />
        <ExampleChips
          prefix="u/"
          examples={["spez", "kn0thing"]}
          onPick={(value) => {
            setValue("username", value, { shouldValidate: true });
            check(value);
          }}
        />
      </form>
    </ToolFrame>
  );
}
