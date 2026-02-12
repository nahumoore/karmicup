import type { Metadata } from "next";
import { PAGE_SEO } from "@/consts/seo-metadata";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: PAGE_SEO.dashboard.title,
  description: PAGE_SEO.dashboard.description,
  robots: { index: false, follow: false },
};

export default function Dashboard() {
  redirect("/dashboard/feed");
}
