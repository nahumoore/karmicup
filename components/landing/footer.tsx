import { BrandLogo } from "@/components/landing/brand-logo";
import { MentiohuntLink } from "@/components/mentiohunt-link";
import { IconArrowUp } from "@tabler/icons-react";
import Link from "next/link";

const footerNav = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
      { label: "Join for free", href: "/register" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "All guides", href: "/blog" },
      {
        label: "How to get karma on Reddit",
        href: "/blog/how-to-get-karma-on-reddit",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const mentiohuntLinks = [
  { label: "Automated link building", path: "/", content: "link_building" },
  {
    label: "Backlink outreach",
    path: "/features/backlink-outreach",
    content: "backlink_outreach",
  },
  { label: "Pricing", path: "/pricing", content: "pricing" },
  { label: "Blog", path: "/blog", content: "blog" },
];

const linkClass =
  "leading-5 text-ink-secondary transition-colors hover:text-ink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface px-4 pt-14 pb-7 text-sm sm:px-6">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <section
            aria-label="About Karmicup"
            className="flex flex-[2_1_280px] flex-col gap-3"
          >
            <BrandLogo size="sm" />
            <p className="max-w-[340px] leading-[22px] text-ink-secondary">
              A free community where Redditors exchange genuine upvotes and
              comments. Earn points by engaging, spend them to boost your own
              posts.
            </p>
            <p className="text-[13px] text-muted-foreground">
              Built by the{" "}
              <MentiohuntLink
                placement="footer"
                content="built_by"
                className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-primary"
              >
                MentioHunt
              </MentiohuntLink>{" "}
              team.
            </p>
          </section>

          {footerNav.map(({ title, links }) => (
            <nav
              key={title}
              aria-label={title}
              className="flex flex-[1_1_140px] flex-col gap-[7px]"
            >
              <p className="mb-1 text-[13px] font-semibold text-ink">{title}</p>
              {links.map(({ label, href }) => (
                <Link key={label} href={href} className={linkClass}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}

          <nav
            aria-label="From the MentioHunt team"
            className="flex flex-[1_1_180px] flex-col gap-[7px]"
          >
            <p className="mb-1 text-[13px] font-semibold text-ink">
              From the MentioHunt team
            </p>
            {mentiohuntLinks.map(({ label, path, content }) => (
              <MentiohuntLink
                key={label}
                path={path}
                placement="footer"
                content={content}
                className={linkClass}
              >
                {label}
              </MentiohuntLink>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#E9E9E7] pt-5 text-[13px] text-muted-foreground">
          <p>© {year} Karmicup · Free Reddit engagement community</p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-ink-secondary transition-colors hover:text-ink"
          >
            <IconArrowUp size={14} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
