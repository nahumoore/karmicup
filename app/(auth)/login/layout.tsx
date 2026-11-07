import type { Metadata } from 'next'
import { buildPageMetadata } from '@/consts/seo-metadata'

export const metadata: Metadata = buildPageMetadata('login', { path: '/login', noIndex: true })

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
