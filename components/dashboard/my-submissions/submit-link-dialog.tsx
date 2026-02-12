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
import { SUBMIT_COST } from "@/consts/submission-cost";
import { useSubmissions } from "@/hooks/use-submissions";
import { useUserInfo } from "@/hooks/use-user-info";
import { cn } from "@/lib/utils";
import {
  IconAlertCircle,
  IconBrandReddit,
  IconCircleCheck,
  IconCoin,
  IconLink,
  IconLoader2,
  IconMessage,
} from "@tabler/icons-react";
import { useState } from "react";

type SubmissionType = "post" | "comment";

// Matches both post and comment Reddit URLs
const REDDIT_URL_REGEX =
  /^https?:\/\/(?:www\.|old\.)?reddit\.com\/r\/[^/]+\/comments\/[a-z0-9]+/i;

function isValidRedditUrl(url: string): boolean {
  return REDDIT_URL_REGEX.test(url);
}

interface SubmitLinkDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  userPoints: number;
}

export function SubmitLinkDialog({
  open,
  onOpenChange,
  userPoints,
}: SubmitLinkDialogProps) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState<SubmissionType>("post");
  const [context, setContext] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  const { data: userInfoData, setUserInfoData } = useUserInfo();
  const { submissions, setSubmissions } = useSubmissions();

  const canAfford = userPoints >= SUBMIT_COST;
  const pointsAfter = userPoints - SUBMIT_COST;
  const urlTrimmed = url.trim();
  const canSubmit =
    !!urlTrimmed && isValidRedditUrl(urlTrimmed) && canAfford && !isSubmitting;

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
    setUrlError(null);
    setError(null);
  }

  function handleUrlBlur() {
    if (urlTrimmed && !isValidRedditUrl(urlTrimmed)) {
      setUrlError("Must be a valid Reddit post or comment URL.");
    }
  }

  async function handleSubmit() {
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/submissions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlTrimmed, type, context }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setUserInfoData({ ...userInfoData, points: data.points });
      setSubmissions([data.submission, ...submissions]);

      setUrl("");
      setType("post");
      setContext("");
      onOpenChange(false);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg gap-0 p-0 overflow-hidden">
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

        <div className="px-5 py-4 space-y-4">
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
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                className={cn(
                  "pl-8 h-9 text-sm placeholder:text-stone-400 border-stone-200 rounded-xl focus-visible:border-primary/50 focus-visible:ring-primary/20",
                  urlError &&
                    "border-red-300 focus-visible:border-red-400 focus-visible:ring-red-100",
                )}
              />
            </div>
            {urlError ? (
              <p className="text-[11px] text-red-500 flex items-center gap-1">
                <IconAlertCircle className="w-3 h-3 shrink-0" />
                {urlError}
              </p>
            ) : (
              <p className="text-[11px] text-stone-400">
                Paste the full URL to your Reddit post or comment.
              </p>
            )}
          </div>

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

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
              <IconAlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

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
                    (from {userPoints} pts)
                  </span>
                </div>
              </>
            ) : (
              <>
                <IconAlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <div className="flex-1 text-xs text-red-700">
                  <span className="font-semibold">Not enough points.</span> You
                  need {SUBMIT_COST} pts but only have{" "}
                  <span className="font-bold">{userPoints} pts</span>. Engage
                  with others to earn more.
                </div>
              </>
            )}
          </div>
        </div>

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
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isSubmitting ? (
              <IconLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <IconCoin className="w-4 h-4" />
            )}
            {isSubmitting ? "Submitting…" : `Submit · ${SUBMIT_COST} pts`}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
