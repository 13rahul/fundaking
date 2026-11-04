/**
 * For each sibling pair in cluster-map, ensure both posts link to each other
 * with a contextual mid-body sentence before <!-- fk-cluster-links -->.
 * Run: node automark-astro-main/scripts/repair-sibling-links.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cluster-map.json"), "utf8"),
);

const TITLE_CACHE = new Map();
function titleFor(slug) {
  if (TITLE_CACHE.has(slug)) return TITLE_CACHE.get(slug);
  const p = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(p)) {
    TITLE_CACHE.set(slug, slug);
    return slug;
  }
  const t =
    fs.readFileSync(p, "utf8").match(/^title:\s*"(.*)"/m)?.[1] ?? slug;
  TITLE_CACHE.set(slug, t);
  return t;
}

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2] };
}

function hasBlogLink(body, slug) {
  return body.includes(`/blog/${slug}`);
}

function insertBeforeCluster(body, paragraph) {
  const marker = "<!-- fk-cluster-links -->";
  const note = `\n\n${paragraph}\n`;
  if (body.includes(marker)) {
    return body.replace(marker, `${note}${marker}`);
  }
  const sig = body.search(/\n---\n\n\*Rahul Agarwal/);
  if (sig > 0) return body.slice(0, sig) + note + body.slice(sig);
  return body.trimEnd() + note;
}

const pairs = new Set();
for (const [slug, meta] of Object.entries(map.posts)) {
  for (const sib of meta.siblings || []) {
    if (!map.posts[sib]) continue;
    const a = slug < sib ? slug : sib;
    const b = slug < sib ? sib : slug;
    pairs.add(`${a}||${b}`);
  }
}

let patched = 0;
for (const key of pairs) {
  const [a, b] = key.split("||");
  for (const [from, to] of [
    [a, b],
    [b, a],
  ]) {
    const file = path.join(blogDir, `${from}.md`);
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, "utf8");
    const parsed = parse(raw);
    if (!parsed) continue;
    if (hasBlogLink(parsed.body, to)) continue;
    const title = titleFor(to);
    const sentence = `Related reading in this cluster: [${title}](/blog/${to}).`;
    const newBody = insertBeforeCluster(parsed.body, sentence);
    fs.writeFileSync(
      file,
      `---\n${parsed.fm}\n---\n${newBody.trim()}\n`,
      "utf8",
    );
    patched++;
  }
}

console.log(
  `[repair-sibling-links] Inserted ${patched} missing sibling links across ${pairs.size} pairs`,
);
