import { redditFetch, RedditApiError } from "@/lib/helpers/reddit";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type RedditUserAbout = {
  data?: { id: string };
};

export const POST = async (request: NextRequest) => {
  const { redditUsername } = await request.json();

  if (!redditUsername) {
    return NextResponse.json(
      { error: "Reddit username is required" },
      { status: 400 },
    );
  }

  let redditData: RedditUserAbout;

  try {
    redditData = await redditFetch<RedditUserAbout>(
      `/user/${redditUsername}/about.json`,
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
