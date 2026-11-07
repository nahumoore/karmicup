/**
 * Landing page FAQs. Shared by the FAQ section and the FAQPage JSON-LD,
 * so the structured data always matches the visible content.
 */
export const LANDING_FAQS = [
  {
    question: "Is Karmicup really free?",
    answer:
      "Yes. Karmicup has no subscriptions, no paid tiers and no credit card. It runs on a points system: you earn points by engaging with other members' Reddit posts and spend them to get engagement on your own.",
  },
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
    question: "Is this the same as buying Reddit upvotes?",
    answer:
      "No. Nobody is paid and there are no bots or fake accounts. Every upvote and comment comes from a real Reddit user in the community who chose to engage with your post, in exchange for the same help on their own content.",
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
] as const;
