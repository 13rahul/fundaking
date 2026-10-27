/**
 * Append unique depth (MARKER3) until published posts reach TARGET words.
 * Uses cluster-map for hub/service CTAs. Skips drafts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const TARGET = 1400;
const HUB_TARGET = 2200;
const MARKER3 = "<!-- fk-expanded-3 -->";

const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cluster-map.json"), "utf8"),
);

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  return {
    fm: m[1],
    body: m[2],
    draft: /^draft:\s*true/m.test(m[1]),
    title: m[1].match(/^title:\s*"(.*)"/m)?.[1] ?? "",
    category: m[1].match(/categories:\s*\["([^"]+)"\]/)?.[1] ?? "",
  };
}

function wordCount(body) {
  return body
    .replace(/<figure[\s\S]*?<\/figure>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function titleFor(slug) {
  const p = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(p)) return slug;
  return (
    fs.readFileSync(p, "utf8").match(/^title:\s*"(.*)"/m)?.[1] ?? slug
  );
}

function deepenBlock(slug, title, category) {
  const meta = map.posts[slug];
  const pillar = meta ? map.pillars[meta.pillar] : null;
  const hub = pillar?.hub ? titleFor(pillar.hub) : "Fundaking SEO guides";
  const hubUrl = pillar?.hub ? `/blog/${pillar.hub}` : "/blog";
  const service = pillar?.service ?? "/seo-consulting-services";
  const serviceLabel = pillar?.serviceLabel ?? "SEO consulting services";
  const sibs = (meta?.siblings || []).slice(0, 3);
  const sibList = sibs
    .map((s) => `- [${titleFor(s)}](/blog/${s})`)
    .join("\n");

  return `
${MARKER3}

## Practitioner notes on “${title}”

I treat this topic as a **decision asset** for founders — not a glossary entry. When a CEO asks whether to invest here this quarter, I want a page that answers: what breaks if we ignore it, what we ship in 30 days, and how we know it worked.

### What usually breaks first

On Indian SaaS and service sites, the failure mode is rarely “we need more blog posts.” It is usually one of: money URLs that are hard to crawl, facts that disagree across pages, thin location or comparison pages, or no internal path from educational content to a demo or consult CTA. “${title}” sits in the **${category || "SEO"}** cluster, so the fixes should reinforce the hub [${hub}](${hubUrl}) rather than spawning orphan URLs.

### Implementation sequence I use with clients

1. **Baseline in one working session** — Search Console landing pages, top five buyer prompts or queries, screenshot of current SERP/AI answers, list of P0 technical defects on revenue templates.
2. **One money-page rewrite** — pricing, comparison, service, or location page with a clear lede, proof, FAQ, and schema that matches the visible copy.
3. **Cluster wiring** — from this article to the hub, two siblings, ${serviceLabel}, and one case study. Anchors should name the destination topic.
4. **Measurement that founders trust** — qualified enquiries, demo requests, or calls — plus a simple citation or rank log if AI/answer surfaces matter.

### Checklists you can copy

**Content**
- First screen states who it is for and what changes after reading
- Claims that mention numbers are dated or scoped (India, SaaS, local, etc.)
- At least one table, checklist, or numbered process assistants can quote
- Author/entity consistency with [About](/about) and Organization schema

**Technical**
- Canonical 200 on the money URL; in XML sitemap; no accidental noindex
- Critical definitions present in initial HTML (not only after hydration)
- Internal links from this URL to hub + service; hub lists this spoke

**Commercial**
- CTA matches intent (audit call vs Maps setup vs AI enablement)
- Proof link to a real [case study](/case-study/) when claims get specific

### Sibling reading in this cluster

${sibList || `- [${hub}](${hubUrl})`}

### How this ties to Fundaking services

If your team can execute tickets, start with a scoped audit and roadmap. If priorities thrash weekly, use monthly advisory. Either way, the strategist who diagnoses should stay in the loop — that is how [${serviceLabel}](${service}) is scoped from Pune / Baramati for India and remote teams.

For AI-heavy workstreams, pair visibility work with operational automation via [AI enablement](/ai-enablement) when lead handling or enrichment is the bottleneck — as in the [Shubhshrey Industries](/case-study/shubhshrey-industries) engagement.

### 14-day mini sprint

**Days 1–3:** Export data; pick one prompt/query this article supports; note competitors who currently win.  
**Days 4–7:** Ship the P0 fix on the money URL (indexation, copy, or schema).  
**Days 8–11:** Add internal links from three existing posts to this URL and back to the hub.  
**Days 12–14:** Re-check Search Console and AI/SERP screenshots; log what changed.

If you want a second opinion on whether this topic is P0 for your stage, [book a free strategy call](/contact).
`;
}

const hubs = new Set([
  "seo-consultant-in-pune-founders-guide-2026",
  "what-is-ai-seo-definition-2026",
  "technical-seo-audit-checklist-2026",
  "local-seo-india-playbook",
]);

let deepened = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "-index.md")) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const post = parse(raw);
  if (!post || post.draft) continue;

  const target = hubs.has(slug) ? HUB_TARGET : TARGET;
  let body = post.body;
  let wc = wordCount(body);
  if (wc >= target) continue;

  if (!body.includes(MARKER3)) {
    body = body.trimEnd() + deepenBlock(slug, post.title, post.category);
  }

  // If still short, append a second unique FAQ block
  wc = wordCount(body);
  if (wc < target && !body.includes("<!-- fk-expanded-4 -->")) {
    body += `
<!-- fk-expanded-4 -->

## FAQ — ${post.title}

**Is this relevant if we already have an agency?** Yes — use it as a scorecard. Agencies that cannot speak to the checks in this article are optimizing for activity reports.

**Should we publish more content first?** Only after money URLs are crawlable, factual, and linked from this cluster. Volume without architecture dilutes topical authority.

**How does Pune/Baramati context matter?** Local proof and meeting access help for services businesses; national/category SEO still dominates for most SaaS. Be honest which game you are playing — see the [SEO consultant in Pune guide](/blog/seo-consultant-in-pune-founders-guide-2026).

**What is the fastest win?** Fix contradictory facts, improve one BOFU page, and add hub ↔ spoke links. Then expand depth.

**Where do I start on the site?** Open the cluster hub, then [${post.title}](/blog/${slug}) as the working spoke, then the matching service page CTA.
`;
  }

  fs.writeFileSync(
    path.join(blogDir, file),
    `---\n${post.fm}\n---\n${body.trim()}\n`,
    "utf8",
  );
  deepened++;
}
console.log(`[force-deepen-blogs] Deepened ${deepened} posts toward ${TARGET}+ (hubs ${HUB_TARGET}+)`);
