"use client";

import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const feedSubmissionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  reddit_account_id: z.string().uuid().nullable(),
  type: z.enum(["post", "comment"]),
  subreddit: z.string(),
  title: z.string(),
  reddit_url: z.string(),
  context: z.string().nullable(),
  status: z.string(),
  created_at: z.string(),
  reddit_accounts: z.object({ username: z.string() }).nullable(),
});

export type FeedSubmission = z.infer<typeof feedSubmissionSchema>;

interface FeedSubmissionsStore {
  feedSubmissions: FeedSubmission[];
  isLoadingFeedSubmissions: boolean;
  setFeedSubmissions: (submissions: FeedSubmission[]) => void;
  setIsLoadingFeedSubmissions: (isLoading: boolean) => void;
}

export const useFeedSubmissions = create<FeedSubmissionsStore>()(
  persist(
    (set) => ({
      feedSubmissions: [],
      isLoadingFeedSubmissions: true,
      setFeedSubmissions: (submissions) =>
        set({
          feedSubmissions: z.array(feedSubmissionSchema).parse(submissions),
          isLoadingFeedSubmissions: false,
        }),
      setIsLoadingFeedSubmissions: (isLoading) =>
        set({ isLoadingFeedSubmissions: isLoading }),
    }),
    { name: "feed-submissions" },
  ),
);
