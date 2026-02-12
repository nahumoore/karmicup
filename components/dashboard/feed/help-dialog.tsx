"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FeedSubmission } from "@/hooks/use-feed-submissions";
import { cn } from "@/lib/utils";
import {
  IconAlertCircle,
  IconArrowBigUp,
  IconBrandReddit,
  IconCheck,
  IconCoin,
  IconExternalLink,
  IconHeart,
  IconLoader2,
  IconMessage,
  IconZoomCheck,
} from "@tabler/icons-react";
import React from "react";

export type Interaction = "upvote" | "comment" | "both";

export type DialogState = {
  postId: string;
  type: Interaction;
};

const INTERACTION_OPTIONS: {
  type: Interaction;
  label: string;
  pts: number;
  Icon: React.ElementType;
}[] = [
  { type: "upvote", label: "Upvote", pts: 1, Icon: IconArrowBigUp },
  { type: "comment", label: "Comment", pts: 5, Icon: IconMessage },
  { type: "both", label: "Both", pts: 6, Icon: IconZoomCheck },
];

interface HelpDialogProps {
  dialog: DialogState | null;
  post: FeedSubmission | undefined;
  verifying: boolean;
  error?: string | null;
  existingInteraction?: Interaction;
  onVerify: () => void;
  onClose: () => void;
  onTypeChange: (type: Interaction) => void;
}

export function HelpDialog({
  dialog,
  post,
  verifying,
  error,
  existingInteraction,
  onVerify,
  onClose,
  onTypeChange,
}: HelpDialogProps) {
  const author = post?.reddit_accounts?.username
    ? `u/${post.reddit_accounts.username}`
    : "this member";

  const availableOptions = INTERACTION_OPTIONS.filter(({ type }) => {
    if (existingInteraction === "upvote") return type === "comment";
    if (existingInteraction === "comment") return type === "upvote";
    return true;
  });

  const steps =
    dialog?.type === "upvote"
      ? [
          <>
            Open the{" "}
            <a
              href={post?.reddit_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Reddit post
            </a>{" "}
            in a new tab.
          </>,
          "Hit the upvote arrow at the top-left of the post.",
          "Come back here and click Verify — we'll credit your 1 point.",
        ]
      : dialog?.type === "comment"
        ? [
            <>
              Open the{" "}
              <a
                href={post?.reddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Reddit post
              </a>{" "}
              in a new tab.
            </>,
            "Leave a genuine, helpful comment.",
            "Come back here and click Verify — we'll credit your 5 points.",
          ]
        : [
            <>
              Open the{" "}
              <a
                href={post?.reddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Reddit post
              </a>{" "}
              in a new tab.
            </>,
            "Upvote the post using the arrow at the top-left.",
            "Leave a genuine, helpful comment.",
            "Come back here and click Verify — we'll credit your 6 points.",
          ];

  return (
    <Dialog
      open={!!dialog}
      onOpenChange={(open) => !open && !verifying && onClose()}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <IconHeart className="w-4 h-4 text-primary" />
            </div>
            Help {author}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Post link */}
          <a
            href={post?.reddit_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 hover:border-primary/30 hover:bg-primary/2 transition-all group"
          >
            <IconBrandReddit className="w-4 h-4 text-[#FF4500] shrink-0" />
            <span className="text-sm text-stone-700 font-medium line-clamp-1 flex-1">
              {post?.title}
            </span>
            <IconExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-primary shrink-0 transition-colors" />
          </a>

          {/* Action selector */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
              How do you want to help?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {availableOptions.map(({ type, label, pts, Icon }) => {
                const isSelected = dialog?.type === type;
                return (
                  <button
                    key={type}
                    onClick={() => onTypeChange(type)}
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
                      <Icon
                        className="w-4 h-4"
                        stroke={type === "upvote" ? 2.5 : 2}
                      />
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

          {/* Steps */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
              Steps
            </p>
            <ol className="space-y-2">
              {steps.map((step, idx) => (
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
                  <p className="text-[11px] text-stone-400 font-medium">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-stone-800">{pts}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            <IconAlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <DialogFooter>
          <button
            onClick={onClose}
            disabled={verifying}
            className="px-4 py-2 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onVerify}
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
  );
}
