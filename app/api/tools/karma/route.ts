import { badRequest, toolErrorJson, toolJson } from "@/lib/tools/api-response";
import { parseUsername } from "@/lib/tools/reddit-input";
import { checkKarma } from "@/lib/tools/reddit-tools";
import { NextRequest } from "next/server";

/** Public endpoint of the Reddit Karma Checker (/tools/reddit-karma-checker). */
export const GET = async (request: NextRequest) => {
  const username = parseUsername(request.nextUrl.searchParams.get("username") ?? "");
  if (!username) return badRequest("Enter a valid Reddit username.");

  try {
    return toolJson(await checkKarma(username));
  } catch (error) {
    return toolErrorJson(error);
  }
};
