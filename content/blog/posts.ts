import type { ImageCredit } from "@/components/blog/article-image";
import type { MDXContent } from "mdx/types";

/**
 * Registry of published blog articles. Each article is an .mdx file in this
 * folder (body only: the page renders the title, byline and FAQ from here).
 * To publish a new article, add an entry to BLOG_POSTS and a loader to
 * POST_LOADERS. See content/blog/README.md.
 */

export type BlogFaq = {
  question: string;
  /** Plain text: rendered on the page and used for FAQPage structured data. */
  answer: string;
};

export type BlogImage = {
  /** Path under /public, e.g. "/blog/<slug>/cover.webp". */
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: ImageCredit;
};

export type BlogPost = {
  slug: string;
  /** Visible H1. */
  title: string;
  /** <title> tag, used as-is (no "| Karmicup" suffix). Keep it under ~60 characters. */
  seoTitle: string;
  /** Meta description, 120–160 characters. */
  description: string;
  /** Short summary for the blog index card. */
  excerpt: string;
  /** Pillar label shown as the eyebrow. */
  pillar: string;
  primaryKeyword: string;
  /** ISO dates (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  /** Cover image shown under the header and added to the BlogPosting structured data. */
  cover?: BlogImage;
  faqs: BlogFaq[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-get-karma-on-reddit",
    title: "How to Get Karma on Reddit: A Realistic Guide for New Accounts",
    seoTitle: "How to Get Karma on Reddit (Without Getting Banned) in 2026",
    description:
      "Learn how to get karma on Reddit the safe way: where to comment first, how to find each subreddit's karma rules, and what to avoid so you don't get banned.",
    excerpt:
      "Where to comment first, how to find any subreddit's karma requirement, and a realistic plan for your first 14 days, updated for Reddit's 2026 moderation changes.",
    pillar: "Reddit karma",
    primaryKeyword: "how to get karma on reddit",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
    readingMinutes: 14,
    cover: {
      src: "/blog/how-to-get-karma-on-reddit/reddit-app-on-phone.webp",
      alt: "A smartphone home screen with a Social Media folder that includes the Reddit app",
      width: 1024,
      height: 768,
      credit: {
        author: "ajay_suresh",
        authorUrl: "https://www.flickr.com/photos/83136374@N05",
        license: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        sourceUrl: "https://www.flickr.com/photos/83136374@N05/51839514351",
      },
    },
    faqs: [
      {
        question: "How much karma do you need to post on Reddit?",
        answer:
          "There's no sitewide minimum. Each subreddit sets its own requirements: many have none, while others require a minimum karma, account age, a verified email or a good Contributor Quality Score. Check the sidebar and rules of the community. If the number isn't published, build comment karma for a week or two before posting there.",
      },
      {
        question: "How long does it take to get 100 karma on Reddit?",
        answer:
          "It depends on the communities you join and the quality of your comments. With a few helpful comments a day on new and rising posts in active subreddits, many new users get there within one or two weeks, but nobody can guarantee a number.",
      },
      {
        question: "Can you buy Reddit karma?",
        answer:
          "You'll find people selling upvotes, karma and aged accounts, but buying them breaks Reddit's content policy on vote manipulation and spam. Reddit removes votes it detects as fake, and the account can be suspended.",
      },
      {
        question: "Does deleting a post remove its karma?",
        answer:
          "Reddit doesn't document this clearly and users report mixed results. Deleting a downvoted post won't reliably restore your karma, and deleting a lot of content at once can look suspicious. It's better to understand why the post was downvoted and adjust.",
      },
      {
        question: "Is 1,000 karma a lot on Reddit?",
        answer:
          "It's a healthy number for a personal account and clears the requirements of many communities. Moderators also look at where it came from: karma earned with helpful comments in your niche says more than karma from reposted memes.",
      },
      {
        question: "Why did my Reddit karma go down?",
        answer:
          "Usually because some of your posts or comments were downvoted. Reddit also adjusts displayed votes to confuse spam bots and removes votes it detects as manipulation, so small changes are normal.",
      },
      {
        question: "Do upvotes on your own posts count as karma?",
        answer:
          "No. Reddit upvotes your own posts and comments automatically, but that vote doesn't add karma.",
      },
      {
        question: "Is Reddit getting rid of karma requirements?",
        answer:
          "Not for now. In August 2026 Reddit announced systems that could help communities rely less on karma and account age, and started rolling out Rules Hub, an AI moderation tool. Each subreddit still decides its own requirements.",
      },
    ],
  },
];

/** Lazy loaders for the MDX body of each article, keyed by slug. */
const POST_LOADERS: Record<string, () => Promise<{ default: MDXContent }>> = {
  "how-to-get-karma-on-reddit": () => import("./how-to-get-karma-on-reddit.mdx"),
};

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export async function loadPostContent(slug: string): Promise<MDXContent | undefined> {
  const loader = POST_LOADERS[slug];
  if (!loader) return undefined;
  const mdxModule = await loader();
  return mdxModule.default;
}
