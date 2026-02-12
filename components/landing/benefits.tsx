"use client";

import {
  IconArrowsExchange,
  IconGift,
  IconHeartHandshake,
  IconUserCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: IconGift,
    title: "Always free",
    description:
      "No subscriptions, no credit cards, no catch. Karmicup runs entirely on a points system — you earn by giving.",
  },
  {
    icon: IconUserCheck,
    title: "Real Reddit accounts",
    description:
      "Every upvote and comment you receive comes from a genuine Reddit user in the community — never a bot.",
  },
  {
    icon: IconHeartHandshake,
    title: "Genuine engagement",
    description:
      "Members engage because they choose to, not because they're paid. That means real opinions and authentic interactions.",
  },
  {
    icon: IconArrowsExchange,
    title: "Earn as you give",
    description:
      "Every time you engage with someone else's post you build up points to spend on your own — a self-sustaining loop.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="bg-background py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.15em] mb-4">
            Why Karmicup
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
            Built on real reciprocity
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            Everything here is designed around one idea: authentic people
            helping each other grow.
          </p>
        </motion.header>

        <dl className="grid sm:grid-cols-2 gap-6">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-5 bg-muted/40 rounded-2xl border border-border p-7 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300"
            >
              <span
                aria-hidden
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary mt-0.5"
              >
                <Icon size={22} stroke={1.75} />
              </span>

              <div>
                <dt className="text-base font-bold text-foreground mb-1.5">
                  {title}
                </dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </dd>
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
