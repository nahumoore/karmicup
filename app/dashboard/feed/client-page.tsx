"use client";

import { FeedCard } from "@/components/dashboard/feed/feed-card";
import {
  HelpDialog,
  type DialogState,
  type Interaction,
} from "@/components/dashboard/feed/help-dialog";
import { useFeedSubmissions, type FeedSubmission } from "@/hooks/use-feed-submissions";
import { IconBrandReddit } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface CommunityFeedClientPageProps {
  submissions: FeedSubmission[];
}

export default function CommunityFeedClientPage({
  submissions,
}: CommunityFeedClientPageProps) {
  const { setFeedSubmissions, feedSubmissions } = useFeedSubmissions();
  const [interacted, setInteracted] = useState<Record<string, Interaction>>({});
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    setFeedSubmissions(submissions);
  }, [submissions, setFeedSubmissions]);

  const activePost = feedSubmissions.find((p) => p.id === dialog?.postId);

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
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Community Feed
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Help other members and earn points you can spend on your own posts.
        </p>
      </header>

      {feedSubmissions.length === 0 && (
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
        {feedSubmissions.map((post, i) => (
          <FeedCard
            key={post.id}
            post={post}
            index={i}
            done={interacted[post.id]}
            onHelp={(id) => setDialog({ postId: id, type: "comment" })}
          />
        ))}
      </section>

      <HelpDialog
        dialog={dialog}
        post={activePost}
        verifying={verifying}
        onVerify={handleVerify}
        onClose={() => setDialog(null)}
        onTypeChange={(type) => dialog && setDialog({ ...dialog, type })}
      />
    </div>
  );
}
