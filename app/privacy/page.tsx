'use client'

import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { motion } from 'motion/react'
import {
  IconShield,
  IconEye,
  IconLock,
  IconTrash,
  IconMail,
  IconDatabase,
  IconUserCheck,
} from '@tabler/icons-react'

const LAST_UPDATED = 'February 11, 2026'

const sections = [
  {
    icon: IconEye,
    title: 'Information We Collect',
    content: [
      {
        label: 'Account information',
        description: 'Your email address when you register for an account.',
      },
      {
        label: 'Reddit content',
        description:
          'The Reddit submission URLs and public content you submit to the platform for community engagement.',
      },
      {
        label: 'Points & activity',
        description:
          'Your points balance, engagement history, and activity on the platform (upvotes, comments verified).',
      },
      {
        label: 'Usage data',
        description:
          'IP address, browser type, pages visited, and general interaction patterns to help us maintain and improve the service.',
      },
    ],
  },
  {
    icon: IconShield,
    title: 'How We Use Your Information',
    content: [
      {
        label: 'Provide the service',
        description: 'Create and manage your account, process submissions, and display community content.',
      },
      {
        label: 'Calculate points',
        description:
          'Track engagement activity and award or deduct points based on verified upvotes and comments.',
      },
      {
        label: 'Prevent abuse',
        description:
          'Detect spam, multi-accounting, bot activity, and other violations of our community rules.',
      },
      {
        label: 'Improve the platform',
        description:
          'Analyze usage patterns in aggregate to understand how to make Karmicup better for everyone.',
      },
    ],
  },
  {
    icon: IconDatabase,
    title: 'Information Sharing',
    content: [
      {
        label: 'We do not sell your data',
        description:
          'Your personal information is never sold to advertisers, data brokers, or any third parties for commercial purposes.',
      },
      {
        label: 'Infrastructure providers',
        description:
          'We use Supabase (PostgreSQL) to store and process data securely. They act as a data processor under our instructions.',
      },
      {
        label: 'Legal requirements',
        description:
          'We may disclose information if required by law or to protect the rights and safety of our users and the public.',
      },
    ],
  },
  {
    icon: IconTrash,
    title: 'Data Retention',
    content: [
      {
        label: 'Account data',
        description:
          'Retained while your account is active. If you delete your account, personal data is removed within 30 days.',
      },
      {
        label: 'Submissions',
        description:
          'Reddit submission URLs and associated engagement data are stored indefinitely for community use and platform integrity.',
      },
      {
        label: 'Requesting deletion',
        description:
          'You can request deletion of your account and personal data at any time by emailing privacy@karmicup.com.',
      },
    ],
  },
  {
    icon: IconLock,
    title: 'Security',
    content: [
      {
        label: 'Secure infrastructure',
        description:
          'Data is stored in Supabase-managed PostgreSQL databases with encryption at rest and in transit (HTTPS/TLS).',
      },
      {
        label: 'No payment data',
        description:
          'Karmicup is completely free — we never collect credit card numbers or any financial information.',
      },
      {
        label: 'Responsible disclosure',
        description:
          'If you discover a security vulnerability, please report it responsibly to privacy@karmicup.com.',
      },
    ],
  },
  {
    icon: IconUserCheck,
    title: 'Your Rights',
    content: [
      {
        label: 'Access',
        description: 'Request a copy of the personal data we hold about you.',
      },
      {
        label: 'Correction',
        description: 'Ask us to correct inaccurate or incomplete information.',
      },
      {
        label: 'Deletion',
        description:
          'Request deletion of your personal data, subject to certain legal obligations.',
      },
    ],
  },
  {
    icon: IconMail,
    title: 'Contact',
    content: [
      {
        label: 'Privacy questions',
        description:
          'For any questions, concerns, or requests regarding this policy or your personal data, reach us at privacy@karmicup.com.',
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />

      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Page header */}
          <header className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            >
              <IconShield size={13} stroke={2.5} />
              Last updated {LAST_UPDATED}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Your privacy matters to us. This policy explains what data we collect,
              how we use it, and the choices you have — written plainly, without legal jargon.
            </motion.p>
          </header>

          {/* Policy sections */}
          <section className="space-y-5">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-muted/40 border border-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon size={16} stroke={2} />
                    </span>
                    <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
                  </div>

                  <ul className="space-y-4">
                    {section.content.map((item) => (
                      <li key={item.label} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-[7px]" />
                        <div>
                          <span className="text-sm font-medium text-foreground">{item.label} — </span>
                          <span className="text-sm text-muted-foreground">{item.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
