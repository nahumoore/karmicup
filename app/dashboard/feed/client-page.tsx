"use client";

import { FeedCard } from "@/components/dashboard/feed/feed-card";
import {
  HelpDialog,
  type DialogState,
  type Interaction,
} from "@/components/dashboard/feed/help-dialog";
import { useFeedSubmissions, type FeedSubmission } from "@/hooks/use-feed-submissions";
import { useUserInfo } from "@/hooks/use-user-info";
import { IconBrandReddit } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface CommunityFeedClientPageProps {
  submissions: FeedSubmission[];
  interactions: Record<string, Interaction>;
}

export default function CommunityFeedClientPage({
  submissions,
  interactions,
}: CommunityFeedClientPageProps) {
  const { setFeedSubmissions, feedSubmissions } = useFeedSubmissions();
  const { setUserInfoData, data: userInfo } = useUserInfo();
  const [interacted, setInteracted] = useState<Record<string, Interaction>>(interactions);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    setFeedSubmissions(submissions);
  }, [submissions, setFeedSubmissions]);

  const activePost = feedSubmissions.find((p) => p.id === dialog?.postId);
  const visibleSubmissions = feedSubmissions.filter((p) => interacted[p.id] !== "both");

  const handleVerify = async () => {
    if (!dialog) return;
    setVerifying(true);
    setVerifyError(null);
    try {
      const res = await fetch("/api/submissions/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: dialog.postId,
          interaction: dialog.type,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setVerifyError(data.error ?? "Verification failed. Please try again.");
        return;
      }
      setUserInfoData({ ...userInfo, points: data.points });
      setInteracted((prev) => ({ ...prev, [dialog.postId]: data.interaction as Interaction }));
      setDialog(null);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Community Feed
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Help other members and earn points you can spend on your own posts.
        </p>
      </header>

      {visibleSubmissions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mb-3">
            <IconBrandReddit className="w-6 h-6 text-stone-400" />
          </div>
          <p className="text-sm font-semibold text-stone-600">
            No posts to help with right now
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Check back later — new submissions from other members will appear
            here.
          </p>
        </div>
      )}

      <section className="space-y-3">
        {visibleSubmissions.map((post, i) => (
          <FeedCard
            key={post.id}
            post={post}
            index={i}
            existingInteraction={interacted[post.id]}
            onHelp={(id) => {
              const existing = interacted[id];
              const defaultType: Interaction = existing === "comment" ? "upvote" : "comment";
              setDialog({ postId: id, type: defaultType });
            }}
          />
        ))}
      </section>

      <HelpDialog
        dialog={dialog}
        post={activePost}
        verifying={verifying}
        error={verifyError}
        existingInteraction={dialog ? interacted[dialog.postId] : undefined}
        onVerify={handleVerify}
        onClose={() => { setDialog(null); setVerifyError(null); }}
        onTypeChange={(type) => { if (dialog) { setDialog({ ...dialog, type }); setVerifyError(null); } }}
      />
    </div>
  );
}
