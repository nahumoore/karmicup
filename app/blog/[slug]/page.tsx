import { ArticleFaq } from "@/components/blog/article-faq";
import { ArticleImage } from "@/components/blog/article-image";
import { AuthorBox } from "@/components/blog/author-box";
import { FounderAvatar } from "@/components/founder-avatar";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Eyebrow } from "@/components/landing/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_POSTS, getPost, loadPostContent } from "@/content/blog/posts";
import { buildArticleMetadata, FOUNDER } from "@/consts/seo-metadata";
import { buildArticleStructuredData } from "@/consts/structured-data";
import { IconChevronRight } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

/**
 * Every article is prerendered at build time. Don't set `dynamicParams = false`:
 * the OpenNext worker has no incremental cache configured, so it renders
 * the page on request, and with dynamicParams disabled that returns a 404 in
 * production. Unknown slugs still 404 through notFound() below.
 */
export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildArticleMetadata(post);
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  const Content = await loadPostContent(slug);
  if (!post || !Content) notFound();

  const updated = parseISO(post.updatedAt);

  return (
    <main className="min-h-screen bg-white text-ink">
      <JsonLd data={buildArticleStructuredData(post)} />
      <Navbar />

      <article className="px-4 pt-[108px] pb-24 sm:px-6 sm:pt-[132px]">
        <div className="mx-auto max-w-[720px]">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[13px] text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <IconChevronRight size={13} />
              </li>
              <li>
                <Link href="/blog" className="hover:text-ink">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>

          <header className="mb-10 flex flex-col gap-4 border-b border-hairline pb-8">
            <Eyebrow>{post.pillar}</Eyebrow>
            <h1 className="m-0 font-heading text-[34px] leading-[1.1] font-bold tracking-[-0.025em] text-balance text-ink sm:text-[44px]">
              {post.title}
            </h1>
            <p className="m-0 text-[18px] leading-[29px] text-pretty text-ink-secondary">
              {post.excerpt}
            </p>
            <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <FounderAvatar size={28} className="size-7" />
                <span>
                  By{" "}
                  <Link href="/about" className="font-medium text-ink hover:text-primary">
                    {FOUNDER.name}
                  </Link>
                </span>
              </span>
              <span aria-hidden>·</span>
              <span>
                Updated{" "}
                <time dateTime={post.updatedAt}>
                  {format(updated, "MMMM d, yyyy")}
                </time>
              </span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
          </header>

          {post.cover && (
            <ArticleImage
              src={post.cover.src}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              credit={post.cover.credit}
              priority
            />
          )}

          <div>
            <Content />
          </div>

          <ArticleFaq faqs={post.faqs} />
          <AuthorBox />
        </div>
      </article>

      <Footer />
    </main>
  );
}
