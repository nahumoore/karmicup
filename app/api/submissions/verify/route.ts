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
  /^https?:\/\/(?:www\.|old\.)?reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)(?:\/[^/]*\/([a-z0-9]+))?/i;

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
  score?: number;
  replies?: RedditCommentListing | "";
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
  const commentId = match[3] ?? null;

  // Fetch fresh data: for comment submissions fetch the specific comment + replies,
  // for post submissions fetch the post + top-level comments.
  // Also fetch the helper's recent comment history in parallel — Reddit's post
  // comment listing can lag by seconds, while the user profile endpoint reflects
  // new comments almost immediately.
  let freshScore: number;
  let freshCommentCount: number;
  let postComments: Array<{ kind: string; data: RedditCommentData }> = [];
  let userRecentComments: Array<{ kind: string; data: RedditCommentData }> = [];

  try {
    const userCommentsPromise = redditFetch<RedditCommentListing>(
      `/user/${redditAccount.username}/comments.json?sort=new&limit=25`,
    ).then((r) => r.data.children).catch(() => []);

    if (commentId) {
      const [listing] = await Promise.all([
        redditFetch<[RedditListing, RedditCommentListing]>(
          `/r/${subreddit}/comments/${postId}/_/${commentId}.json?sort=new&limit=50`,
        ),
        userCommentsPromise.then((c) => { userRecentComments = c; }),
      ]);

      const commentNode = listing[1]?.data?.children[0];
      if (!commentNode || commentNode.kind !== "t1")
        throw new Error("Could not read comment data");

      freshScore = commentNode.data.score ?? 0;
      freshCommentCount = 0;

      const replies = commentNode.data.replies;
      if (replies && typeof replies !== "string") {
        postComments = replies.data.children;
      }
    } else {
      const [listing] = await Promise.all([
        redditFetch<[RedditListing, RedditCommentListing]>(
          `/r/${subreddit}/comments/${postId}.json?sort=new&limit=50`,
        ),
        userCommentsPromise.then((c) => { userRecentComments = c; }),
      ]);

      const postData = listing[0]?.data?.children[0]?.data;
      if (!postData) throw new Error("Could not read post data");
      freshScore = postData.ups;
      freshCommentCount = postData.num_comments;
      postComments = listing[1]?.data?.children ?? [];
    }
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
  console.log("[verify] upvote check — submissionId:", submissionId, "| commentId:", commentId ?? "none (post)");
  console.log("[verify] upvote check — storedMetrics.upvotes:", storedMetrics.upvotes, "| freshScore:", freshScore, "| needed:", storedMetrics.upvotes + 1);
  console.log("[verify] upvote check — canCheckUpvote:", canCheckUpvote, "| condition (freshScore >= stored+1):", freshScore >= storedMetrics.upvotes + 1);

  const upvoteDetected =
    canCheckUpvote && freshScore >= storedMetrics.upvotes + 1;

  // Check post listing first, then fall back to user's recent comment history
  // (which reflects new comments faster than the post's comment thread).
  const commentInPostListing = postComments.some(
    (c) =>
      c.kind === "t1" &&
      c.data.author.toLowerCase() === redditAccount.username.toLowerCase(),
  );
  const commentInUserHistory = userRecentComments.some(
    (c) =>
      c.kind === "t1" &&
      c.data.link_id === `t3_${postId}` &&
      c.data.author.toLowerCase() === redditAccount.username.toLowerCase(),
  );
  const commentDetected = canCheckComment && (commentInPostListing || commentInUserHistory);

  console.log("[verify] upvoteDetected:", upvoteDetected, "| commentDetected:", commentDetected);
  console.log("[verify] postComments authors:", postComments.filter(c => c.kind === "t1").map(c => c.data.author));
  console.log("[verify] userRecentComments on this post:", userRecentComments.filter(c => c.kind === "t1" && c.data.link_id === `t3_${postId}`).map(c => c.data.author));

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

  // --- Upsert interaction record ---
  // Must happen before the metrics update so that if this fails we return
  // an error before moving the baseline, allowing the user to retry.
  const finalInteraction: Interaction = existingInteractionRecord
    ? "both"
    : detectedInteraction;

  if (existingInteractionRecord) {
    const { error: interactionError } = await supabaseAdmin
      .from("user_submission_interactions")
      .update({ interaction: "both" })
      .eq("id", existingInteractionRecord.id);

    if (interactionError) {
      return NextResponse.json(
        { error: "Failed to record interaction. Please try again." },
        { status: 500 },
      );
    }
  } else {
    const { error: interactionError } = await supabaseAdmin
      .from("user_submission_interactions")
      .insert({
        user_id: user.id,
        submission_id: submissionId,
        interaction: detectedInteraction,
      });

    if (interactionError) {
      return NextResponse.json(
        { error: "Failed to record interaction. Please try again." },
        { status: 500 },
      );
    }
  }

  // --- Update submission metrics ---
  // Increment upvotes baseline by 1 rather than setting to freshScore, so
  // concurrent verifications from other users don't push the baseline past
  // a user's already-upvoted-but-not-yet-verified score.
  const submissionUpdate: Record<string, unknown> = {
    reddit_metrics: {
      upvotes: storedMetrics.upvotes + (upvoteDetected ? 1 : 0),
      comments: freshCommentCount,
    },
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

  return NextResponse.json({
    success: true,
    points: userInfo.points + pointsToAdd,
    pointsEarned: pointsToAdd,
    interaction: finalInteraction,
    detected: detectedInteraction,
  });
};
