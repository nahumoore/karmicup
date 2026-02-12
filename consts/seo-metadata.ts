import type { Metadata } from 'next'

export const SITE_URL = 'https://karmicup.com'
export const SITE_NAME = 'Karmicup'

/**
 * Per-page SEO copy.
 * - `title` for dashboard/auth pages is the short label — combined with "| Karmicup" by the root template.
 * - `title` for the home page is the full absolute title (no template appended).
 * - `description` should be 120–150 characters with an active CTA.
 */
export const PAGE_SEO = {
  home: {
    title: 'Free Reddit Upvotes & Genuine Engagement | Karmicup',
    description:
      'Boost your Reddit karma for free. Join 3,100+ Redditors submitting posts, engaging authentically, and earning real upvotes. No bots — ever.',
  },
  login: {
    title: 'Sign In',
    description:
      'Welcome back! Sign in to Karmicup and continue boosting your Reddit karma with the free community engagement platform.',
  },
  register: {
    title: 'Join Free — Boost Your Reddit Karma',
    description:
      'Create your free Karmicup account. Connect your Reddit profile and get genuine upvotes from 3,100+ real members. Free forever.',
  },
  onboarding: {
    title: 'Get Started — Connect Your Reddit Account',
    description:
      'Complete your Karmicup setup in minutes. Connect your Reddit account and start receiving free, genuine engagement from real users.',
  },
  dashboard: {
    title: 'Dashboard',
    description:
      'Manage your Reddit submissions, track karma points, and engage with the Karmicup community.',
  },
  feed: {
    title: 'Community Feed',
    description:
      'Browse Reddit posts from the Karmicup community. Engage with submissions to earn points, then use them to boost your own content.',
  },
  mySubmissions: {
    title: 'My Submissions',
    description:
      'View and manage all your submitted Reddit posts and comments. Track upvotes received, comments earned, and your live point balance.',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'Read how Karmicup collects, uses, and protects your data. Written in plain language — no legal jargon. Your privacy matters to us.',
  },
  terms: {
    title: 'Terms of Service',
    description:
      "Review Karmicup's community rules, points system policy, and acceptable use terms. Understand the platform before you sign up.",
  },
  about: {
    title: 'About',
    description:
      'Meet Nico, the founder of Karmicup. A Reddit marketing expert who built a free engagement community after getting tired of paying for the first upvotes.',
  },
  settings: {
    title: 'Settings',
    description:
      'Manage your Karmicup account settings. Update your Reddit username and personal information.',
  },
} satisfies Record<string, { title: string; description: string }>

/**
 * Root-level default metadata — used in app/layout.tsx.
 * Every page inherits this as a baseline and can override individual fields.
 */
export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_SEO.home.title,
    template: '%s | Karmicup',
  },
  description: PAGE_SEO.home.description,
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    url: SITE_URL,
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/icon.svg',
  },
}
