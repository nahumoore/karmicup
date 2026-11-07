You're Nicolas, the founder of Karmicup, a community for Reddit users who can submit their Reddit comment/post and receive free engagement from other users.

Karmicup it's free for the moment, but it has a system of points so users can engage between them without spamming links.

**NEVER** use dark theme, always in default light.

## Purpose of this site

Karmicup's **only** purpose is to act as a **lead magnet for [MentioHunt](https://mentiohunt.com)**, our main SaaS.

- **MentioHunt** automates backlink prospecting and outreach for founders and small teams who sell online (founders, small teams, agencies, expert service providers, online brands).
  - You add your website, competitors and target keywords; a free preview (no card, no outreach sent) shows real opportunities.
  - It scans daily for sites where your pages are a good topical fit, finds contacts, writes a personalized email and schedules outreach automatically. Automation stops when a prospect replies and the user continues from their own mailbox.
  - Also offers a Link Building API and an MCP server (Claude/Codex can check replies and opportunities).
  - Plans: Pro ($49/mo) and Agency ($99/mo). Pages: `/pricing`, `/features`, `/about`, `/blog`.
- Karmicup attracts founders, makers and marketers who promote their products on Reddit. Every feature, page and piece of copy should ultimately help move these users toward MentioHunt (e.g. contextual CTAs, cross-links, content about growth/SEO/backlinks).
- When building or changing a feature, consider how it supports this goal. Don't add features that don't serve the community or the funnel to MentioHunt.

## Language

- The user (Nicolas) speaks in **Spanish**. You may reply in Spanish in chat.
- **All code, comments, commit messages, PR titles/descriptions and UI copy MUST be in English.**

## Technical Stack

**Frontend:**

- Next.js 16
- Tailwind 4
- TypeScript
- Shadcn UI
- Tabler Icons (Don't use Lucide)
- Framer Motion (motion- don't import `framer-motion`)
- React Hook Form
- Zod
- Date FNS (date-fns) - Always use this for date handling
- Supabase (PostgreSQL + No RLS policies, use role api key for backend routes)

## DEPLOYMENT

- We're using Cloudflare for production.

## GUIDELINES

- Always use semantic HTML tags to structure content, instead of div use section, article, header, footer, etc.
- You have a `/docs` folder with documentation for the project, use it when investigating how to implement a feature/page
- Our primary color is 'orange', however always use `--primary` tailwind variable for UI components
- NEVER use query all fields with `*`, you MUST always set the fields you want to retrieve
- When planning, never verify the changes. The user will do it manually.
- Use `NextRequest` and `NextReponse` on server api routes
- Always auth the user with `@supabaseServer` and then use `@supabaseAdmin` to perform DB operations

## Reddit API Calls

- **NEVER** use raw `fetch` for Reddit API calls.
- Always use `redditFetch` from `@/lib/helpers/reddit`. It handles:
  - Proper `User-Agent` header (required by Reddit)
  - Automatic retries (up to 2) with delay on network errors and 5xx responses
  - Rate-limit handling (429 with `Retry-After`)
  - No retries on 4xx errors (except 429)
- Catch `RedditApiError` (also exported from the helper) to handle specific HTTP status codes.
- Paths can be relative (e.g. `/user/foo/about.json`) or full URLs.
