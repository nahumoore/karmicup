"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "How do I get points?",
    answer:
      "Engaging with other members' content earns you points: upvoting a post gives you +1 point, and leaving a comment earns you +5 points. Submitting your own content costs 10 points — so the more you give, the more you can promote.",
  },
  {
    question: "How does the points system work?",
    answer:
      "Points are the currency of Karmicup. They keep the platform balanced — everyone contributes before they can promote. There are no shortcuts, no paid tiers, and no way to buy your way in. The system ensures that engagement stays mutual and meaningful.",
  },
  {
    question: "What counts as engaging?",
    answer:
      "Upvoting and commenting on submissions in the feed both count. Comments carry more weight (+5) because they add real value to a conversation. Low-effort or spammy comments don't fly — the community notices, and so do we.",
  },
  {
    question: "How quickly will I see results on my post?",
    answer:
      "Most submissions start receiving engagement within a few hours of being posted, depending on how active the community is at that time. The more points you spend, the more visibility your submission gets in the feed.",
  },
  {
    question: "Can I submit any Reddit post or comment?",
    answer:
      "Yes — you can submit any public Reddit post or comment by pasting its URL. There are no subreddit restrictions. Just make sure the content is genuine and follows Reddit's own rules for the subreddit it's in.",
  },
  {
    question: "What happens if I run out of points?",
    answer:
      "You simply need to engage with more posts to earn them back. Head to the feed, upvote or comment on a few submissions, and you'll have enough points to submit again in no time.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-background pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.15em] mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
            Questions & answers
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
          >
            {faqs.map(({ question, answer }, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-foreground text-base">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
