import type { Metadata } from "next";
import { PAGE_SEO } from "@/consts/seo-metadata";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SettingsClientPage from "./client-page";

export const metadata: Metadata = {
  title: PAGE_SEO.settings.title,
  description: PAGE_SEO.settings.description,
  openGraph: {
    title: PAGE_SEO.settings.title,
    description: PAGE_SEO.settings.description,
  },
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: userInfo }, { data: redditAccount }] = await Promise.all([
    supabaseAdmin
      .from("user_info")
      .select("email, created_at")
      .eq("id", user.id)
      .single(),
    supabaseAdmin
      .from("reddit_accounts")
      .select("username")
      .eq("user_id", user.id)
      .single(),
  ]);

  return (
    <SettingsClientPage
      email={userInfo?.email ?? user.email ?? ""}
      createdAt={userInfo?.created_at ?? user.created_at}
      currentUsername={redditAccount?.username ?? ""}
    />
  );
}
