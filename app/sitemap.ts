import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog/posts";
import { FREE_TOOLS } from "@/content/tools/registry";
import { SITE_URL } from "@/consts/seo-metadata";

/** Public, indexable pages only. Add new marketing/content pages here. */
const PUBLIC_PAGES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = PUBLIC_PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  // Blog articles come from the registry, so new posts are added automatically.
  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Free tools come from their registry too.
  const tools: MetadataRoute.Sitemap = FREE_TOOLS.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...tools, ...posts];
}
