/**
 * Generate professional 1200×630 featured SVGs for each published blog,
 * matching Fundaking brand colors, and update frontmatter image paths.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const blogDir = path.join(root, "src/content/blog");
const outDir = path.join(root, "public/images/blog/featured");

const W = 1200;
const H = 630;
const PRIMARY = "#937AFF";
const PRIMARY_DEEP = "#4D36D0";
const BODY = "#03010E";
const LIGHT = "#0B0C17";
const TEXT = "#E5E5E5";
const MUTED = "#A89BB8";
const WHITE = "#FFFFFF";

const PILLAR_ACCENT = {
  "SEO Consulting": "#937AFF",
  "Pricing & Hiring": "#B794FF",
  "Technical SEO": "#6B8CFF",
  "Local SEO": "#5EC8C0",
  "AI / Answer Engine SEO": "#C4A0FF",
  Marketing: "#937AFF",
  Sales: "#937AFF",
  Technology: "#6B8CFF",
};

function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapTitle(title, maxChars = 28, maxLines = 3) {
  const words = title.replace(/\s+/g, " ").trim().split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length >= maxLines) break;
    } else {
      cur = next;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = truncate(lines[maxLines - 1], maxChars);
  }
  return lines;
}

function truncate(s, max) {
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}

function hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function motif(slug, accent) {
  const h = hashSlug(slug);
  const variant = h % 4;
  if (variant === 0) {
    // Concentric rings
    return `
    <circle cx="980" cy="180" r="220" fill="none" stroke="${accent}" stroke-opacity="0.18" stroke-width="2"/>
    <circle cx="980" cy="180" r="150" fill="none" stroke="${accent}" stroke-opacity="0.28" stroke-width="2"/>
    <circle cx="980" cy="180" r="80" fill="${accent}" fill-opacity="0.15"/>
    <circle cx="980" cy="180" r="28" fill="${accent}" fill-opacity="0.55"/>`;
  }
  if (variant === 1) {
    // Grid nodes
    let nodes = "";
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        const x = 820 + i * 70;
        const y = 120 + j * 70;
        nodes += `<circle cx="${x}" cy="${y}" r="5" fill="${accent}" fill-opacity="${0.25 + ((i + j) % 3) * 0.15}"/>`;
        if (i < 4)
          nodes += `<line x1="${x}" y1="${y}" x2="${x + 70}" y2="${y}" stroke="${accent}" stroke-opacity="0.2" stroke-width="1.5"/>`;
        if (j < 3)
          nodes += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 70}" stroke="${accent}" stroke-opacity="0.2" stroke-width="1.5"/>`;
      }
    }
    return nodes;
  }
  if (variant === 2) {
    // Abstract bars / analytics
    return `
    <rect x="860" y="280" width="36" height="160" rx="8" fill="${accent}" fill-opacity="0.35"/>
    <rect x="910" y="220" width="36" height="220" rx="8" fill="${accent}" fill-opacity="0.5"/>
    <rect x="960" y="160" width="36" height="280" rx="8" fill="${accent}" fill-opacity="0.7"/>
    <rect x="1010" y="200" width="36" height="240" rx="8" fill="${PRIMARY_DEEP}" fill-opacity="0.75"/>
    <rect x="1060" y="250" width="36" height="190" rx="8" fill="${accent}" fill-opacity="0.4"/>`;
  }
  // Arc / search glow
  return `
    <path d="M780 420 Q980 80 1180 420" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="3"/>
    <path d="M820 440 Q980 160 1140 440" fill="none" stroke="${PRIMARY_DEEP}" stroke-opacity="0.45" stroke-width="2"/>
    <circle cx="980" cy="300" r="60" fill="${accent}" fill-opacity="0.12"/>
    <circle cx="980" cy="300" r="18" fill="${accent}" fill-opacity="0.6"/>`;
}

function featuredSvg({ title, category, slug }) {
  const accent = PILLAR_ACCENT[category] || PRIMARY;
  const lines = wrapTitle(title, 26, 3);
  const titleY = 250;
  const lineH = 58;
  const titleTs = lines
    .map(
      (line, i) =>
        `<text x="72" y="${titleY + i * lineH}" fill="${WHITE}" font-family="Inter Tight, Urbanist, Segoe UI, sans-serif" font-size="46" font-weight="700">${escapeXml(line)}</text>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BODY}"/>
      <stop offset="55%" stop-color="${LIGHT}"/>
      <stop offset="100%" stop-color="#12082A"/>
    </linearGradient>
    <linearGradient id="glow" x1="0.7" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PRIMARY_DEEP}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PRIMARY_DEEP}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
    <radialGradient id="orb" cx="78%" cy="28%" r="45%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${BODY}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#orb)"/>
  <rect x="700" y="0" width="500" height="${H}" fill="url(#glow)" opacity="0.5"/>

  <!-- subtle grid -->
  <g opacity="0.08" stroke="${TEXT}" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${100 + i * 90}" y1="0" x2="${100 + i * 90}" y2="${H}"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${90 + i * 80}" x2="${W}" y2="${90 + i * 80}"/>`).join("")}
  </g>

  ${motif(slug, accent)}

  <!-- brand mark -->
  <rect x="72" y="56" width="48" height="48" rx="12" fill="${PRIMARY}"/>
  <text x="96" y="88" text-anchor="middle" fill="${WHITE}" font-family="Inter Tight, Segoe UI, sans-serif" font-size="16" font-weight="700">FK</text>
  <text x="136" y="88" fill="${TEXT}" font-family="Inter Tight, Segoe UI, sans-serif" font-size="20" font-weight="600">Fundaking Media</text>

  <!-- category pill -->
  <rect x="72" y="140" width="${Math.min(420, 28 + category.length * 11)}" height="36" rx="18" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-opacity="0.55"/>
  <text x="90" y="164" fill="${accent}" font-family="Inter Tight, Segoe UI, sans-serif" font-size="15" font-weight="600" letter-spacing="0.04em">${escapeXml(category.toUpperCase())}</text>

  ${titleTs}

  <rect x="72" y="${titleY + lines.length * lineH + 16}" width="120" height="4" rx="2" fill="url(#bar)"/>

  <text x="72" y="575" fill="${MUTED}" font-family="Inter Tight, Segoe UI, sans-serif" font-size="16">SEO · Technical · Local · AI visibility</text>
  <text x="1128" y="575" text-anchor="end" fill="${MUTED}" font-family="Inter Tight, Segoe UI, sans-serif" font-size="16">fundaking.com</text>
</svg>
`;
}

function parsePost(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  const fm = m[1];
  if (/^draft:\s*true/m.test(fm)) return null;
  const title = fm.match(/^title:\s*"(.*)"/m)?.[1] ?? "";
  const cat =
    fm.match(/categories:\s*\["([^"]+)"\]/)?.[1] ||
    fm.match(/categories:\s*\n\s*-\s*"([^"]+)"/)?.[1] ||
    "SEO Consulting";
  return { fm, body: m[2], title, category: cat };
}

fs.mkdirSync(outDir, { recursive: true });

let n = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "-index.md")) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const post = parsePost(raw);
  if (!post) continue;

  const svg = featuredSvg({ title: post.title, category: post.category, slug });
  const rel = `/images/blog/featured/${slug}.svg`;
  fs.writeFileSync(path.join(outDir, `${slug}.svg`), svg, "utf8");

  let fm = post.fm;
  if (/^image:\s*/m.test(fm)) {
    fm = fm.replace(/^image:\s*.*$/m, `image: "${rel}"`);
  } else {
    fm += `\nimage: "${rel}"`;
  }
  fs.writeFileSync(
    path.join(blogDir, file),
    `---\n${fm}\n---\n${post.body}`,
    "utf8",
  );
  n++;
}

console.log(`[generate-blog-featured] Created ${n} featured SVGs in public/images/blog/featured/`);
