import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CommunityFeedClientPage from "./client-page";
import type { FeedSubmission } from "@/hooks/use-feed-submissions";

export default async function CommunityFeedPage() {
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
      "id, user_id, reddit_account_id, type, subreddit, title, reddit_url, context, status, created_at, reddit_accounts(username)",
    )
    .eq("status", "active")
    .neq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <CommunityFeedClientPage
      submissions={(submissions ?? []) as unknown as FeedSubmission[]}
    />
  );
}
