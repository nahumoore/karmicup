/**
 * Helpers for linking to MentioHunt (https://mentiohunt.com).
 *
 * Every link to MentioHunt MUST be built with `mentiohuntUrl()` so the traffic
 * is attributed to Karmicup in analytics, and rendered with `MENTIOHUNT_LINK_REL`
 * (dofollow, no `noreferrer`). See "MentioHunt links" in AGENTS.md.
 */

export const MENTIOHUNT_BASE_URL = "https://mentiohunt.com";

/**
 * `rel` for MentioHunt links: dofollow (no `nofollow`/`sponsored`/`ugc`) and
 * without `noreferrer`, so the Referer header reaches MentioHunt.
 */
export const MENTIOHUNT_LINK_REL = "noopener";

type MentiohuntUrlOptions = {
  /** Where the link lives on Karmicup, e.g. "footer", "about", "dashboard_sidebar". Sent as `utm_campaign`. */
  placement: string;
  /** Optional variant of the link (e.g. "logo", "text"). Sent as `utm_content`. */
  content?: string;
};

/**
 * Builds a MentioHunt URL tagged with UTM params:
 * `utm_source=karmicup&utm_medium=referral&utm_campaign=<placement>[&utm_content=<content>]`.
 */
export function mentiohuntUrl(
  path: string = "/",
  { placement, content }: MentiohuntUrlOptions,
): string {
  const url = new URL(path, MENTIOHUNT_BASE_URL);
  url.searchParams.set("utm_source", "karmicup");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", placement);
  if (content) url.searchParams.set("utm_content", content);
  return url.toString();
}
