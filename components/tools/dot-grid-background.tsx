/** Dot grid + soft orange glow behind a page header (MentioHunt hero background). */
export function DotGridBackground({ height = 900 }: { height?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
      style={{ height }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#D9D9D6_1px,transparent_1px)] mask-[radial-gradient(ellipse_65%_55%_at_50%_0%,#000_30%,transparent_100%)] bg-size-[20px_20px] bg-position-[center_top]" />
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(255,90,31,0.07),transparent_70%)]" />
    </div>
  );
}
