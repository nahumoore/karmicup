export function BackgroundEffects() {
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
