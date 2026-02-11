"use client";

import { Button } from "@/components/ui/button";
import { PLATFORM_METRICS } from "@/consts/platform-metrics";
import {
  IconArrowBigUp,
  IconArrowBigUpFilled,
  IconArrowRight,
  IconBrandReddit,
  IconMessageCircle2,
  IconShare3,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { SparklesText } from "../ui/sparkles-text";

const stats = [
  { value: PLATFORM_METRICS.members, label: "Active members" },
  { value: PLATFORM_METRICS.postsBoosted, label: "Posts boosted" },
  { value: PLATFORM_METRICS.alwaysFree, label: "Always free" },
];

const mockPosts = [
  {
    id: 1,
    subreddit: "r/webdev",
    title: "I built a full-stack app in a weekend — here's what I learned",
    votes: 1247,
    comments: 93,
    time: "2h ago",
  },
  {
    id: 2,
    subreddit: "r/entrepreneur",
    title: "From 0 to $5k MRR in 6 months as a solo founder",
    votes: 3821,
    comments: 214,
    time: "4h ago",
  },
  {
    id: 3,
    subreddit: "r/SideProject",
    title: "Just hit 100 users on my SaaS — 3 months after launch",
    votes: 892,
    comments: 67,
    time: "1h ago",
  },
];

const floatingArrows = [
  { left: "3%", delay: 0, duration: 3.8, size: 16 },
  { left: "14%", delay: 3.1, duration: 4.1, size: 13 },
  { left: "28%", delay: 1.5, duration: 4.3, size: 14 },
  { left: "42%", delay: 0.7, duration: 3.5, size: 18 },
  { left: "57%", delay: 2.4, duration: 4.0, size: 13 },
  { left: "68%", delay: 2.1, duration: 3.9, size: 16 },
  { left: "80%", delay: 1.0, duration: 3.2, size: 14 },
  { left: "92%", delay: 2.8, duration: 4.6, size: 16 },
];

function MockPostCard({
  post,
  delay,
}: {
  post: (typeof mockPosts)[0];
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 bg-background rounded-xl border border-border p-4 shadow-sm w-full"
    >
      <p className="text-xs text-primary font-semibold mb-1.5">
        {post.subreddit}
      </p>
      <p className="text-sm font-semibold text-foreground leading-snug mb-3 line-clamp-2">
        {post.title}
      </p>
      <footer className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 text-primary font-bold">
          <IconArrowBigUpFilled size={13} stroke={2.5} />
          {post.votes.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <IconMessageCircle2 size={12} stroke={2} />
          {post.comments}
        </span>
        <span className="flex items-center gap-1">
          <IconShare3 size={12} stroke={2} />
          Share
        </span>
        <span className="ml-auto">{post.time}</span>
      </footer>
    </motion.article>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen bg-background flex items-center overflow-hidden pt-16">
      {/* Subtle warm gradient blob */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.646 0.222 41.116 / 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.646 0.222 41.116 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-sm font-semibold mb-8"
            >
              <IconBrandReddit size={15} stroke={2} />
              Free Reddit engagement platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-6xl lg:text-[64px] font-black text-foreground leading-[0.95] tracking-tight mb-6"
            >
              You Deserve more
              <SparklesText
                className="text-primary font-extrabold"
                colors={{
                  first: "#F97316",
                  second: "#FBBF24",
                }}
              >
                Reddit Visibility
              </SparklesText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-muted-foreground max-w-md leading-relaxed mb-10"
            >
              Submit your Reddit posts and comments, engage with the community,
              and get authentic engagement back. No bots — just real people.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="shrink-0"
              >
                <Button
                  size="lg"
                  className="h-11 px-5 font-semibold gap-2 text-lg group w-full"
                >
                  Start getting upvotes
                  <span className="inline-flex group-hover:translate-x-1 transition-transform duration-200">
                    <IconArrowRight size={15} />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-10"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: mock post cards illustration */}
          <aside className="hidden lg:flex flex-col gap-4 max-w-sm ml-auto relative">
            {/* Floating upvote arrows background */}
            <div
              aria-hidden
              className="absolute -inset-x-16 -inset-y-6 pointer-events-none z-0"
            >
              {floatingArrows.map((arrow, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary"
                  style={{ left: arrow.left, bottom: "-20px" }}
                  animate={{ y: [0, -440], opacity: [0, 0.13, 0.1, 0] }}
                  transition={{
                    duration: arrow.duration,
                    delay: arrow.delay,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.08, 0.78, 1],
                  }}
                >
                  <IconArrowBigUp size={arrow.size} />
                </motion.div>
              ))}
            </div>

            {mockPosts.map((post, i) => (
              <MockPostCard key={post.id} post={post} delay={0.9 + i * 0.15} />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
