"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconAlertTriangle,
  IconArrowBigUpFilled,
  IconArrowRight,
  IconLoader2,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

type QueryState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

/** Calls a free tools API route and keeps its state. Aborts stale requests. */
export function useToolQuery<T>(endpoint: string) {
  const [state, setState] = useState<QueryState<T>>({ status: "idle" });
  const controller = useRef<AbortController | null>(null);

  const run = useCallback(
    async (params: Record<string, string>) => {
      controller.current?.abort();
      const current = new AbortController();
      controller.current = current;
      setState({ status: "loading" });

      try {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${endpoint}?${query}`, {
          signal: current.signal,
        });
        const body = await response.json();
        if (!response.ok) {
          setState({
            status: "error",
            error: body?.error ?? "Something went wrong. Try again.",
          });
          return;
        }
        setState({ status: "success", data: body as T });
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setState({
          status: "error",
          error: "We couldn't reach the server. Check your connection and try again.",
        });
      }
    },
    [endpoint],
  );

  return { state, run };
}

/** Keeps the checked values in the URL (?u=name&r=sub) so results are shareable. */
export function useShareableQuery() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (params: Record<string, string | null>) => {
      const search = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value) search.set(key, value);
      }
      const query = search.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** "3 years, 2 months" style account age. */
export function formatAge(days: number): string {
  if (days < 1) return "Less than a day";
  if (days < 31) return `${days} day${days === 1 ? "" : "s"}`;
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  if (years === 0) return `${months} month${months === 1 ? "" : "s"}`;
  if (months === 0) return `${years} year${years === 1 ? "" : "s"}`;
  return `${years} year${years === 1 ? "" : "s"}, ${months} month${months === 1 ? "" : "s"}`;
}

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------

/**
 * The tool "instrument panel": app chrome on top (same look as the landing
 * hero mock), the form, then the result area.
 */
export function ToolFrame({
  label,
  children,
  result,
}: {
  label: string;
  children: ReactNode;
  result?: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className="overflow-hidden rounded-2xl border border-border bg-white text-left shadow-[0_1px_2px_rgba(15,15,15,0.04),0_24px_64px_rgba(15,15,15,0.10)]"
    >
      <header className="flex h-10 items-center gap-2 border-b border-hairline px-4 text-[13px]">
        <span className="inline-flex size-[18px] items-center justify-center rounded bg-primary text-white">
          <IconArrowBigUpFilled size={11} />
        </span>
        <span className="text-muted-foreground">Karmicup</span>
        <span className="text-[#C4C4C0]">/</span>
        <span className="font-medium text-ink">{label}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          Live Reddit data
        </span>
      </header>
      <div className="p-4 sm:p-6">{children}</div>
      {result && (
        <div className="border-t border-hairline bg-surface/60 p-4 sm:p-6">
          {result}
        </div>
      )}
    </section>
  );
}

type HandleInputProps = Omit<ComponentProps<"input">, "prefix"> & {
  prefix: "u/" | "r/";
  invalid?: boolean;
};

/** Text input with a fixed "u/" or "r/" prefix, like Reddit's own handles. */
export const HandleInput = forwardRef<HTMLInputElement, HandleInputProps>(
  function HandleInput({ prefix, invalid, className, ...props }, ref) {
    return (
      <div
        className={cn(
          "flex h-12 w-full items-center rounded-xl border bg-white transition-colors focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15",
          invalid ? "border-destructive" : "border-border",
          className,
        )}
      >
        <span
          aria-hidden
          className="pl-4 font-mono text-[15px] font-medium text-muted-foreground select-none"
        >
          {prefix}
        </span>
        <input
          ref={ref}
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={invalid || undefined}
          className="h-full min-w-0 flex-1 bg-transparent pr-4 pl-0.5 font-mono text-[15px] text-ink outline-none placeholder:text-[#B5B5B1]"
          {...props}
        />
      </div>
    );
  },
);

export function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="group h-12 shrink-0 gap-2 rounded-xl px-5 text-[15px]"
    >
      {loading ? (
        <IconLoader2 size={18} className="animate-spin" />
      ) : null}
      {children}
      {!loading && (
        <IconArrowRight
          size={17}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Button>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-[13px] text-destructive">
      {message}
    </p>
  );
}

/** "Try: u/spez" chips under the form. */
export function ExampleChips({
  label = "Try",
  examples,
  prefix,
  onPick,
}: {
  label?: string;
  examples: string[];
  prefix: "u/" | "r/";
  onPick: (value: string) => void;
}) {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
      {label}:
      {examples.map((example) => (
        <button
          key={example}
          type="button"
          onClick={() => onPick(example)}
          className="cursor-pointer rounded-md border border-border bg-white px-2 py-0.5 font-mono text-[12px] text-ink-secondary transition-colors hover:border-primary/40 hover:text-primary"
        >
          {prefix}
          {example}
        </button>
      ))}
    </p>
  );
}

export function ResultSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div aria-busy className="flex flex-col gap-4" role="status">
      <span className="sr-only">Loading results from Reddit…</span>
      <div className="flex items-center gap-3">
        <div className="size-12 animate-pulse rounded-full bg-[#ECECEA]" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 animate-pulse rounded bg-[#ECECEA]" />
          <div className="h-3 w-28 animate-pulse rounded bg-[#ECECEA]" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-[84px] animate-pulse rounded-xl border border-border bg-white"
          />
        ))}
      </div>
    </div>
  );
}

export function ErrorNotice({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-brand-soft bg-brand-tint p-4 text-[15px] leading-6 text-ink"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
        <IconAlertTriangle size={15} />
      </span>
      <p className="m-0 pt-0.5">{message}</p>
    </div>
  );
}

/** Small stat tile used in the results. */
export function StatTile({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl border p-4",
        accent ? "border-brand-soft bg-brand-tint" : "border-border bg-white",
      )}
    >
      <dt className="text-[12px] font-medium text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "m-0 font-heading text-[26px] leading-none font-bold tracking-[-0.02em] tabular-nums",
          accent ? "text-primary" : "text-ink",
        )}
      >
        {value}
      </dd>
      {hint && <dd className="m-0 text-[12px] text-muted-foreground">{hint}</dd>}
    </div>
  );
}

/** Round avatar with a fallback initial. Reddit avatars are external images. */
export function Avatar({
  src,
  name,
  square = false,
}: {
  src: string | null;
  name: string;
  square?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const shape = square ? "rounded-xl" : "rounded-full";

  if (!src || failed) {
    return (
      <span
        aria-hidden
        className={cn(
          "flex size-12 shrink-0 items-center justify-center bg-brand-tint font-heading text-lg font-bold text-primary uppercase",
          shape,
        )}
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- external Reddit avatar, any host
    <img
      src={src}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={cn("size-12 shrink-0 border border-border bg-white object-cover", shape)}
    />
  );
}
