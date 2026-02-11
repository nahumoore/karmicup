import {
  IconArrowBigUp,
  IconArrowRight,
  IconBrandReddit,
  IconRocket,
} from "@tabler/icons-react";
import { motion } from "motion/react";

const HOW_CARDS = [
  {
    Icon: IconBrandReddit,
    step: "01",
    title: "Submit your content",
    body: "Paste a link to your Reddit post or comment. It enters the community feed for others to discover and support.",
    accent: "oklch(0.646 0.222 41.116)",
  },
  {
    Icon: IconArrowBigUp,
    step: "02",
    title: "Engage with others",
    body: "Browse posts in the feed and take action. Upvote earns 1 pt, a comment earns 5 pts, doing both gets you 6 pts.",
    accent: "oklch(0.45 0.18 162)",
  },
  {
    Icon: IconRocket,
    step: "03",
    title: "Boost your own posts",
    body: "Spend the points you've earned to promote your submissions. Organic growth, powered by the community.",
    accent: "oklch(0.5 0.2 282)",
  },
];

export function HowItWorksStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="mb-2 text-center text-4xl font-extrabold text-gray-900"
      >
        Here's how it works
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10 text-center text-sm text-gray-400"
      >
        Three steps. Entirely free. Genuinely effective.
      </motion.p>

      <div className="mb-10 flex w-full flex-col gap-3">
        {HOW_CARDS.map(({ Icon, step, title, body, accent }, i) => (
          <motion.article
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5"
          >
            <div
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${accent}18`, color: accent }}
            >
              <Icon size={19} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[13px] font-semibold text-gray-800">
                {title}
              </p>
              <p className="text-xs leading-relaxed text-gray-500">{body}</p>
            </div>
            <span
              className="mt-0.5 shrink-0 font-mono text-xl font-bold opacity-20"
              style={{ color: accent }}
            >
              {step}
            </span>
          </motion.article>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.48 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="group flex cursor-pointer items-center gap-2.5 rounded-xl px-9 py-3.5 text-[13px] font-semibold text-white shadow-sm"
        style={{ background: "oklch(0.646 0.222 41.116)" }}
      >
        Got it, let's go
        <IconArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </motion.button>
    </motion.section>
  );
}
