---
name: blog-article
description: Research, brief and write a Karmicup blog article end to end (topical map → SERP check → UGC questions → videos and licensed images → brief → MDX article → internal/external links → build check). Use when Nicolas asks for "the next article", "a new blog post", "write the article about X", "create the brief/outline for X", or to continue the content plan in content/blog/README.md.
---

# Blog article workflow

The repeatable process for every article on karmicup.com/blog. Chat with Nicolas in Spanish; everything written to files (brief, article, code, commits, PRs) is in English.

Read these first, every time. They hold the rules this skill applies and are kept up to date:

- `AGENTS.md` (MentioHunt links, DataForSEO confirmation, design system).
- `content/blog/README.md` (topical map, writing rules, link rules, publishing checklist).
- `tickets/seo/keywords.md` (keyword data and page mapping).
- The latest brief in `tickets/seo/briefs/` and the latest `.mdx` in `content/blog/`, as models of format and tone.

The workflow has 3 stops where Nicolas decides. Don't skip them:

1. **Pick the article** → he confirms the topic.
2. **Paid research** → he says "yes" to each DataForSEO call.
3. **Brief done** → he says "write it" before the article is written. (If he asked for everything in one go, continue, but still stop for stop 2.)

## Step 1: Pick the next article

- Open the topical map in `content/blog/README.md`. The next article is the lowest-priority-number row with status "To do" in the pillar marked **In progress**, unless Nicolas names one.
- Check `tickets/seo/keywords.md` for volume and for commercial pages marked "To do" that could compete for priority.
- Tell Nicolas which one and why (volume, how it supports the pillar, closeness to the product). Mention alternatives in one line.
- Check that statuses match reality (for example an article that is live but still marked "Written, in review") and fix them in the same PR.

## Step 2: Research

### 2a. SERP check (DataForSEO, billed: ask first)

Ask before every call, naming endpoint, keyword, location and why. Default call once approved:

- `serp_organic_live_advanced`: `keyword=<primary>`, `location_name="United States"`, `language_code="en"`, `depth=10`, `people_also_ask_click_depth=1`.

Extract: AI Overview (what it says and which sources it cites), "What people are saying", People Also Ask questions, the top 10 (type: Reddit thread / video / publisher / SaaS blog; age; comments), and which slots publishers hold. Organic URLs come back as `google.com/goto` redirects: use the titles and `website_name` to identify them.

Optional, also billed and only with a separate "yes": `dataforseo_labs_bulk_keyword_difficulty` for primary + secondary keywords.

### 2b. Competitors (free)

Launch one `web-fetch` agent in the background with 4–6 competitor URLs (from the SERP plus a web search for close variants like "what is X"). Ask for: date, word count, H2/H3 list, FAQ questions, tables/images/videos, factual claims, weaknesses. Keep working while it runs.

### 2c. What people ask (free)

- `WebSearch` with `allowed_domains: ["quora.com"]` for the topic.
- reddit.com and reddithelp.com **block** WebSearch domain filters and fetches (403/400). Use the Reddit threads from the SERP, plus general searches (Reddit mirrors and snippets show up there).
- Merge PAA + Reddit + Quora questions into the FAQ candidates. Only keep questions you can answer with a source.

### 2d. Videos (free)

- `WebSearch` with `allowed_domains: ["youtube.com"]`.
- Get exact title and channel from oEmbed: `curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json"` (`unavailable` = private/removed, drop it).
- Prefer the video Google's AI Overview cites. Reject "fast karma"/farming videos. You can't watch videos: tell Nicolas to watch the chosen one before publishing, and **never invent the `duration` prop** (leave it out unless known).

### 2e. Images (free, licensed only)

**Never use Google Images results.** Only our own screenshots, public domain, or CC licenses that allow commercial use (CC0, CC BY, CC BY-SA). Search with the helper:

```bash
node .claude/skills/blog-article/scripts/search-images.mjs "reddit logo" --wide
node .claude/skills/blog-article/scripts/search-images.mjs "reddit screenshot" --commons
```

Then download candidates to the scratchpad, convert to PNG previews with `process-image.mjs --preview` (the image viewer rejects some JPEGs), look at them, and pick:

- **Cover:** landscape (16:9 crop), clearly about the topic, not used by another article (check `public/blog/*/`).
- **In-article:** something that proves a point in the text (for example a deleted post that still shows its score).
- **Screenshots of Nicolas's own profile/UI** are the best option when the step is "how to do X in Reddit": list them as a request to Nicolas.

### 2f. Facts to verify

Note every claim competitors disagree on, and verify with primary sources (Reddit help center, r/modnews, redditinc.com) via web search. If it can't be verified, write it cautiously ("Reddit doesn't document this") or drop it, and list it for Nicolas.

## Step 3: Brief

Write `tickets/seo/briefs/<slug>.md` following `references/brief-template.md`. Then set the article's status to "Brief ready" in `content/blog/README.md`.

Report to Nicolas in Spanish: what ranks, what people ask, the outline in short, chosen videos/images, and what he must check manually. Wait for "write it".

## Step 4: Write the article

### Files

1. `content/blog/<slug>.mdx`: body only (no H1). Copy the import block from an existing article and keep only the components you use.
2. `content/blog/posts.ts`: add the entry to `BLOG_POSTS` (title, seoTitle ≤ ~60 chars, description 120–160 chars, excerpt, pillar, primaryKeyword, dates, readingMinutes ≈ words/220, cover with credit, 5–8 FAQs as plain text) and the loader to `POST_LOADERS`.
3. Images in `public/blog/<slug>/`, WebP, ≤ 1200px wide, descriptive file names:

```bash
pnpm install   # once per worktree: sharp comes with Next.js
node .claude/skills/blog-article/scripts/process-image.mjs <input> public/blog/<slug>/<name>.webp --crop 0,122,1024,576 --width 1200
```

   Set `modified: true` in the credit when you crop. Use the real output size for `width`/`height`.

### Content rules (summary; the README is authoritative)

- First 2–3 sentences answer the query (bolded definition), then link the pillar in the first section with an anchor containing the pillar keyword.
- `<InThisGuide>` with links to H2 ids (ids are slugified headings: lowercase, punctuation removed, spaces → `-`).
- Tables for comparisons and "what does my number mean" questions. Reuse existing components (`KarmaFlow`, `CommentExample`, `Callout`) before creating new ones.
- Honest positioning: no "fast/free karma" promises, no ways around subreddit rules.
- One `<KarmicupCta>` and one `<MentiohuntCta content="<slug_in_snake_case>">`, with a bridge from the article's topic to backlinks/SEO.
- Don't put a block component (`ArticleImage`, `Callout`) in the middle of a markdown list: it splits the list.
- Don't cannibalize: other articles' primary keywords get a short section + link, not a full treatment.

### Links

- **Internal:** the new article ↔ pillar (and ↔ related clusters) with natural anchors, deep-linking to section ids when useful. Add a contextual link from the pillar (and bump its `updatedAt`). Add the article to the footer "Guides" column in `components/landing/footer.tsx`. "Keep reading" (`RelatedPosts`) is automatic. Only link to published articles.
- **External authority: max 3 per article**: major media (TechCrunch, The Verge…), research (PubMed, Science), Wikipedia, each backing a specific claim. Reddit's own pages don't count toward the limit. Never link competitors. Check the pillar stays ≤ 3 too.

## Step 5: Verify

```bash
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=dummy SUPABASE_SECRET_KEY=dummy pnpm build
```

(The dummy env vars are only needed because worktrees have no `.env.local`.) Then check `.next/server/app/blog/<slug>.html`:

- The route is listed under `/blog/[slug]` in the build output.
- Heading ids exist for every `InThisGuide` link: `grep -oE 'id="[a-z0-9-]+"'`.
- MentioHunt link has `utm_campaign=blog&utm_content=<slug_snake>` and `rel="noopener"` (no nofollow/noreferrer).
- `BlogPosting`, `FAQPage`, `BreadcrumbList` JSON-LD present; "Keep reading" present.
- Link counts per article: `grep -oE '\]\((https?://[^)]+)\)' content/blog/<slug>.mdx` → third-party domains ≤ 3.

Also run `npx eslint` on touched files.

## Step 6: Wrap up

- Statuses: article "Written, in review" (or "Published" once merged and live) in `content/blog/README.md` and the mapping table of `tickets/seo/keywords.md`.
- Tell Nicolas (Spanish): what was written, the links added, the images and their licenses, and the list of things he must check by hand (video content, UI steps, unverified facts, screenshots to take).
- Commit and open the PR only when he asks. Branch first if on `main`.

## Gotchas learned the hard way

- `python` isn't installed on this machine: use `node` for scripts and JSON parsing.
- Openverse anonymous `page_size` max is 20 and it returns 504 now and then: retry once, or fall back to Wikimedia Commons.
- sharp applies `resize` before `composite` in one pipeline: composite to a buffer first, then resize in a second pipeline.
- Some repo files are CRLF: string replacements in Node scripts may miss. Use the Edit tool for existing files.
- Bash `cd` into the scratchpad resets the shell cwd; pass absolute paths instead.
- Inside `node -e "..."` strings, write Windows paths as `C:/Users/...`: Git Bash only converts `/c/...` paths when they are separate command arguments.
