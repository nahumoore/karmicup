# SEO keywords

Keyword research for karmicup.com. Google and LLMs are the main acquisition channels.

## Source

- **Tool:** DataForSEO, `kw_data_google_ads_search_volume` (Google Ads / Keyword Planner data).
- **Location / language:** United States, English.
- **Period:** October 2025 – September 2026 (12 months). Pulled on 2026-11-07.
- DataForSEO calls are billed: see "Paid SEO data tools" in `AGENTS.md` before running new queries.

### How to read these numbers

- Google Ads volumes are **bucketed**: 8,100 means roughly 6,600–9,900, not an exact count.
- Close variants share one volume. "how to get karma on reddit" and "how to get reddit karma" are the **same demand**, not 16K combined.
- **US only.** Global volume is higher (UK, Canada, India…).
- "Competition" is **advertiser** competition in Google Ads, not organic ranking difficulty.

## Results

| Keyword | Monthly searches (US) | Ads competition | CPC | 12-month trend |
| --- | ---: | --- | ---: | --- |
| how to get karma on reddit | 8,100 | Low | – | Stable (peak 9,900 in May 2026) |
| how to get reddit karma | 8,100 | Low | – | Same demand as above |
| reddit karma | 2,900 | Low | – | Stable, 2,900–3,600 |
| buy reddit upvotes | 1,600 | Low | $10.10 | Falling: 2,400–2,900 (Oct 2025–Jan 2026) → 590–720 (Jul–Sep 2026) |
| reddit upvotes | 1,000 | Low | $10.91 | Stable, 880–1,300 |
| free reddit upvotes | 110 | Low | – | Stable, 70–170 |
| free reddit karma | 110 | Low | – | Stable, 70–140 |
| reddit engagement | 110 | Low | – | Stable, 90–170 |
| get reddit karma fast | 10 | Low | – | Negligible |
| reddit upvote exchange | 10 | Low | – | Negligible |

**Requested but no data returned:** reddit marketing, how to promote on reddit, reddit karma farming, how to get upvotes on reddit, reddit upvote bot, upvote exchange. Either no volume or not returned by the API; re-check before ruling them out.

## Takeaways

- **The big demand is informational:** "how to get karma on reddit" (~8K) and "reddit karma" (~3K). This needs a long-form guide, not the landing page.
- **Landing page targets "reddit upvotes" + "reddit karma".** Home title is now "Free Reddit Upvotes & Karma From Real Users". "free reddit upvotes" is small (110) but it's the closest intent to the product.
- **"buy reddit upvotes" is shrinking** but has commercial intent (CPC ~$10). A "free alternative to buying Reddit upvotes" page can capture it.
- **"upvote exchange" is barely searched**: don't build positioning around that term.

## Mapping

| Page | Primary keyword | Secondary | Status |
| --- | --- | --- | --- |
| `/` (home) | reddit upvotes | reddit karma, free reddit upvotes, free reddit karma | Done (title/description updated) |
| `/blog/how-to-get-karma-on-reddit` | how to get karma on reddit | how to get reddit karma, free reddit karma | Published |
| `/blog/what-is-reddit-karma` | reddit karma | what is reddit karma, how does reddit karma work, how to check reddit karma | Written, in review |
| Free alternative to buying Reddit upvotes | buy reddit upvotes | reddit upvotes, free reddit upvotes | To do |

Every content page should include a contextual CTA to MentioHunt (see "MentioHunt links" in `AGENTS.md`).

Topical map, article list and writing rules: [`content/blog/README.md`](../../content/blog/README.md). Pillar 1 (Reddit karma) is in progress.

## Next research (needs approval: billed)

- Keyword difficulty for the two "to do" pages (DataForSEO Labs `bulk_keyword_difficulty`).
- Current SERP top 10 for "how to get karma on reddit" (`serp_organic_live_advanced`).
- Related keyword ideas around Reddit marketing / promoting a product on Reddit (`dataforseo_labs_google_keyword_ideas`).
- Global volume (no location filter) for the main keywords.
