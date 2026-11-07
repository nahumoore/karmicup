import { cn } from "@/lib/utils";
import { IconArrowBigUpFilled } from "@tabler/icons-react";
import Link from "next/link";

export function BrandLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href="/"
      aria-label="Karmicup home"
      className={cn("flex shrink-0 items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className={cn(
          "flex items-center justify-center rounded-lg bg-primary text-primary-foreground",
          size === "md" ? "size-8" : "size-7",
        )}
      >
        <IconArrowBigUpFilled size={size === "md" ? 17 : 15} />
      </span>
      <span
        className={cn(
          "font-heading font-semibold tracking-[-0.01em] text-ink",
          size === "md" ? "text-xl" : "text-lg",
        )}
      >
        Karmic<span className="text-brand">up</span>
      </span>
    </Link>
  );
}
