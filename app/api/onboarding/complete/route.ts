import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { redditUsername } = await request.json();

  if (!redditUsername) {
    return NextResponse.json(
      { error: "Reddit username is required" },
      { status: 400 },
    );
  }

  const redditRes = await fetch(
    `https://www.reddit.com/user/${redditUsername}/about.json`,
    { headers: { "Content-Type": "application/json" } },
  );

  if (!redditRes.ok) {
    return NextResponse.json(
      { error: "Reddit user not found. Please check your username." },
      { status: 404 },
    );
  }

  const redditData = await redditRes.json();
  const redditUserId: string = redditData.data?.id;

  if (!redditUserId) {
    return NextResponse.json(
      { error: "Could not verify Reddit account." },
      { status: 422 },
    );
  }

  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseAdmin.from("reddit_accounts").insert({
    user_id: user.id,
    username: redditUsername,
    reddit_user_id: redditUserId,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to save Reddit account. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
};
