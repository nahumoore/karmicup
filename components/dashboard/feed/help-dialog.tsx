"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FeedSubmission } from "@/hooks/use-feed-submissions";
import {
  IconAlertCircle,
  IconArrowBigUp,
  IconBrandReddit,
  IconCheck,
  IconExternalLink,
  IconHeart,
  IconLoader2,
  IconMessage,
  IconSparkles,
} from "@tabler/icons-react";
export type Interaction = "upvote" | "comment" | "both";

export type DialogState = {
  postId: string;
};

export type VerifyResult = {
  detected: Interaction;
  pointsEarned: number;
  totalPoints: number;
};

interface HelpDialogProps {
  dialog: DialogState | null;
  post: FeedSubmission | undefined;
  verifying: boolean;
  error?: string | null;
  existingInteraction?: Interaction;
  verifyResult: VerifyResult | null;
  onVerify: () => void;
  onClose: () => void;
}

const DETECTED_LABELS: Record<Interaction, string> = {
  upvote: "an upvote",
  comment: "a comment",
  both: "an upvote and a comment",
};

export function HelpDialog({
  dialog,
  post,
  verifying,
  error,
  existingInteraction,
  verifyResult,
  onVerify,
  onClose,
}: HelpDialogProps) {
  const author = post?.reddit_accounts?.username
    ? `u/${post.reddit_accounts.username}`
    : "this member";

  const steps =
    existingInteraction === "upvote"
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
      : existingInteraction === "comment"
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
            "Upvote and/or leave a genuine, helpful comment.",
            "Come back here and click Verify — we'll detect what you did.",
          ];

  return (
    <Dialog
      open={!!dialog}
      onOpenChange={(open) => !open && !verifying && onClose()}
    >
      <DialogContent className="sm:max-w-lg">
        {verifyResult ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <IconSparkles className="w-4 h-4 text-green-600" />
                </div>
                Actions verified!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <p className="text-sm text-stone-600">
                We detected{" "}
                <span className="font-semibold text-stone-800">
                  {DETECTED_LABELS[verifyResult.detected]}
                </span>{" "}
                on this post. Thanks for helping {author}!
              </p>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/15">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <IconCheck className="w-6 h-6 text-primary" stroke={2.5} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    +{verifyResult.pointsEarned} pt
                    {verifyResult.pointsEarned > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    New balance:{" "}
                    <span className="font-semibold text-stone-700">
                      {verifyResult.totalPoints} pts
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-all"
              >
                Close
              </button>
            </DialogFooter>
          </>
        ) : (
          <>
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

              {/* Points info */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  What you can earn
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50">
                    <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                      <IconArrowBigUp className="w-4 h-4 text-stone-600" stroke={2.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-700">Upvote</p>
                      <p className="text-[11px] font-bold text-primary">+1 pt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50">
                    <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                      <IconMessage className="w-4 h-4 text-stone-600" stroke={2} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-700">Comment</p>
                      <p className="text-[11px] font-bold text-primary">+5 pts</p>
                    </div>
                  </div>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
