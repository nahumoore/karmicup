"use client";

import { BrandLogo } from "@/components/landing/brand-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const navItemClass =
  "inline-flex h-9 items-center rounded-md px-2.5 text-sm font-medium text-[#2F2F2D] transition-colors hover:bg-[#EFEFED] hover:text-ink";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-hairline bg-white/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[60px] max-w-[1200px] items-center gap-2 px-4 sm:px-6 lg:px-10"
      >
        <BrandLogo className="mr-3" />

        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={navItemClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <Link
            href="/login"
            className={cn(navItemClass, "hidden sm:inline-flex")}
          >
            Login
          </Link>
          <Button asChild className="h-9 px-3.5 text-sm">
            <Link href="/register">Join for free</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
