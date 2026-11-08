import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

/**
 * MDX for blog articles (content/blog/*.mdx). Plugins are passed by name so
 * the config stays serializable for Turbopack.
 * - remark-gfm: tables, strikethrough, autolinks.
 * - rehype-slug: `id` on every heading, used by the in-article table of contents.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
