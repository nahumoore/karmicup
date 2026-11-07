import { Eyebrow } from "@/components/landing/section-header";
import { Button } from "@/components/ui/button";
import {
  IconArrowBigUpFilled,
  IconArrowRight,
  IconTrendingUp,
} from "@tabler/icons-react";
import Link from "next/link";

// Illustrative weekly karma bars (percent of max height).
const weeklyKarma = [
  { day: "Mon", value: 22 },
  { day: "Tue", value: 35 },
  { day: "Wed", value: 30 },
  { day: "Thu", value: 52 },
  { day: "Fri", value: 61 },
  { day: "Sat", value: 78 },
  { day: "Sun", value: 100 },
];

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1120px] items-center gap-x-16 gap-y-10 lg:grid-cols-[1fr_minmax(0,32rem)]">
        <div className="flex max-w-xl flex-col gap-3.5">
          <Eyebrow>Get started</Eyebrow>
          <h2
            id="final-cta-title"
            className="font-heading text-[34px] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-ink sm:text-[44px] lg:text-[52px]"
          >
            Start growing your{" "}
            <span className="text-primary">Reddit presence.</span>
          </h2>
          <p className="text-[17px] leading-[27px] text-pretty text-ink-secondary">
            Join thousands of Reddit creators getting authentic engagement every
            day. It takes less than a minute to get started.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-[18px] gap-y-2.5">
            <Button asChild className="group h-12 gap-2 px-5 text-base">
              <Link href="/register">
                Get upvotes &amp; comments
                <IconArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Link
              href="/#how-it-works"
              className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink"
            >
              See how it works
              <IconArrowRight size={16} />
            </Link>
          </div>
        </div>

        <figure
          aria-label="Example of karma growth on Karmicup"
          className="m-0 w-full rounded-xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04),0_16px_40px_rgba(15,15,15,0.08)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-primary">
                <IconArrowBigUpFilled size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Karma on your posts
                </p>
                <p className="mt-0.5 flex items-center gap-1 font-heading text-3xl font-bold text-primary">
                  +184
                  <IconTrendingUp size={22} />
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Last 7 days
            </span>
          </div>

          <div
            aria-hidden
            className="mt-7 flex h-36 items-end gap-2 border-b border-hairline"
          >
            {weeklyKarma.map(({ day, value }, i) => (
              <div
                key={day}
                className={
                  i === weeklyKarma.length - 1
                    ? "flex-1 rounded-t-md bg-primary"
                    : "flex-1 rounded-t-md bg-brand-soft"
                }
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
          <figcaption className="mt-2 flex gap-2 text-[11px] font-medium text-muted-foreground">
            {weeklyKarma.map(({ day }) => (
              <span key={day} className="flex-1 text-center">
                {day}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
