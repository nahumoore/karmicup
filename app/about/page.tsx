"use client";

import { FounderAvatar } from "@/components/founder-avatar";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { MentiohuntLink } from "@/components/mentiohunt-link";
import {
  IconBrandReddit,
  IconBrandX,
  IconBulb,
  IconCoin,
  IconMoodSmile,
  IconRocket,
  IconUser,
} from "@tabler/icons-react";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Navbar />

      <article className="pt-[124px] pb-24 sm:pt-[140px]">
        <div className="max-w-3xl mx-auto px-6">
          {/* Page header */}
          <header className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground [&_svg]:text-primary"
            >
              <IconUser size={13} stroke={2.5} />
              The founder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-4 font-heading text-[36px] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-ink sm:text-[48px]"
            >
              Built by a Reddit marketer,
              <br className="hidden sm:block" /> for Reddit marketers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-lg leading-7 text-pretty text-ink-secondary"
            >
              Karmicup exists because I kept running into the same problem — and
              nobody had built a solution yet. So I did.
            </motion.p>
          </header>

          {/* Sections */}
          <section className="space-y-5">
            {/* Origin story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-tint text-primary shrink-0">
                  <IconBulb size={16} stroke={2} />
                </span>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                  How it started
                </h2>
              </div>
              <div className="space-y-3 text-sm leading-6 text-ink-secondary">
                <p>
                  I&apos;ve been using Reddit as a marketing channel for years —
                  to validate ideas, get early users, and generate genuine buzz
                  around my projects. It works really well, but there&apos;s a
                  catch: when you post something brand new, it lands with zero
                  upvotes and gets buried before anyone even sees it.
                </p>
                <p>
                  The only options were to pay for upvotes (sketchy and
                  expensive in the long term) or have a bunch of accounts
                  yourself (even sketchier). I kept thinking —{" "}
                  <span className="font-medium text-ink">
                    there has to be a better way
                  </span>
                  . A community where people help each other get that first bit
                  of traction, genuinely.
                </p>
                <p>
                  I asked on BHW (BlackHatWorld) if something like this already
                  existed. No response. So I built it myself.
                </p>
              </div>
            </motion.div>

            {/* What Karmicup is */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-tint text-primary shrink-0">
                  <IconBrandReddit size={16} stroke={2} />
                </span>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                  What Karmicup is
                </h2>
              </div>
              <ul className="space-y-4">
                {[
                  {
                    icon: IconCoin,
                    label: "A points-based exchange",
                    description:
                      "You earn points by engaging with other people's Reddit posts — upvoting, commenting. Then you spend those points to get engagement on yours.",
                  },
                  {
                    icon: IconMoodSmile,
                    label: "Real people, no bots",
                    description:
                      "Every upvote and comment comes from an actual member of the community. No automation, no fake accounts. Just Redditors helping each other out.",
                  },
                  {
                    icon: IconRocket,
                    label: "Free, forever",
                    description:
                      "The platform is completely free. The points system keeps things balanced naturally — you give before you take.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.label}
                      className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5"
                    >
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-[7px]" />
                      <div>
                        <span className="text-sm font-semibold text-ink">
                          {item.label} —{" "}
                        </span>
                        <span className="text-sm leading-6 text-ink-secondary">
                          {item.description}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* About Nico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04)]"
            >
              <div className="flex items-center gap-4 mb-5">
                <FounderAvatar size={64} className="size-16" />
                <div>
                  <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                    About me
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Nicolas, founder of Karmicup
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm leading-6 text-ink-secondary">
                <p>
                  I&apos;m Nico. I build startups and use Reddit as one of my
                  primary channels to validate ideas and find early users. Over
                  time I got pretty good at it — understanding what works, what
                  doesn&apos;t, which subreddits to target, how to post without
                  getting banned.
                </p>
                <p>
                  Karmicup is a side project that scratches my own itch. I use
                  it myself every time I launch something. If it&apos;s useful
                  to you too, that&apos;s the whole point.
                </p>
                <p>
                  Today Karmicup is built and maintained by the team behind{" "}
                  <MentiohuntLink
                    placement="about"
                    content="about_me"
                    className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-primary"
                  >
                    MentioHunt
                  </MentiohuntLink>
                  , an automated link building tool that finds sites where your
                  pages belong and runs the backlink outreach for you. Reddit
                  gets you early traction; backlinks keep you growing on Google
                  and AI search.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.21,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-tint text-primary shrink-0">
                  <IconBrandX size={16} stroke={2} />
                </span>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                  Say hi
                </h2>
              </div>
              <p className="text-sm leading-6 text-ink-secondary mb-4">
                Got a question, a suggestion, or just want to say hi? Hit me up
                on X. I don&apos;t post too often but I&apos;m active — I read
                everything.
              </p>
              <a
                href="https://x.com/nicolasmore_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
              >
                <IconBrandX size={15} stroke={2} />
                @nicolasmore_
              </a>
            </motion.div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
