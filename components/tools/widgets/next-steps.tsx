import { IconArrowRight, type Icon } from "@tabler/icons-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** "Next step" links at the end of a result: they chain the tools together. */
export function NextSteps({ children }: { children: ReactNode }) {
  return (
    <nav aria-label="Next steps" className="flex flex-col gap-2">
      <p className="m-0 text-[13px] font-semibold text-ink">Next step</p>
      <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">{children}</ul>
    </nav>
  );
}

export function NextStep({
  href,
  icon: Icon,
  title,
}: {
  href: string;
  icon: Icon;
  title: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-xl border border-border bg-white px-3.5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-primary/40"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-primary">
          <Icon size={16} />
        </span>
        <span className="min-w-0 flex-1">{title}</span>
        <IconArrowRight
          size={15}
          className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </Link>
    </li>
  );
}
