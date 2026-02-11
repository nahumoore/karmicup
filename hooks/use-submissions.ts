"use client";

import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const submissionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  reddit_account_id: z.string().uuid().nullable(),
  type: z.enum(["post", "comment"]),
  subreddit: z.string(),
  title: z.string(),
  reddit_url: z.string(),
  context: z.string().nullable(),
  upvotes_received: z.number(),
  comments_received: z.number(),
  status: z.enum(["active", "completed"]),
  created_at: z.string(),
});

export type Submission = z.infer<typeof submissionSchema>;

interface SubmissionsStore {
  submissions: Submission[];
  isLoadingSubmissions: boolean;
  setSubmissions: (submissions: Submission[]) => void;
  setIsLoadingSubmissions: (isLoading: boolean) => void;
  updateSubmission: (id: string, updates: Partial<Submission>) => void;
}

export const useSubmissions = create<SubmissionsStore>()(
  persist(
    (set) => ({
      submissions: [],
      isLoadingSubmissions: true,
      setSubmissions: (submissions) =>
        set({ submissions: z.array(submissionSchema).parse(submissions), isLoadingSubmissions: false }),
      setIsLoadingSubmissions: (isLoading) =>
        set({ isLoadingSubmissions: isLoading }),
      updateSubmission: (id, updates) =>
        set((state) => ({
          submissions: state.submissions.map((s) =>
            s.id === id ? { ...s, ...updates } : s,
          ),
        })),
    }),
    { name: "submissions" },
  ),
);
