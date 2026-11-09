# Free tools

Free Reddit tools at `karmicup.com/tools`. Like the blog, they exist to bring founders and makers from Google and LLM answers, then move them to Karmicup (`/register`) and to [MentioHunt](https://mentiohunt.com) (see `AGENTS.md`).

## How a tool is built

| Piece | Where |
| --- | --- |
| Registry entry: SEO title, description, tagline, FAQ, related guides | [`registry.ts`](./registry.ts) |
| Guide shown under the tool (MDX, body only, same components as the blog) | `content/tools/<slug>.mdx` |
| Interactive widget (client component) | `components/tools/widgets/<name>.tsx`, mapped by slug in `components/tools/tool-widget.tsx` |
| Public API route (no session, GET, short cache) | `app/api/tools/<name>/route.ts` |
| Reddit logic (server only, uses `redditFetch`) | `lib/tools/reddit-tools.ts` |
| Hub card preview (static mock) | `components/tools/tool-preview.tsx` |

Pages are generated from the registry: `/tools` (hub) and `/tools/<slug>` (`app/tools/[slug]/page.tsx`). Metadata, `WebApplication` + `BreadcrumbList` + `FAQPage` structured data and the sitemap update automatically. Add new tools to the footer's "Free tools" column and to `public/llms.txt`.

## Current tools

| Tool | Slug | API route | Primary keyword |
| --- | --- | --- | --- |
| Reddit Karma Checker | `reddit-karma-checker` | `/api/tools/karma?username=` | reddit karma checker |
| Reddit Shadowban Checker | `reddit-shadowban-checker` | `/api/tools/shadowban?username=` | reddit shadowban checker |
| Subreddit Requirements Checker | `subreddit-requirements-checker` | `/api/tools/subreddit?subreddit=&username=` | subreddit requirements |

## Rules

- **Public data only.** Tools read Reddit's public JSON endpoints through `redditFetch` (app-only OAuth, see "Reddit API Calls" in `AGENTS.md`): the same data a logged-out visitor sees. No Reddit login for visitors, and nothing is stored.
- **Honest results.** Say what a tool can't see (private AutoModerator rules, subreddit karma, CQS). Never promise a post won't be removed.
- **Shareable results.** Widgets keep their input in the URL (`?u=<username>`, `?r=<subreddit>`) and run on load, so results can be shared and tools can link to each other prefilled.
- **Chain the tools.** Every result ends with "Next step" links to the other tools.
- **CTAs.** One Karmicup CTA and one MentioHunt CTA per guide. MentioHunt links use `placement="tools"` and `content="<slug_in_snake_case>"`, built with `MentiohuntLink` / `MentiohuntCta` (never a hardcoded URL).
- **Don't compete with a blog article.** A tool page targets the "tool" query ("reddit karma checker"); the related article keeps the informational query ("how to check reddit karma"). Link both ways.
