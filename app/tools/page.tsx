import { ArticleFaq } from "@/components/blog/article-faq";
import { KarmicupCta, MentiohuntCta } from "@/components/blog/blog-ctas";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Eyebrow, SectionHeader } from "@/components/landing/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { DotGridBackground } from "@/components/tools/dot-grid-background";
import { ToolCard } from "@/components/tools/tool-card";
import { TOOL_ICONS } from "@/components/tools/tool-preview";
import { BLOG_POSTS } from "@/content/blog/posts";
import { FREE_TOOLS, getTool, TOOLS_HUB_FAQS } from "@/content/tools/registry";
import { buildPageMetadata } from "@/consts/seo-metadata";
import { buildToolsHubStructuredData } from "@/consts/structured-data";
import { IconArrowRight, IconCircleCheckFilled } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata("tools", {
  path: "/tools",
  absoluteTitle: true,
});

const trustPoints = ["100% free", "No signup or Reddit login", "Nothing stored"];

/** The order we recommend running the tools in before posting. */
const PRE_POST_CHECK = [
  {
    slug: "reddit-shadowban-checker",
    step: "Can people see you?",
    text: "A shadowbanned account posts into the void. Rule it out first.",
  },
  {
    slug: "reddit-karma-checker",
    step: "Where do you stand?",
    text: "Your total, post and comment karma, and how old your account is.",
  },
  {
    slug: "subreddit-requirements-checker",
    step: "Can you post here?",
    text: "The community's published requirements and self-promotion rules, checked against your account.",
  },
];

export default function ToolsHubPage() {
  const guides = [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <main className="min-h-screen bg-white text-ink">
      <JsonLd data={buildToolsHubStructuredData(FREE_TOOLS, TOOLS_HUB_FAQS)} />
      <Navbar />

      {/* Header + tools */}
      <section
        aria-labelledby="tools-title"
        className="relative overflow-hidden px-4 pt-[124px] pb-20 sm:px-6 sm:pt-[148px] sm:pb-24"
      >
        <DotGridBackground />
        <div className="relative mx-auto max-w-[1120px]">
          <header className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <p className="m-0 flex items-center gap-3.5 text-xs font-semibold tracking-[0.16em] text-ink-secondary uppercase">
              <span aria-hidden className="h-px w-8 bg-[#C9C9C5]" />
              Free Reddit tools
              <span aria-hidden className="h-px w-8 bg-[#C9C9C5]" />
            </p>
            <h1
              id="tools-title"
              className="mt-5 font-heading text-[38px] leading-[1.06] font-bold tracking-[-0.03em] text-balance text-ink sm:text-[54px]"
            >
              Check your account <span className="text-primary">before you post.</span>
            </h1>
            <p className="mt-5 max-w-[620px] text-lg leading-7 text-pretty text-ink-secondary">
              Free tools to see your Reddit karma, spot a shadowban and find out what a
              subreddit requires, so your next post doesn&apos;t get removed in silence.
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-3.5 gap-y-1 text-[13px] text-muted-foreground">
              {trustPoints.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <IconCircleCheckFilled size={14} className="text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </header>

          <ul className="m-0 mt-14 grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            {FREE_TOOLS.map((tool) => (
              <li key={tool.slug}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pre-post check */}
      <section
        aria-labelledby="pre-post-title"
        className="border-y border-hairline bg-surface px-4 py-20 sm:px-6 sm:py-24"
      >
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <SectionHeader
            id="pre-post-title"
            eyebrow="How to use them"
            title="A one-minute check before every post"
            description="Most removed posts fail for a reason you could have spotted beforehand. Run these three checks in order and you'll know before Reddit's filters do."
          />
          <ol className="m-0 flex list-none flex-col gap-3 p-0">
            {PRE_POST_CHECK.map(({ slug, step, text }, index) => {
              const tool = getTool(slug);
              if (!tool) return null;
              const Icon = TOOL_ICONS[tool.preview];
              return (
                <li key={slug}>
                  <Link
                    href={`/tools/${slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-colors hover:border-primary/40 sm:p-5"
                  >
                    <span className="font-heading text-[28px] leading-none font-bold text-[#D5D5D1] tabular-nums transition-colors group-hover:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-primary">
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-muted-foreground">
                        {step}
                      </span>
                      <span className="block font-heading text-[18px] leading-snug font-bold tracking-[-0.015em] text-ink">
                        {tool.name}
                      </span>
                      <span className="mt-0.5 block text-[14px] leading-[22px] text-ink-secondary">
                        {text}
                      </span>
                    </span>
                    <IconArrowRight
                      size={18}
                      className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Guides + FAQ */}
      <section aria-labelledby="tools-guides-title" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Guides</Eyebrow>
            <h2
              id="tools-guides-title"
              className="mt-3.5 mb-6 font-heading text-[28px] leading-[1.15] font-bold tracking-[-0.025em] text-ink sm:text-[32px]"
            >
              The rules behind the numbers
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {guides.map((post) => (
                <li key={post.slug}>
                  <article className="group relative rounded-xl border border-border bg-white p-5 transition-colors hover:border-[#D5D5D1]">
                    <h3 className="m-0 font-heading text-[18px] leading-[1.3] font-bold tracking-[-0.015em] text-ink">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="after:absolute after:inset-0 group-hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="m-0 mt-1.5 text-[14px] leading-[22px] text-ink-secondary">
                      {post.excerpt}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
          <div className="[&>section]:mt-0">
            <ArticleFaq faqs={TOOLS_HUB_FAQS} />
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section aria-label="From the Karmicup team" className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-[1120px] gap-5 md:grid-cols-2">
          <KarmicupCta className="my-0" title="Passed the checks? Get your post seen.">
            <p>
              New posts get buried in minutes. Karmicup members read and engage with each
              other&apos;s Reddit posts, so yours gets its first real upvotes and comments.
            </p>
          </KarmicupCta>
          <MentiohuntCta
            className="my-0"
            placement="tools"
            content="tools_hub"
            title="Reddit gets you traffic. Backlinks get you rankings."
          >
            <p>
              Links from Reddit are <code className="font-mono text-[14px]">nofollow</code>.
              MentioHunt finds websites where your pages fit and runs the backlink outreach
              for you.
            </p>
          </MentiohuntCta>
        </div>
      </section>

      <Footer />
    </main>
  );
}
