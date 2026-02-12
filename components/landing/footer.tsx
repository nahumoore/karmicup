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

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {year} Karmicup. Built by Nicolas.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
