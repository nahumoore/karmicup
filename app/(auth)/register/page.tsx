"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"
import { IconArrowBigUp } from "@tabler/icons-react"
import { PLATFORM_METRICS } from "@/consts/platform-metrics"

const decorativeArrows = [
  { style: { top: "8%", left: "12%" }, size: 80, opacity: 0.07, delay: 0 },
  { style: { top: "18%", right: "8%" }, size: 120, opacity: 0.04, delay: 0.6 },
  { style: { bottom: "20%", left: "6%" }, size: 64, opacity: 0.06, delay: 1.1 },
  { style: { bottom: "28%", right: "14%" }, size: 96, opacity: 0.05, delay: 0.3 },
  { style: { top: "48%", left: "3%" }, size: 48, opacity: 0.05, delay: 0.9 },
  { style: { top: "38%", right: "4%" }, size: 56, opacity: 0.06, delay: 1.4 },
]

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <IconArrowBigUp size={17} stroke={2.5} />
            </span>
            <span className="text-lg font-bold text-foreground tracking-tight">
              karmic<span className="text-primary">up</span>
            </span>
          </Link>
        </div>

        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </motion.div>
      </div>

      <aside className="relative hidden lg:block overflow-hidden bg-zinc-950">
        {/* Orange radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 20%, oklch(0.65 0.2 32 / 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating decorative arrows */}
        {decorativeArrows.map((arrow, i) => (
          <motion.div
            key={i}
            className="absolute text-primary pointer-events-none"
            style={{ ...arrow.style, opacity: arrow.opacity }}
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 4.5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: arrow.delay,
            }}
          >
            <IconArrowBigUp size={arrow.size} stroke={1.5} />
          </motion.div>
        ))}

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            className="flex flex-col items-center gap-8 max-w-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 ring-1 ring-primary/10 ring-offset-4 ring-offset-zinc-950">
              <IconArrowBigUp size={40} stroke={2} className="text-primary" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
                Give karma.<br />Get karma.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Join thousands of Redditors exchanging genuine engagement — no bots, no spam, just real community support.
              </p>
            </div>

            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary tabular-nums">{PLATFORM_METRICS.members}</div>
                <div className="text-xs text-zinc-500 mt-1">Active members</div>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div>
                <div className="text-2xl font-bold text-primary tabular-nums">{PLATFORM_METRICS.postsBoosted}</div>
                <div className="text-xs text-zinc-500 mt-1">Posts boosted</div>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div>
                <div className="text-2xl font-bold text-primary tabular-nums">{PLATFORM_METRICS.alwaysFree}</div>
                <div className="text-xs text-zinc-500 mt-1">Free forever</div>
              </div>
            </div>
          </motion.div>
        </div>
      </aside>
    </div>
  )
}
