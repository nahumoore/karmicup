import type { Metadata } from 'next'
import { buildPageMetadata } from '@/consts/seo-metadata'

export const metadata: Metadata = buildPageMetadata('privacy', { path: '/privacy' })

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
