"use client";

import { IconArrowBigUp } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

const footerLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "About", href: "/about" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-muted/40 border-t border-border py-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground group-hover:scale-105 transition-transform duration-200">
              <IconArrowBigUp size={14} stroke={2.5} />
            </span>
            <span className="text-base font-bold text-foreground tracking-tight">
              karmic<span className="text-primary">up</span>
            </span>
          </Link>

          {/* Links */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <aside className="mt-10 rounded-2xl border border-border bg-background p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Promoting your product beyond Reddit?
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              MentioHunt finds sites where your pages are a good fit for a
              backlink, writes the outreach email and sends it for you. Free
              preview, no card.
            </p>
          </div>
          <a
            href="https://mentiohunt.com?utm_source=karmicup&utm_medium=referral&utm_campaign=footer"
            target="_blank"
            rel="noopener"
            className="shrink-0 inline-flex items-center justify-center h-10 px-4 rounded-lg border border-primary/30 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/15 transition-colors duration-200"
          >
            Find backlinks with MentioHunt
          </a>
        </aside>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {year} Karmicup. Built by{" "}
            <Link href="/about" className="hover:text-foreground underline-offset-2 hover:underline">
              Nicolas
            </Link>
            , also the maker of{" "}
            <a
              href="https://mentiohunt.com?utm_source=karmicup&utm_medium=referral&utm_campaign=footer_credit"
              target="_blank"
              rel="noopener"
              className="hover:text-foreground underline-offset-2 hover:underline"
            >
              MentioHunt
            </a>
            .
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
