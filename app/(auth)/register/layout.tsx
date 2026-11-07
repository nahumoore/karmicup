import type { Metadata } from 'next'
import { buildPageMetadata } from '@/consts/seo-metadata'

export const metadata: Metadata = buildPageMetadata('register', { path: '/register', noIndex: true })

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
