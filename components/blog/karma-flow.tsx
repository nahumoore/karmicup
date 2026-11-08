import {
  IconArrowBigUp,
  IconArrowRight,
  IconLockOpen,
  IconMessageCircle,
  IconSum,
} from "@tabler/icons-react";

const STEPS = [
  {
    icon: IconMessageCircle,
    title: "You post or comment",
    text: "Text, links, images, videos or replies.",
  },
  {
    icon: IconArrowBigUp,
    title: "Redditors vote",
    text: "Upvotes add karma, downvotes take it away.",
  },
  {
    icon: IconSum,
    title: "Karma adds up",
    text: "Post karma + comment karma = your total.",
  },
  {
    icon: IconLockOpen,
    title: "Doors open",
    text: "Communities with karma rules let you in.",
  },
];

/** Diagram: how votes turn into karma and what karma unlocks. */
export function KarmaFlow() {
  return (
    <figure className="my-8">
      <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <li
            key={title}
            className="relative flex flex-col gap-2 rounded-xl border border-border bg-white p-4 shadow-[0_1px_2px_rgba(15,15,15,0.04)]"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-tint text-primary">
              <Icon size={17} stroke={2} />
            </span>
            <p className="m-0 text-[15px] font-semibold text-ink">{title}</p>
            <p className="m-0 text-[14px] leading-[21px] text-ink-secondary">
              {text}
            </p>
            {index < STEPS.length - 1 && (
              <IconArrowRight
                aria-hidden
                size={16}
                className="absolute top-1/2 -right-[14px] z-10 hidden -translate-y-1/2 rounded-full bg-white text-muted-foreground sm:block"
              />
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-center text-[13px] text-muted-foreground">
        How Reddit karma works, from your first comment to unlocking new
        communities.
      </figcaption>
    </figure>
  );
}
