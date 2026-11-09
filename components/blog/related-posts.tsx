import { Eyebrow } from "@/components/landing/section-header";
import type { BlogPost } from "@/content/blog/posts";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

/** "Keep reading" list at the end of an article (internal linking). */
export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-posts-title" className="mt-14">
      <h2
        id="related-posts-title"
        className="m-0 mb-5 font-heading text-[24px] leading-[1.2] font-bold tracking-[-0.025em] text-ink"
      >
        Keep reading
      </h2>
      <ul className="m-0 grid list-none gap-4 p-0">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="group relative flex flex-col gap-2 rounded-xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-colors hover:border-[#D5D5D1]">
              <Eyebrow>{post.pillar}</Eyebrow>
              <h3 className="m-0 font-heading text-[19px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">
                <Link
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 group-hover:text-primary"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="m-0 text-[15px] leading-6 text-ink-secondary">
                {post.excerpt}
              </p>
              <p className="m-0 inline-flex items-center gap-1 pt-1 text-[13px] font-medium text-ink">
                Read guide
                <IconArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
