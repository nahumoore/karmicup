import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Styles for every element rendered from MDX (blog articles in content/blog).
 * Required by @next/mdx in the App Router. Custom article components
 * (callouts, CTAs, diagrams) live in components/blog and are imported by each
 * .mdx file.
 */

function MdxLink({ href = "", className, ...props }: ComponentProps<"a">) {
  const classes = cn(
    "font-medium text-ink underline decoration-brand/60 decoration-2 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary",
    className,
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={classes} {...props} />;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      {...props}
    />
  );
}

const components: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-14 mb-4 scroll-mt-24 font-heading text-[26px] leading-[1.2] font-bold tracking-[-0.025em] text-balance text-ink sm:text-[30px]",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-9 mb-3 scroll-mt-24 font-heading text-[19px] leading-[1.3] font-bold tracking-[-0.015em] text-ink sm:text-[21px]",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "my-4 text-[17px] leading-[29px] text-pretty text-ink-secondary",
        className,
      )}
      {...props}
    />
  ),
  a: MdxLink,
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-ink", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-4 flex flex-col gap-2 pl-5 text-[17px] leading-[29px] text-ink-secondary marker:text-brand list-disc",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-4 flex flex-col gap-2 pl-5 text-[17px] leading-[29px] text-ink-secondary marker:font-semibold marker:text-ink list-decimal",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 border-l-2 border-brand pl-5 italic text-ink-secondary",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-12 border-hairline", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-7 overflow-x-auto rounded-xl border border-border shadow-[0_1px_2px_rgba(15,15,15,0.04)]">
      <table
        className={cn("w-full border-collapse text-left text-[15px]", className)}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn("bg-surface", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-border px-4 py-3 align-bottom text-[13px] font-semibold text-ink",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-b border-hairline px-4 py-3 align-top leading-6 text-ink-secondary [tr:last-child_&]:border-b-0",
        className,
      )}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
