"use client";

import { Button } from "@/components/ui/button";
import {
  IconArrowRight,
  IconBolt,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

const trustPoints = [
  { icon: IconShieldCheck, label: "No credit card required" },
  { icon: IconUsers, label: "Real users only — no bots" },
  { icon: IconBolt, label: "Free forever" },
];

export function FinalCTA() {
  return (
    <section className="bg-background py-28 md:py-40 relative overflow-hidden">
      {/* Subtle orange background wash */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 120%, oklch(0.646 0.222 41.116 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.15em] mb-5">
            Get started today
          </p>
          <h2 className="text-5xl md:text-[60px] font-black text-foreground leading-[0.95] tracking-tight mb-6">
            Start growing your
            <br />
            <span className="text-primary">Reddit presence.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of Reddit creators getting authentic engagement every
            day. It takes less than a minute to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center gap-3 max-w-sm mx-auto mb-8"
        >
          <Link
            href="/register"
            className="group hover:scale-105 transition-transform duration-200"
          >
            <Button className="h-12 px-6 font-semibold gap-2 shrink-0 w-full">
              Get Upvotes & Comments
              <span className="inline-flex group-hover:translate-x-1 transition-transform duration-200">
                <IconArrowRight size={15} />
              </span>
            </Button>
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {trustPoints.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <Icon size={14} className="text-primary" stroke={2} />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
