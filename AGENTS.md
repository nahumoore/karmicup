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

## MentioHunt links

Every link from Karmicup to MentioHunt must follow these rules:

- **Dofollow**: never add `nofollow`, `sponsored` or `ugc` to the `rel` attribute.
- **No `noreferrer`**: the Referer header must reach MentioHunt. Use `rel="noopener"` (exported as `MENTIOHUNT_LINK_REL`).
- **UTM-tagged**: always add `utm_source=karmicup&utm_medium=referral&utm_campaign=<placement>` (+ optional `utm_content=<variant>`) so MentioHunt analytics attributes the traffic to Karmicup.
- **Never hardcode a MentioHunt URL.** Use the helpers:
  - `<MentiohuntLink placement="footer" content="built_by" path="/pricing">` from `@/components/mentiohunt-link` (renders the `<a>` with `target="_blank"`, the right `rel` and the UTM URL).
  - `mentiohuntUrl(path, { placement, content })` + `MENTIOHUNT_LINK_REL` from `@/lib/mentiohunt` when you need the raw URL.
- `placement` = where the link lives (snake_case: `footer`, `about`, `dashboard_sidebar`...). `content` = which link inside that placement (`built_by`, `pricing`...).
- The footer always shows "Built by the MentioHunt team" with a dofollow link to MentioHunt.

## Design system

Karmicup mirrors **MentioHunt's design system** (https://mentiohunt.com). Keep new UI consistent with it:

- **Fonts**: Figtree for headings (`font-heading`, applied to `h1`-`h3` by default), Inter for UI/body (`font-sans`).
- **Colors** (tokens in `app/globals.css`): `text-ink` (#1F1F1F), `text-ink-secondary` (#4A4946), `text-muted-foreground` (#73726E), `border-border` (#E2E2DF), `border-hairline` (#EDEDEB), `bg-surface` (#F7F7F5) for alternating bands, `bg-primary` (#D63F0A, hover `bg-primary-hover`) for CTAs and accents, `text-brand`/`bg-brand` (#FF5A1F) for small decorative accents, `bg-brand-tint`/`bg-brand-soft` for soft orange fills.
- `stone-*` and `gray-*` utilities are remapped to MentioHunt's warm neutral scale. Prefer the semantic tokens above in new code.
- **Patterns**: section eyebrow = orange dot + 13px muted label (`Eyebrow` / `SectionHeader` in `components/landing/section-header.tsx`); bold Figtree headings with tight tracking (`tracking-[-0.025em]`); white cards with `rounded-xl border border-border` and a subtle shadow; hairline dividers instead of heavy borders; content max width `max-w-[1120px]`; hero with dot grid + soft orange glow.
- Logo: use `BrandLogo` from `components/landing/brand-logo.tsx`.

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
  - **App-only OAuth** when `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` are set: requests go to `oauth.reddit.com` with a cached bearer token (renewed on 401). This is required in production: Reddit answers 403 to unauthenticated requests from Cloudflare Workers. App-only requests see public data only (like a logged-out visitor), and endpoints that need a logged-in user (e.g. `post_requirements`) return `USER_REQUIRED`.
- Catch `RedditApiError` (also exported from the helper) to handle specific HTTP status codes.
- Paths can be relative (e.g. `/user/foo/about.json`) or full URLs.

## Paid SEO data tools (DataForSEO)

- **NEVER** call any DataForSEO tool (`mcp__claude_ai_Data_for_SEO__*`) without asking Nicolas for explicit confirmation first. Every call is billed.
- Before calling, say which endpoint(s) you want to use, for which keywords/domains/locations, and why. Wait for a "yes" for that specific request; an earlier approval does not cover new calls.
- Free sources need no confirmation: Google Search Console (`gscServer` MCP), the codebase, and the live site.
