/**
 * Audit Fundaking blog cluster map vs real internal links.
 * Run: node automark-astro-main/scripts/audit-internal-links.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cluster-map.json"), "utf8"),
);

const DEMO = new Set([
  "post-1",
  "post-2",
  "post-3",
  "post-4",
  "post-5",
  "post-6",
  "human-touch-ai-marketing",
  "-index",
]);

function parse(slug) {
  const raw = fs.readFileSync(path.join(blogDir, `${slug}.md`), "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: "", body: raw };
}

function blogTargets(body) {
  const out = new Set();
  const re = /\]\(\/blog\/([^)#\s]+)\)/g;
  let m;
  while ((m = re.exec(body))) out.add(m[1]);
  return out;
}

const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));
const published = files.filter((s) => !DEMO.has(s));

const outbound = {};
for (const slug of published) {
  outbound[slug] = blogTargets(parse(slug).body);
}

const hubCoverage = {};
for (const [pkey, pillar] of Object.entries(map.pillars)) {
  const links = outbound[pillar.hub] || new Set();
  const spokes = Object.entries(map.posts)
    .filter(([, v]) => v.pillar === pkey && !v.isHub)
    .map(([s]) => s);
  hubCoverage[pkey] = {
    hub: pillar.hub,
    spokeCount: spokes.length,
    linked: spokes.filter((s) => links.has(s)).length,
    missing: spokes.filter((s) => !links.has(s)),
  };
}

const neither = [];
const oneWay = [];
for (const [slug, meta] of Object.entries(map.posts)) {
  for (const sib of meta.siblings || []) {
    if (!outbound[slug] || !outbound[sib]) continue;
    const a = outbound[slug].has(sib);
    const b = outbound[sib].has(slug);
    if (!a && !b) neither.push(`${slug} ↔ ${sib}`);
    else if (a && !b) oneWay.push(`${slug} → ${sib} (reverse missing)`);
  }
}

const report = {
  published: published.length,
  mapped: Object.keys(map.posts).length,
  unmapped: published.filter((s) => !map.posts[s]),
  byPillar: Object.fromEntries(
    Object.entries(map.pillars).map(([k]) => [
      k,
      Object.values(map.posts).filter((p) => p.pillar === k).length,
    ]),
  ),
  hubCoverage,
  siblingNeither: neither.length,
  siblingOneWay: oneWay.length,
  neitherSample: neither.slice(0, 30),
  oneWaySample: oneWay.slice(0, 30),
};

fs.writeFileSync(
  path.join(__dirname, "../docs/blog-internal-link-audit.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
