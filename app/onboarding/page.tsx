"use client";

import { BrandLogo } from "@/components/landing/brand-logo";
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
import { IconLogout } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";
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
        <BrandLogo />
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
                  ? "color-mix(in oklab, var(--primary) 50%, transparent)"
                  : i === step
                    ? "var(--primary)"
                    : "var(--border)",
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
