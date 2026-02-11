import { cn } from "@/lib/utils";
import { IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Letters, numbers, underscores and hyphens only",
    ),
});

export type UsernameForm = z.infer<typeof usernameSchema>;

export function UsernameStep({
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
