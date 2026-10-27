import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");

function wc(raw) {
  if (/^draft:\s*true/m.test(raw)) return null;
  const body = raw.replace(/^---[\s\S]*?---\n/, "");
  const clean = body
    .replace(/<figure[\s\S]*?<\/figure>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  return clean.split(/\s+/).filter(Boolean).length;
}

const rows = [];
for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith(".md") && x !== "-index.md")) {
  const w = wc(fs.readFileSync(path.join(blogDir, f), "utf8"));
  if (w != null) rows.push({ f, w });
}
rows.sort((a, b) => a.w - b.w);
console.log("published", rows.length);
console.log("min", rows[0]);
console.log("median", rows[Math.floor(rows.length / 2)]);
console.log("under1400", rows.filter((r) => r.w < 1400).length);
console.log("sample under", rows.filter((r) => r.w < 1400).slice(0, 8));
const hubs = [
  "seo-consultant-in-pune-founders-guide-2026.md",
  "what-is-ai-seo-definition-2026.md",
  "technical-seo-audit-checklist-2026.md",
  "local-seo-india-playbook.md",
];
for (const h of hubs) {
  console.log("hub", h, rows.find((x) => x.f === h)?.w);
}
