/**
 * Second-pass unique depth to push priority 16 posts toward ~1800+ words.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const MARKER = "<!-- fk-priority-depth-2 -->";

function block(slug, title) {
  const t = title;
  const s = slug;
  const h2a = s.includes("shopify") || s.includes("wordpress") || s.includes("index-bloat") || s.includes("internal-linking")
    ? `Engineering tickets that finish “${t}”`
    : s.includes("maps") || s.includes("nap") || s.includes("whatsapp") || s.includes("citation")
      ? `Local ops rituals that make “${t}” stick`
      : s.includes("agency") || s.includes("in-house") || s.includes("kpi") || s.includes("roadmap")
        ? `Leadership decisions around “${t}”`
        : `Go-to-market plays built on “${t}”`;
  const h2b = s.includes("ai") || s.includes("prompt") || s.includes("citation") || s.includes("entity") || s.includes("knowledge")
    ? `Answer-engine QA gates for “${t}”`
    : s.includes("local") || s.includes("maps") || s.includes("nap") || s.includes("whatsapp") || s.includes("citation-building")
      ? `Maps and NAP QA gates for “${t}”`
      : `Commercial QA gates for “${t}”`;
  return `
${MARKER}

## ${h2a}

### Solo marketer path

You have ten hours a week. For “${t}”, pick one revenue URL this topic supports, write acceptance criteria for engineering (status code, visible copy, schema match), and ship a single scannable asset sales can forward after a call. Refuse new blog ideas until that URL is green in Search Console and linked from your cluster hub.

Track work in a Sheet with columns: URL, owner, due date, status, KPI (demos, calls, WhatsApp, or qualified pipeline). Review it in the pipeline meeting — not a separate SEO theatre call.

### Already-have-an-agency path

Use this article as a scorecard. Ask for evidence that the checks here are done on your money URLs. If the agency only returns keyword greenery, escalate once with a written 14-day recovery plan. If they cannot speak to the substance of “${t}”, change the operating model.

### Scaling-content path

Volume is not the strategy. Gate every new outline on: which prompt or query it supports, which URL owns it, and which demo stage it influences. “${t}” should appear in the quarterly roadmap with a named owner and a kill criterion if pipeline does not move.

## ${h2b}

**Discovery**
- [ ] Five buyer prompts or queries documented from sales or support
- [ ] Primary URL chosen; competing URLs listed for consolidation
- [ ] Screenshot baseline of SERP / Maps / AI answer dated

**Execution**
- [ ] Technical gates on the primary URL pass (200, indexable, facts in HTML)
- [ ] First screen rewritten in buyer language, not internal jargon
- [ ] At least one table, process list, or FAQ block that can be quoted
- [ ] Hub ↔ spoke ↔ service ↔ proof links with descriptive anchors

**Proof and QA**
- [ ] Claims with numbers are dated or scoped to India / segment
- [ ] Organization and author facts match About and schema
- [ ] Sales reviewed the page and would send it to a prospect

**Measurement**
- [ ] KPI tile exists on the founder dashboard
- [ ] Biweekly or weekly review assigned
- [ ] Decision logged after 30 days: double down, fix, or cut

## Pushbacks I hear on “${t}”

**“We need more content first.”**  
Not if money URLs fail crawl or contradict pricing. Volume without architecture dilutes topical authority and wastes writers.

**“Our agency said rankings are up.”**  
Ask for demos and the five-query sheet. Rankings without pipeline are a vanity report.

**“AI will handle this automatically.”**  
Models amplify whatever facts you publish. Wrong NAP, wrong pricing, and JS-only answers get amplified too.

**“We are too early for SEO.”**  
You are not too early for clean money URLs and entity facts. You may be too early for a large content team — that is different.

## Calendar — first 45 days on “${t}”

**Days 1–5:** Baseline data, choose primary URL, list P0 defects.  
**Days 6–15:** Ship technical and factual fixes; rewrite lede + FAQ.  
**Days 16–30:** Wire internal links; update service CTA; brief sales.  
**Days 31–45:** Measure; screenshot again; decide next URL. Do not start URL #2 until URL #1 is honestly Pass on technical + entity checks.

## Working with Fundaking on “${t}”

Scoped audit and roadmap when your team can execute tickets. Monthly advisory when priorities thrash. Hybrid is common: I prioritise and QA; your marketer and eng ship. Work runs from Pune / Baramati across India and remote teams. Start via the matching service page linked in Related reading, or [book a call](/contact).

## FAQ — implementation details for “${t}”

**Does this replace the cluster hub article?**  
No — this spoke implements one job; the hub frames the pillar.

**How do we keep pages from going stale?**  
Revisit when pricing, packaging, or service area changes. Stale BOFU claims are worse than thin TOFU posts.

**What is the minimum evidence for case-study claims?**  
Named process and scoped outcomes you can defend on a sales call — not invented percentages.

**Should every blog have the same CTA?**  
No. Match intent: Maps/WhatsApp for local, demo for SaaS, audit call for consulting.

**When is “${t}” not P0?**  
When crawl/index on revenue templates is broken, or when ops cannot handle leads. Fix those constraints first.
`;
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
const targets = [
  "prompt-research-from-sales-calls",
  "measuring-ai-citations-without-vanity-tools",
  "ai-enablement-plus-ai-seo-same-stack",
  "brand-knowledge-panel-entity-cleanup",
  "seo-kpi-dashboard-for-founders",
  "when-to-fire-your-seo-agency",
  "in-house-seo-vs-consultant-vs-agency",
  "seo-roadmap-for-saas-founders-india",
  "shopify-technical-seo-checklist",
  "wordpress-technical-seo-hardening",
  "index-bloat-cleanup-playbook",
  "internal-linking-architecture-seo",
  "google-maps-ranking-factors-india-2026",
  "nap-consistency-india-directories",
  "whatsapp-leads-from-google-maps-india",
  "citation-building-without-spam-india",
];

for (const slug of targets) {
  const file = path.join(blogDir, `${slug}.md`);
  let raw = fs.readFileSync(file, "utf8");
  if (raw.includes(MARKER)) {
    console.log(`skip ${slug}`);
    continue;
  }
  const title =
    raw.match(/^title:\s*"(.*)"/m)?.[1] ?? slug.replace(/-/g, " ");
  const insert = block(slug, title);
  if (raw.includes("<!-- fk-cluster-links -->")) {
    raw = raw.replace(
      "<!-- fk-cluster-links -->",
      `${insert}\n<!-- fk-cluster-links -->`,
    );
  } else {
    raw = raw.trimEnd() + "\n" + insert + "\n";
  }
  fs.writeFileSync(file, raw, "utf8");
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  console.log(`${slug}: ~${body.split(/\s+/).filter(Boolean).length} words`);
}
console.log("[bulk-depth-16] done");
