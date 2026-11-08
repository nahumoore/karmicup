import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Eyebrow } from "@/components/landing/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_POSTS } from "@/content/blog/posts";
import { buildPageMetadata } from "@/consts/seo-metadata";
import { buildBlogIndexStructuredData } from "@/consts/structured-data";
import { IconArrowRight } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata("blog", { path: "/blog" });

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <main className="min-h-screen bg-white text-ink">
      <JsonLd data={buildBlogIndexStructuredData(posts)} />
      <Navbar />

      <section className="px-4 pt-[124px] pb-24 sm:px-6 sm:pt-[140px]">
        <div className="mx-auto max-w-[1120px]">
          <header className="mb-12 flex max-w-3xl flex-col gap-3.5">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="m-0 font-heading text-[36px] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-ink sm:text-[48px]">
              Reddit growth guides
            </h1>
            <p className="m-0 text-[17px] leading-[27px] text-pretty text-ink-secondary">
              Practical, honest guides on Reddit karma, upvotes and promoting
              what you build on Reddit without getting banned.
            </p>
          </header>

          <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col gap-3 rounded-xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-colors hover:border-[#D5D5D1]">
                  <Eyebrow>{post.pillar}</Eyebrow>
                  <h2 className="m-0 font-heading text-[21px] leading-[1.25] font-bold tracking-[-0.02em] text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 group-hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="m-0 text-[15px] leading-6 text-ink-secondary">
                    {post.excerpt}
                  </p>
                  <p className="mt-auto flex items-center justify-between pt-2 text-[13px] text-muted-foreground">
                    <time dateTime={post.updatedAt}>
                      {format(parseISO(post.updatedAt), "MMM d, yyyy")}
                    </time>
                    <span className="inline-flex items-center gap-1 font-medium text-ink">
                      Read guide
                      <IconArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
