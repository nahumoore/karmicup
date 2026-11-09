#!/usr/bin/env node
// Internal + external link audit for the blog. Run from the repo root.
//
//   node .claude/skills/blog-article/scripts/link-audit.mjs
//       Link matrix: for every article, its sections (with ids), the internal
//       articles it links to / is linked from, and its external links by domain.
//
//   node .claude/skills/blog-article/scripts/link-audit.mjs --find "<slug>" "phrase one" "phrase two"
//       Internal link research: lines in OTHER articles that mention any phrase,
//       flagged when that line already links to <slug>. Use the target article's
//       primary/secondary keywords and core concepts as phrases.

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OWN_DOMAINS = ["karmicup.com"];
const REDDIT_DOMAINS = ["reddit.com", "reddithelp.com", "redditinc.com", "redd.it"];

// Same rules as github-slugger (used by rehype-slug) for plain-text headings.
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[*_`[\]()]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s/g, "-");

const articles = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const lines = readFileSync(path.join(BLOG_DIR, file), "utf8").split(/\r?\n/);
    return { slug, lines };
  });

const domainOf = (url) => new URL(url).hostname.replace(/^www\./, "");
const isReddit = (d) => REDDIT_DOMAINS.some((r) => d === r || d.endsWith(`.${r}`));

function analyze({ slug, lines }) {
  const headings = [];
  const internal = [];
  const external = [];
  lines.forEach((line, i) => {
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) headings.push({ level: h[1].length, text: h[2], id: slugify(h[2]) });
    for (const m of line.matchAll(/\]\((\/blog\/[^)#\s]+)(#[^)\s]*)?\)/g)) {
      internal.push({ target: m[1].replace("/blog/", ""), hash: m[2] ?? "", line: i + 1 });
    }
    for (const m of line.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
      const domain = domainOf(m[1]);
      if (OWN_DOMAINS.includes(domain)) continue;
      external.push({ url: m[1], domain, reddit: isReddit(domain), line: i + 1 });
    }
  });
  return { slug, headings, internal, external };
}

const data = articles.map(analyze);
const args = process.argv.slice(2);

if (args[0] === "--find") {
  const [, target, ...phrases] = args;
  if (!target || phrases.length === 0) {
    console.error('Usage: --find "<slug>" "phrase" ["phrase" ...]');
    process.exit(1);
  }
  const needles = phrases.map((p) => p.toLowerCase());
  for (const { slug, lines } of articles) {
    if (slug === target) continue;
    console.log(`\n## ${slug}`);
    let hits = 0;
    lines.forEach((line, i) => {
      const lower = line.toLowerCase();
      const matched = needles.filter((n) => lower.includes(n));
      if (matched.length === 0 || /^(import|#)/.test(line)) return;
      hits++;
      const linked = line.includes(`/blog/${target}`) ? " [already links to target]" : "";
      console.log(`  L${i + 1} (${matched.join(", ")})${linked}: ${line.trim().slice(0, 180)}`);
    });
    if (hits === 0) console.log("  (no mentions)");
  }
  process.exit(0);
}

for (const a of data) {
  const incoming = data.filter((o) => o.slug !== a.slug && o.internal.some((l) => l.target === a.slug));
  const outgoing = [...new Set(a.internal.filter((l) => l.target !== a.slug).map((l) => l.target))];
  const thirdParty = a.external.filter((e) => !e.reddit);
  console.log(`\n# ${a.slug}`);
  console.log(`Sections:`);
  for (const h of a.headings) console.log(`  ${h.level === 3 ? "  " : ""}#${h.id}`);
  console.log(`Internal out (${outgoing.length} articles): ${outgoing.join(", ") || "none"}`);
  for (const l of a.internal) console.log(`  L${l.line} → /blog/${l.target}${l.hash}`);
  console.log(`Internal in (${incoming.length} articles): ${incoming.map((o) => o.slug).join(", ") || "none"}`);
  console.log(`External: ${a.external.length} total, ${thirdParty.length} third-party`);
  for (const e of a.external) console.log(`  L${e.line} ${e.reddit ? "[reddit]" : "[3rd]   "} ${e.url}`);
}
