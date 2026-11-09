import { BrandLogo } from "@/components/landing/brand-logo";
import { MentiohuntLink } from "@/components/mentiohunt-link";
import { Button } from "@/components/ui/button";
import { PLATFORM_METRICS } from "@/consts/platform-metrics";
import { IconArrowRight, IconLink } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** In-article CTA to sign up for Karmicup (blog articles and free tools). */
export function KarmicupCta({
  title = "Get real Redditors to see your next post",
  children,
  className,
}: {
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "my-9 flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04)] sm:p-7",
        className,
      )}
    >
      <BrandLogo size="sm" />
      <p className="m-0 font-heading text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
        {title}
      </p>
      <div className="text-[16px] leading-[27px] text-ink-secondary [&_p]:my-0 [&_p]:text-[16px] [&_p]:leading-[27px]">
        {children ?? (
          <p>
            Join {PLATFORM_METRICS.members} Redditors who discover, read and
            discuss each other&apos;s posts. Free, no bots.
          </p>
        )}
      </div>
      <div>
        <Button asChild className="group h-11 gap-2 px-5 text-[15px]">
          <Link href="/register">
            Join Karmicup for free
            <IconArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </Button>
      </div>
    </aside>
  );
}

/**
 * In-article CTA to MentioHunt. `placement` is where it lives ("blog",
 * "tools"...) and `content` identifies the page in `utm_content` (snake_case
 * slug), see "MentioHunt links" in AGENTS.md.
 */
export function MentiohuntCta({
  content,
  placement = "blog",
  title = "Want backlinks, not just Reddit traffic?",
  children,
  className,
}: {
  content: string;
  placement?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "my-9 flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:p-7",
        className,
      )}
    >
      <p className="m-0 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
        <IconLink size={15} className="text-primary" />
        From the team behind Karmicup
      </p>
      <p className="m-0 font-heading text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
        {title}
      </p>
      <div className="text-[16px] leading-[27px] text-ink-secondary [&_p]:my-0 [&_p]:text-[16px] [&_p]:leading-[27px]">
        {children ?? (
          <p>
            MentioHunt finds websites where your pages are a good fit, writes a
            personalized email and runs the backlink outreach for you.
          </p>
        )}
      </div>
      <div>
        <Button asChild variant="outline" className="group h-11 gap-2 bg-white px-5 text-[15px]">
          <MentiohuntLink placement={placement} content={content}>
            See your free backlink preview
            <IconArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </MentiohuntLink>
        </Button>
      </div>
    </aside>
  );
}
