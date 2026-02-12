"use client";

import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
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
    <main>
      <Navbar />

      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Page header */}
          <header className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
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
              className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
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
              className="text-lg text-muted-foreground leading-relaxed"
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
              className="bg-muted/40 border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <IconBulb size={16} stroke={2} />
                </span>
                <h2 className="text-base font-semibold text-foreground">
                  How it started
                </h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
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
                  <span className="text-foreground font-medium">
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
              className="bg-muted/40 border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <IconBrandReddit size={16} stroke={2} />
                </span>
                <h2 className="text-base font-semibold text-foreground">
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
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-[7px]" />
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {item.label} —{" "}
                        </span>
                        <span className="text-sm text-muted-foreground">
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
              className="bg-muted/40 border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <IconUser size={16} stroke={2} />
                </span>
                <h2 className="text-base font-semibold text-foreground">
                  About me
                </h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
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
              className="bg-muted/40 border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <IconBrandX size={16} stroke={2} />
                </span>
                <h2 className="text-base font-semibold text-foreground">
                  Say hi
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Got a question, a suggestion, or just want to say hi? Hit me up
                on X. I don&apos;t post too often but I&apos;m active — I read
                everything.
              </p>
              <a
                href="https://x.com/nicolasmore_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
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
