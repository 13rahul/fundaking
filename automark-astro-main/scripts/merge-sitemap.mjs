/**
 * Collapse Astro sitemap-index/chunks into one sitemap.xml, drop retired
 * routes, and append remaining PHP money URLs not already emitted by Astro.
 */
import {
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ORIGIN = "https://fundaking.com";

/** Paths (no trailing slash) that must never appear in the public sitemap. */
const EXCLUDE_PREFIXES = [
  "/careers",
  "/integrations",
  "/elements",
  "/pricing",
  "/features",
  "/404",
];

/**
 * Root PHP landings that may still be money URLs after Astro migration.
 * Deduped against Astro URLs below.
 */
const PHP_MONEY_PATHS = [
  "/amazon-seo-consultant",
  "/b2b-seo-consultant",
  "/ecommerce-seo-consultant",
  "/eeat-grader",
  "/enterprise-seo-consultant",
  "/healthcare-seo-consultant",
  "/hire-seo-consultant-pune",
  "/llm-seo-consultant",
  "/saas-seo-consultant",
  "/seo-audit-consultant",
  "/seo-consultant-ahmedabad",
  "/seo-consultant-bangalore",
  "/seo-consultant-chandigarh",
  "/seo-consultant-chennai",
  "/seo-consultant-delhi",
  "/seo-consultant-india",
  "/seo-consultant-kolkata",
  "/seo-consultant-lucknow",
  "/seo-consultant-mumbai",
  "/seo-consultant-vs-agency",
];

function normalizeLoc(loc) {
  try {
    const u = new URL(loc);
    let path = u.pathname || "/";
    if (path !== "/" && !path.endsWith("/")) path += "/";
    return `${ORIGIN}${path === "/" ? "/" : path}`;
  } catch {
    return null;
  }
}

function pathOnly(loc) {
  try {
    return new URL(loc).pathname.replace(/\/+$/, "") || "/";
  } catch {
    return "/";
  }
}

function isExcluded(loc) {
  const p = pathOnly(loc);
  return EXCLUDE_PREFIXES.some(
    (ex) => p === ex || p.startsWith(`${ex}/`),
  );
}

function extractUrls(xml) {
  const urls = [];
  const re = /<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/gi;
  let m;
  while ((m = re.exec(xml))) {
    const loc = normalizeLoc(m[1].trim());
    if (!loc || isExcluded(loc)) continue;
    const rest = m[2] || "";
    const lastmod = (rest.match(/<lastmod>([^<]+)<\/lastmod>/i) || [])[1];
    urls.push({ loc, lastmod: lastmod?.trim() || null });
  }
  return urls;
}

function readAstroUrlsets() {
  if (!existsSync(dist)) {
    throw new Error(`dist/ missing — run astro build first (${dist})`);
  }

  const files = readdirSync(dist)
    .filter((f) => /^sitemap-\d+\.xml$/i.test(f))
    .sort();

  if (!files.length) {
    // Single-file mode (rare): sitemap.xml already emitted by Astro
    const single = join(dist, "sitemap.xml");
    if (existsSync(single)) {
      return extractUrls(readFileSync(single, "utf8"));
    }
    throw new Error("No Astro sitemap-*.xml found in dist/");
  }

  return files.flatMap((f) =>
    extractUrls(readFileSync(join(dist, f), "utf8")),
  );
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function buildUrlset(entries) {
  const body = entries
    .map(({ loc, lastmod }) => {
      const lm = lastmod
        ? `\n    <lastmod>${lastmod.slice(0, 10)}</lastmod>`
        : `\n    <lastmod>${todayIsoDate()}</lastmod>`;
      return `  <url>\n    <loc>${loc}</loc>${lm}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function buildIndex() {
  const lastmod = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${ORIGIN}/sitemap.xml</loc><lastmod>${lastmod}</lastmod></sitemap></sitemapindex>`;
}

const fromAstro = readAstroUrlsets();
const byLoc = new Map();
for (const entry of fromAstro) {
  byLoc.set(entry.loc, entry);
}

const phpLastmod = todayIsoDate();
for (const path of PHP_MONEY_PATHS) {
  const loc = normalizeLoc(`${ORIGIN}${path}/`);
  if (!loc || isExcluded(loc) || byLoc.has(loc)) continue;
  byLoc.set(loc, { loc, lastmod: phpLastmod });
}

const merged = [...byLoc.values()].sort((a, b) =>
  a.loc.localeCompare(b.loc),
);

writeFileSync(join(dist, "sitemap.xml"), buildUrlset(merged), "utf8");
writeFileSync(join(dist, "sitemap-index.xml"), buildIndex(), "utf8");

console.log(
  `[merge-sitemap] Wrote sitemap.xml (${merged.length} URLs) + sitemap-index.xml → sitemap.xml`,
);
