import { RedditApiError, redditFetch } from "@/lib/helpers/reddit";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type Interaction = "upvote" | "comment" | "both";

const POINTS: Record<Interaction, number> = {
  upvote: 1,
  comment: 5,
  both: 6,
};

const REDDIT_URL_REGEX =
  /^https?:\/\/(?:www\.|old\.)?reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)/i;

type RedditPostData = {
  ups: number;
  num_comments: number;
};

type RedditListing = {
  data: {
    children: Array<{ data: RedditPostData }>;
  };
};

type RedditCommentData = {
  link_id: string; // e.g. "t3_abc123"
  author: string;
};

type RedditCommentListing = {
  data: {
    children: Array<{ kind: string; data: RedditCommentData }>;
  };
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { submissionId } = body as { submissionId?: string };

  if (!submissionId) {
    return NextResponse.json(
      { error: "submissionId is required" },
      { status: 400 },
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

  // Get helper's linked Reddit account
  const { data: redditAccount } = await supabaseAdmin
    .from("reddit_accounts")
    .select("username")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!redditAccount?.username) {
    return NextResponse.json(
      {
        error:
          "No Reddit account linked. Please connect your Reddit account first.",
      },
      { status: 400 },
    );
  }

  // Get the submission being helped
  const { data: submission } = await supabaseAdmin
    .from("user_submissions")
    .select(
      "id, user_id, reddit_url, reddit_metrics, subreddit, upvotes_received, comments_received",
    )
    .eq("id", submissionId)
    .single();

  if (!submission) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 },
    );
  }

  if (submission.user_id === user.id) {
    return NextResponse.json(
      { error: "You cannot verify your own submission." },
      { status: 400 },
    );
  }

  const match = (submission.reddit_url as string).match(REDDIT_URL_REGEX);
  if (!match) {
    return NextResponse.json(
      { error: "Invalid submission URL" },
      { status: 500 },
    );
  }

  const subreddit = match[1];
  const postId = match[2];

  // Fetch fresh post data + newest comments in a single request
  let freshScore: number;
  let freshCommentCount: number;
  let postComments: Array<{ kind: string; data: RedditCommentData }> = [];

  try {
    const listing = await redditFetch<[RedditListing, RedditCommentListing]>(
      `/r/${subreddit}/comments/${postId}.json?sort=new&limit=50`,
    );

    const postData = listing[0]?.data?.children[0]?.data;
    if (!postData) throw new Error("Could not read post data");
    freshScore = postData.ups;
    freshCommentCount = postData.num_comments;
    postComments = listing[1]?.data?.children ?? [];
  } catch (err) {
    if (err instanceof RedditApiError && err.status === 404) {
      return NextResponse.json(
        { error: "Reddit post not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Could not reach Reddit. Please try again." },
      { status: 502 },
    );
  }

  const storedMetrics = (submission.reddit_metrics as {
    upvotes: number;
    comments: number;
  } | null) ?? { upvotes: 0, comments: 0 };

  // --- Check existing interaction to know what's still uncredited ---
  const { data: existingInteractionRecord } = await supabaseAdmin
    .from("user_submission_interactions")
    .select("id, interaction")
    .eq("user_id", user.id)
    .eq("submission_id", submissionId)
    .maybeSingle();

  const existingType = existingInteractionRecord?.interaction as Interaction | undefined;

  const canCheckUpvote = existingType !== "upvote" && existingType !== "both";
  const canCheckComment = existingType !== "comment" && existingType !== "both";

  if (!canCheckUpvote && !canCheckComment) {
    return NextResponse.json(
      { error: "You have already performed both actions on this submission." },
      { status: 400 },
    );
  }

  // --- Auto-detect what the user did ---
  const upvoteDetected =
    canCheckUpvote && freshScore >= storedMetrics.upvotes + 1;

  const commentDetected =
    canCheckComment &&
    postComments.some(
      (c) =>
        c.kind === "t1" &&
        c.data.author.toLowerCase() === redditAccount.username.toLowerCase(),
    );

  if (!upvoteDetected && !commentDetected) {
    const hint = !canCheckUpvote
      ? "Leave a comment on the post and try again."
      : !canCheckComment
        ? "Upvote the post and try again."
        : "Upvote and/or comment on the post and try again.";
    return NextResponse.json(
      { error: `No new interaction detected. ${hint}` },
      { status: 400 },
    );
  }

  // --- Determine detected interaction type and points ---
  const detectedInteraction: Interaction =
    upvoteDetected && commentDetected
      ? "both"
      : upvoteDetected
        ? "upvote"
        : "comment";

  const pointsToAdd = POINTS[detectedInteraction];

  // --- Award points ---
  const { data: userInfo } = await supabaseAdmin
    .from("user_info")
    .select("points")
    .eq("id", user.id)
    .single();

  if (!userInfo) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { error: pointsError } = await supabaseAdmin
    .from("user_info")
    .update({ points: userInfo.points + pointsToAdd })
    .eq("id", user.id);

  if (pointsError) {
    return NextResponse.json(
      { error: "Failed to award points. Please try again." },
      { status: 500 },
    );
  }

  // --- Update submission metrics ---
  const submissionUpdate: Record<string, unknown> = {
    reddit_metrics: { upvotes: freshScore, comments: freshCommentCount },
  };

  if (upvoteDetected) {
    submissionUpdate.upvotes_received =
      (submission.upvotes_received as number) + 1;
  }
  if (commentDetected) {
    submissionUpdate.comments_received =
      (submission.comments_received as number) + 1;
  }

  await supabaseAdmin
    .from("user_submissions")
    .update(submissionUpdate)
    .eq("id", submissionId);

  // --- Upsert interaction record ---
  const finalInteraction: Interaction = existingInteractionRecord
    ? "both"
    : detectedInteraction;

  if (existingInteractionRecord) {
    await supabaseAdmin
      .from("user_submission_interactions")
      .update({ interaction: "both" })
      .eq("id", existingInteractionRecord.id);
  } else {
    await supabaseAdmin.from("user_submission_interactions").insert({
      user_id: user.id,
      submission_id: submissionId,
      interaction: detectedInteraction,
    });
  }

  return NextResponse.json({
    success: true,
    points: userInfo.points + pointsToAdd,
    pointsEarned: pointsToAdd,
    interaction: finalInteraction,
    detected: detectedInteraction,
  });
};
