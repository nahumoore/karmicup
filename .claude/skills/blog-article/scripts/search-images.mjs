#!/usr/bin/env node
// Search commercially usable images (Openverse) or Wikimedia Commons files,
// printing title, license, author and source page for each result.
//
// Usage:
//   node search-images.mjs "<query>"            Openverse, commercial licenses
//   node search-images.mjs "<query>" --wide     Openverse, landscape only (covers)
//   node search-images.mjs "<query>" --commons  Wikimedia Commons, with license per file

const args = process.argv.slice(2);
const query = args.find((a) => !a.startsWith("--"));
if (!query) {
  console.error('Usage: node search-images.mjs "<query>" [--wide] [--commons]');
  process.exit(1);
}
const headers = { "User-Agent": "karmicup-blog-research" };
const strip = (html = "") => html.replace(/<[^>]+>/g, "").trim();

async function getJson(url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const res = await fetch(url, { headers });
    if (res.ok) return res.json();
    console.error(`HTTP ${res.status} (attempt ${attempt}) for ${url}`);
  }
  process.exit(1);
}

if (args.includes("--commons")) {
  const search = await getJson(
    `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=20&format=json&srsearch=${encodeURIComponent(query)}`,
  );
  const titles = search.query.search.map((r) => r.title);
  if (titles.length === 0) process.exit(0);
  const info = await getJson(
    `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata|size|url&format=json&titles=${encodeURIComponent(titles.join("|"))}`,
  );
  for (const page of Object.values(info.query.pages)) {
    const i = page.imageinfo?.[0];
    if (!i) continue;
    const m = i.extmetadata ?? {};
    console.log(
      [
        page.title,
        `${i.width}x${i.height}`,
        m.LicenseShortName?.value ?? "?",
        strip(m.Artist?.value).slice(0, 60),
        i.descriptionurl,
        i.url,
      ].join(" | "),
    );
  }
} else {
  const params = new URLSearchParams({
    q: query,
    license_type: "commercial",
    page_size: "20", // anonymous maximum
  });
  if (args.includes("--wide")) params.set("aspect_ratio", "wide");
  const data = await getJson(`https://api.openverse.org/v1/images/?${params}`);
  for (const r of data.results) {
    console.log(
      [
        r.title.slice(0, 70),
        `${r.width}x${r.height}`,
        `${r.license.toUpperCase()} ${r.license_version ?? ""}`.trim(),
        r.creator,
        r.creator_url ?? "",
        r.foreign_landing_url,
        r.url,
      ].join(" | "),
    );
  }
}
