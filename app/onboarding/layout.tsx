import type { Metadata } from 'next'
import { PAGE_SEO } from '@/consts/seo-metadata'

export const metadata: Metadata = {
  title: PAGE_SEO.onboarding.title,
  description: PAGE_SEO.onboarding.description,
  openGraph: {
    title: PAGE_SEO.onboarding.title,
    description: PAGE_SEO.onboarding.description,
  },
  twitter: {
    title: PAGE_SEO.onboarding.title,
    description: PAGE_SEO.onboarding.description,
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
