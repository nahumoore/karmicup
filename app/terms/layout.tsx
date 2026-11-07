import type { Metadata } from 'next'
import { buildPageMetadata } from '@/consts/seo-metadata'

export const metadata: Metadata = buildPageMetadata('terms', { path: '/terms' })

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
