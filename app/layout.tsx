import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Figtree, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { DEFAULT_METADATA } from "@/consts/seo-metadata";

// Same typography as MentioHunt: Figtree for headings, Inter for UI/body.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${figtree.variable} ${geistMono.variable}`}
    >
      <body className="font-sans text-ink antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
