"use client";

import { BrandLogo } from "@/components/landing/brand-logo";
import { Eyebrow } from "@/components/landing/section-header";
import { PLATFORM_METRICS } from "@/consts/platform-metrics";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const stats = [
  { value: PLATFORM_METRICS.members, label: "Active members" },
  { value: PLATFORM_METRICS.postsBoosted, label: "Posts boosted" },
  { value: PLATFORM_METRICS.alwaysFree, label: "Free forever" },
];

const perks = [
  "Real Redditors only, never bots",
  "Earn points by upvoting and commenting",
  "Spend points to boost your own posts",
];

/** Two-column layout shared by the login and register pages. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-svh bg-white text-ink lg:grid-cols-2">
      <section className="flex flex-col gap-4 p-6 md:p-10">
        <header className="flex justify-center md:justify-start">
          <BrandLogo />
        </header>

        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="w-full max-w-xs">{children}</div>
        </motion.div>
      </section>

      <aside className="relative hidden overflow-hidden border-l border-hairline bg-surface lg:block">
        {/* Dot grid + soft orange glow (MentioHunt hero background) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#D9D9D6_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_100%)] bg-size-[20px_20px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(255,90,31,0.08),transparent_70%)]"
        />

        <motion.div
          className="relative flex h-full flex-col justify-center px-12 xl:px-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex max-w-md flex-col gap-4">
            <Eyebrow>Free Reddit engagement community</Eyebrow>
            <h2 className="font-heading text-[40px] leading-[1.08] font-bold tracking-[-0.025em] text-ink">
              Give karma. <span className="text-primary">Get karma.</span>
            </h2>
            <p className="text-[17px] leading-[27px] text-ink-secondary">
              Join thousands of Redditors exchanging genuine engagement. No
              bots, no spam, just real community support.
            </p>
            <ul className="mt-2 flex flex-col gap-2.5">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2.5 text-[15px] text-ink-secondary"
                >
                  <IconCircleCheckFilled size={16} className="text-primary" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 overflow-hidden rounded-xl border border-border bg-white shadow-[0_1px_2px_rgba(15,15,15,0.04)]">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={
                  i > 0
                    ? "flex flex-col border-l border-hairline p-4"
                    : "flex flex-col p-4"
                }
              >
                <dt className="order-2 text-xs text-muted-foreground">
                  {label}
                </dt>
                <dd className="font-heading text-2xl font-bold text-ink tabular-nums">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </aside>
    </main>
  );
}
