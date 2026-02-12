import type { Metadata } from 'next'
import { PAGE_SEO } from '@/consts/seo-metadata'

export const metadata: Metadata = {
  title: PAGE_SEO.terms.title,
  description: PAGE_SEO.terms.description,
  openGraph: {
    title: PAGE_SEO.terms.title,
    description: PAGE_SEO.terms.description,
  },
  twitter: {
    title: PAGE_SEO.terms.title,
    description: PAGE_SEO.terms.description,
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
