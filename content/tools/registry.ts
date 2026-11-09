import type { BlogFaq } from "@/content/blog/posts";
import type { MDXContent } from "mdx/types";

/**
 * Registry of the free tools at /tools. Each tool has:
 * - an entry here (SEO copy, FAQ, related guides),
 * - an interactive widget (components/tools/widgets, mapped in tool-widget.tsx),
 * - a public API route (app/api/tools/*),
 * - a guide below the widget (content/tools/<slug>.mdx, body only, like blog posts).
 * See content/tools/README.md.
 */

export type ToolPreview = "karma" | "shadowban" | "subreddit";

export type FreeTool = {
  slug: string;
  /** Visible H1 and card title. */
  name: string;
  /** Lead paragraph under the H1. */
  tagline: string;
  /** <title> tag, used as-is. Keep it under ~60 characters. */
  seoTitle: string;
  /** Meta description, 120–160 characters. */
  description: string;
  /** Short summary for the hub card. */
  excerpt: string;
  /** What the visitor types in, shown on the hub card. */
  input: string;
  /** Mini result preview drawn on the hub card. */
  preview: ToolPreview;
  primaryKeyword: string;
  /** ISO dates (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  /** `utm_content` for MentioHunt links on this page (snake_case slug). */
  mentiohuntContent: string;
  /** Blog slugs shown in "Related guides". */
  relatedPosts: string[];
  faqs: BlogFaq[];
};

export const FREE_TOOLS: FreeTool[] = [
  {
    slug: "reddit-karma-checker",
    name: "Reddit Karma Checker",
    tagline:
      "See the karma of any Reddit account: total, post and comment karma, account age and how fast it's growing. Free, no login.",
    seoTitle: "Reddit Karma Checker: See Any Account's Karma (Free)",
    description:
      "Check any Reddit account's karma for free: total, post and comment karma, karma per day and account age. No login, no signup, results in seconds.",
    excerpt:
      "Total, post and comment karma for any username, plus account age and karma per day.",
    input: "A Reddit username",
    preview: "karma",
    primaryKeyword: "reddit karma checker",
    publishedAt: "2026-11-09",
    updatedAt: "2026-11-09",
    mentiohuntContent: "reddit_karma_checker",
    relatedPosts: ["what-is-reddit-karma", "how-to-get-karma-on-reddit"],
    faqs: [
      {
        question: "How do I check my Reddit karma?",
        answer:
          "Type your username in the checker above and press Check karma. You'll see your total, post and comment karma, your account age and your karma per day. You can also open your Reddit profile: the total shows next to your username, and clicking it shows the breakdown.",
      },
      {
        question: "Can I check someone else's Reddit karma?",
        answer:
          "Yes. Karma is public, so you can check any account that isn't suspended or hidden. Enter their username in the checker, or open their profile on Reddit.",
      },
      {
        question: "Why isn't my total karma equal to post karma plus comment karma?",
        answer:
          "Your total also includes awarder and awardee karma, which come from Reddit's old awards system. Karma also updates with a delay and Reddit slightly fuzzes vote counts, so small differences are normal.",
      },
      {
        question: "Can I see someone's karma in a specific subreddit?",
        answer:
          "No. Subreddit karma (the karma you earned inside one community) isn't public. Moderators can use it in AutoModerator rules, which is why a high-karma account can still be blocked in a community where it never participated.",
      },
      {
        question: "What's a good Reddit karma score?",
        answer:
          "There's no official scale. What matters in practice is whether you meet the requirements of the subreddits you want to post in, and those vary by community. Our Subreddit Requirements Checker shows the karma and account age a community asks for in its rules.",
      },
      {
        question: "Is this karma checker free?",
        answer:
          "Yes. It's free, needs no account and only reads public data from Reddit. We don't store the usernames you check.",
      },
    ],
  },
  {
    slug: "reddit-shadowban-checker",
    name: "Reddit Shadowban Checker",
    tagline:
      "Find out if a Reddit account is shadowbanned, suspended or healthy. We load the profile the way a logged-out visitor sees it.",
    seoTitle: "Reddit Shadowban Checker: Am I Shadowbanned? (Free)",
    description:
      "Check if your Reddit account is shadowbanned or suspended in seconds. Free, no login. See what logged-out visitors see and how to appeal a shadowban.",
    excerpt:
      "Find out if an account is shadowbanned, suspended or visible to everyone, and what to do next.",
    input: "A Reddit username",
    preview: "shadowban",
    primaryKeyword: "reddit shadowban checker",
    publishedAt: "2026-11-09",
    updatedAt: "2026-11-09",
    mentiohuntContent: "reddit_shadowban_checker",
    relatedPosts: ["how-to-get-karma-on-reddit", "what-is-reddit-karma"],
    faqs: [
      {
        question: "What is a Reddit shadowban?",
        answer:
          "A shadowban hides an account's profile, posts and comments from everyone except the account itself. You can keep posting and everything looks normal to you, but nobody else sees it. Sitewide shadowbans are applied by Reddit, usually by its spam filters, not by subreddit moderators.",
      },
      {
        question: "How does this shadowban checker work?",
        answer:
          "It loads the account's public profile the way a logged-out visitor does. If the profile is hidden but Reddit says the username is taken, the account exists but is invisible to others: it's shadowbanned or deleted. If Reddit marks it as suspended, we show that instead.",
      },
      {
        question: "Can I be shadowbanned from just one subreddit?",
        answer:
          "Not technically, but the effect can be similar. Moderators can set AutoModerator to remove everything you post in their community without telling you. Your profile stays visible, so this checker shows it as healthy. To check a single post, open it in a private window: if it's missing or says [removed], it was removed.",
      },
      {
        question: "How do I get unshadowbanned on Reddit?",
        answer:
          "Submit an appeal at reddit.com/appeal from the affected account. Explain briefly what you use the account for and that you'll follow the rules. Don't create a new account to get around it: Reddit treats that as ban evasion.",
      },
      {
        question: "Why was my Reddit account shadowbanned?",
        answer:
          "Reddit doesn't tell you. Common triggers are behavior that looks like spam: posting the same link in many subreddits, a new account that mostly drops links, vote manipulation or using several accounts to upvote yourself.",
      },
      {
        question: "Is this shadowban checker free?",
        answer:
          "Yes. It's free, needs no login and only reads public Reddit data. We don't store the usernames you check.",
      },
    ],
  },
  {
    slug: "subreddit-requirements-checker",
    name: "Subreddit Requirements Checker",
    tagline:
      "Can you post in a subreddit? See its karma and account age requirements, the post types it accepts and its self-promotion rules, and check your account against them.",
    seoTitle: "Subreddit Requirements Checker: Can I Post Here?",
    description:
      "See any subreddit's posting requirements: karma, account age, allowed post types and self-promotion rules. Add your username to check if you qualify.",
    excerpt:
      "Karma and account age requirements, allowed post types and self-promotion rules for any subreddit.",
    input: "A subreddit (+ your username)",
    preview: "subreddit",
    primaryKeyword: "subreddit requirements",
    publishedAt: "2026-11-09",
    updatedAt: "2026-11-09",
    mentiohuntContent: "subreddit_requirements_checker",
    relatedPosts: ["how-to-get-karma-on-reddit", "what-is-reddit-karma"],
    faqs: [
      {
        question: "How do I find a subreddit's karma requirement?",
        answer:
          "Enter the subreddit in the checker above. It reads the community's rules, sidebar description and posting guidelines and pulls out any karma or account age requirement written there. If nothing is published, the community may still filter new accounts with private AutoModerator rules.",
      },
      {
        question: "Why was my post removed if I meet the requirements?",
        answer:
          "Many subreddits keep their exact thresholds private, count only the karma you earned inside that community, or check your Contributor Quality Score. Posts can also be removed for breaking a rule, missing flair or a blocked link. The removal message from AutoModerator or the mods is the most reliable explanation.",
      },
      {
        question: "Can this tool see a subreddit's AutoModerator rules?",
        answer:
          "No. AutoModerator settings are private to each community's moderators. The checker only shows requirements the community has published in its rules, description or posting guidelines.",
      },
      {
        question: "What does a restricted subreddit mean?",
        answer:
          "Anyone can view a restricted subreddit, but only users approved by the moderators can post. If you want to post there, read the sidebar or message the mods to ask how to get approved.",
      },
      {
        question: "Can I promote my product in a subreddit?",
        answer:
          "It depends on the community. Many ban self-promotion outright, others allow it only in a weekly thread or if most of your activity isn't promotional. The checker highlights the rules that mention self-promotion, advertising or spam so you can read them before posting.",
      },
      {
        question: "Is this subreddit checker free?",
        answer:
          "Yes. It's free, needs no login and only reads public Reddit data. We don't store the subreddits or usernames you check.",
      },
    ],
  },
];

/** FAQ of the /tools hub (rendered on the page and as FAQPage structured data). */
export const TOOLS_HUB_FAQS: BlogFaq[] = [
  {
    question: "Are these Reddit tools really free?",
    answer:
      "Yes. Every tool is free, with no signup and no usage limit for normal use. They're built by the Karmicup team, a free community where Redditors give each other genuine upvotes and comments.",
  },
  {
    question: "Do I need to log in with my Reddit account?",
    answer:
      "No. The tools only read public data, the same information anyone sees when they open a profile or a subreddit while logged out. We never ask for your Reddit password.",
  },
  {
    question: "Do you store the usernames or subreddits I check?",
    answer:
      "No. Each check is sent to Reddit, the result is shown to you, and nothing is saved to our database.",
  },
  {
    question: "Which tool should I use before posting on Reddit?",
    answer:
      "Run all three in order: the shadowban checker to make sure people can see your account, the karma checker to see where you stand, and the subreddit requirements checker to confirm you can post in the community you picked.",
  },
];

const TOOL_GUIDES: Record<string, () => Promise<{ default: MDXContent }>> = {
  "reddit-karma-checker": () => import("./reddit-karma-checker.mdx"),
  "reddit-shadowban-checker": () => import("./reddit-shadowban-checker.mdx"),
  "subreddit-requirements-checker": () =>
    import("./subreddit-requirements-checker.mdx"),
};

export function getTool(slug: string): FreeTool | undefined {
  return FREE_TOOLS.find((tool) => tool.slug === slug);
}

/** The other tools, for "More free tools" on each tool page. */
export function getOtherTools(slug: string): FreeTool[] {
  return FREE_TOOLS.filter((tool) => tool.slug !== slug);
}

export async function loadToolGuide(slug: string): Promise<MDXContent | undefined> {
  const loader = TOOL_GUIDES[slug];
  if (!loader) return undefined;
  return (await loader()).default;
}
