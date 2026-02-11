'use client'

import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { motion } from 'motion/react'
import {
  IconFileText,
  IconAlertTriangle,
  IconBan,
  IconStar,
  IconScale,
  IconArrowBigUp,
  IconShieldCheck,
  IconRefresh,
  IconMail,
  IconBrandReddit,
} from '@tabler/icons-react'

const LAST_UPDATED = 'February 11, 2026'

const sections = [
  {
    icon: IconFileText,
    title: 'Acceptance of Terms',
    content: [
      {
        label: 'Agreement',
        description:
          'By creating an account or using Karmicup in any way, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.',
      },
      {
        label: 'Age requirement',
        description:
          'You must be at least 18 years old, or the age of majority in your jurisdiction, to use Karmicup.',
      },
    ],
  },
  {
    icon: IconArrowBigUp,
    title: 'Description of Service',
    content: [
      {
        label: 'What Karmicup is',
        description:
          'Karmicup is a free community platform where Reddit users submit their posts and comments to receive genuine engagement from other members.',
      },
      {
        label: 'How it works',
        description:
          'Users earn points by engaging with other members\' Reddit submissions (upvoting and commenting). Those points are then used to receive engagement on their own submissions.',
      },
      {
        label: 'Free to use',
        description:
          'The service is currently free. No payment is required at any time. Points have no monetary value.',
      },
    ],
  },
  {
    icon: IconStar,
    title: 'The Points System',
    content: [
      {
        label: 'Earning points',
        description:
          'Upvoting another member\'s Reddit post earns +1 point. Leaving a genuine comment earns +5 points. Doing both on the same submission earns +6 points.',
      },
      {
        label: 'Non-monetary',
        description:
          'Points are a utility mechanism within Karmicup only. They have no real-world monetary value, cannot be sold, traded, or transferred to other users.',
      },
      {
        label: 'Forfeiture',
        description:
          'Points earned through fraudulent or abusive activity will be removed. Accounts found manipulating the points system may be permanently suspended.',
      },
    ],
  },
  {
    icon: IconShieldCheck,
    title: 'Community Rules',
    content: [
      {
        label: 'Submit genuine content',
        description:
          'Only submit your own Reddit posts and comments. Content must be real, publicly accessible Reddit submissions.',
      },
      {
        label: 'Engage authentically',
        description:
          'Upvotes and comments must be real actions performed by you on Reddit. No bots, scripts, or automated tools.',
      },
      {
        label: 'One account per person',
        description:
          'Each user is permitted one Karmicup account. Creating multiple accounts to game the points system is prohibited.',
      },
      {
        label: 'No circumventing the system',
        description:
          'Do not attempt to claim points for engagements you did not perform, or use any method to artificially inflate your points.',
      },
    ],
  },
  {
    icon: IconBan,
    title: 'Prohibited Conduct',
    content: [
      {
        label: 'Fake Reddit accounts',
        description: 'Creating Reddit accounts solely for the purpose of engaging with Karmicup submissions is prohibited.',
      },
      {
        label: 'Bots & automation',
        description:
          'Using automated tools, scripts, or bots to perform upvotes, comments, or any engagement on Reddit is strictly forbidden.',
      },
      {
        label: 'Vote manipulation',
        description:
          'Any activity that constitutes vote manipulation under Reddit\'s policies is also a violation of these Terms.',
      },
      {
        label: 'Spam & harassment',
        description:
          'Submitting spam content, irrelevant links, or harassing other community members through any channel is not permitted.',
      },
    ],
  },
  {
    icon: IconBrandReddit,
    title: "Reddit's Terms of Service",
    content: [
      {
        label: 'Independent obligation',
        description:
          "Using Karmicup does not exempt you from Reddit's own Terms of Service, content policies, or community guidelines. You are responsible for complying with both.",
      },
      {
        label: 'No affiliation',
        description:
          'Karmicup is an independent community platform and is not affiliated with, endorsed by, or in any way officially connected to Reddit, Inc.',
      },
    ],
  },
  {
    icon: IconAlertTriangle,
    title: 'Disclaimers',
    content: [
      {
        label: 'As-is service',
        description:
          'Karmicup is provided "as is" without warranties of any kind. We do not guarantee uptime, specific engagement results, or that the service will be error-free.',
      },
      {
        label: 'No engagement guarantee',
        description:
          'Submitting content to Karmicup does not guarantee that other users will engage with your Reddit posts or comments.',
      },
      {
        label: 'Account suspension',
        description:
          'We reserve the right to suspend or terminate accounts that violate these Terms, with or without prior notice.',
      },
    ],
  },
  {
    icon: IconScale,
    title: 'Limitation of Liability',
    content: [
      {
        label: 'No indirect damages',
        description:
          'Karmicup and its founder shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.',
      },
      {
        label: 'Maximum liability',
        description:
          'Because Karmicup is free, our total liability to you for any claim shall not exceed zero dollars ($0).',
      },
    ],
  },
  {
    icon: IconRefresh,
    title: 'Changes to Terms',
    content: [
      {
        label: 'Right to update',
        description:
          'We may update these Terms at any time. The "last updated" date at the top of this page will reflect when changes were made.',
      },
      {
        label: 'Continued use',
        description:
          'Continuing to use Karmicup after changes are posted constitutes your acceptance of the revised Terms.',
      },
    ],
  },
  {
    icon: IconMail,
    title: 'Contact',
    content: [
      {
        label: 'Questions about these Terms',
        description:
          'If you have any questions or concerns about these Terms of Service, please contact us at terms@karmicup.com.',
      },
    ],
  },
]

export default function TermsPage() {
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
              <IconFileText size={13} stroke={2.5} />
              Last updated {LAST_UPDATED}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            >
              Terms of Service
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              These terms govern your use of Karmicup. Please read them carefully — they outline
              the rules of the community and what you can expect from us.
            </motion.p>
          </header>

          {/* Terms sections */}
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
                      <li key={item.label} className="grid grid-cols-[auto_1fr] gap-x-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-[7px]" />
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
