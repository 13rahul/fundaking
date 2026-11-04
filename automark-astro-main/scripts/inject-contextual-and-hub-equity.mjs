/**
 * 1C: Ensure ≥2 in-body /blog/ links before fk-cluster-links on weak posts.
 * 1D: Inject tech + local hub links into curated overlapping posts.
 * Run: node automark-astro-main/scripts/inject-contextual-and-hub-equity.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cluster-map.json"), "utf8"),
);

const WEAK = [
  "brand-knowledge-panel-entity-cleanup",
  "geo-generative-engine-optimization-basics",
  "in-house-seo-vs-consultant-vs-agency",
  "internal-linking-architecture-seo",
  "nap-consistency-india-directories",
  "prompt-research-from-sales-calls",
  "whatsapp-leads-from-google-maps-india",
  "wordpress-technical-seo-hardening",
];

const TECH_HUB = "technical-seo-audit-checklist-2026";
const LOCAL_HUB = "local-seo-india-playbook";

/** Posts that should also cite the technical hub */
const TECH_EQUITY = [
  "javascript-rendering-and-ai-crawlers",
  "technical-seo-for-ai-discovery",
  "structured-data-for-llm-crawlers",
  "ai-crawler-logs-user-agents",
  "what-is-ai-seo-definition-2026",
  "geo-generative-engine-optimization-basics",
  "auditing-site-for-geo-readiness",
  "llm-seo-vs-traditional-seo",
  "ai-seo-roadmap-90-days",
  "how-to-choose-technical-seo-consultant",
  "content-cluster-strategy-b2b-india",
  "seo-consultant-in-pune-founders-guide-2026",
  "seo-roadmap-for-saas-founders-india",
  "ai-enablement-plus-ai-seo-same-stack",
  "prune-noindex-ai-era",
  "ecommerce-llm-seo-beyond-feeds",
  "nextjs-seo-rendering-guide",
  "wordpress-technical-seo-hardening",
  "internal-linking-architecture-seo",
  "site-migration-seo-checklist",
];

/** Posts that should also cite the local hub */
const LOCAL_EQUITY = [
  "local-seo-plus-ai-answers",
  "ai-search-trust-india-founders",
  "seo-consultant-in-pune-founders-guide-2026",
  "seo-consultant-baramati-vs-pune",
  "baramati-seo-consultant-guide",
  "pune-hinjewadi-baner-seo-consultant-local-search",
  "how-to-rank-seo-consultant-pune",
  "structured-data-organization-localbusiness-india",
  "what-is-ai-seo-definition-2026",
  "ai-seo-for-indian-b2b-founders",
  "local-seo-vs-national-seo-decision",
  "seo-for-b2b-manufacturing-india",
  "google-business-profile-optimization-india",
  "whatsapp-leads-from-google-maps-india",
  "nap-consistency-india-directories",
  "multi-location-local-seo-india",
  "citation-building-without-spam-india",
  "google-maps-ranking-factors-india-2026",
  "service-area-business-seo-india",
  "local-seo-for-clinics-india",
];

function titleFor(slug) {
  const p = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(p)) return slug;
  return fs.readFileSync(p, "utf8").match(/^title:\s*"(.*)"/m)?.[1] ?? slug;
}

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2] };
}

function beforeCluster(body) {
  const i = body.indexOf("<!-- fk-cluster-links -->");
  return i >= 0 ? body.slice(0, i) : body;
}

function countBlogLinks(section) {
  const re = /\]\(\/blog\/[^)]+\)/g;
  return (section.match(re) || []).length;
}

function insertBeforeCluster(body, paragraph) {
  const marker = "<!-- fk-cluster-links -->";
  const note = `\n\n${paragraph}\n`;
  if (body.includes(marker)) return body.replace(marker, `${note}${marker}`);
  const sig = body.search(/\n---\n\n\*Rahul Agarwal/);
  if (sig > 0) return body.slice(0, sig) + note + body.slice(sig);
  return body.trimEnd() + note;
}

function write(slug, fm, body) {
  fs.writeFileSync(
    path.join(blogDir, `${slug}.md`),
    `---\n${fm}\n---\n${body.trim()}\n`,
    "utf8",
  );
}

let weakFixed = 0;
for (const slug of WEAK) {
  const file = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(file)) continue;
  const parsed = parse(fs.readFileSync(file, "utf8"));
  if (!parsed) continue;
  let { fm, body } = parsed;
  let pre = beforeCluster(body);
  let n = countBlogLinks(pre);
  const meta = map.posts[slug];
  const pillar = meta ? map.pillars[meta.pillar] : null;
  const targets = [];
  if (pillar?.hub && pillar.hub !== slug) targets.push(pillar.hub);
  for (const sib of meta?.siblings || []) {
    if (sib !== slug) targets.push(sib);
    if (targets.length >= 4) break;
  }
  const needed = Math.max(0, 2 - n);
  let added = 0;
  for (const t of targets) {
    if (added >= needed && n + added >= 2) break;
    if (body.includes(`/blog/${t}`)) {
      // already somewhere; if only in footer, still count toward requirement by ensuring in pre
      if (!pre.includes(`/blog/${t}`)) {
        body = insertBeforeCluster(
          body,
          `Start with [${titleFor(t)}](/blog/${t}) for the cluster context on this topic.`,
        );
        added++;
        pre = beforeCluster(body);
      }
      continue;
    }
    body = insertBeforeCluster(
      body,
      `See also [${titleFor(t)}](/blog/${t}) for the related playbook in this cluster.`,
    );
    added++;
    pre = beforeCluster(body);
  }
  // final ensure
  while (countBlogLinks(beforeCluster(body)) < 2 && targets.length) {
    const t = targets[countBlogLinks(beforeCluster(body)) % targets.length];
    if (beforeCluster(body).includes(`/blog/${t}`)) break;
    body = insertBeforeCluster(
      body,
      `Cluster link: [${titleFor(t)}](/blog/${t}).`,
    );
  }
  if (added > 0 || countBlogLinks(beforeCluster(body)) >= 2) {
    write(slug, fm, body);
    if (added > 0) weakFixed++;
  }
}

function injectHub(list, hubSlug, label) {
  let n = 0;
  const title = titleFor(hubSlug);
  for (const slug of list) {
    if (slug === hubSlug) continue;
    const file = path.join(blogDir, `${slug}.md`);
    if (!fs.existsSync(file)) continue;
    const parsed = parse(fs.readFileSync(file, "utf8"));
    if (!parsed) continue;
    if (parsed.body.includes(`/blog/${hubSlug}`)) continue;
    const sentence = `For the full ${label} checklist, use [${title}](/blog/${hubSlug}).`;
    write(slug, parsed.fm, insertBeforeCluster(parsed.body, sentence));
    n++;
  }
  return n;
}

const techAdded = injectHub(TECH_EQUITY, TECH_HUB, "technical SEO");
const localAdded = injectHub(LOCAL_EQUITY, LOCAL_HUB, "local SEO India");

console.log(
  `[inject-contextual-and-hub-equity] Weak posts touched: ${weakFixed}; tech hub inserts: ${techAdded}; local hub inserts: ${localAdded}`,
);
