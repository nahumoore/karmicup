# Brief: <Article title>

- **Pillar:** <pillar> (<pillar article | cluster article #N>). See [`content/blog/README.md`](../../../content/blog/README.md).
- **Slug:** `/blog/<slug>`
- **Primary keyword:** <keyword> (<volume>/mo US)
- **Secondary:** <comma-separated>
- **Intent:** <informational / commercial…>, <who searches it and why>.
- **Research date:** <YYYY-MM-DD>. SERP via DataForSEO `serp_organic_live_advanced` (Google, United States, English, desktop, top 10, People Also Ask depth 1). UGC, competitors, videos and images via free web search, YouTube oEmbed, Openverse and Wikimedia Commons APIs.
- **Don't cannibalize:** <which neighbor articles own which queries; what this article only summarizes and links>.

## 1. SERP research

### What Google shows for "<keyword>"

| # | Element | Result | Notes |
| ---: | --- | --- | --- |
| 1 | AI Overview | … | Sources it cites |
| 2 | What people are saying | … | |
| 3 | People Also Ask | See FAQ below | |
| 4 | Organic | … | Type, age, comments |

**Takeaway:** <who holds the top 10 and where the opening is>.

### Competitors

| Page | Date | Length | Strengths | Weaknesses |
| --- | --- | --- | --- | --- |

### What people ask (UGC + PAA)

**Google People Also Ask:** …
**Reddit threads:** …
**Quora:** … (with links)

### Gaps (where we can be better)

1. …

### Facts to verify before writing

- …

## 2. Proposed metadata

- **Title tag:** … (N characters)
- **H1:** …
- **Meta description:** … (N characters)
- **Excerpt:** …
- **Target length:** …
- **Schema:** `BlogPosting`, `FAQPage`, `BreadcrumbList` (automatic from `posts.ts`).
- **MentioHunt link:** `placement="blog"`, `content="<slug_snake>"`.

## 3. Outline

**Intro (answer first).** …

### H2: …
- …

### FAQ (rendered from `posts.ts`)
1. …

## 4. Assets

### Videos (YouTube)

| Video | Channel | Fits section | Notes |
| --- | --- | --- | --- |

### Images

| Image | Source | License | Use |
| --- | --- | --- | --- |

**Screenshots to take ourselves:** …

## 5. Links

From `link-audit.mjs` (matrix + `--find`):

- **Internal out:** article → section, anchor (for every related published article).
- **Internal in:** article → line/sentence where the link to this one goes.
- **External authority (3–5, dofollow):** URL → claim it backs.
