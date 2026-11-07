import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { StatsBand } from '@/components/landing/stats-band'
import { Benefits } from '@/components/landing/benefits'
import { HowItWorks } from '@/components/landing/how-it-works'
import { FAQ } from '@/components/landing/faq'
import { FinalCTA } from '@/components/landing/final-cta'
import { Footer } from '@/components/landing/footer'
import { JsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/consts/seo-metadata'
import { HOME_STRUCTURED_DATA } from '@/consts/structured-data'

export const metadata: Metadata = buildPageMetadata('home', {
  path: '/',
  absoluteTitle: true,
})

export default function Page() {
  return (
    <main className="relative min-h-screen bg-white text-ink">
      <JsonLd data={HOME_STRUCTURED_DATA} />
      <Navbar />
      <Hero />
      <StatsBand />
      <Benefits />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
