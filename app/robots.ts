import type { MetadataRoute } from "next";
import { SITE_URL } from "@/consts/seo-metadata";

/** Private areas: no SEO value, and they redirect anonymous visitors to /login. */
const PRIVATE_PATHS = ["/api/", "/dashboard", "/onboarding"];

/**
 * AI search and assistant crawlers. Explicitly allowed because Google and
 * LLM answers are the main acquisition channels for Karmicup.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
