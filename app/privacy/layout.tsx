import type { Metadata } from 'next'
import { PAGE_SEO } from '@/consts/seo-metadata'

export const metadata: Metadata = {
  title: PAGE_SEO.privacy.title,
  description: PAGE_SEO.privacy.description,
  openGraph: {
    title: PAGE_SEO.privacy.title,
    description: PAGE_SEO.privacy.description,
  },
  twitter: {
    title: PAGE_SEO.privacy.title,
    description: PAGE_SEO.privacy.description,
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
