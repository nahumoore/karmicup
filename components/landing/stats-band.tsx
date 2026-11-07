import { PLATFORM_METRICS } from "@/consts/platform-metrics";

const stats = [
  { value: PLATFORM_METRICS.members, label: "Active Redditors in the community" },
  { value: PLATFORM_METRICS.postsBoosted, label: "Posts and comments boosted" },
  { value: PLATFORM_METRICS.alwaysFree, label: "Free. No paid tiers, ever" },
];

export function StatsBand() {
  return (
    <section
      aria-label="Karmicup in numbers"
      className="mt-20 border-y border-hairline bg-surface px-4 py-12 sm:mt-24 sm:px-6 sm:py-14"
    >
      <dl className="mx-auto grid max-w-[1120px] gap-8 sm:grid-cols-3">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="order-2 text-sm text-muted-foreground">{label}</dt>
            <dd className="order-1 font-heading text-[40px] leading-none font-bold tracking-[-0.03em] text-ink">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
