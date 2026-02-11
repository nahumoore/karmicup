"use client";

import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const redditAccountSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  reddit_user_id: z.string(),
});

export type RedditAccount = z.infer<typeof redditAccountSchema>;

interface RedditAccountStore {
  data: RedditAccount;
  isLoadingRedditAccount: boolean;
  activeRedditAccount: RedditAccount;
  setRedditAccountData: (data: RedditAccount) => void;
  setActiveRedditAccount: (account: RedditAccount) => void;
  setIsLoadingRedditAccount: (isLoading: boolean) => void;
}

const placeholder: RedditAccount = { id: "", username: "", reddit_user_id: "" };

export const useRedditAccount = create<RedditAccountStore>()(
  persist(
    (set) => ({
      data: placeholder,
      isLoadingRedditAccount: true,
      activeRedditAccount: placeholder,
      setRedditAccountData: (data) => {
        const parsed = redditAccountSchema.parse(data);
        set({ data: parsed, activeRedditAccount: parsed });
      },
      setActiveRedditAccount: (account) =>
        set({ activeRedditAccount: account }),
      setIsLoadingRedditAccount: (isLoading) =>
        set({ isLoadingRedditAccount: isLoading }),
    }),
    { name: "reddit-account" },
  ),
);
