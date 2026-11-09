import { badRequest, toolErrorJson, toolJson } from "@/lib/tools/api-response";
import { parseSubreddit, parseUsername } from "@/lib/tools/reddit-input";
import { checkSubreddit } from "@/lib/tools/reddit-tools";
import { NextRequest } from "next/server";

/** Public endpoint of the Subreddit Requirements Checker (/tools/subreddit-requirements-checker). */
export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const subreddit = parseSubreddit(searchParams.get("subreddit") ?? "");
  if (!subreddit) return badRequest("Enter a valid subreddit name.");

  const rawUsername = searchParams.get("username")?.trim() ?? "";
  const username = rawUsername ? parseUsername(rawUsername) : null;
  if (rawUsername && !username) return badRequest("Enter a valid Reddit username.");

  try {
    return toolJson(await checkSubreddit(subreddit, username));
  } catch (error) {
    return toolErrorJson(error);
  }
};
