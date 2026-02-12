import type { Metadata } from 'next'
import { PAGE_SEO } from '@/consts/seo-metadata'

export const metadata: Metadata = {
  title: PAGE_SEO.register.title,
  description: PAGE_SEO.register.description,
  openGraph: {
    title: PAGE_SEO.register.title,
    description: PAGE_SEO.register.description,
  },
  twitter: {
    title: PAGE_SEO.register.title,
    description: PAGE_SEO.register.description,
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
