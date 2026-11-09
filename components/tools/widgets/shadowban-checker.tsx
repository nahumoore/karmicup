"use client";

import { NextStep, NextSteps } from "@/components/tools/widgets/next-steps";
import {
  ErrorNotice,
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
import { parseUsername } from "@/lib/tools/reddit-input";
import type { ShadowbanCheckResult, ShadowbanStatus } from "@/lib/tools/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBan,
  IconBrandReddit,
  IconCheck,
  IconChartBar,
  IconEyeOff,
  IconListCheck,
  IconMinus,
  IconShieldCheck,
  IconUserQuestion,
  IconX,
  type Icon,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
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

const STATUS: Record<
  ShadowbanStatus,
  { icon: Icon; title: string; tone: "good" | "bad" | "neutral" }
> = {
  visible: { icon: IconShieldCheck, title: "Not shadowbanned", tone: "good" },
  hidden: { icon: IconEyeOff, title: "Likely shadowbanned", tone: "bad" },
  suspended: { icon: IconBan, title: "Account suspended", tone: "bad" },
  not_found: { icon: IconUserQuestion, title: "This account doesn't exist", tone: "neutral" },
};

const TONE_CLASSES = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-700",
  bad: "border-brand-soft bg-brand-tint text-primary",
  neutral: "border-border bg-white text-ink-secondary",
};

type Check = { label: string; state: "pass" | "fail" | "unknown" };

function checksFor(result: ShadowbanCheckResult): Check[] {
  const { status, usernameTaken } = result;
  return [
    {
      label: "Username is registered on Reddit",
      state: usernameTaken === null ? "unknown" : usernameTaken ? "pass" : "fail",
    },
    {
      label: "Account isn't suspended",
      state: status === "suspended" ? "fail" : status === "not_found" ? "unknown" : "pass",
    },
    {
      label: "Profile is visible to logged-out visitors",
      state: status === "visible" ? "pass" : "fail",
    },
  ];
}

function summary(result: ShadowbanCheckResult): ReactNode {
  const name = <strong className="font-semibold text-ink">u/{result.username}</strong>;
  switch (result.status) {
    case "visible":
      return (
        <>
          {name} is visible to everyone. Reddit hasn&apos;t shadowbanned it sitewide.
          {result.profile && (
            <>
              {" "}
              The account is {formatAge(result.profile.accountAgeDays).toLowerCase()} old and has{" "}
              {formatNumber(result.profile.totalKarma)} karma.
            </>
          )}
        </>
      );
    case "hidden":
      return result.usernameTaken ? (
        <>
          The username {name} is taken, but Reddit hides its profile from logged-out
          visitors. The account is shadowbanned or was deleted.
        </>
      ) : (
        <>
          Reddit hides {name} from logged-out visitors. We couldn&apos;t confirm the
          username is registered, so the account may be shadowbanned, deleted or may not
          exist.
        </>
      );
    case "suspended":
      return (
        <>
          Reddit suspended {name}. Suspended accounts can&apos;t post, comment or vote,
          and their profile shows a suspension notice.
        </>
      );
    case "not_found":
      return (
        <>
          Nobody has registered {name}. Check the spelling: usernames aren&apos;t
          case-sensitive, but every character counts.
        </>
      );
  }
}

function CheckRow({ check }: { check: Check }) {
  const icon =
    check.state === "pass" ? (
      <IconCheck size={13} stroke={2.5} />
    ) : check.state === "fail" ? (
      <IconX size={13} stroke={2.5} />
    ) : (
      <IconMinus size={13} stroke={2.5} />
    );

  return (
    <li className="flex items-center gap-2.5 border-b border-hairline py-2.5 text-[14px] text-ink-secondary last:border-b-0">
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full",
          check.state === "pass" && "bg-emerald-100 text-emerald-700",
          check.state === "fail" && "bg-brand-tint text-primary",
          check.state === "unknown" && "bg-[#ECECEA] text-muted-foreground",
        )}
      >
        {icon}
      </span>
      <span className="flex-1">{check.label}</span>
      <span className="text-[12px] font-medium text-muted-foreground">
        {check.state === "pass" ? "Yes" : check.state === "fail" ? "No" : "Unknown"}
      </span>
    </li>
  );
}

function WhatToDo({ result }: { result: ShadowbanCheckResult }) {
  const profileUrl = `https://www.reddit.com/user/${result.username}/`;
  const link = "font-medium text-ink underline decoration-brand/60 underline-offset-4 hover:text-primary";

  if (result.status === "visible") {
    return (
      <p className="m-0 text-[14px] leading-[22px] text-ink-secondary">
        If your posts still don&apos;t show up, a subreddit may be removing them. Open one
        of your posts in a private window: if it&apos;s missing or says{" "}
        <code className="rounded bg-surface px-1 font-mono text-[12px]">[removed]</code>,
        that community filtered it. Check its rules and requirements below.
      </p>
    );
  }

  if (result.status === "not_found") {
    return (
      <p className="m-0 text-[14px] leading-[22px] text-ink-secondary">
        Double-check the username, or paste the profile link from Reddit and we&apos;ll
        read the name from it.
      </p>
    );
  }

  return (
    <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-5 text-[14px] leading-[22px] text-ink-secondary marker:font-semibold marker:text-ink">
      <li>
        Confirm it: open{" "}
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className={link}>
          the profile
        </a>{" "}
        in a private window, where you&apos;re logged out.
      </li>
      <li>
        Appeal from the affected account at{" "}
        <a href="https://www.reddit.com/appeal" target="_blank" rel="noopener noreferrer" className={link}>
          reddit.com/appeal
        </a>
        . Keep it short and honest.
      </li>
      <li>
        Don&apos;t open a new account to get around it: Reddit treats that as ban evasion
        and can ban the new one too.
      </li>
    </ol>
  );
}

function ShadowbanResult({ result }: { result: ShadowbanCheckResult }) {
  const { icon: StatusIcon, title, tone } = STATUS[result.status];

  return (
    <article aria-label={`Shadowban check for u/${result.username}`} className="flex flex-col gap-5">
      <header className={cn("flex items-start gap-3.5 rounded-xl border p-4 sm:p-5", TONE_CLASSES[tone])}>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_1px_2px_rgba(15,15,15,0.06)]">
          <StatusIcon size={22} />
        </span>
        <div className="min-w-0">
          <h2 className="m-0 font-heading text-[22px] leading-tight font-bold tracking-[-0.02em] text-ink">
            {title}
          </h2>
          <p className="m-0 mt-1.5 text-[15px] leading-6 text-ink-secondary">{summary(result)}</p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section aria-label="What we checked" className="rounded-xl border border-border bg-white px-4 py-3">
          <p className="m-0 mb-1 text-[13px] font-semibold text-ink">What we checked</p>
          <ul className="m-0 list-none p-0">
            {checksFor(result).map((check) => (
              <CheckRow key={check.label} check={check} />
            ))}
          </ul>
          <p className="m-0 mt-2 text-[12px] text-muted-foreground">
            Checked {format(parseISO(result.checkedAt), "MMM d, yyyy 'at' HH:mm")}
          </p>
        </section>
        <section aria-label="What to do" className="rounded-xl border border-border bg-white p-4">
          <p className="m-0 mb-2 text-[13px] font-semibold text-ink">What to do</p>
          <WhatToDo result={result} />
        </section>
      </div>

      {result.status === "visible" && (
        <NextSteps>
          <NextStep
            href={`/tools/subreddit-requirements-checker?u=${result.username}`}
            icon={IconListCheck}
            title="Check a subreddit's requirements"
          />
          <NextStep
            href={`/tools/reddit-karma-checker?u=${result.username}`}
            icon={IconChartBar}
            title="See this account's karma"
          />
        </NextSteps>
      )}
    </article>
  );
}

export function ShadowbanChecker() {
  const searchParams = useSearchParams();
  const syncUrl = useShareableQuery();
  const { state, run } = useToolQuery<ShadowbanCheckResult>("/api/tools/shadowban");

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

  useEffect(() => {
    const initial = parseUsername(searchParams.get("u") ?? "");
    if (!initial) return;
    setValue("username", initial);
    void run({ username: initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on first load
  }, []);

  const result =
    state.status === "loading" ? (
      <ResultSkeleton rows={2} />
    ) : state.status === "error" ? (
      <ErrorNotice message={state.error} />
    ) : state.status === "success" ? (
      <ShadowbanResult result={state.data} />
    ) : null;

  return (
    <ToolFrame label="Shadowban checker" result={result}>
      <form noValidate onSubmit={handleSubmit(({ username }) => check(username))}>
        <label htmlFor="shadowban-username" className="mb-2 flex items-center gap-1.5 text-[13px] font-medium text-ink">
          <IconBrandReddit size={15} className="text-[#FF4500]" />
          Reddit username
        </label>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <HandleInput
            id="shadowban-username"
            prefix="u/"
            placeholder="username"
            invalid={Boolean(errors.username)}
            {...register("username")}
          />
          <SubmitButton loading={state.status === "loading"}>Check account</SubmitButton>
        </div>
        <FieldError message={errors.username?.message} />
        <p className="mt-3 text-[13px] text-muted-foreground">
          We load the profile the way a logged-out visitor sees it. Nothing is stored.
        </p>
      </form>
    </ToolFrame>
  );
}
