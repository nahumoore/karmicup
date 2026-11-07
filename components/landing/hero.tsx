"use client";

import { Button } from "@/components/ui/button";
import {
  IconArrowBigUp,
  IconArrowBigUpFilled,
  IconArrowDown,
  IconArrowRight,
  IconBrandReddit,
  IconCircleCheckFilled,
  IconCoin,
  IconMessageCircle,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

const trustPoints = [
  "Free forever, no credit card",
  "Real Redditors, no bots",
  "Earn points by engaging",
];

const mockPosts = [
  {
    subreddit: "r/SideProject",
    title: "Just hit 100 users on my SaaS, 3 months after launch",
    upvotes: 892,
    comments: 67,
    time: "1h ago",
    upvoted: true,
  },
  {
    subreddit: "r/Entrepreneur",
    title: "From 0 to $5k MRR in 6 months as a solo founder",
    upvotes: 3821,
    comments: 214,
    time: "4h ago",
    upvoted: false,
  },
  {
    subreddit: "r/webdev",
    title: "I built a full-stack app in a weekend. Here is what I learned",
    upvotes: 1247,
    comments: 93,
    time: "2h ago",
    upvoted: false,
  },
];

const activity = [
  { who: "u/maker_mia", action: "commented on your post", time: "2m" },
  { who: "u/indiehacker42", action: "upvoted your post", time: "6m" },
  { who: "u/growthnerd", action: "upvoted your post", time: "11m" },
  { who: "u/saas_sam", action: "commented on your post", time: "18m" },
];

const ease = [0.2, 0.8, 0.2, 1] as const;

function FeedMock() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-white text-sm text-[#2F2F2D] shadow-[0_1px_2px_rgba(15,15,15,0.04),0_24px_64px_rgba(15,15,15,0.12)]">
      {/* App chrome */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-hairline px-4 text-[13px]">
        <span className="inline-flex size-[18px] items-center justify-center rounded bg-primary text-white">
          <IconArrowBigUpFilled size={11} />
        </span>
        <span className="text-muted-foreground">Karmicup</span>
        <span className="text-[#C4C4C0]">/</span>
        <span className="font-medium text-ink">Community feed</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-ink">
          <IconCoin size={13} className="text-primary" />
          42 points
        </span>
      </div>

      <div className="grid min-h-0 flex-1 md:grid-cols-[1fr_300px]">
        {/* Feed */}
        <div className="flex flex-col gap-2.5 bg-surface/60 p-4 sm:p-5">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <p className="font-heading text-[19px] leading-7 font-bold tracking-[-0.02em] text-ink">
              Posts waiting for engagement
            </p>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Updated just now
            </span>
          </div>
          {mockPosts.map((post) => (
            <article
              key={post.title}
              className="flex items-center gap-3 rounded-lg border border-border bg-white px-3.5 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <IconBrandReddit size={13} className="text-[#FF4500]" />
                  <span className="font-medium text-ink-secondary">
                    {post.subreddit}
                  </span>
                  <span aria-hidden>·</span>
                  {post.time}
                </p>
                <p className="mt-1 truncate font-medium text-ink">
                  {post.title}
                </p>
                <p className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <IconArrowBigUp size={13} />
                    {post.upvotes.toLocaleString("en-US")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconMessageCircle size={13} />
                    {post.comments}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
                <span
                  className={
                    post.upvoted
                      ? "inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-white"
                      : "inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-ink-secondary"
                  }
                >
                  <IconArrowBigUp size={13} />
                  +1
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-ink-secondary">
                  <IconMessageCircle size={13} />
                  +5
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Your post */}
        <aside className="hidden flex-col gap-4 border-l border-hairline p-5 md:flex">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Your submission
            </p>
            <p className="mt-1 line-clamp-2 font-semibold text-ink">
              Launched my habit tracker today. Feedback welcome!
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-brand-tint p-3">
              <dt className="text-xs text-muted-foreground">Upvotes</dt>
              <dd className="font-heading text-2xl font-bold text-primary">
                +38
              </dd>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <dt className="text-xs text-muted-foreground">Comments</dt>
              <dd className="font-heading text-2xl font-bold text-ink">+12</dd>
            </div>
          </dl>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Live activity
            </p>
            <ul className="flex flex-col gap-2">
              {activity.map((item) => (
                <li
                  key={item.who + item.time}
                  className="flex items-center gap-2 text-[13px]"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="min-w-0 flex-1 truncate text-ink-secondary">
                    <span className="font-medium text-ink">{item.who}</span>{" "}
                    {item.action}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-white px-4 pt-[124px] sm:px-6 sm:pt-[140px] lg:pt-[156px]"
    >
      {/* Dot grid + soft orange glow (MentioHunt hero background) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#D9D9D6_1px,transparent_1px)] mask-[radial-gradient(ellipse_65%_55%_at_50%_0%,#000_30%,transparent_100%)] bg-size-[20px_20px] bg-position-[center_top]" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(255,90,31,0.07),transparent_70%)]" />
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mx-auto flex max-w-[760px] flex-col items-center text-center"
        >
          <p className="m-0 flex items-center gap-3.5 text-xs font-semibold tracking-[0.16em] text-ink-secondary uppercase">
            <span aria-hidden className="h-px w-8 bg-[#C9C9C5]" />
            Free Reddit engagement community
            <span aria-hidden className="h-px w-8 bg-[#C9C9C5]" />
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-heading text-[40px] leading-[1.06] font-bold tracking-[-0.03em] text-balance text-ink sm:text-[56px] lg:text-[72px]"
          >
            You deserve more{" "}
            <span className="text-primary">Reddit visibility.</span>
          </h1>

          <p className="mt-5 max-w-[640px] text-lg leading-7 text-pretty text-ink-secondary">
            Submit your Reddit posts and comments, engage with the community,
            and get authentic upvotes and comments back. No bots, just real
            people.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-[18px] gap-y-2.5">
            <Button asChild className="group h-12 gap-2 px-5 text-base">
              <Link href="/register">
                Start getting upvotes
                <IconArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <a
              href="#how-it-works"
              className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink"
            >
              See how it works
              <IconArrowDown size={16} />
            </a>
          </div>

          <ul className="mt-[18px] flex flex-wrap justify-center gap-x-3.5 gap-y-1 text-[13px] text-muted-foreground">
            {trustPoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-1.5">
                <IconCircleCheckFilled size={14} className="text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mx-auto mt-12 max-w-[1080px] md:h-[420px]"
        >
          <FeedMock />
        </motion.div>
      </div>
    </section>
  );
}
