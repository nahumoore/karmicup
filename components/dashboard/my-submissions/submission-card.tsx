"use client";

import type { Submission } from "@/hooks/use-submissions";
import { useSubmissions } from "@/hooks/use-submissions";
import { cn } from "@/lib/utils";
import {
  IconArrowBigUp,
  IconBrandReddit,
  IconCircleCheck,
  IconClockHour4,
  IconExternalLink,
  IconLoader2,
  IconMessage,
  IconPointFilled,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { motion } from "motion/react";
import { useState } from "react";

interface SubmissionCardProps {
  submission: Submission;
  index: number;
}

export function SubmissionCard({ submission, index }: SubmissionCardProps) {
  const { updateSubmission } = useSubmissions();
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  const toggleStatus = async () => {
    const nextStatus = submission.status === "active" ? "completed" : "active";
    setIsTogglingStatus(true);
    try {
      const res = await fetch("/api/submissions/modify", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: submission.id, status: nextStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const { submission: updated } = await res.json();
      updateSubmission(submission.id, { status: updated.status });
    } catch {
      // silently revert — UI stays unchanged if update failed
    } finally {
      setIsTogglingStatus(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-stone-300 hover:shadow-sm transition-all duration-300"
    >
      <div className="p-4 flex items-center gap-4">
        {/* Left: meta + title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide shrink-0",
                submission.type === "post"
                  ? "bg-orange-50 text-orange-600 border-orange-200"
                  : "bg-sky-50 text-sky-600 border-sky-200",
              )}
            >
              {submission.type}
            </span>
            <div className="flex items-center gap-1 text-stone-500 text-xs font-medium">
              <IconBrandReddit className="w-3 h-3 text-[#FF4500] shrink-0" />
              <span className="truncate">{submission.subreddit}</span>
            </div>
            <span className="text-stone-300 text-xs">·</span>
            <div className="flex items-center gap-1 text-stone-400 text-xs">
              <IconClockHour4 className="w-3 h-3 shrink-0" />
              {format(new Date(submission.created_at), "MMM d, yyyy")}
            </div>
          </div>

          <h2 className="text-sm font-semibold text-stone-800 leading-snug line-clamp-2">
            {submission.title}
          </h2>
        </div>

        {/* Right: stats + status + link */}
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          {/* Stats row */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-stone-500">
              <IconArrowBigUp className="w-3.5 h-3.5 text-orange-400" stroke={2} />
              <span>{submission.upvotes_received}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-stone-500">
              <IconMessage className="w-3.5 h-3.5 text-sky-400" />
              <span>{submission.comments_received}</span>
            </div>
          </div>

          {/* Status toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleStatus}
                disabled={isTogglingStatus}
                className={cn(
                  "flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all",
                  isTogglingStatus
                    ? "bg-stone-50 text-stone-400 border-stone-200 cursor-wait"
                    : submission.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : "bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200",
                )}
              >
                {isTogglingStatus ? (
                  <IconLoader2 className="w-3 h-3 animate-spin" />
                ) : submission.status === "active" ? (
                  <IconPointFilled className="w-2 h-2 text-emerald-500" />
                ) : (
                  <IconCircleCheck className="w-3 h-3" />
                )}
                {isTogglingStatus
                  ? "Saving…"
                  : submission.status === "active"
                    ? "Active"
                    : "Completed"}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {submission.status === "active"
                ? "Visible to other users on the feed"
                : "Deactivated — not shown on the feed"}
            </TooltipContent>
          </Tooltip>

          {/* Reddit link */}
          <a
            href={submission.reddit_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-600 transition-colors"
          >
            <IconExternalLink className="w-3 h-3" />
            Reddit
          </a>
        </div>
      </div>
    </motion.article>
  );
}
