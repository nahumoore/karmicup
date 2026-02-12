import { redditFetch, RedditApiError } from "@/lib/helpers/reddit";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type RedditUserAbout = {
  data?: { id: string };
};

export const PATCH = async (request: NextRequest) => {
  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { redditUsername } = body;

  if (!redditUsername || typeof redditUsername !== "string") {
    return NextResponse.json(
      { error: "Reddit username is required" },
      { status: 400 },
    );
  }

  const trimmed = redditUsername.trim().replace(/^u\//, "");

  if (!trimmed) {
    return NextResponse.json(
      { error: "Reddit username is required" },
      { status: 400 },
    );
  }

  let redditData: RedditUserAbout;

  try {
    redditData = await redditFetch<RedditUserAbout>(
      `/user/${trimmed}/about.json`,
    );
  } catch (err) {
    if (err instanceof RedditApiError && err.status === 404) {
      return NextResponse.json(
        { error: "Reddit user not found. Please check your username." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Could not reach Reddit. Please try again." },
      { status: 502 },
    );
  }

  const redditUserId: string | undefined = redditData.data?.id;

  if (!redditUserId) {
    return NextResponse.json(
      { error: "Could not verify Reddit account." },
      { status: 422 },
    );
  }

  const { data: existing } = await supabaseAdmin
    .from("reddit_accounts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existing) {
    const { error } = await supabaseAdmin
      .from("reddit_accounts")
      .update({ username: trimmed, reddit_user_id: redditUserId })
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update Reddit account. Please try again." },
        { status: 500 },
      );
    }
  } else {
    const { error } = await supabaseAdmin.from("reddit_accounts").insert({
      user_id: user.id,
      username: trimmed,
      reddit_user_id: redditUserId,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to save Reddit account. Please try again." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ success: true, username: trimmed });
};
