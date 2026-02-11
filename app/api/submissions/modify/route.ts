import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const modifySchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["active", "completed"]).optional(),
});

export const PATCH = async (request: NextRequest) => {
  const body = await request.json();
  const parsed = modifySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { id, ...updates } = parsed.data;

  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("user_submissions")
    .select("id, user_id")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  if (existing.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: submission, error: updateError } = await supabaseAdmin
    .from("user_submissions")
    .update(updates)
    .eq("id", id)
    .select(
      "id, user_id, reddit_account_id, type, subreddit, title, reddit_url, context, upvotes_received, comments_received, status, created_at",
    )
    .single();

  if (updateError || !submission) {
    return NextResponse.json(
      { error: "Failed to update submission. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ submission });
};
