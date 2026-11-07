import { SectionHeader } from "@/components/landing/section-header";
import { SUBMIT_COST } from "@/consts/submission-cost";

const faqs = [
  {
    question: "How do I get points?",
    answer: `Engaging with other members' content earns you points: upvoting a post gives you +1 point, and leaving a comment earns you +5 points. Submitting your own content costs ${SUBMIT_COST} points, so the more you give, the more you can promote.`,
  },
  {
    question: "How does the points system work?",
    answer:
      "Points are the currency of Karmicup. They keep the platform balanced: everyone contributes before they can promote. There are no shortcuts, no paid tiers and no way to buy your way in, so engagement stays mutual and meaningful.",
  },
  {
    question: "What counts as engaging?",
    answer:
      "Upvoting and commenting on submissions in the feed both count. Comments carry more weight (+5) because they add real value to a conversation. Low-effort or spammy comments don't fly: the community notices, and so do we.",
  },
  {
    question: "How quickly will I see results on my post?",
    answer:
      "Most submissions start receiving engagement within a few hours of being posted, depending on how active the community is at that time. The more points you spend, the more visibility your submission gets in the feed.",
  },
  {
    question: "Can I submit any Reddit post or comment?",
    answer:
      "Yes. You can submit any public Reddit post or comment by pasting its URL. There are no subreddit restrictions. Just make sure the content is genuine and follows the rules of the subreddit it's in.",
  },
  {
    question: "What happens if I run out of points?",
    answer:
      "Engage with more posts to earn them back. Head to the feed, upvote or comment on a few submissions, and you'll have enough points to submit again in no time.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-[60px] px-4 pt-20 sm:px-6 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap gap-x-16 gap-y-8">
        <SectionHeader
          id="faq-title"
          eyebrow="FAQ"
          title="Common questions"
          description="Everything you need to know before getting started."
          className="flex-[1_1_280px]"
        />

        <dl className="m-0 flex min-w-0 flex-[999_1_560px] flex-col border-b border-hairline">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="border-t border-hairline py-5">
              <dt className="text-base font-semibold text-ink">{question}</dt>
              <dd className="m-0 mt-1.5 text-[15px] leading-6 text-pretty text-ink-secondary">
                {answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
