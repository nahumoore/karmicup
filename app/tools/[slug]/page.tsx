import { ArticleFaq } from "@/components/blog/article-faq";
import { AuthorBox } from "@/components/blog/author-box";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Eyebrow } from "@/components/landing/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { DotGridBackground } from "@/components/tools/dot-grid-background";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolWidget } from "@/components/tools/tool-widget";
import { BLOG_POSTS, type BlogPost } from "@/content/blog/posts";
import {
  FREE_TOOLS,
  getOtherTools,
  getTool,
  loadToolGuide,
} from "@/content/tools/registry";
import { buildToolMetadata } from "@/consts/seo-metadata";
import { buildToolStructuredData } from "@/consts/structured-data";
import {
  IconChevronRight,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

/**
 * Every tool page is prerendered at build time. Don't set `dynamicParams = false`
 * (same reason as app/blog/[slug]: the OpenNext worker would return a 404).
 */
export function generateStaticParams() {
  return FREE_TOOLS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

const trustPoints = ["Free", "No signup or Reddit login", "Public data only, nothing stored"];

export default async function ToolPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tool = getTool(slug);
  const Guide = await loadToolGuide(slug);
  if (!tool || !Guide) notFound();

  const relatedPosts = tool.relatedPosts
    .map((postSlug) => BLOG_POSTS.find((post) => post.slug === postSlug))
    .filter((post): post is BlogPost => Boolean(post));

  return (
    <main className="min-h-screen bg-white text-ink">
      <JsonLd data={buildToolStructuredData(tool)} />
      <Navbar />

      {/* Header + interactive tool */}
      <section
        aria-labelledby="tool-title"
        className="relative overflow-hidden px-4 pt-[108px] pb-16 sm:px-6 sm:pt-[132px] sm:pb-20"
      >
        <DotGridBackground height={760} />
        <div className="relative mx-auto max-w-[880px]">
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
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
                <Link href="/tools" className="hover:text-ink">
                  Free tools
                </Link>
              </li>
              <li aria-hidden>
                <IconChevronRight size={13} />
              </li>
              <li aria-current="page" className="text-ink-secondary">
                {tool.name}
              </li>
            </ol>
          </nav>

          <header className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            <Eyebrow>Free Reddit tool</Eyebrow>
            <h1
              id="tool-title"
              className="mt-4 font-heading text-[36px] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-ink sm:text-[50px]"
            >
              {tool.name}
            </h1>
            <p className="mt-4 text-[17px] leading-[27px] text-pretty text-ink-secondary sm:text-lg sm:leading-7">
              {tool.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-3.5 gap-y-1 text-[13px] text-muted-foreground">
              {trustPoints.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <IconCircleCheckFilled size={14} className="text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-10">
            <ToolWidget slug={tool.slug} />
          </div>
        </div>
      </section>

      {/* Guide */}
      <article aria-label={`About the ${tool.name}`} className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-[720px] border-t border-hairline pt-4">
          <Guide />
          <ArticleFaq faqs={tool.faqs} />
          <AuthorBox />
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>

      {/* More tools */}
      <section
        aria-labelledby="more-tools-title"
        className="border-t border-hairline bg-surface px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-[1120px]">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <Eyebrow>Free tools</Eyebrow>
              <h2
                id="more-tools-title"
                className="m-0 font-heading text-[28px] leading-[1.15] font-bold tracking-[-0.025em] text-ink sm:text-[32px]"
              >
                More free Reddit tools
              </h2>
            </div>
            <Link href="/tools" className="text-[14px] font-medium text-ink hover:text-primary">
              See all tools
            </Link>
          </header>
          <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
            {getOtherTools(tool.slug).map((other) => (
              <li key={other.slug}>
                <ToolCard tool={other} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
