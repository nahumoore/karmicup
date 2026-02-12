"use client";

import type { FeedSubmission } from "@/hooks/use-feed-submissions";
import { cn } from "@/lib/utils";
import {
  IconBrandReddit,
  IconCheck,
  IconClockHour4,
  IconCoin,
  IconExternalLink,
  IconHeart,
  IconNotes,
} from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "motion/react";
import type { Interaction } from "./help-dialog";

interface FeedCardProps {
  post: FeedSubmission;
  index: number;
  existingInteraction: Interaction | undefined;
  onHelp: (id: string) => void;
}

export function FeedCard({
  post,
  index,
  existingInteraction,
  onHelp,
}: FeedCardProps) {
  const author = post.reddit_accounts?.username
    ? `u/${post.reddit_accounts.username}`
    : "a member";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
        existingInteraction
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
            r/{post.subreddit}
          </div>
          <span className="text-stone-300">·</span>
          <div className="flex items-center gap-1 text-stone-400 text-xs">
            <IconClockHour4 className="w-3 h-3" />
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-stone-800 leading-snug">
          {post.title}
        </h2>

        {/* Context */}
        {post.context && (
          <div className="flex items-start gap-2 mt-2.5 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
            <div className="shrink-0 mt-0.5 w-4 h-4 rounded bg-stone-200 flex items-center justify-center">
              <IconNotes className="w-2.5 h-2.5 text-stone-500" />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
              {post.context}
            </p>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div
        className={cn(
          "px-4 py-2.5 flex items-center gap-2 border-t",
          existingInteraction
            ? "bg-primary/[0.03] border-primary/10"
            : "bg-stone-50/60 border-stone-100",
        )}
      >
        <a
          href={post.reddit_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors mr-auto"
        >
          <IconExternalLink className="w-3.5 h-3.5" />
          Open on Reddit
        </a>

        {existingInteraction && (
          <div className="flex items-center gap-1 text-xs font-semibold text-primary">
            <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
              <IconCheck className="w-2.5 h-2.5" stroke={3} />
            </div>
            <IconCoin className="w-3.5 h-3.5" />+
            {existingInteraction === "comment" ? "5" : "1"} pts
          </div>
        )}

        <button
          onClick={() => onHelp(post.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25"
        >
          {existingInteraction ? "Help more" : `Help and win points`}
          <IconHeart className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}
