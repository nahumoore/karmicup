import type { BlogFaq } from "@/content/blog/posts";

/** FAQ block at the end of an article. Mirrors the FAQPage structured data. */
export function ArticleFaq({ faqs }: { faqs: BlogFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq" className="mt-16">
      <h2
        id="faq"
        className="mb-2 scroll-mt-24 font-heading text-[26px] leading-[1.2] font-bold tracking-[-0.025em] text-ink sm:text-[30px]"
      >
        FAQ
      </h2>
      <dl className="m-0">
        {faqs.map(({ question, answer }) => (
          <div key={question} className="border-b border-hairline py-5">
            <dt className="text-[17px] font-semibold text-ink">{question}</dt>
            <dd className="m-0 mt-1.5 text-[16px] leading-[27px] text-pretty text-ink-secondary">
              {answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
