"use client";

import type { Submission } from "@/hooks/use-submissions";
import { cn } from "@/lib/utils";
import {
  IconArrowBigUp,
  IconBrandReddit,
  IconCoin,
  IconMessage,
} from "@tabler/icons-react";
import { motion } from "motion/react";

const STATS_CONFIG = [
  {
    label: "Submissions",
    icon: IconBrandReddit,
    color: "text-stone-600",
    bg: "bg-stone-50",
    border: "border-stone-200",
    getValue: (submissions: Submission[]) => submissions.length,
  },
  {
    label: "Upvotes received",
    icon: IconArrowBigUp,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    getValue: (submissions: Submission[]) =>
      submissions.reduce((s, p) => s + p.upvotes_received, 0),
  },
  {
    label: "Comments received",
    icon: IconMessage,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    getValue: (submissions: Submission[]) =>
      submissions.reduce((s, p) => s + p.comments_received, 0),
  },
  {
    label: "Points distributed",
    icon: IconCoin,
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
    highlight: true,
    getValue: (submissions: Submission[]) =>
      submissions.reduce(
        (s, p) => s + p.upvotes_received * 1 + p.comments_received * 5,
        0,
      ),
  },
];

interface StatsGridProps {
  submissions: Submission[];
}

export function StatsGrid({ submissions }: StatsGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-4 gap-3 mb-6"
    >
      {STATS_CONFIG.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
          className={cn("p-4 rounded-2xl border", stat.bg, stat.border)}
        >
          <stat.icon className={cn("w-4.5 h-4.5 mb-2.5", stat.color)} />
          <div className={cn("text-2xl font-bold tracking-tight", stat.color)}>
            {stat.getValue(submissions)}
          </div>
          <div className="text-xs text-stone-500 font-medium mt-0.5 leading-snug">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
