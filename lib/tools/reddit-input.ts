/**
 * Normalizes what people paste into the free tools: "u/name", "/u/name",
 * "r/sub", or a full Reddit URL. Shared by the tool forms (client) and the
 * API routes (server), so both validate the same way.
 */

/** Reddit usernames: 3–20 characters, letters, numbers, "_" and "-". */
export const USERNAME_PATTERN = /^[A-Za-z0-9_-]{3,20}$/;

/** Subreddit names: 2–21 characters, letters, numbers and "_". */
export const SUBREDDIT_PATTERN = /^[A-Za-z0-9_]{2,21}$/;

const USER_URL = /reddit\.com\/(?:u|user)\/([^/?#\s]+)/i;
const SUBREDDIT_URL = /reddit\.com\/r\/([^/?#\s]+)/i;

/** Returns the bare username, or null when the input can't be a Reddit username. */
export function parseUsername(raw: string): string | null {
  const input = raw.trim();
  const fromUrl = input.match(USER_URL)?.[1];
  const name = (fromUrl ?? input).replace(/^\/?u(?:ser)?\//i, "").replace(/^@/, "");
  return USERNAME_PATTERN.test(name) ? name : null;
}

/** Returns the bare subreddit name, or null when the input can't be a subreddit. */
export function parseSubreddit(raw: string): string | null {
  const input = raw.trim();
  const fromUrl = input.match(SUBREDDIT_URL)?.[1];
  const name = (fromUrl ?? input).replace(/^\/?r\//i, "");
  return SUBREDDIT_PATTERN.test(name) ? name : null;
}
