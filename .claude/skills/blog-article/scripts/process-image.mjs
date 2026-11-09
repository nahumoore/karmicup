#!/usr/bin/env node
// Crop, resize and convert an image for the blog (WebP), or make a PNG preview.
// Uses the sharp copy that Next.js installs (run `pnpm install` first).
//
// Usage:
//   node process-image.mjs <input|url> <output.webp> [--crop left,top,width,height] [--width 1200] [--quality 80]
//   node process-image.mjs <input|url> <output.png> --preview      (600px PNG to look at)

import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

function loadSharp() {
  const require = createRequire(path.join(process.cwd(), "package.json"));
  try {
    return require("sharp");
  } catch {
    const pnpmDir = path.join(process.cwd(), "node_modules", ".pnpm");
    const dir = readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
    if (!dir) throw new Error("sharp not found: run `pnpm install` in the repo root");
    return require(path.join(pnpmDir, dir, "node_modules", "sharp"));
  }
}

const args = process.argv.slice(2);
const [input, output] = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
if (!input || !output) {
  console.error("Usage: node process-image.mjs <input|url> <output> [--crop l,t,w,h] [--width N] [--quality N] [--preview]");
  process.exit(1);
}

const sharp = loadSharp();
const source = /^https?:\/\//.test(input)
  ? Buffer.from(
      await (await fetch(input, { headers: { "User-Agent": "karmicup-blog-research" } })).arrayBuffer(),
    )
  : readFileSync(input);

if (args.includes("--preview")) {
  await sharp(source).resize({ width: 600 }).png().toFile(output);
} else {
  // Crop in its own pipeline so the resize doesn't run first.
  let buffer = source;
  const crop = flag("crop");
  if (crop) {
    const [left, top, width, height] = crop.split(",").map(Number);
    buffer = await sharp(source).extract({ left, top, width, height }).png().toBuffer();
  }
  const maxWidth = Number(flag("width") ?? 1200);
  await sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: Number(flag("quality") ?? 80) })
    .toFile(output);
}

const meta = await sharp(output).metadata();
console.log(`${output}: ${meta.width}x${meta.height}`);
