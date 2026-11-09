import { FOUNDER } from "@/consts/seo-metadata";
import { cn } from "@/lib/utils";
import Image from "next/image";

/** Round photo of the founder, used wherever Nicolas is mentioned. */
export function FounderAvatar({
  size,
  className,
  priority,
}: {
  /** Rendered size in px (width = height). */
  size: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={FOUNDER.image}
      alt={`${FOUNDER.name}, founder of Karmicup`}
      width={size}
      height={size}
      priority={priority}
      className={cn(
        "shrink-0 rounded-full border border-border object-cover",
        className,
      )}
    />
  );
}
