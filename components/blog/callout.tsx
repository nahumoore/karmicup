import { cn } from "@/lib/utils";
import {
  IconAlertTriangle,
  IconBulb,
  IconSparkles,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

const VARIANTS = {
  tip: {
    icon: IconBulb,
    label: "Tip",
    className: "border-border bg-surface",
    iconClassName: "bg-brand-tint text-primary",
  },
  warning: {
    icon: IconAlertTriangle,
    label: "Watch out",
    className: "border-brand-soft bg-brand-tint",
    iconClassName: "bg-white text-primary",
  },
  update: {
    icon: IconSparkles,
    label: "What's new",
    className: "border-border bg-white",
    iconClassName: "bg-brand-tint text-primary",
  },
} as const;

/** Highlighted box inside an article. Children are regular MDX content. */
export function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: keyof typeof VARIANTS;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, label, className, iconClassName } = VARIANTS[variant];

  return (
    <aside
      className={cn(
        "my-7 rounded-xl border p-5 shadow-[0_1px_2px_rgba(15,15,15,0.04)] sm:p-6",
        className,
      )}
    >
      <header className="mb-1 flex items-center gap-2.5">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg",
            iconClassName,
          )}
        >
          <Icon size={15} stroke={2} />
        </span>
        <p className="text-[15px] font-semibold text-ink">{title ?? label}</p>
      </header>
      <div className="[&_p]:my-2 [&_p]:text-[16px] [&_p]:leading-[27px] [&_ul]:my-2 [&_ul]:text-[16px] [&_ol]:my-2 [&_ol]:text-[16px]">
        {children}
      </div>
    </aside>
  );
}
