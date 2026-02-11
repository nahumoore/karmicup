import { SUBMIT_COST } from "@/lib/consts";
import { RedditApiError, redditFetch } from "@/lib/helpers/reddit";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Matches post URLs:    /r/{sub}/comments/{id}/
// Matches comment URLs: /r/{sub}/comments/{id}/{title}/{comment_id}/
const REDDIT_URL_REGEX =
  /^https?:\/\/(?:www\.|old\.)?reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)(?:\/[^/]*(?:\/([a-z0-9]+))?(?:\/)?)?$/i;

type RedditPostData = {
  title: string;
  subreddit: string;
};

type RedditListing = {
  data: {
    children: Array<{ data: RedditPostData }>;
  };
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { url, type, context } = body as {
    url?: string;
    type?: string;
    context?: string;
  };

  if (!url || !type) {
    return NextResponse.json(
      { error: "URL and type are required" },
      { status: 400 },
    );
  }

  if (type !== "post" && type !== "comment") {
    return NextResponse.json(
      { error: "Type must be 'post' or 'comment'" },
      { status: 400 },
    );
  }

  const match = url.match(REDDIT_URL_REGEX);
  if (!match) {
    return NextResponse.json(
      { error: "Invalid Reddit URL. Must link to a post or comment on reddit.com." },
      { status: 400 },
    );
  }

  const subreddit = match[1];
  const postId = match[2];

  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userInfo, error: userInfoError } = await supabaseAdmin
    .from("user_info")
    .select("points")
    .eq("id", user.id)
    .single();

  if (userInfoError || !userInfo) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (userInfo.points < SUBMIT_COST) {
    return NextResponse.json(
      { error: `Not enough points. You need ${SUBMIT_COST} pts.` },
      { status: 400 },
    );
  }

  // Verify the post exists on Reddit and grab its title
  let title: string;
  try {
    const listing = await redditFetch<[RedditListing, unknown]>(
      `/r/${subreddit}/comments/${postId}.json?limit=1`,
    );
    const postData = listing[0]?.data?.children[0]?.data;
    if (!postData?.title) throw new Error("Could not read post data");
    title = postData.title;
  } catch (err) {
    if (err instanceof RedditApiError && err.status === 404) {
      return NextResponse.json(
        { error: "Reddit post not found. Please check the URL." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Could not reach Reddit. Please try again." },
      { status: 502 },
    );
  }

  const { data: redditAccount } = await supabaseAdmin
    .from("reddit_accounts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const newPoints = userInfo.points - SUBMIT_COST;

  const { error: deductError } = await supabaseAdmin
    .from("user_info")
    .update({ points: newPoints })
    .eq("id", user.id);

  if (deductError) {
    return NextResponse.json(
      { error: "Failed to deduct points. Please try again." },
      { status: 500 },
    );
  }

  const { data: submission, error: submissionError } = await supabaseAdmin
    .from("user_submissions")
    .insert({
      user_id: user.id,
      reddit_account_id: redditAccount?.id ?? null,
      type,
      subreddit,
      title,
      reddit_url: url,
      context: context?.trim() || null,
    })
    .select(
      "id, user_id, reddit_account_id, type, subreddit, title, reddit_url, context, upvotes_received, comments_received, status, created_at",
    )
    .single();

  if (submissionError || !submission) {
    // Best-effort rollback of point deduction
    await supabaseAdmin
      .from("user_info")
      .update({ points: userInfo.points })
      .eq("id", user.id);

    return NextResponse.json(
      { error: "Failed to create submission. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ submission, points: newPoints });
};
