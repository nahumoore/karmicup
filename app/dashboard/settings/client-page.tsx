"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { IconUser, IconShield, IconCheck, IconAlertCircle, IconBrandReddit } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRedditAccount } from "@/hooks/use-reddit-account";
import { useUserInfo } from "@/hooks/use-user-info";
import { formatDistanceToNow } from "date-fns";

const tabs = [
  { id: "profile", label: "Profile", icon: IconUser },
  { id: "account", label: "Account", icon: IconShield },
] as const;

type TabId = (typeof tabs)[number]["id"];

const redditUsernameSchema = z.object({
  redditUsername: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username must be 20 characters or less")
    .regex(/^[A-Za-z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
});

type RedditUsernameForm = z.infer<typeof redditUsernameSchema>;

interface SettingsClientPageProps {
  email: string;
  createdAt: string;
  currentUsername: string;
}

export default function SettingsClientPage({
  email,
  createdAt,
  currentUsername,
}: SettingsClientPageProps) {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { setRedditAccountData, data: redditAccount } = useRedditAccount();
  const { data: userInfo } = useUserInfo();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<RedditUsernameForm>({
    resolver: zodResolver(redditUsernameSchema),
    defaultValues: { redditUsername: currentUsername },
  });

  const onSubmit = async (values: RedditUsernameForm) => {
    setStatus("idle");
    setErrorMessage("");

    const res = await fetch("/api/settings/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ redditUsername: values.redditUsername }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    setRedditAccountData({
      ...redditAccount,
      username: data.username,
    });
    setStatus("success");
  };

  const memberSince = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="p-6 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Settings</h1>
        <p className="text-sm text-stone-500 mt-1">Manage your Karmicup account preferences.</p>
      </header>

      {/* Tab navigation */}
      <nav className="flex gap-1 mb-8 border-b border-stone-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300"
              }`}
            >
              <Icon className="w-4 h-4" stroke={2} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === "profile" && (
          <motion.section
            key="profile"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <IconBrandReddit className="w-5 h-5 text-orange-500" stroke={1.5} />
                  <h2 className="text-sm font-semibold text-stone-800">Reddit Account</h2>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="redditUsername" className="text-sm font-medium text-stone-700">
                    Reddit username
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm select-none">
                      u/
                    </span>
                    <Input
                      id="redditUsername"
                      {...register("redditUsername")}
                      placeholder="your_username"
                      className="pl-7"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                  </div>
                  {errors.redditUsername && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <IconAlertCircle className="w-3.5 h-3.5" />
                      {errors.redditUsername.message}
                    </p>
                  )}
                  <p className="text-xs text-stone-400">
                    This is the account that receives engagement from the community.
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700"
                  >
                    <IconCheck className="w-4 h-4 shrink-0" stroke={2.5} />
                    Reddit username updated successfully.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700"
                  >
                    <IconAlertCircle className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="px-5 rounded-xl font-semibold"
                >
                  {isSubmitting ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </form>
          </motion.section>
        )}

        {activeTab === "account" && (
          <motion.section
            key="account"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-4">
              <h2 className="text-sm font-semibold text-stone-800 pb-3 border-b border-stone-100">
                Account details
              </h2>

              <dl className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-stone-50">
                  <dt className="text-sm text-stone-500">Email</dt>
                  <dd className="text-sm font-medium text-stone-800">{email}</dd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-50">
                  <dt className="text-sm text-stone-500">Member since</dt>
                  <dd className="text-sm font-medium text-stone-800 capitalize">{memberSince}</dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="text-sm text-stone-500">Points balance</dt>
                  <dd className="text-sm font-semibold text-primary">{userInfo.points} pts</dd>
                </div>
              </dl>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
