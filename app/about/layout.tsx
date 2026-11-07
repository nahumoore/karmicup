import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageMetadata } from '@/consts/seo-metadata'
import { ABOUT_STRUCTURED_DATA } from '@/consts/structured-data'

export const metadata: Metadata = buildPageMetadata('about', { path: '/about' })

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={ABOUT_STRUCTURED_DATA} />
      {children}
    </>
  )
}
