"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  IconArrowBigUp,
  IconBrandReddit,
  IconCheck,
  IconClockHour4,
  IconCoin,
  IconExternalLink,
  IconHeart,
  IconInfoCircle,
  IconLoader2,
  IconMessage,
  IconSparkles,
  IconZoomCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import React, { useState } from "react";

const communityPosts = [
  {
    id: 1,
    type: "post" as const,
    subreddit: "r/webdev",
    title:
      "I built a tool that converts any Figma design to production-ready React components in seconds",
    description:
      "After months of frustration copy-pasting designs into code, I built a CLI tool that reads Figma files via API and outputs clean, typed React components with Tailwind styles. No more guessing spacing or colors.",
    context:
      "Please upvote and drop a genuine comment about your own Figma-to-code pain points — it helps the thread get visibility in the subreddit.",
    author: "u/dev_wizard42",
    redditUrl: "https://reddit.com/r/webdev/comments/abc123",
    submittedAt: "2 hours ago",
  },
  {
    id: 2,
    type: "comment" as const,
    subreddit: "r/entrepreneur",
    title: "Comment on: 'How I grew my SaaS to $10k MRR in 6 months'",
    description:
      "My comment covers the customer acquisition strategies I used when starting without any network or audience. Specifically cold outreach templates and the LinkedIn DM sequence that got me my first 20 paying customers.",
    context:
      "Upvote my comment if you found it useful. If you leave a reply, try to share your own acquisition experience — that keeps the conversation natural.",
    author: "u/startup_sarah",
    redditUrl: "https://reddit.com/r/entrepreneur/comments/xyz789",
    submittedAt: "4 hours ago",
  },
  {
    id: 3,
    type: "post" as const,
    subreddit: "r/programming",
    title:
      "After 2 years of development, I finally launched my open-source database visualization tool",
    description:
      "It started as a weekend project to visualize my PostgreSQL schemas but grew into a full tool supporting MySQL, SQLite, and MongoDB. Free forever, self-hostable, and the UI renders even million-row tables smoothly.",
    context:
      "Any comment about your own DB tooling workflow is perfect. Avoid one-liners — the mods remove low-effort comments in this sub.",
    author: "u/coder_max",
    redditUrl: "https://reddit.com/r/programming/comments/def456",
    submittedAt: "6 hours ago",
  },
];

type Interaction = "upvote" | "comment" | "both";

type DialogState = {
  postId: number;
  type: Interaction;
};

export default function CommunityFeedPage() {
  const [interacted, setInteracted] = useState<Record<number, Interaction>>({});
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [verifying, setVerifying] = useState(false);

  const activePost = communityPosts.find((p) => p.id === dialog?.postId);

  const handleVerify = async () => {
    if (!dialog) return;
    setVerifying(true);
    try {
      await fetch("/api/submissions/verify", { method: "POST" });
      setInteracted((prev) => ({ ...prev, [dialog.postId]: dialog.type }));
      setDialog(null);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="p-6">
      {/* Page header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Community Feed
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Help other members and earn points you can spend on your own posts.
        </p>
      </header>

      {/* Points legend */}
      <div className="flex items-center gap-5 mb-6 p-3.5 rounded-xl bg-primary/5 border border-primary/15">
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <div className="w-7 h-7 rounded-lg bg-white border border-primary/20 flex items-center justify-center">
            <IconArrowBigUp className="w-4 h-4 text-primary" stroke={2.5} />
          </div>
          Upvote →{" "}
          <span className="font-semibold text-stone-800">+1 point</span>
        </div>
        <div className="w-px h-5 bg-primary/20" />
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <div className="w-7 h-7 rounded-lg bg-white border border-primary/20 flex items-center justify-center">
            <IconMessage className="w-4 h-4 text-primary" />
          </div>
          Comment →{" "}
          <span className="font-semibold text-stone-800">+5 points</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto text-xs text-primary/70">
          <IconSparkles className="w-3.5 h-3.5" />
          Points unlock free boosts for your posts
        </div>
      </div>

      {/* Feed */}
      <section className="space-y-3">
        {communityPosts.map((post, i) => {
          const done = interacted[post.id];

          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                done
                  ? "border-primary/25 shadow-sm shadow-primary/5"
                  : "border-stone-200 hover:border-stone-300 hover:shadow-sm",
              )}
            >
              <div className="p-4">
                {/* Meta row */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide",
                      post.type === "post"
                        ? "bg-orange-50 text-orange-600 border-orange-200"
                        : "bg-sky-50 text-sky-600 border-sky-200",
                    )}
                  >
                    {post.type}
                  </span>
                  <div className="flex items-center gap-1 text-stone-500 text-sm font-medium">
                    <IconBrandReddit className="w-3.5 h-3.5 text-[#FF4500]" />
                    {post.subreddit}
                  </div>
                  <span className="text-stone-300">·</span>
                  <div className="flex items-center gap-1 text-stone-400 text-xs">
                    <IconClockHour4 className="w-3 h-3" />
                    {post.submittedAt}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-sm font-semibold text-stone-800 leading-snug">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-xs text-stone-500 leading-relaxed mt-1.5 line-clamp-2">
                  {post.description}
                </p>

                {/* Context */}
                <div className="flex items-start gap-1.5 mt-2.5 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                  <IconInfoCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed line-clamp-2">
                    {post.context}
                  </p>
                </div>

                <p className="text-xs text-stone-400 mt-2">
                  by{" "}
                  <span className="font-medium text-stone-500">
                    {post.author}
                  </span>
                </p>
              </div>

              {/* Action bar */}
              <div
                className={cn(
                  "px-4 py-2.5 flex items-center gap-2 border-t",
                  done
                    ? "bg-primary/[0.03] border-primary/10"
                    : "bg-stone-50/60 border-stone-100",
                )}
              >
                <a
                  href={post.redditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors mr-auto"
                >
                  <IconExternalLink className="w-3.5 h-3.5" />
                  Open on Reddit
                </a>

                {done ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconCheck className="w-3 h-3" stroke={3} />
                    </div>
                    <IconCoin className="w-3.5 h-3.5" />+
                    {done === "comment" ? "5" : done === "both" ? "6" : "1"} pts earned
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setDialog({ postId: post.id, type: "comment" })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25"
                  >
                    <IconHeart className="w-3.5 h-3.5" />
                    Help {post.author}
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Help dialog */}
      <Dialog open={!!dialog} onOpenChange={(open) => !open && !verifying && setDialog(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <IconHeart className="w-4 h-4 text-primary" />
              </div>
              Help {activePost?.author}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Post link */}
            <a
              href={activePost?.redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 hover:border-primary/30 hover:bg-primary/2 transition-all group"
            >
              <IconBrandReddit className="w-4 h-4 text-[#FF4500] shrink-0" />
              <span className="text-sm text-stone-700 font-medium line-clamp-1 flex-1">
                {activePost?.title}
              </span>
              <IconExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-primary shrink-0 transition-colors" />
            </a>

            {/* Action selector */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                How do you want to help?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { type: "upvote", label: "Upvote", pts: 1, Icon: IconArrowBigUp },
                    { type: "comment", label: "Comment", pts: 5, Icon: IconMessage },
                    { type: "both", label: "Both", pts: 6, Icon: IconZoomCheck },
                  ] as { type: Interaction; label: string; pts: number; Icon: React.ElementType }[]
                ).map(({ type, label, pts, Icon }) => {
                  const isSelected = dialog?.type === type;
                  return (
                    <button
                      key={type}
                      onClick={() => dialog && setDialog({ ...dialog, type })}
                      className={cn(
                        "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all",
                        isSelected
                          ? "border-primary/40 bg-primary/5 text-primary"
                          : "border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50",
                      )}
                    >
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                          isSelected ? "bg-primary/15" : "bg-stone-100",
                        )}
                      >
                        <Icon className="w-4 h-4" stroke={type === "upvote" ? 2.5 : 2} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{label}</p>
                        <p
                          className={cn(
                            "text-[11px] font-bold",
                            isSelected ? "text-primary" : "text-stone-400",
                          )}
                        >
                          +{pts} pt{pts > 1 ? "s" : ""}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Steps
              </p>
              <ol className="space-y-2">
                {(
                  dialog?.type === "upvote"
                    ? [
                        <>Open the <a href={activePost?.redditUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">Reddit post</a> in a new tab.</>,
                        "Hit the upvote arrow at the top-left of the post.",
                        "Come back here and click Verify — we'll credit your 1 point.",
                      ]
                    : dialog?.type === "comment"
                    ? [
                        <>Open the <a href={activePost?.redditUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">Reddit post</a> in a new tab.</>,
                        "Leave a genuine, helpful comment.",
                        "Come back here and click Verify — we'll credit your 5 points.",
                      ]
                    : [
                        <>Open the <a href={activePost?.redditUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">Reddit post</a> in a new tab.</>,
                        "Upvote the post using the arrow at the top-left.",
                        "Leave a genuine, helpful comment.",
                        "Come back here and click Verify — we'll credit your 6 points.",
                      ]
                ).map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-stone-600"
                  >
                    <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Points breakdown */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-100">
              {[
                { label: "Upvote", pts: "+1 pt" },
                { label: "Comment", pts: "+5 pts" },
                { label: "Both", pts: "+6 pts" },
              ].map(({ label, pts }) => (
                <div key={label} className="flex items-center gap-2">
                  <IconCoin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[11px] text-stone-400 font-medium">{label}</p>
                    <p className="text-sm font-bold text-stone-800">{pts}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setDialog(null)}
              disabled={verifying}
              className="px-4 py-2 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 disabled:opacity-70"
            >
              {verifying ? (
                <>
                  <IconLoader2 className="w-4 h-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  <IconCheck className="w-4 h-4" stroke={2.5} />
                  Verify
                </>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
