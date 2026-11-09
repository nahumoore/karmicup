# Blog content

Articles for karmicup.com live in this folder. The goal is to build **topical authority** in Google and LLM answers around Reddit growth, and to move readers toward [MentioHunt](https://mentiohunt.com), the main SaaS that Karmicup is a lead magnet for (see `AGENTS.md`).

Keyword data and research history: [`tickets/seo/keywords.md`](../../tickets/seo/keywords.md). Each article starts with a brief (SERP research + outline) in [`tickets/seo/briefs/`](../../tickets/seo/briefs/), named after the article slug.

## How the blog works

- **Articles** are MDX files in this folder (`<slug>.mdx`), compiled at build time by `@next/mdx` (config in `next.config.ts`, with `remark-gfm` for tables and `rehype-slug` for heading ids).
- **The registry** is [`posts.ts`](./posts.ts): title, SEO title, description, dates, reading time and FAQ for every article, plus a loader per slug. The page renders the H1, byline, FAQ and author box from it, so the `.mdx` file only contains the body (it starts with the intro, no H1).
- **Routes**: `/blog` (index, `app/blog/page.tsx`) and `/blog/<slug>` (`app/blog/[slug]/page.tsx`, statically generated). Unknown slugs return 404.
- **SEO** is automatic from the registry: metadata (`buildArticleMetadata`), JSON-LD with `BlogPosting`, `BreadcrumbList` and `FAQPage` (`buildArticleStructuredData`), and the sitemap.
- **Styling** of markdown elements lives in `mdx-components.tsx` (project root). Article components live in `components/blog/`:
  - `<InThisGuide>`: table of contents box (wrap a markdown list of `#heading-id` links).
  - `<Callout variant="tip" | "warning" | "update" title="...">`.
  - `<CommentExample post bad good />`: weak vs strong Reddit comment.
  - `<KarmaFlow />`: diagram of how karma works.
  - `<KarmicupCta>` and `<MentiohuntCta content="<slug_in_snake_case>">`.
  - `<ArticleImage src alt width height caption credit />`: image with caption and license credit.
  - `<YouTubeEmbed id title channel channelUrl duration />`: click-to-load video (only the thumbnail loads until the reader clicks).
- **Cover image**: optional `cover` in the registry entry. It's shown under the header and added to the `BlogPosting` structured data.

## Images and videos

- Store images in `public/blog/<slug>/` as compressed WebP (max ~1200px wide), with descriptive file names and `alt` text.
- **Only use images we're allowed to use**: our own screenshots and diagrams, public domain, or Creative Commons licenses that allow commercial use (CC0, CC BY, CC BY-SA). Never copy images from other blogs or from Google Images results. [Openverse](https://openverse.org) and [Wikimedia Commons](https://commons.wikimedia.org) are good sources.
- CC images need a `credit` (author, license and source link). Set `modified: true` when the image was cropped or edited.
- Embed YouTube videos with `<YouTubeEmbed>` only when the video adds something the text can't, and check it doesn't contradict the article (e.g. no "karma farming" videos).

## Topical map

The content is organized in four pillars. Each pillar has one long-form **pillar article** and several **cluster articles** that link back to it.

| # | Pillar | Role | Status |
| --- | --- | --- | --- |
| 1 | Reddit karma | Volume and base authority | **In progress** |
| 2 | Reddit upvotes & engagement | Commercial intent, closest to the product | Planned |
| 3 | Reddit marketing for founders | MentioHunt's audience | Planned |
| 4 | Reddit for SEO & AI visibility | Bridge to MentioHunt (Reddit links are `nofollow`, so they bring visibility but not backlinks) | Planned |

Don't write pure backlink/link-building articles here: that topic belongs to MentioHunt's own blog, and we would compete with it. Pillar 4 only covers the *bridge* between Reddit and SEO.

## Pillar 1: Reddit karma

Volumes are monthly US searches from Google Ads (bucketed). "–" means the keyword wasn't checked yet. Validate these before writing (DataForSEO is billed, see `AGENTS.md`).

| Priority | Article | Slug | Primary keyword | Secondary keywords | Volume (primary) | Status |
| ---: | --- | --- | --- | --- | ---: | --- |
| 1 | **How to Get Karma on Reddit** (pillar) | `how-to-get-karma-on-reddit` | how to get karma on reddit | how to get reddit karma, free reddit karma, get reddit karma fast | 8,100 | Published |
| 2 | What Is Reddit Karma and How Does It Work? | `what-is-reddit-karma` | reddit karma | what is reddit karma, how does reddit karma work, how to check reddit karma, what is karma used for | 2,900 | Published |
| 3 | Reddit Karma Requirements: How Much Karma You Need to Post | `reddit-karma-requirements` | reddit karma requirements | minimum karma to post on reddit, how much karma to post, account age requirement | – | To do |
| 4 | Why Can't I Post on Reddit? (New Account Restrictions) | `why-cant-i-post-on-reddit` | why can't i post on reddit | new reddit account can't post, post removed automatically, automod removed post | – | To do |
| 5 | Reddit Contributor Quality Score (CQS) Explained | `reddit-contributor-quality-score` | reddit contributor quality score | reddit cqs, how to check cqs, improve cqs | – | To do |
| 6 | How to Get Comment Karma on Reddit | `how-to-get-comment-karma` | how to get comment karma on reddit | comment karma, karma from comments | – | To do |
| 7 | Post Karma vs Comment Karma | `post-karma-vs-comment-karma` | post karma vs comment karma | link karma, awarder karma, awardee karma | – | To do |
| 8 | Why Is My Reddit Karma Not Going Up? | `reddit-karma-not-increasing` | reddit karma not increasing | reddit karma not updating, karma stuck, vote fuzzing | – | To do |
| 9 | Best Subreddits for New Reddit Accounts | `subreddits-for-new-accounts` | subreddits for new accounts | subreddits to get karma, beginner friendly subreddits, subreddits with no karma requirement | – | To do |
| 10 | Reddit Karma Farming: Why It Gets Accounts Banned | `reddit-karma-farming` | reddit karma farming | karma farm subreddits, is karma farming allowed, buy reddit karma | – | To do |
| 11 | How to Check if You're Shadowbanned on Reddit | `reddit-shadowban-check` | reddit shadowban check | am i shadowbanned on reddit, reddit shadowban | – | To do |

### Linking inside the pillar

- Every cluster article links to the pillar (`how-to-get-karma-on-reddit`) in its first section, using a natural anchor that includes "karma".
- The pillar links out to every cluster article from the relevant section (for example, the "karma requirements" section links to `reddit-karma-requirements`).
- Related cluster articles link to each other (CQS ↔ shadowban ↔ why can't I post; post vs comment karma ↔ comment karma).
- Articles 3 and 9 can later grow into programmatic pages (one page per subreddit with its karma/age requirements).

### Bridge to the rest of the funnel

- **Karmicup CTA**: every article points to the signup page (`/register`) where it fits the reader's problem (getting first upvotes and comments from real users).
- **MentioHunt CTA**: readers who build karma usually want to promote a product. Add one contextual CTA per article, for example: "Reddit links are `nofollow`. If you want backlinks that grow your Google rankings, MentioHunt finds sites that fit your pages and handles the outreach."

## Writing rules

- **English** only, US spelling.
- **Honest positioning.** Reddit bans vote manipulation and karma farms. Never promise "fast karma", "guaranteed upvotes" or ways around subreddit rules. Karmicup is presented as a community of real users who engage with each other, and the advice must still work for someone who never signs up.
- **Search intent first.** Answer the query in the first 2–3 sentences (this is also what LLMs quote), then go deeper.
- **One primary keyword per article.** Don't target another article's primary keyword: if two articles compete for the same query, merge them.
- **Structure**: one `h1` (the title), `h2`/`h3` for sections, a short FAQ at the end when there are real follow-up questions (add `FAQPage` structured data for it).
- **Facts**: link to Reddit's official help pages (reddithelp.com) for rules and definitions. Add an "Updated on" date and refresh articles when Reddit changes how karma works.
- **Internal links (research them for every article).** Before publishing, run `node .claude/skills/blog-article/scripts/link-audit.mjs` (link matrix) and `--find <slug> "<keyword>" …` (mentions in other articles) to find where links fit, then link in **both directions**:
  - The new article links to every published article it relates to (at least the pillar, in its first section), deep-linking to the section that answers the reader's question (`/blog/<slug>#<section-id>`).
  - Every related published article gets at least one contextual link to the new one (bump its `updatedAt`).
  - Natural, descriptive anchors (never "click here"), one link per target section, and no link to unpublished articles.
  - Every article also gets the "Keep reading" block at the end automatically (`RelatedPosts`: same pillar first), and new articles go in the footer's "Guides" column (`components/landing/footer.tsx`).
- **External authority links: 3–5 per article, dofollow.** Links to high-authority third-party sites only (major media like TechCrunch or The Verge, research like PubMed/Science, Wikipedia, official institutions), each one backing a specific claim. Plain markdown links render dofollow (`rel="noopener noreferrer"`, no `nofollow`): never add `nofollow`/`ugc`/`sponsored`. Reddit's own pages (reddithelp.com, redditinc.com, reddit.com) are primary sources: use them for rules and definitions, but they don't count toward the 3–5. Never link to competitors (karma tools, Reddit-marketing SaaS) or low-authority blogs.
- **Length**: as long as the topic needs. The pillar is long-form (2,500+ words); cluster articles are usually 1,000–1,800 words.
- **Author**: Nicolas (`FOUNDER` in `consts/seo-metadata.ts`), linking to `/about`.

## MentioHunt links

Follow "MentioHunt links" in `AGENTS.md`: never hardcode the URL. Use `<MentiohuntLink>` from `@/components/mentiohunt-link` with:

- `placement="blog"`
- `content="<article_slug_in_snake_case>"` (for example `how_to_get_karma_on_reddit`)

## Publishing checklist

1. Brief in `tickets/seo/briefs/<slug>.md` (SERP research + outline).
2. `<slug>.mdx` added to this folder (body only, no H1).
3. Entry added to `BLOG_POSTS` and a loader to `POST_LOADERS` in `posts.ts`: title, SEO title (under ~60 characters), description (120–160 characters), excerpt, pillar, primary keyword, dates, reading time, FAQ. The sitemap, metadata and structured data update automatically.
4. Internal link research done (`link-audit.mjs`): links in both directions with every related published article, plus the footer "Guides" link.
5. 3–5 dofollow external links to high-authority third-party sites.
6. One Karmicup CTA and one MentioHunt CTA.
7. When updating an article, change `updatedAt`.
8. Status updated in the tables above and in `tickets/seo/keywords.md`.
