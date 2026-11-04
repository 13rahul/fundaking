/**
 * Make every siblings edge in cluster-map.json bidirectional.
 * Run: node automark-astro-main/scripts/normalize-cluster-siblings.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapPath = path.join(__dirname, "cluster-map.json");
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));

let added = 0;
for (const [slug, meta] of Object.entries(map.posts)) {
  for (const sib of meta.siblings || []) {
    if (!map.posts[sib]) continue;
    if (!map.posts[sib].siblings) map.posts[sib].siblings = [];
    if (!map.posts[sib].siblings.includes(slug)) {
      map.posts[sib].siblings.push(slug);
      added++;
    }
  }
}

// Dedupe + sort siblings for stable diffs
for (const meta of Object.values(map.posts)) {
  if (!meta.siblings) continue;
  meta.siblings = [...new Set(meta.siblings)].sort();
}

fs.writeFileSync(mapPath, JSON.stringify(map, null, 2) + "\n", "utf8");
console.log(`[normalize-cluster-siblings] Added ${added} reverse sibling edges`);
