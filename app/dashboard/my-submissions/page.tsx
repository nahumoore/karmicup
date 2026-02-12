import type { Metadata } from "next";
import { PAGE_SEO } from "@/consts/seo-metadata";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: PAGE_SEO.mySubmissions.title,
  description: PAGE_SEO.mySubmissions.description,
  openGraph: {
    title: PAGE_SEO.mySubmissions.title,
    description: PAGE_SEO.mySubmissions.description,
  },
  robots: { index: false, follow: false },
};
import MySubmissionsClientPage from "./client-page";
import type { Submission } from "@/hooks/use-submissions";

export default async function MySubmissionsPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: submissions } = await supabaseAdmin
    .from("user_submissions")
    .select(
      "id, user_id, reddit_account_id, type, subreddit, title, reddit_url, context, upvotes_received, comments_received, status, created_at",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <MySubmissionsClientPage submissions={(submissions ?? []) as Submission[]} />
  );
}
