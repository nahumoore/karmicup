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
  score: number;
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
  const { submissionId, interaction } = body as {
    submissionId?: string;
    interaction?: string;
  };

  if (!submissionId || !interaction) {
    return NextResponse.json(
      { error: "submissionId and interaction are required" },
      { status: 400 },
    );
  }

  if (!["upvote", "comment", "both"].includes(interaction)) {
    return NextResponse.json(
      { error: "interaction must be 'upvote', 'comment', or 'both'" },
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
  const interactionType = interaction as Interaction;

  // Fetch fresh Reddit post data (needed for upvote check and metrics refresh)
  let freshScore: number;
  let freshCommentCount: number;

  try {
    const listing = await redditFetch<[RedditListing, unknown]>(
      `/r/${subreddit}/comments/${postId}.json?limit=1`,
    );
    const postData = listing[0]?.data?.children[0]?.data;
    if (!postData) throw new Error("Could not read post data");
    freshScore = postData.score;
    freshCommentCount = postData.num_comments;
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

  const storedMetrics = (
    submission.reddit_metrics as { upvotes: number; comments: number } | null
  ) ?? { upvotes: 0, comments: 0 };

  // --- Verify upvote ---
  let upvoteVerified = false;
  if (interactionType === "upvote" || interactionType === "both") {
    upvoteVerified = freshScore >= storedMetrics.upvotes + 1;
  }

  // --- Verify comment ---
  let commentVerified = false;
  if (interactionType === "comment" || interactionType === "both") {
    try {
      const commentListing = await redditFetch<RedditCommentListing>(
        `/user/${redditAccount.username}/comments.json?limit=25`,
      );
      const comments = commentListing.data?.children ?? [];
      commentVerified = comments.some(
        (c) =>
          c.data.link_id === `t3_${postId}` &&
          c.data.author.toLowerCase() ===
            redditAccount.username.toLowerCase(),
      );
    } catch {
      return NextResponse.json(
        { error: "Could not verify comment. Please try again." },
        { status: 502 },
      );
    }
  }

  // --- Check results ---
  if (interactionType === "upvote" && !upvoteVerified) {
    return NextResponse.json(
      {
        error:
          "Upvote not detected. Please upvote the post on Reddit and try again.",
      },
      { status: 400 },
    );
  }

  if (interactionType === "comment" && !commentVerified) {
    return NextResponse.json(
      {
        error:
          "Comment not detected. Please leave a comment on the post and try again.",
      },
      { status: 400 },
    );
  }

  if (interactionType === "both" && (!upvoteVerified || !commentVerified)) {
    const missing =
      !upvoteVerified && !commentVerified
        ? "upvote and comment"
        : !upvoteVerified
          ? "upvote"
          : "comment";
    return NextResponse.json(
      {
        error: `Could not verify your ${missing}. Both actions are required to earn 6 points.`,
      },
      { status: 400 },
    );
  }

  // --- Check for duplicate interaction ---
  const { data: existingInteractionRecord } = await supabaseAdmin
    .from("user_submission_interactions")
    .select("id, interaction")
    .eq("user_id", user.id)
    .eq("submission_id", submissionId)
    .maybeSingle();

  if (existingInteractionRecord) {
    const existing = existingInteractionRecord.interaction as Interaction;
    const alreadyUpvoted = existing === "upvote" || existing === "both";
    const alreadyCommented = existing === "comment" || existing === "both";
    const wantsUpvote = interactionType === "upvote" || interactionType === "both";
    const wantsComment = interactionType === "comment" || interactionType === "both";

    if ((wantsUpvote && alreadyUpvoted) || (wantsComment && alreadyCommented)) {
      return NextResponse.json(
        { error: "You have already performed this action on this submission." },
        { status: 400 },
      );
    }
  }

  // --- All verified — update DB ---
  const pointsToAdd = POINTS[interactionType];

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

  const submissionUpdate: Record<string, unknown> = {
    reddit_metrics: { upvotes: freshScore, comments: freshCommentCount },
  };

  if (interactionType === "upvote" || interactionType === "both") {
    submissionUpdate.upvotes_received =
      (submission.upvotes_received as number) + 1;
  }
  if (interactionType === "comment" || interactionType === "both") {
    submissionUpdate.comments_received =
      (submission.comments_received as number) + 1;
  }

  await supabaseAdmin
    .from("user_submissions")
    .update(submissionUpdate)
    .eq("id", submissionId);

  // Upsert interaction record
  const newInteraction: Interaction = existingInteractionRecord ? "both" : interactionType;

  if (existingInteractionRecord) {
    await supabaseAdmin
      .from("user_submission_interactions")
      .update({ interaction: "both" })
      .eq("id", existingInteractionRecord.id);
  } else {
    await supabaseAdmin
      .from("user_submission_interactions")
      .insert({ user_id: user.id, submission_id: submissionId, interaction: interactionType });
  }

  return NextResponse.json({
    success: true,
    points: userInfo.points + pointsToAdd,
    interaction: newInteraction,
  });
};
