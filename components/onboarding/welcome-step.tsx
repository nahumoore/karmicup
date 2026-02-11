import { PLATFORM_METRICS } from "@/consts/platform-metrics";
import { IconArrowBigUp, IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4"
      >
        <span className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary text-primary-foreground group-hover:scale-105 transition-transform duration-200">
          <IconArrowBigUp className="size-12" stroke={2.5} />
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900"
      >
        Welcome to{" "}
        <span style={{ color: "oklch(0.646 0.222 41.116)" }}>Karmicup</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 max-w-[320px] text-[15px] leading-relaxed text-gray-500"
      >
        You're joining thousands of Reddit creators who grow their reach
        authentically — no bots, no tricks, just real community energy.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.27, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 flex items-center gap-10"
      >
        {[
          { val: PLATFORM_METRICS.members, label: "members" },
          { val: PLATFORM_METRICS.postsBoosted, label: "posts boosted" },
          { val: PLATFORM_METRICS.alwaysFree, label: "free forever" },
        ].map(({ val, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-[22px] font-bold text-gray-900">{val}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="group flex cursor-pointer items-center gap-2.5 rounded-xl px-9 py-3.5 text-[13px] font-semibold text-white shadow-sm"
        style={{ background: "oklch(0.646 0.222 41.116)" }}
      >
        Get started
        <IconArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </motion.button>
    </motion.section>
  );
}
