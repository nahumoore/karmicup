"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  IconAlertCircle,
  IconArrowBigUp,
  IconBrandReddit,
  IconCircleCheck,
  IconClockHour4,
  IconCoin,
  IconExternalLink,
  IconLink,
  IconMessage,
  IconPlus,
  IconPointFilled,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";

const SUBMIT_COST = 10;
const USER_POINTS = 47; // mock

const mySubmissions = [
  {
    id: 1,
    type: "post" as const,
    subreddit: "r/SideProject",
    title:
      "I spent 3 months building Karmicup — a free Reddit engagement platform for indie makers",
    redditUrl: "https://reddit.com/r/SideProject/comments/post1",
    submittedAt: "Jan 15, 2026",
    upvotesReceived: 8,
    commentsReceived: 3,
    status: "active" as const,
  },
  {
    id: 2,
    type: "comment" as const,
    subreddit: "r/entrepreneur",
    title: "Comment on: 'Best tools for validating startup ideas in 2026'",
    redditUrl: "https://reddit.com/r/entrepreneur/comments/post2",
    submittedAt: "Jan 18, 2026",
    upvotesReceived: 5,
    commentsReceived: 1,
    status: "active" as const,
  },
  {
    id: 3,
    type: "post" as const,
    subreddit: "r/nextjs",
    title:
      "Built a full-stack app with Next.js 16 and Supabase — sharing my stack and lessons learned",
    redditUrl: "https://reddit.com/r/nextjs/comments/post3",
    submittedAt: "Jan 22, 2026",
    upvotesReceived: 11,
    commentsReceived: 5,
    status: "completed" as const,
  },
];

const totalUpvotes = mySubmissions.reduce((s, p) => s + p.upvotesReceived, 0);
const totalComments = mySubmissions.reduce((s, p) => s + p.commentsReceived, 0);
const totalPoints = totalUpvotes * 1 + totalComments * 5;

const stats = [
  {
    label: "Submissions",
    value: mySubmissions.length,
    icon: IconBrandReddit,
    color: "text-stone-600",
    bg: "bg-stone-50",
    border: "border-stone-200",
  },
  {
    label: "Upvotes received",
    value: totalUpvotes,
    icon: IconArrowBigUp,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    note: "+1 pt each",
  },
  {
    label: "Comments received",
    value: totalComments,
    icon: IconMessage,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    note: "+5 pts each",
  },
  {
    label: "Points distributed",
    value: totalPoints,
    icon: IconCoin,
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
    note: "total",
    highlight: true,
  },
];

type SubmissionType = "post" | "comment";
type EngagementGoal = "upvotes" | "comments" | "both";

function SubmitLinkDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState<SubmissionType>("post");
  const [goal, setGoal] = useState<EngagementGoal>("both");
  const [context, setContext] = useState("");

  const canAfford = USER_POINTS >= SUBMIT_COST;
  const pointsAfter = USER_POINTS - SUBMIT_COST;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg gap-0 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-stone-100">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <IconBrandReddit className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-base font-semibold text-stone-900">
                Submit a new link
              </DialogTitle>
              <DialogDescription className="text-stone-500 text-xs mt-0.5">
                Share a Reddit post or comment to get free upvotes and comments
                from the community.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary/8 border border-primary/20 shrink-0">
              <IconCoin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary">
                −{SUBMIT_COST} pts
              </span>
            </div>
          </div>
        </DialogHeader>

        {/* Form body */}
        <div className="px-5 py-4 space-y-4">
          {/* URL field */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
              Reddit URL
            </Label>
            <div className="relative">
              <IconLink className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              <Input
                type="url"
                placeholder="https://reddit.com/r/…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-8 h-9 text-sm placeholder:text-stone-400 border-stone-200 rounded-xl focus-visible:border-primary/50 focus-visible:ring-primary/20"
              />
            </div>
            <p className="text-[11px] text-stone-400">
              Paste the full URL to your Reddit post or comment.
            </p>
          </div>

          {/* Type toggle */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
              Type
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {(["post", "comment"] as SubmissionType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
                    type === t
                      ? t === "post"
                        ? "bg-orange-50 border-orange-300 text-orange-700"
                        : "bg-sky-50 border-sky-300 text-sky-700"
                      : "bg-white border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700",
                  )}
                >
                  {t === "post" ? (
                    <IconBrandReddit className="w-4 h-4" />
                  ) : (
                    <IconMessage className="w-4 h-4" />
                  )}
                  <span className="capitalize">{t}</span>
                  {type === t && (
                    <IconCircleCheck className="w-3.5 h-3.5 ml-auto opacity-70" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Context (optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Context
              </Label>
              <span className="text-[10px] text-stone-400 font-medium">
                Optional
              </span>
            </div>
            <textarea
              rows={2}
              placeholder="Give context to the community — what's the post about?"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              maxLength={200}
              className="w-full resize-none rounded-xl border border-stone-200 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 text-stone-800 focus:outline-none focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/20 transition-colors"
            />
            <p className="text-[11px] text-stone-400 text-right">
              {context.length}/200
            </p>
          </div>

          {/* Points summary */}
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border",
              canAfford
                ? "bg-stone-50 border-stone-200"
                : "bg-red-50 border-red-200",
            )}
          >
            {canAfford ? (
              <>
                <IconCoin className="w-4 h-4 text-stone-500 shrink-0" />
                <div className="flex-1 text-xs text-stone-600">
                  <span className="font-medium">Balance after submission:</span>{" "}
                  <span className="font-bold text-stone-800">
                    {pointsAfter} pts
                  </span>
                  <span className="text-stone-400 ml-1">
                    (from {USER_POINTS} pts)
                  </span>
                </div>
              </>
            ) : (
              <>
                <IconAlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <div className="flex-1 text-xs text-red-700">
                  <span className="font-semibold">Not enough points.</span> You
                  need {SUBMIT_COST} pts but only have{" "}
                  <span className="font-bold">{USER_POINTS} pts</span>. Engage
                  with others to earn more.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-5 py-3.5 bg-stone-50/80 border-t border-stone-100 flex flex-row items-center justify-between gap-3 mx-0 mb-0 rounded-none sm:flex-row">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-medium hover:bg-stone-50 hover:border-stone-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!url.trim() || !canAfford}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <IconCoin className="w-4 h-4" />
            Submit · {SUBMIT_COST} pts
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MySubmissionsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="p-6">
      <SubmitLinkDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Page header */}
      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            My Submissions
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Track the engagement your Reddit posts and comments are receiving.
          </p>
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 mt-0.5 shrink-0"
        >
          <IconPlus className="w-4 h-4" stroke={2.5} />
          Submit link
        </button>
      </header>

      {/* Stats grid */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-4 gap-3 mb-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className={cn("p-4 rounded-2xl border", stat.bg, stat.border)}
          >
            <stat.icon className={cn("w-4.5 h-4.5 mb-2.5", stat.color)} />
            <div
              className={cn("text-2xl font-bold tracking-tight", stat.color)}
            >
              {stat.value}
            </div>
            <div className="text-xs text-stone-500 font-medium mt-0.5 leading-snug">
              {stat.label}
            </div>
            {stat.note && (
              <div
                className={cn(
                  "text-[10px] font-semibold mt-1",
                  stat.color,
                  "opacity-50",
                )}
              >
                {stat.note}
              </div>
            )}
          </motion.div>
        ))}
      </motion.section>

      {/* Submissions list */}
      <section className="space-y-3">
        {mySubmissions.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + i * 0.08,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-stone-300 hover:shadow-sm transition-all duration-300"
          >
            <div className="p-4">
              {/* Meta row */}
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide",
                    item.type === "post"
                      ? "bg-orange-50 text-orange-600 border-orange-200"
                      : "bg-sky-50 text-sky-600 border-sky-200",
                  )}
                >
                  {item.type}
                </span>
                <div className="flex items-center gap-1 text-stone-500 text-sm font-medium">
                  <IconBrandReddit className="w-3.5 h-3.5 text-[#FF4500]" />
                  {item.subreddit}
                </div>
                <span className="text-stone-300">·</span>
                <div className="flex items-center gap-1 text-stone-400 text-xs">
                  <IconClockHour4 className="w-3 h-3" />
                  {item.submittedAt}
                </div>
                <div className="ml-auto">
                  <span
                    className={cn(
                      "flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                      item.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-stone-100 text-stone-500 border-stone-200",
                    )}
                  >
                    {item.status === "active" ? (
                      <>
                        <IconPointFilled className="w-2 h-2 text-emerald-500" />
                        Active
                      </>
                    ) : (
                      <>
                        <IconCircleCheck className="w-3 h-3" />
                        Completed
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-sm font-semibold text-stone-800 leading-snug mb-3">
                {item.title}
              </h2>

              {/* Engagement stats */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-100 rounded-xl">
                  <IconArrowBigUp
                    className="w-4 h-4 text-orange-500"
                    stroke={2}
                  />
                  <div>
                    <div className="text-base font-bold text-orange-700 leading-none">
                      {item.upvotesReceived}
                    </div>
                    <div className="text-[10px] text-orange-400 font-medium mt-0.5">
                      upvotes
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 border border-sky-100 rounded-xl">
                  <IconMessage className="w-4 h-4 text-sky-500" />
                  <div>
                    <div className="text-base font-bold text-sky-700 leading-none">
                      {item.commentsReceived}
                    </div>
                    <div className="text-[10px] text-sky-400 font-medium mt-0.5">
                      comments
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/15 rounded-xl ml-auto">
                  <IconCoin className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-base font-bold text-primary leading-none">
                      {item.upvotesReceived + item.commentsReceived * 5}
                    </div>
                    <div className="text-[10px] text-primary/50 font-medium mt-0.5">
                      pts distributed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-stone-50/60 border-t border-stone-100">
              <a
                href={item.redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors w-fit"
              >
                <IconExternalLink className="w-3.5 h-3.5" />
                Open on Reddit
              </a>
            </div>
          </motion.article>
        ))}
      </section>

      {/* Submit CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setDialogOpen(true)}
        className="mt-4 p-5 rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center text-center hover:border-primary/30 hover:bg-primary/[0.02] transition-all cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-stone-100 group-hover:bg-primary/10 flex items-center justify-center mb-2.5 transition-colors">
          <IconPlus
            className="w-5 h-5 text-stone-400 group-hover:text-primary transition-colors"
            stroke={2.5}
          />
        </div>
        <p className="text-sm font-semibold text-stone-600 group-hover:text-stone-800 transition-colors">
          Submit a new link
        </p>
        <p className="text-xs text-stone-400 mt-0.5">
          Share a Reddit post or comment to get free engagement
        </p>
      </motion.div>
    </div>
  );
}
