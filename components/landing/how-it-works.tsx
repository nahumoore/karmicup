'use client'

import { motion } from 'motion/react'
import {
  IconLink,
  IconUsers,
  IconTrendingUp,
} from '@tabler/icons-react'

const steps = [
  {
    number: '01',
    icon: IconLink,
    title: 'Submit your content',
    description:
      'Paste the link to your Reddit post or comment. Our community sees it instantly and starts engaging.',
  },
  {
    number: '02',
    icon: IconUsers,
    title: 'Engage with others',
    description:
      'Browse community-submitted posts and genuinely engage — upvote, comment, and share real thoughts.',
  },
  {
    number: '03',
    icon: IconTrendingUp,
    title: 'Watch your karma grow',
    description:
      'Real Reddit users engage with your content in return. No bots, no fake accounts — pure authentic activity.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-[0.15em] mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
            Three steps to more engagement
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            A simple karma exchange — give engagement, receive engagement.
          </p>
        </motion.header>

        <ol className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-border z-0"
          />

          {steps.map(({ number, icon: Icon, title, description }, i) => (
            <motion.li
              key={number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 bg-background rounded-2xl border border-border p-8 shadow-sm group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Step number badge */}
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-black mb-6">
                {number}
              </span>

              {/* Icon */}
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/8 text-primary mb-5">
                <Icon size={22} stroke={1.75} />
              </span>

              <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
