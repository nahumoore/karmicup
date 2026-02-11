"use client";

import { BackgroundEffects } from "@/components/onboarding/background-effects";
import { HowItWorksStep } from "@/components/onboarding/how-it-works-step";
import {
  UsernameForm,
  UsernameStep,
  usernameSchema,
} from "@/components/onboarding/username-step";
import { WelcomeStep } from "@/components/onboarding/welcome-step";
import { supabaseClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowBigUp, IconLogout } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const TOTAL_STEPS = 3;

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
