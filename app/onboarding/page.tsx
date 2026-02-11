"use client";

import { PLATFORM_METRICS } from "@/consts/platform-metrics";
import { supabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowBigUp,
  IconArrowRight,
  IconBrandReddit,
  IconLoader2,
  IconLogout,
  IconRocket,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TOTAL_STEPS = 3;

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Letters, numbers, underscores and hyphens only",
    ),
});
type UsernameForm = z.infer<typeof usernameSchema>;

// ─── Background ──────────────────────────────────────────────────────────────

function BackgroundEffects() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-120 w-120 rounded-full opacity-[0.07] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.646 0.222 41.116), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-95 w-95 rounded-full opacity-[0.05] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 55), transparent 65%)",
        }}
      />
    </>
  );
}

// ─── Step 1: Welcome ──────────────────────────────────────────────────────────

function WelcomeStep({ onNext }: { onNext: () => void }) {
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

// ─── Step 2: How It Works ─────────────────────────────────────────────────────

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

function HowItWorksStep({ onNext }: { onNext: () => void }) {
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

// ─── Step 3: Reddit Username ──────────────────────────────────────────────────

function UsernameStep({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
}: {
  register: ReturnType<typeof useForm<UsernameForm>>["register"];
  handleSubmit: ReturnType<typeof useForm<UsernameForm>>["handleSubmit"];
  errors: ReturnType<typeof useForm<UsernameForm>>["formState"]["errors"];
  isSubmitting: boolean;
  onSubmit: (data: UsernameForm) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="mb-7 flex h-16 w-16 items-center justify-center rounded-4xl text-3xl"
        style={{
          background: "oklch(0.646 0.222 41.116 / 0.08)",
          border: "1px solid oklch(0.646 0.222 41.116 / 0.15)",
        }}
      >
        🎯
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-3 text-center text-4xl font-extrabold text-gray-900"
      >
        One last thing
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="mb-10 max-w-70 text-center text-sm leading-relaxed text-gray-500"
      >
        What's your Reddit username? It will help us to check if you met the
        requirements to win points.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm"
      >
        <div className="mb-3">
          <div
            className={cn(
              "flex items-center overflow-hidden rounded-xl border bg-white transition-all duration-200",
              "border-gray-200",
              "focus-within:border-[oklch(0.646_0.222_41.116/0.6)] focus-within:ring-4 focus-within:ring-[oklch(0.646_0.222_41.116/0.08)]",
              errors.username && "border-red-400",
            )}
          >
            <span
              className="select-none border-r border-gray-200 px-4 py-3.5 font-mono text-sm font-semibold"
              style={{ color: "oklch(0.646 0.222 41.116)" }}
            >
              u/
            </span>
            <input
              {...register("username")}
              type="text"
              placeholder="your_username"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="flex-1 bg-transparent px-4 py-3.5 font-mono text-sm text-gray-900 placeholder:text-gray-300 outline-none"
            />
          </div>

          <AnimatePresence>
            {errors.username && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                className="mt-2 text-xs text-red-500"
              >
                {errors.username.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p className="mb-8 text-center text-[11px] text-gray-400">
          Make sure it&apos;s correct, we won&apos;t be able to verify your
          points otherwise.
        </p>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.04 } : undefined}
          whileTap={!isSubmitting ? { scale: 0.96 } : undefined}
          className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-9 py-3.5 text-[13px] font-semibold text-white shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "oklch(0.646 0.222 41.116)" }}
        >
          {isSubmitting ? (
            <IconLoader2 size={16} className="animate-spin" />
          ) : (
            <>
              Enter Karmicup
              <IconArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const supabase = supabaseClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UsernameForm>({ resolver: zodResolver(usernameSchema) });

  const onSubmit = async (data: UsernameForm) => {
    const res = await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ redditUsername: data.username }),
    });

    if (!res.ok) {
      const body = await res.json();
      setError("username", {
        type: "server",
        message: body.error ?? "Something went wrong. Please try again.",
      });
      return;
    }

    router.push("/dashboard");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-white px-5 py-16">
      <BackgroundEffects />

      {/* Logo */}
      <header className="absolute left-7 top-7 z-10 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground group-hover:scale-105 transition-transform duration-200">
            <IconArrowBigUp size={17} stroke={2.5} />
          </span>
          <span className="text-lg font-bold text-foreground tracking-tight">
            karmic<span className="text-primary">up</span>
          </span>
        </Link>
      </header>

      {/* Progress dots */}
      <nav
        aria-label="Onboarding steps"
        className="absolute top-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
      >
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className="h-1.25 rounded-full transition-all duration-500 ease-out"
            style={{
              width: i === step ? 28 : i < step ? 20 : 14,
              background:
                i < step
                  ? "oklch(0.646 0.222 41.116 / 0.5)"
                  : i === step
                    ? "oklch(0.646 0.222 41.116)"
                    : "#e5e7eb",
            }}
          />
        ))}
      </nav>

      {/* Step content */}
      <div className="relative z-10 w-full max-w-110">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <WelcomeStep key="welcome" onNext={() => setStep(1)} />
          )}
          {step === 1 && <HowItWorksStep key="how" onNext={() => setStep(2)} />}
          {step === 2 && (
            <UsernameStep
              key="username"
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="absolute bottom-7 left-7 z-10 flex cursor-pointer items-center gap-1.5 text-[13px] text-gray-400 transition-colors hover:text-gray-600"
      >
        <IconLogout size={15} />
        Sign out
      </button>
    </main>
  );
}
