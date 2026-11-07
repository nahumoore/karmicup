import { SectionHeader } from "@/components/landing/section-header";
import {
  IconArrowsExchange,
  IconGift,
  IconHeartHandshake,
  IconUserCheck,
} from "@tabler/icons-react";

const benefits = [
  {
    icon: IconGift,
    label: "No subscriptions",
    title: "Always free.",
    description:
      "No subscriptions, no credit cards, no catch. Karmicup runs entirely on a points system: you earn by giving.",
  },
  {
    icon: IconUserCheck,
    label: "No bots",
    title: "Real Reddit accounts.",
    description:
      "Every upvote and comment you receive comes from a genuine Reddit user in the community, never a bot or a bought account.",
  },
  {
    icon: IconHeartHandshake,
    label: "No paid engagement",
    title: "Genuine engagement.",
    description:
      "Members engage because they choose to, not because they're paid. That means real opinions and authentic interactions.",
  },
  {
    icon: IconArrowsExchange,
    label: "Self-sustaining loop",
    title: "Earn as you give.",
    description:
      "Every time you engage with someone else's post you build up points to spend on your own. Give a little, get a little.",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-title"
      className="px-4 pt-20 sm:px-6 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader
          id="benefits-title"
          eyebrow="Why Karmicup"
          title={
            <>
              Built on real reciprocity.{" "}
              <span className="text-muted-foreground">No shortcuts.</span>
            </>
          }
          description="Everything here is designed around one idea: authentic people helping each other get that first bit of traction on Reddit."
        />

        <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
          {benefits.map(({ icon: Icon, label, title, description }) => (
            <li
              key={title}
              className="flex gap-4 border-t border-hairline py-8 sm:py-10"
            >
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-primary"
              >
                <Icon size={20} stroke={1.75} />
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-medium text-muted-foreground">
                  {label}
                </span>
                <h3 className="text-[22px] leading-7 font-semibold tracking-[-0.01em] text-ink">
                  {title}
                </h3>
                <p className="text-[15px] leading-6 text-pretty text-ink-secondary">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
