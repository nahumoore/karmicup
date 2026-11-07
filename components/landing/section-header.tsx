import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <header className={cn("flex max-w-3xl flex-col gap-3.5", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="font-heading text-[32px] leading-[1.1] font-bold tracking-[-0.025em] text-balance text-ink sm:text-[40px] lg:text-[48px]"
      >
        {title}
      </h2>
      {description && (
        <p className="text-[17px] leading-[27px] text-pretty text-ink-secondary">
          {description}
        </p>
      )}
    </header>
  );
}
