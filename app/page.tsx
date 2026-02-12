import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Benefits } from '@/components/landing/benefits'
import { HowItWorks } from '@/components/landing/how-it-works'
import { FAQ } from '@/components/landing/faq'
import { FinalCTA } from '@/components/landing/final-cta'
import { Footer } from '@/components/landing/footer'
import type { Metadata } from 'next'
import { PAGE_SEO } from '@/consts/seo-metadata'

export const metadata: Metadata = {
  title: {
    absolute: PAGE_SEO.home.title,
  },
  description: PAGE_SEO.home.description,
  openGraph: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
  },
  twitter: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
  },
}

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Benefits />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
