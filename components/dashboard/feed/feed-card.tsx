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
  IconInfoCircle,
} from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "motion/react";
import type { Interaction } from "./help-dialog";

interface FeedCardProps {
  post: FeedSubmission;
  index: number;
  done: Interaction | undefined;
  onHelp: (id: string) => void;
}

export function FeedCard({ post, index, done, onHelp }: FeedCardProps) {
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
          <div className="flex items-start gap-1.5 mt-2.5 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
            <IconInfoCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed line-clamp-2">
              {post.context}
            </p>
          </div>
        )}

        <p className="text-xs text-stone-400 mt-2">
          by <span className="font-medium text-stone-500">{author}</span>
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
          href={post.reddit_url}
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
            onClick={() => onHelp(post.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25"
          >
            <IconHeart className="w-3.5 h-3.5" />
            Help {author}
          </button>
        )}
      </div>
    </motion.article>
  );
}
