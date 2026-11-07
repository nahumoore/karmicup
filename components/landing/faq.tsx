import { SectionHeader } from "@/components/landing/section-header";
import { LANDING_FAQS as faqs } from "@/consts/faqs";

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
