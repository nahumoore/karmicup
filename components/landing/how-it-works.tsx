import { SectionHeader } from "@/components/landing/section-header";
import { SUBMIT_COST } from "@/consts/submission-cost";
import {
  IconArrowBigUp,
  IconMessageCircle,
  IconSend,
} from "@tabler/icons-react";

const steps = [
  {
    label: "Submit",
    title: "Share your Reddit post or comment",
    description:
      "Paste the link to your Reddit post or comment. The community sees it in the feed right away.",
  },
  {
    label: "Engage",
    title: "Help other members first",
    description:
      "Browse community submissions and genuinely engage: upvote, comment and share real thoughts to earn points.",
  },
  {
    label: "Grow",
    title: "Get real engagement back",
    description:
      "Real Reddit users engage with your content in return. No bots, no fake accounts, just authentic activity.",
  },
];

const pointRules = [
  { icon: IconArrowBigUp, action: "Upvote a submission", points: "+1 point" },
  { icon: IconMessageCircle, action: "Leave a comment", points: "+5 points" },
  {
    icon: IconSend,
    action: "Submit your own content",
    points: `-${SUBMIT_COST} points`,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="mt-20 scroll-mt-[60px] border-y border-hairline bg-surface px-4 py-20 sm:mt-28 sm:px-6 sm:py-28 lg:mt-32"
    >
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader
          id="how-it-works-title"
          eyebrow="How it works"
          title="Three steps to more engagement"
          description="A simple karma exchange: give engagement, receive engagement. Points keep everything fair."
        />

        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {steps.map(({ label, title, description }, i) => (
            <li
              key={title}
              className="flex gap-3.5 rounded-xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(15,15,15,0.04)]"
            >
              <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-muted-foreground">
                  {label}
                </span>
                <h3 className="text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-[22px] text-ink-secondary">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-3 rounded-xl border border-border bg-white shadow-[0_1px_2px_rgba(15,15,15,0.04)]">
          <h3 className="border-b border-hairline px-5 py-3 text-[13px] font-medium text-muted-foreground">
            How points work
          </h3>
          <dl className="grid divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
            {pointRules.map(({ icon: Icon, action, points }) => (
              <div key={action} className="flex items-center gap-3 px-5 py-4">
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface text-ink-secondary"
                >
                  <Icon size={17} />
                </span>
                <dt className="flex-1 text-sm text-ink-secondary">{action}</dt>
                <dd className="text-sm font-semibold text-primary">{points}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
