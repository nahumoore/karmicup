import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CommunityFeedClientPage from "./client-page";
import type { FeedSubmission } from "@/hooks/use-feed-submissions";
import type { Interaction } from "@/components/dashboard/feed/help-dialog";

export default async function CommunityFeedPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: submissions }, { data: interactionRows }] = await Promise.all([
    supabaseAdmin
      .from("user_submissions")
      .select(
        "id, user_id, reddit_account_id, type, subreddit, title, reddit_url, context, status, created_at, reddit_accounts(username)",
      )
      .eq("status", "active")
      .neq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("user_submission_interactions")
      .select("submission_id, interaction")
      .eq("user_id", user.id),
  ]);

  const interactions: Record<string, Interaction> = {};
  for (const row of interactionRows ?? []) {
    interactions[row.submission_id] = row.interaction as Interaction;
  }

  const filteredSubmissions = (submissions ?? []).filter(
    (s) => interactions[s.id] !== "both",
  );

  return (
    <CommunityFeedClientPage
      submissions={filteredSubmissions as unknown as FeedSubmission[]}
      interactions={interactions}
    />
  );
}
