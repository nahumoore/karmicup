import { KarmaChecker } from "@/components/tools/widgets/karma-checker";
import { ShadowbanChecker } from "@/components/tools/widgets/shadowban-checker";
import { SubredditChecker } from "@/components/tools/widgets/subreddit-checker";
import type { ComponentType } from "react";
import { Suspense } from "react";

/** Interactive widget of each tool, keyed by the slug in content/tools/registry.ts. */
const WIDGETS: Record<string, ComponentType> = {
  "reddit-karma-checker": KarmaChecker,
  "reddit-shadowban-checker": ShadowbanChecker,
  "subreddit-requirements-checker": SubredditChecker,
};

export function hasToolWidget(slug: string): boolean {
  return slug in WIDGETS;
}

/**
 * Widgets read the URL (?u=, ?r=) with useSearchParams, so they render on the
 * client inside a Suspense boundary while the rest of the page is static.
 */
export function ToolWidget({ slug }: { slug: string }) {
  const Widget = WIDGETS[slug];
  if (!Widget) return null;

  return (
    <Suspense
      fallback={
        <div
          aria-hidden
          className="h-[196px] rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(15,15,15,0.04),0_24px_64px_rgba(15,15,15,0.10)]"
        />
      }
    >
      <Widget />
    </Suspense>
  );
}
