import type { Metadata } from 'next'
import { PAGE_SEO } from '@/consts/seo-metadata'

export const metadata: Metadata = {
  title: PAGE_SEO.login.title,
  description: PAGE_SEO.login.description,
  openGraph: {
    title: PAGE_SEO.login.title,
    description: PAGE_SEO.login.description,
  },
  twitter: {
    title: PAGE_SEO.login.title,
    description: PAGE_SEO.login.description,
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
