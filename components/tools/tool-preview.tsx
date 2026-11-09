import type { ToolPreview as ToolPreviewKind } from "@/content/tools/registry";
import {
  IconChartBar,
  IconCheck,
  IconEyeCheck,
  IconListCheck,
  IconShieldCheck,
  IconX,
  type Icon,
} from "@tabler/icons-react";

/** Icon of each tool, used on cards and in the navigation. */
export const TOOL_ICONS: Record<ToolPreviewKind, Icon> = {
  karma: IconChartBar,
  shadowban: IconEyeCheck,
  subreddit: IconListCheck,
};

/**
 * Small, static mock of a tool's result drawn at the top of its card on the
 * hub. Decorative: the real numbers come from the tool itself.
 */
export function ToolPreview({ kind }: { kind: ToolPreviewKind }) {
  return (
    <div
      aria-hidden
      className="relative flex h-[148px] items-center justify-center overflow-hidden border-b border-hairline bg-surface px-5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#E2E2DF_1px,transparent_1px)] bg-size-[16px_16px] opacity-70" />
      <div className="relative w-full max-w-[280px] rounded-xl border border-border bg-white p-3.5 shadow-[0_1px_2px_rgba(15,15,15,0.04),0_12px_32px_rgba(15,15,15,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
        {kind === "karma" && <KarmaPreview />}
        {kind === "shadowban" && <ShadowbanPreview />}
        {kind === "subreddit" && <SubredditPreview />}
      </div>
    </div>
  );
}

function KarmaPreview() {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[12px] font-semibold text-ink">u/your_name</span>
        <span className="text-[10px] text-muted-foreground">2 years</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {[
          ["Total", "12,480", true],
          ["Post", "4,712", false],
          ["Comment", "7,768", false],
        ].map(([label, value, accent]) => (
          <div
            key={label as string}
            className={
              accent
                ? "rounded-md bg-brand-tint px-2 py-1.5"
                : "rounded-md bg-surface px-2 py-1.5"
            }
          >
            <p className="m-0 text-[9px] text-muted-foreground">{label}</p>
            <p
              className={
                accent
                  ? "m-0 font-heading text-[14px] font-bold text-primary tabular-nums"
                  : "m-0 font-heading text-[14px] font-bold text-ink tabular-nums"
              }
            >
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full">
        <span className="h-full w-[38%] bg-primary" />
        <span className="h-full w-[62%] bg-ink" />
      </div>
    </>
  );
}

function ShadowbanPreview() {
  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2">
        <IconShieldCheck size={16} className="text-emerald-700" />
        <span className="text-[12px] font-bold text-ink">Not shadowbanned</span>
      </div>
      <ul className="m-0 mt-2 flex list-none flex-col gap-1 p-0">
        {["Username registered", "Not suspended", "Visible when logged out"].map((label) => (
          <li key={label} className="flex items-center gap-1.5 text-[11px] text-ink-secondary">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <IconCheck size={9} stroke={3} />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </>
  );
}

function SubredditPreview() {
  const rows = [
    { label: "Account 7+ days old", ok: true },
    { label: "50+ comment karma", ok: false },
    { label: "Self-promo: weekly thread", ok: true },
  ];
  return (
    <>
      <p className="m-0 font-mono text-[12px] font-semibold text-ink">r/SideProject</p>
      <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
        {rows.map(({ label, ok }) => (
          <li key={label} className="flex items-center justify-between gap-2 text-[11px] text-ink-secondary">
            {label}
            <span
              className={
                ok
                  ? "inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 text-[10px] font-semibold text-emerald-700"
                  : "inline-flex items-center gap-0.5 rounded-full bg-brand-tint px-1.5 text-[10px] font-semibold text-primary"
              }
            >
              {ok ? <IconCheck size={9} stroke={3} /> : <IconX size={9} stroke={3} />}
              {ok ? "Meets" : "Below"}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
