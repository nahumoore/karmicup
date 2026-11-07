import type { Metadata } from 'next'
import { buildPageMetadata } from '@/consts/seo-metadata'

export const metadata: Metadata = buildPageMetadata('onboarding', { path: '/onboarding', noIndex: true })

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
