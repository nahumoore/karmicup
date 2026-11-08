import type { ReactNode } from "react";

/**
 * Table of contents box at the top of an article. Children are a markdown list
 * of anchor links (`- [Section](#heading-id)`); heading ids come from rehype-slug.
 */
export function InThisGuide({ children }: { children: ReactNode }) {
  return (
    <nav
      aria-label="In this guide"
      className="my-8 rounded-xl border border-border bg-surface px-5 py-4 sm:px-6 sm:py-5 [&_a]:font-medium [&_a]:text-ink [&_a]:no-underline [&_a:hover]:text-primary [&_li]:pl-0.5 [&_ol]:my-0 [&_ol]:gap-1.5 [&_ol]:text-[15px] [&_ol]:leading-6"
    >
      <p className="mt-0 mb-3 text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        In this guide
      </p>
      {children}
    </nav>
  );
}
