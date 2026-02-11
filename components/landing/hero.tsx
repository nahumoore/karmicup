'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  IconArrowRight,
  IconBrandReddit,
  IconArrowBigUp,
  IconMessageCircle2,
  IconShare3,
} from '@tabler/icons-react'
import { PLATFORM_METRICS } from '@/consts/platform-metrics'

const stats = [
  { value: PLATFORM_METRICS.members, label: 'Active members' },
  { value: PLATFORM_METRICS.postsBoosted, label: 'Posts boosted' },
  { value: PLATFORM_METRICS.alwaysFree, label: 'Always free' },
]

const mockPosts = [
  {
    id: 1,
    subreddit: 'r/webdev',
    title: 'I built a full-stack app in a weekend — here\'s what I learned',
    votes: 1247,
    comments: 93,
    time: '2h ago',
  },
  {
    id: 2,
    subreddit: 'r/entrepreneur',
    title: 'From 0 to $5k MRR in 6 months as a solo founder',
    votes: 3821,
    comments: 214,
    time: '4h ago',
  },
]

function MockPostCard({ post, delay }: { post: typeof mockPosts[0]; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background rounded-xl border border-border p-4 shadow-sm w-full"
    >
      <p className="text-xs text-primary font-semibold mb-1.5">{post.subreddit}</p>
      <p className="text-sm font-semibold text-foreground leading-snug mb-3 line-clamp-2">
        {post.title}
      </p>
      <footer className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 text-primary font-bold">
          <IconArrowBigUp size={13} stroke={2.5} />
          {post.votes.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <IconMessageCircle2 size={12} stroke={2} />
          {post.comments}
        </span>
        <span className="flex items-center gap-1">
          <IconShare3 size={12} stroke={2} />
          Share
        </span>
        <span className="ml-auto">{post.time}</span>
      </footer>
    </motion.article>
  )
}

export function Hero() {
  const [email, setEmail] = useState('')

  return (
    <section className="relative min-h-screen bg-background flex items-center overflow-hidden pt-16">
      {/* Subtle warm gradient blob */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, oklch(0.646 0.222 41.116 / 0.15) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, oklch(0.646 0.222 41.116 / 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-sm font-semibold mb-8"
            >
              <IconBrandReddit size={15} stroke={2} />
              Free Reddit engagement platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-[64px] font-black text-foreground leading-[0.95] tracking-tight mb-6"
            >
              Your Reddit posts<br />
              <span className="text-primary">deserve to be seen.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-muted-foreground max-w-md leading-relaxed mb-10"
            >
              Submit your Reddit posts and comments, engage with the community,
              and get authentic engagement back. No bots — just real people.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mb-12"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 flex-1"
              />
              <Button className="h-11 px-5 font-semibold gap-2 shrink-0">
                Get started free
                <IconArrowRight size={15} />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-10"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: mock post cards */}
          <aside className="hidden lg:flex flex-col gap-4 max-w-sm ml-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1"
            >
              Posts getting boosted right now
            </motion.p>
            {mockPosts.map((post, i) => (
              <MockPostCard key={post.id} post={post} delay={0.9 + i * 0.15} />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.4 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/8 border border-primary/20"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-xs text-primary font-semibold">
                47 posts submitted in the last hour
              </p>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  )
}
