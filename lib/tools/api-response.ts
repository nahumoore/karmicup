import { toToolError } from "@/lib/tools/reddit-tools";
import { NextResponse } from "next/server";

/**
 * Responses for the public free tools API (app/api/tools/*). These routes
 * don't need a session: they only read public Reddit data and store nothing.
 */

/** Short cache: results change slowly and repeated lookups shouldn't hit Reddit. */
const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
};

export function toolJson<T>(data: T) {
  return NextResponse.json(data, { headers: CACHE_HEADERS });
}

export function toolErrorJson(error: unknown) {
  const { status, message } = toToolError(error);
  if (status >= 500) console.error("[tools] Reddit request failed:", error);
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}
