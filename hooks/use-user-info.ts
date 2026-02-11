"use client";

import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userInfoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  points: z.number(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

interface UserInfoStore {
  data: UserInfo;
  isLoadingUserInfo: boolean;
  setUserInfoData: (data: UserInfo) => void;
  setIsLoadingUserInfo: (isLoading: boolean) => void;
}

const placeholder: UserInfo = {
  id: "",
  name: "",
  email: "placeholder@placeholder.com",
  points: 0,
};

export const useUserInfo = create<UserInfoStore>()(
  persist(
    (set) => ({
      data: placeholder,
      isLoadingUserInfo: true,
      setUserInfoData: (data) => set({ data: userInfoSchema.parse(data) }),
      setIsLoadingUserInfo: (isLoading) =>
        set({ isLoadingUserInfo: isLoading }),
    }),
    { name: "user-info" },
  ),
);
