import { FOUNDER } from "@/consts/seo-metadata";
import Link from "next/link";

/** "About the author" box at the end of every article (E-E-A-T signal). */
export function AuthorBox() {
  return (
    <aside
      aria-label="About the author"
      className="mt-14 flex gap-4 rounded-xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(15,15,15,0.04)] sm:p-6"
    >
      <span
        aria-hidden
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint font-heading text-lg font-bold text-primary"
      >
        {FOUNDER.name.charAt(0)}
      </span>
      <div className="flex flex-col gap-1">
        <p className="m-0 text-[13px] font-medium text-muted-foreground">
          Written by
        </p>
        <p className="m-0 text-[16px] font-semibold text-ink">
          <Link href="/about" className="hover:text-primary">
            {FOUNDER.name}, founder of Karmicup
          </Link>
        </p>
        <p className="m-0 text-[15px] leading-6 text-ink-secondary">
          Nicolas builds startups and has used Reddit for years to validate
          ideas and find early users. He built Karmicup so new posts get seen
          by real people.
        </p>
      </div>
    </aside>
  );
}
