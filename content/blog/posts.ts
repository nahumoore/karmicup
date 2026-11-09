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
    updatedAt: "2026-11-09",
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
  {
    slug: "what-is-reddit-karma",
    title: "What Is Reddit Karma and How Does It Work?",
    seoTitle: "What Is Reddit Karma? How It Works (2026 Guide)",
    description:
      "Reddit karma is the score you earn when people upvote your posts and comments. Learn how it's calculated, how to check it and what it actually unlocks.",
    excerpt:
      "What your karma number means, how it's calculated, how to check it, and what a \"good\" score looks like, with the common myths cleared up.",
    pillar: "Reddit karma",
    primaryKeyword: "reddit karma",
    publishedAt: "2026-11-09",
    updatedAt: "2026-11-09",
    readingMinutes: 9,
    cover: {
      src: "/blog/what-is-reddit-karma/reddit-logo-light-painting.webp",
      alt: "The Reddit logo and its alien mascot, Snoo, drawn with LED light painting across a backyard at night",
      width: 1024,
      height: 576,
      credit: {
        author: "Mechatronics Guy",
        authorUrl: "https://www.flickr.com/photos/38462165@N05",
        license: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        sourceUrl: "https://www.flickr.com/photos/38462165@N05/5887122595",
        modified: true,
      },
    },
    faqs: [
      {
        question: "Does 1 upvote equal 1 karma on Reddit?",
        answer:
          "Not exactly. Reddit describes karma as an approximate reflection of the votes you receive, so 100 upvotes won't always add exactly 100 karma, and on very popular posts karma grows more slowly than the score. Your own automatic upvote doesn't count.",
      },
      {
        question: "What does 10 karma mean on Reddit? Is 100 karma good?",
        answer:
          "10 karma means a handful of people have upvoted your posts or comments: your account is just getting started. 100 karma is a good first milestone that opens many communities with low requirements, although some subreddits ask for more or count only the karma earned inside them.",
      },
      {
        question: "Is 50,000 karma a lot on Reddit?",
        answer:
          "Yes. Reddit has no official scale, but 50,000 karma usually takes years of regular posting and commenting. Past roughly 1,000 karma, extra karma rarely unlocks anything new: it's mostly a sign of how active the account has been.",
      },
      {
        question: "What happens if your Reddit karma is negative?",
        answer:
          "Your posts and comments have received more downvotes than upvotes. Many subreddits use AutoModerator to filter or remove content from accounts with negative karma, so your comments may disappear without notice. Contribute in friendly communities until your karma is positive again.",
      },
      {
        question: "Does deleting a post remove its karma?",
        answer:
          "Reddit doesn't document it and users report mixed results, so don't count on it either way. Deleting downvoted posts won't reliably restore your karma, and deleting a lot of content at once can look suspicious to Reddit's spam filters.",
      },
      {
        question: "Can you buy Reddit karma or make money from it?",
        answer:
          "Reddit doesn't sell karma, and buying upvotes or karma from third parties breaks Reddit's content policy on vote manipulation. Karma has no cash value by itself, but it decides your tier in Reddit's Contributor Program, where eligible users earn money from the gold awards they receive.",
      },
      {
        question: "Does Reddit karma expire?",
        answer:
          "No. Karma stays on your account for as long as the account exists. It can go down if your content gets downvoted or Reddit removes manipulated votes, and it's lost if the account is suspended or deleted.",
      },
    ],
  },
];

/** Lazy loaders for the MDX body of each article, keyed by slug. */
const POST_LOADERS: Record<string, () => Promise<{ default: MDXContent }>> = {
  "how-to-get-karma-on-reddit": () => import("./how-to-get-karma-on-reddit.mdx"),
  "what-is-reddit-karma": () => import("./what-is-reddit-karma.mdx"),
};

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/**
 * Articles to suggest at the end of `slug`: same pillar first, then the most
 * recent ones from other pillars.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = BLOG_POSTS.filter((post) => post.slug !== slug).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const samePillar = others.filter((post) => post.pillar === current.pillar);
  const otherPillars = others.filter((post) => post.pillar !== current.pillar);
  return [...samePillar, ...otherPillars].slice(0, limit);
}

export async function loadPostContent(slug: string): Promise<MDXContent | undefined> {
  const loader = POST_LOADERS[slug];
  if (!loader) return undefined;
  const mdxModule = await loader();
  return mdxModule.default;
}
