import type { Metadata } from 'next'
import { PAGE_SEO } from '@/consts/seo-metadata'

export const metadata: Metadata = {
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  openGraph: {
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
  },
  twitter: {
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
