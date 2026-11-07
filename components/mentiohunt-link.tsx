import { MENTIOHUNT_LINK_REL, mentiohuntUrl } from "@/lib/mentiohunt";
import type { ComponentProps } from "react";

type MentiohuntLinkProps = Omit<
  ComponentProps<"a">,
  "href" | "rel" | "target"
> & {
  /** MentioHunt path, e.g. "/", "/pricing", "/features/backlink-outreach". */
  path?: string;
  /** Where the link lives on Karmicup. Sent as `utm_campaign`. */
  placement: string;
  /** Optional link variant. Sent as `utm_content`. */
  content?: string;
};

/**
 * Dofollow, UTM-tagged link to MentioHunt. Always use this component (or
 * `mentiohuntUrl()` + `MENTIOHUNT_LINK_REL`) instead of a raw MentioHunt URL.
 */
export function MentiohuntLink({
  path = "/",
  placement,
  content,
  ...props
}: MentiohuntLinkProps) {
  return (
    <a
      href={mentiohuntUrl(path, { placement, content })}
      target="_blank"
      rel={MENTIOHUNT_LINK_REL}
      {...props}
    />
  );
}
