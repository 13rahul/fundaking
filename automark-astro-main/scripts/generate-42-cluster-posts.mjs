/**
 * Generate 42 new cluster posts (Batches A–D) + merge into cluster-map.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const mapPath = path.join(__dirname, "cluster-map.json");

const PILLAR = {
  consulting: {
    key: "seo-consulting",
    cat: "SEO Consulting",
    hub: "seo-consultant-in-pune-founders-guide-2026",
    hubTitle: "SEO Consultant in Pune: A Founder's Guide (2026)",
    service: "/seo-consulting-services",
    serviceLabel: "SEO consulting services",
    proof: "/case-study/saas-demo-requests",
    proofLabel: "SaaS demo requests case study",
  },
  technical: {
    key: "technical-seo",
    cat: "Technical SEO",
    hub: "technical-seo-audit-checklist-2026",
    hubTitle: "Technical SEO Audit Checklist (2026)",
    service: "/technical-seo-consultant",
    serviceLabel: "Technical SEO consulting",
    proof: "/case-study/fintech-organic-growth",
    proofLabel: "Fintech organic growth case study",
  },
  local: {
    key: "local-seo",
    cat: "Local SEO",
    hub: "local-seo-india-playbook",
    hubTitle: "Local SEO India Playbook: Maps, GBP, and Organic",
    service: "/local-seo-consultant",
    serviceLabel: "Local SEO consulting",
    proof: "/case-study/real-group",
    proofLabel: "Real Group case study",
  },
  ai: {
    key: "ai-answer-engine",
    cat: "AI / Answer Engine SEO",
    hub: "what-is-ai-seo-definition-2026",
    hubTitle: "What Is AI SEO? A Practical Definition for 2026",
    service: "/ai-enablement",
    serviceLabel: "AI enablement",
    proof: "/case-study/shubhshrey-industries",
    proofLabel: "Shubhshrey AI CRM case study",
  },
};

/** @type {Array<{slug:string,pillar:keyof typeof PILLAR,title:string,meta:string,desc:string,tag:string,tags:string[],siblings:string[],body:string,category?:string}>} */
const POSTS = [];

function add(p, slug, title, meta, desc, tag, tags, siblings, sections, category) {
  POSTS.push({
    slug,
    pillar: p,
    title,
    meta,
    desc,
    tag,
    tags,
    siblings,
    category,
    body: sections,
  });
}

function depth(topic, pillar) {
  const P = PILLAR[pillar];
  return `
## Why this matters for Indian founders

“${topic}” shows up on discovery calls when organic pipeline stalls, agency reports look green, and demos still do not arrive. Search rewards **specific, verifiable pages** tied to revenue — not keyword theatre.

Ask whether this topic touches **money pages** (pricing, product, location, demo) or **trust pages** (about, case studies). Fix those before scaling blog volume. This spoke sits in the [${P.hubTitle}](/blog/${P.hub}) cluster.

## Mistakes I see on live sites

- Chasing tactics without a Search Console baseline
- Publishing more blogs while money URLs are uncrawlable or contradictory
- Treating AI visibility as separate from technical SEO
- Skipping internal links from education posts to BOFU pages
- Measuring rankings alone instead of qualified enquiries

## A 30-day workflow

**Week 1 — Baseline:** Export top landing pages, list five buyer queries or prompts, screenshot SERP/AI answers.  
**Week 2 — Fix facts:** Align pricing, NAP, founder bio across site and profiles.  
**Week 3 — Ship one asset:** Rewrite one page tied to “${topic}” with a table or checklist.  
**Week 4 — Measure:** Track demos, calls, or MQLs — then re-check visibility.

## Practitioner checklist

| Area | Pass looks like |
| --- | --- |
| Intent | Page answers who it is for and what changes after reading |
| Proof | Named outcomes, reviews, or process — not vague “best SEO” |
| Technical | 200 status, in sitemap, facts in HTML |
| Links | Hub + siblings + [${P.serviceLabel}](${P.service}) + proof |
| CTA | One primary next step |

## When to bring in Fundaking

Bring senior help when engineering bandwidth exists but **prioritization** is missing. I cap engagements so strategy stays founder-led. Start with [${P.serviceLabel}](${P.service}) or [book a call](/contact). Proof: [${P.proofLabel}](${P.proof}).

## FAQ

**Is this only for Pune?** No — Pune/Baramati is the operating base; most work is remote across India.  
**Do we need local SEO too?** Only if Maps intent matters — see the [local SEO India playbook](/blog/local-seo-india-playbook).  
**How does AI search change this?** Classic technical + entity clarity still gates citations — see [What is AI SEO?](/blog/what-is-ai-seo-definition-2026).
`;
}

// ——— Batch A: SEO Consulting (12) ———
add("consulting", "seo-consultant-baramati-vs-pune",
  "SEO Consultant Baramati vs Pune: When Local Presence Matters",
  "SEO Consultant Baramati vs Pune | Fundaking",
  "When you need a metro Pune SEO consultant versus a Baramati-based advisor — meetings, manufacturing clients, and remote execution.",
  "SEO Consulting", ["pune", "baramati", "seo-consultant"],
  ["baramati-seo-consultant-guide", "seo-consultant-in-pune-founders-guide-2026", "seo-consultant-pune-vs-agency"],
  `Pune and Baramati sit in the same metro story but different client realities. Manufacturing, agro, and industrial brands around Baramati often want **on-site workshops**; Hinjewadi SaaS teams care more about senior hours and Slack than a physical office.

*Part of the [SEO consultant in Pune guide](/blog/seo-consultant-in-pune-founders-guide-2026) cluster.*

## Choose Baramati-local when…

- Stakeholders need in-person strategy days
- Your buyers are regional B2B (factories, dealers)
- GBP and local proof matter as much as national rankings

## Choose Pune-metro positioning when…

- Talent and competitor set is national/global
- You sell software or export services
- You still want a Maharashtra base without forcing Maps for every query

See also [Baramati SEO consultant guide](/blog/baramati-seo-consultant-guide) and [SEO consultant Pune vs agency](/blog/seo-consultant-pune-vs-agency).

## How Fundaking works both

I operate from Baramati / Pune with remote delivery nationwide. Discovery can be WhatsApp or on-site; audits and tickets are async. [SEO consulting services](/seo-consulting-services).
${depth("SEO consultant Baramati vs Pune", "consulting")}`);

add("consulting", "seo-roadmap-for-saas-founders-india",
  "SEO Roadmap for SaaS Founders in India (6 Months)",
  "SEO Roadmap for SaaS Founders India | Fundaking",
  "A six-month organic SEO roadmap for Indian SaaS: technical floor, BOFU pages, clusters, and demo KPIs.",
  "SEO Consulting", ["saas", "roadmap", "india"],
  ["seo-kpi-dashboard-for-founders", "content-cluster-strategy-b2b-india", "seo-for-funded-startups-india"],
  `Indian SaaS founders do not need a 40-page SEO novel. They need a **sequenced roadmap** that protects demo pipeline.

## Months 1–2 — Floor
Crawl/index, CWV on pricing/demo, schema, fix contradictory facts. Hub: [technical SEO audit checklist](/blog/technical-seo-audit-checklist-2026).

## Months 3–4 — BOFU
Comparison, integration, and “vs” pages; internal links from blog → product → demo.

## Months 5–6 — Clusters
Publish hub + spokes; measure SQLs. See [content cluster strategy](/blog/content-cluster-strategy-b2b-india) and [SaaS demo case study](/case-study/saas-demo-requests).
${depth("SEO roadmap for SaaS founders in India", "consulting")}`);

add("consulting", "seo-kpi-dashboard-for-founders",
  "SEO KPI Dashboard for Founders (Not Vanity Ranks)",
  "SEO KPI Dashboard for Founders | Fundaking",
  "Which SEO metrics founders should track — impressions, landing-page conversions, assisted demos — vs vanity rankings.",
  "SEO Consulting", ["kpi", "analytics", "reporting"],
  ["monthly-seo-reporting-that-ceos-read", "seo-roadmap-for-saas-founders-india", "seo-advisory-vs-project-first-90-days"],
  `If your SEO report opens with “we ranked for 2,000 keywords,” close the tab. Founders need **pipeline-linked KPIs**.

| KPI | Why it matters |
| --- | --- |
| Organic demo / lead rate | Ties search to revenue |
| Money URL impressions + CTR | Shows SERP health |
| Index coverage of P0 URLs | Technical floor |
| Assisted conversions | Content influence |
| Citation log (optional) | AI visibility |

Pair with [monthly SEO reporting CEOs read](/blog/monthly-seo-reporting-that-ceos-read).
${depth("SEO KPI dashboard for founders", "consulting")}`);

add("consulting", "content-cluster-strategy-b2b-india",
  "Content Cluster Strategy for B2B in India",
  "Content Cluster Strategy B2B India | Fundaking",
  "How to build topical authority with hubs and spokes for Indian B2B — the same model Fundaking uses on this blog.",
  "SEO Consulting", ["clusters", "content", "b2b"],
  ["seo-roadmap-for-saas-founders-india", "internal-linking-architecture-seo", "seo-consultant-in-pune-founders-guide-2026"],
  `Topical authority is not “more blogs.” It is a **hub that owns a problem** and spokes that answer related jobs, all linking to money pages.

## Fundaking’s four hubs
SEO consulting · Technical SEO · Local SEO · AI / answer engines — see [founder’s Pune guide](/blog/seo-consultant-in-pune-founders-guide-2026).

## Rules
1 hub · 2 siblings · 1 service · 1 proof per post. Depth over synonym spam. Wire with [internal linking architecture](/blog/internal-linking-architecture-seo).
${depth("Content cluster strategy for B2B in India", "consulting")}`);

add("consulting", "seo-for-d2c-brands-india",
  "SEO for D2C Brands in India (Shopify & Beyond)",
  "SEO for D2C Brands India | Fundaking",
  "Organic SEO for Indian D2C: collection architecture, CWV, content that sells, and when paid should stay on.",
  "SEO Consulting", ["d2c", "shopify", "ecommerce"],
  ["shopify-technical-seo-checklist", "core-web-vitals-shopify-india", "organic-seo-vs-paid"],
  `D2C SEO in India fails when brands treat collections like blog tags and ignore mobile CWV. Start with [Shopify technical SEO](/blog/shopify-technical-seo-checklist) and [CWV for Shopify](/blog/core-web-vitals-shopify-india).

Balance organic with [organic vs paid](/blog/organic-seo-vs-paid) — do not flip ads off after one good month.
${depth("SEO for D2C brands in India", "consulting")}`);

add("consulting", "seo-for-b2b-manufacturing-india",
  "SEO for B2B Manufacturing Companies in India",
  "SEO for B2B Manufacturing India | Fundaking",
  "Organic and local SEO for Indian manufacturers — catalogues, dealer intent, and CRM-ready enquiries.",
  "SEO Consulting", ["manufacturing", "b2b", "india"],
  ["local-seo-for-manufacturers-baramati", "seo-consultant-baramati-vs-pune", "seo-for-d2c-brands-india"],
  `Manufacturers need **product + application pages**, dealer/city pages when relevant, and enquiry forms that sales actually uses. See [local SEO for manufacturers in Baramati](/blog/local-seo-for-manufacturers-baramati) and [Shubhshrey case study](/case-study/shubhshrey-industries).
${depth("SEO for B2B manufacturing in India", "consulting")}`);

add("consulting", "when-to-fire-your-seo-agency",
  "When to Fire Your SEO Agency (And What to Do Next)",
  "When to Fire Your SEO Agency | Fundaking",
  "Clear signals it is time to exit an SEO retainer — and how to transition to a consultant or hybrid model.",
  "SEO Consulting", ["agency", "hiring", "india"],
  ["seo-consultant-pune-vs-agency", "in-house-seo-vs-consultant-vs-agency", "seo-rfp-template-india"],
  `Fire the agency when: no strategist access, keyword theatre reports, no technical tickets, or 12-month lock-in before an audit. Transition with an [RFP template](/blog/seo-rfp-template-india) and [consultant vs agency](/blog/seo-consultant-pune-vs-agency) clarity.
${depth("When to fire your SEO agency", "consulting")}`);

add("consulting", "seo-rfp-template-india",
  "SEO RFP Template for Indian Companies",
  "SEO RFP Template India | Fundaking",
  "A practical SEO RFP template for Indian founders — scope, access, KPIs, and red-flag answers.",
  "Pricing & Hiring", ["rfp", "hiring", "procurement"],
  ["when-to-fire-your-seo-agency", "seo-consulting-pricing-india", "in-house-seo-vs-consultant-vs-agency"],
  `## RFP must-ask
Stack, GSC access, who implements, first 90 days, KPI definition, exit clause. Price only after discovery — see [SEO consulting pricing India](/blog/seo-consulting-pricing-india).
${depth("SEO RFP template for Indian companies", "consulting")}`, "Pricing & Hiring");

add("consulting", "in-house-seo-vs-consultant-vs-agency",
  "In-House SEO vs Consultant vs Agency: Decision Matrix",
  "In-House SEO vs Consultant vs Agency | Fundaking",
  "Choose in-house SEO, an independent consultant, or an agency with a clear decision matrix for Indian teams.",
  "Pricing & Hiring", ["hiring", "team", "seo"],
  ["seo-consultant-pune-vs-agency", "seo-consultant-vs-freelancer", "seo-advisory-vs-project-first-90-days"],
  `| Model | Best when |
| --- | --- |
| In-house | Steady backlog + brand knowledge |
| Consultant | Senior strategy, capped clients |
| Agency | High volume production |

Details: [consultant vs agency](/blog/seo-consultant-pune-vs-agency), [consultant vs freelancer](/blog/seo-consultant-vs-freelancer).
${depth("In-house SEO vs consultant vs agency", "consulting")}`, "Pricing & Hiring");

add("consulting", "seo-for-funded-startups-india",
  "SEO for Funded Startups in India (Post-PMF)",
  "SEO for Funded Startups India | Fundaking",
  "Post-PMF SEO for funded Indian startups — technical debt, category pages, and investor-friendly KPIs.",
  "SEO Consulting", ["startup", "funded", "saas"],
  ["seo-roadmap-for-saas-founders-india", "seo-kpi-dashboard-for-founders", "seo-for-d2c-brands-india"],
  `After funding, startups often inherit JS-heavy sites and paid-only acquisition. Organic should lower CAC, not replace product-market fit. Use the [SaaS roadmap](/blog/seo-roadmap-for-saas-founders-india).
${depth("SEO for funded startups in India", "consulting")}`);

add("consulting", "baramati-seo-consultant-guide",
  "Baramati SEO Consultant Guide for Local Businesses",
  "Baramati SEO Consultant Guide | Fundaking",
  "How local businesses in Baramati should hire SEO help — Maps, websites, and realistic expectations.",
  "SEO Consulting", ["baramati", "local", "seo-consultant"],
  ["seo-consultant-baramati-vs-pune", "local-seo-india-playbook", "seo-consulting-pricing-india"],
  `Baramati businesses often need **GBP + a clean website + WhatsApp conversion**, not national head-term campaigns. Start with the [local SEO India playbook](/blog/local-seo-india-playbook) and [Baramati vs Pune](/blog/seo-consultant-baramati-vs-pune).
${depth("Baramati SEO consultant guide", "consulting")}`);

add("consulting", "monthly-seo-reporting-that-ceos-read",
  "Monthly SEO Reporting That CEOs Actually Read",
  "Monthly SEO Reporting for CEOs | Fundaking",
  "Build SEO reports executives finish — narrative, KPIs, risks, and next decisions — not 40 keyword charts.",
  "SEO Consulting", ["reporting", "kpi", "advisory"],
  ["seo-kpi-dashboard-for-founders", "seo-advisory-vs-project-first-90-days", "seo-roadmap-for-saas-founders-india"],
  `CEO report structure: 1) what changed in pipeline, 2) top risks, 3) shipped work, 4) next 30 days, 5) ask. Metrics from [SEO KPI dashboard](/blog/seo-kpi-dashboard-for-founders).
${depth("Monthly SEO reporting that CEOs read", "consulting")}`);

// ——— Batch B: Technical (13) ———
const techSiblings = (a, b) => [a, b, "technical-seo-audit-checklist-2026"];

add("technical", "log-file-analysis-seo-guide",
  "Log File Analysis for SEO: A Practical Guide",
  "Log File Analysis SEO Guide | Fundaking",
  "Use server logs to see how Googlebot crawls your site — wasted budget, blocked money pages, and priority fixes.",
  "Technical SEO", ["logs", "crawl", "technical-seo"],
  techSiblings("ai-crawler-logs-user-agents", "index-bloat-cleanup-playbook"),
  `Log analysis answers what crawlers **actually** hit — not what your sitemap hopes. Pair with [AI crawler logs](/blog/ai-crawler-logs-user-agents) and the [audit hub](/blog/technical-seo-audit-checklist-2026).
${depth("Log file analysis for SEO", "technical")}`);

add("technical", "faceted-navigation-seo-ecommerce",
  "Faceted Navigation SEO for Ecommerce",
  "Faceted Navigation SEO Ecommerce | Fundaking",
  "Control filters and parameters so ecommerce facets do not explode the index or waste crawl budget.",
  "Technical SEO", ["ecommerce", "facets", "parameters"],
  techSiblings("index-bloat-cleanup-playbook", "shopify-technical-seo-checklist"),
  `Facet chaos is the #1 crawl budget killer on large catalogues. Canonical, noindex, or parameter handling — pick deliberately. See [index bloat cleanup](/blog/index-bloat-cleanup-playbook).
${depth("Faceted navigation SEO for ecommerce", "technical")}`);

add("technical", "internal-linking-architecture-seo",
  "Internal Linking Architecture for SEO",
  "Internal Linking Architecture SEO | Fundaking",
  "Design hub-and-spoke internal links that pass equity to money pages and reinforce topical clusters.",
  "Technical SEO", ["internal-links", "architecture", "clusters"],
  techSiblings("content-cluster-strategy-b2b-india", "canonical-tags-common-mistakes"),
  `Every orphan blog is wasted crawl. Hub lists spokes; spokes link hub + service + proof. This is how Fundaking’s blog is wired — see [content clusters](/blog/content-cluster-strategy-b2b-india).
${depth("Internal linking architecture for SEO", "technical")}`);

add("technical", "canonical-tags-common-mistakes",
  "Canonical Tags: Common Mistakes That Kill Rankings",
  "Canonical Tags Mistakes | Technical SEO | Fundaking",
  "Fix self-referencing canonicals, cross-domain errors, and parameter canonical chaos on Indian sites.",
  "Technical SEO", ["canonical", "indexation"],
  techSiblings("xml-sitemap-best-practices-2026", "https-redirect-chains-seo-fix"),
  `Wrong canonicals silently drop money pages. Validate in GSC URL inspection. Related: [XML sitemaps](/blog/xml-sitemap-best-practices-2026), [redirect chains](/blog/https-redirect-chains-seo-fix).
${depth("Canonical tags common mistakes", "technical")}`);

add("technical", "xml-sitemap-best-practices-2026",
  "XML Sitemap Best Practices (2026)",
  "XML Sitemap Best Practices 2026 | Fundaking",
  "Build sitemaps that list money URLs, exclude junk, and stay in sync after migrations.",
  "Technical SEO", ["sitemap", "indexation"],
  techSiblings("canonical-tags-common-mistakes", "site-migration-seo-checklist"),
  `Sitemaps are a hint, not a command — but a junk sitemap trains bots badly. After redesigns follow [migration checklist](/blog/site-migration-seo-checklist).
${depth("XML sitemap best practices 2026", "technical")}`);

add("technical", "hreflang-seo-india-multilingual",
  "Hreflang SEO for India (English, Hindi & More)",
  "Hreflang SEO India Multilingual | Fundaking",
  "Implement hreflang correctly for Indian multilingual sites — EN/HI and regional languages without duplicate chaos.",
  "Technical SEO", ["hreflang", "multilingual", "india"],
  techSiblings("multilingual-llm-seo-strategy", "canonical-tags-common-mistakes"),
  `India multilingual SEO fails when hreflang points to soft-404s or mixes x-default poorly. Align with [multilingual LLM SEO](/blog/multilingual-llm-seo-strategy).
${depth("Hreflang SEO for India", "technical")}`);

add("technical", "shopify-technical-seo-checklist",
  "Shopify Technical SEO Checklist",
  "Shopify Technical SEO Checklist | Fundaking",
  "A technical SEO checklist for Shopify stores in India — themes, apps, collections, and speed.",
  "Technical SEO", ["shopify", "ecommerce", "checklist"],
  techSiblings("core-web-vitals-shopify-india", "faceted-navigation-seo-ecommerce"),
  `Shopify apps create duplicate parameters and slow LCP. Audit theme, apps, and collection indexation. Pair with [CWV Shopify India](/blog/core-web-vitals-shopify-india).
${depth("Shopify technical SEO checklist", "technical")}`);

add("technical", "nextjs-seo-rendering-guide",
  "Next.js SEO: Rendering Guide for Marketing Sites",
  "Next.js SEO Rendering Guide | Fundaking",
  "SSR, SSG, and ISR choices so Next.js marketing pages stay crawlable for Google and AI fetchers.",
  "Technical SEO", ["nextjs", "javascript", "rendering"],
  techSiblings("javascript-rendering-and-ai-crawlers", "core-web-vitals-indian-saas"),
  `If pricing only appears after client hydration, you will lose. Prefer SSG/SSR for public routes. Deep dive: [JS rendering and AI crawlers](/blog/javascript-rendering-and-ai-crawlers).
${depth("Next.js SEO rendering guide", "technical")}`);

add("technical", "wordpress-technical-seo-hardening",
  "WordPress Technical SEO Hardening",
  "WordPress Technical SEO Hardening | Fundaking",
  "Harden WordPress for SEO: crawl waste, plugin bloat, schema, and security that affects indexation.",
  "Technical SEO", ["wordpress", "hardening"],
  techSiblings("index-bloat-cleanup-playbook", "prune-noindex-ai-era"),
  `WordPress SEO dies by a thousand plugins. Audit authors/date archives, thin tags, and schema conflicts. See [prune/noindex](/blog/prune-noindex-ai-era).
${depth("WordPress technical SEO hardening", "technical")}`);

add("technical", "https-redirect-chains-seo-fix",
  "HTTPS and Redirect Chains: SEO Fix Guide",
  "HTTPS Redirect Chains SEO Fix | Fundaking",
  "Eliminate http→https→www chains and soft loops that leak PageRank and confuse crawlers.",
  "Technical SEO", ["redirects", "https"],
  techSiblings("site-migration-seo-checklist", "canonical-tags-common-mistakes"),
  `One hop max to the final URL. Map chains before migrations — [site migration SEO](/blog/site-migration-seo-checklist).
${depth("HTTPS and redirect chains SEO fix", "technical")}`);

add("technical", "index-bloat-cleanup-playbook",
  "Index Bloat Cleanup Playbook",
  "Index Bloat Cleanup Playbook | Fundaking",
  "Find and remove index bloat — thin tags, parameters, and soft 404s — without deleting valuable URLs.",
  "Technical SEO", ["indexation", "cleanup"],
  techSiblings("prune-noindex-ai-era", "faceted-navigation-seo-ecommerce"),
  `GSC “Crawled – not indexed” is a gift. Prioritize money URLs first. Methods in [prune noindex AI era](/blog/prune-noindex-ai-era).
${depth("Index bloat cleanup playbook", "technical")}`);

add("technical", "structured-data-organization-localbusiness-india",
  "Organization & LocalBusiness Schema for India",
  "Organization LocalBusiness Schema India | Fundaking",
  "Implement Organization and LocalBusiness schema that matches visible NAP and GST entity names in India.",
  "Technical SEO", ["schema", "localbusiness", "india"],
  techSiblings("structured-data-for-llm-crawlers", "local-seo-india-playbook"),
  `Schema must match the page. Fake reviews = risk. Bridge to [structured data for LLM crawlers](/blog/structured-data-for-llm-crawlers) and [local playbook](/blog/local-seo-india-playbook).
${depth("Organization and LocalBusiness schema for India", "technical")}`);

add("technical", "core-web-vitals-shopify-india",
  "Core Web Vitals for Shopify Stores in India",
  "Core Web Vitals Shopify India | Fundaking",
  "Improve LCP, INP, and CLS on Shopify for Indian mobile networks — apps, images, and theme tips.",
  "Technical SEO", ["cwv", "shopify", "india"],
  techSiblings("shopify-technical-seo-checklist", "core-web-vitals-indian-saas"),
  `Shopify CWV differs from SaaS Next apps — app scripts dominate. Sibling: [CWV Indian SaaS](/blog/core-web-vitals-indian-saas).
${depth("Core Web Vitals for Shopify in India", "technical")}`);

// ——— Batch C: Local (12) ———
add("local", "google-maps-ranking-factors-india-2026",
  "Google Maps Ranking Factors in India (2026)",
  "Google Maps Ranking Factors India 2026 | Fundaking",
  "Relevance, distance, and prominence for Indian map pack — practical levers you can control.",
  "Local SEO", ["maps", "gbp", "india"],
  ["google-business-profile-optimization-india", "nap-consistency-india-directories", "local-seo-india-playbook"],
  `You do not control distance; you control relevance and prominence. GBP categories, reviews, citations — see [GBP optimization India](/blog/google-business-profile-optimization-india).
${depth("Google Maps ranking factors in India 2026", "local")}`);

add("local", "nap-consistency-india-directories",
  "NAP Consistency Across India Directories",
  "NAP Consistency India Directories | Fundaking",
  "Keep name, address, and phone identical across Justdial, IndiaMART, Sulekha, and Google Business Profile.",
  "Local SEO", ["nap", "citations", "india"],
  ["citation-building-without-spam-india", "google-business-profile-optimization-india", "local-seo-consultant-checklist"],
  `One spelling of your PIN and city. Spreadsheet every citation. Related: [citation building without spam](/blog/citation-building-without-spam-india).
${depth("NAP consistency across India directories", "local")}`);

add("local", "local-landing-page-template-india",
  "Local Landing Page Template for India",
  "Local Landing Page Template India | Fundaking",
  "A reusable local landing page template: proof, FAQs, NAP, map embed, and conversion for Indian cities.",
  "Local SEO", ["landing-page", "local", "template"],
  ["local-seo-india-playbook", "service-area-business-seo-india", "pune-hinjewadi-baner-seo-consultant-local-search"],
  `Template sections: unique intro, services, proof, FAQ, NAP, CTA. Avoid spun city paragraphs. Hub: [local SEO India playbook](/blog/local-seo-india-playbook).
${depth("Local landing page template for India", "local")}`);

add("local", "service-area-business-seo-india",
  "Service-Area Business SEO in India",
  "Service Area Business SEO India | Fundaking",
  "Rank without a storefront — GBP service areas, landing pages, and honest coverage for Indian SABs.",
  "Local SEO", ["sab", "service-area", "gbp"],
  ["google-business-profile-optimization-india", "local-landing-page-template-india", "multi-location-local-seo-india"],
  `Do not fake addresses. Use service areas + strong pages. See [GBP India](/blog/google-business-profile-optimization-india).
${depth("Service-area business SEO in India", "local")}`);

add("local", "local-seo-for-clinics-india",
  "Local SEO for Clinics in India",
  "Local SEO for Clinics India | Fundaking",
  "Maps, reviews, and doctor/specialty pages that bring appointment calls for Indian clinics.",
  "Local SEO", ["clinics", "healthcare", "maps"],
  ["google-maps-ranking-factors-india-2026", "whatsapp-leads-from-google-maps-india", "google-business-profile-posts-strategy"],
  `Clinics win on reviews + specialty clarity + WhatsApp. Bridge: [WhatsApp leads from Maps](/blog/whatsapp-leads-from-google-maps-india).
${depth("Local SEO for clinics in India", "local")}`);

add("local", "local-seo-for-manufacturers-baramati",
  "Local SEO for Manufacturers in Baramati",
  "Local SEO Manufacturers Baramati | Fundaking",
  "GBP, industrial intent, and website enquiries for Baramati manufacturers — not vanity city keywords.",
  "Local SEO", ["baramati", "manufacturing", "local"],
  ["seo-for-b2b-manufacturing-india", "baramati-seo-consultant-guide", "local-seo-india-playbook"],
  `Combine local presence with catalogue SEO. Case context: [Shubhshrey](/case-study/shubhshrey-industries).
${depth("Local SEO for manufacturers in Baramati", "local")}`);

add("local", "local-seo-for-real-estate-pune",
  "Local SEO for Real Estate in Pune",
  "Local SEO Real Estate Pune | Fundaking",
  "Project and locality pages, Maps strategy, and compliance-aware SEO for Pune real estate brands.",
  "Local SEO", ["real-estate", "pune", "local"],
  ["pune-hinjewadi-baner-seo-consultant-local-search", "local-landing-page-template-india", "multi-location-local-seo-india"],
  `Project pages need unique inventory proof — not spun “best flats in X.” Corridor context: [Hinjewadi/Baner](/blog/pune-hinjewadi-baner-seo-consultant-local-search).
${depth("Local SEO for real estate in Pune", "local")}`);

add("local", "citation-building-without-spam-india",
  "Citation Building Without Spam in India",
  "Citation Building Without Spam India | Fundaking",
  "Earn and clean citations on quality Indian directories — avoid PBNs and fake listings.",
  "Local SEO", ["citations", "spam", "india"],
  ["nap-consistency-india-directories", "google-maps-ranking-factors-india-2026", "local-seo-consultant-checklist"],
  `Quality over quantity. Fix duplicates before adding more. [NAP consistency](/blog/nap-consistency-india-directories).
${depth("Citation building without spam in India", "local")}`);

add("local", "google-business-profile-posts-strategy",
  "Google Business Profile Posts Strategy",
  "GBP Posts Strategy | Local SEO | Fundaking",
  "A practical cadence for GBP posts, offers, and updates that support Maps engagement in India.",
  "Local SEO", ["gbp", "posts", "content"],
  ["google-business-profile-optimization-india", "whatsapp-leads-from-google-maps-india", "local-seo-for-clinics-india"],
  `Weekly posts beat abandoned profiles. Offer + photo + clear CTA. Base setup: [GBP optimization](/blog/google-business-profile-optimization-india).
${depth("Google Business Profile posts strategy", "local")}`);

add("local", "local-seo-vs-national-seo-decision",
  "Local SEO vs National SEO: How to Decide",
  "Local SEO vs National SEO Decision | Fundaking",
  "A decision framework for when Indian businesses should invest in Maps versus national/category SEO.",
  "Local SEO", ["strategy", "local", "national"],
  ["local-seo-india-playbook", "seo-consultant-in-pune-founders-guide-2026", "service-area-business-seo-india"],
  `Clinics → local. Most SaaS → national. Manufacturers → hybrid. Hub: [local playbook](/blog/local-seo-india-playbook) + [Pune SEO guide](/blog/seo-consultant-in-pune-founders-guide-2026).
${depth("Local SEO vs national SEO decision", "local")}`);

add("local", "multi-city-agency-local-seo",
  "Multi-City Agency Local SEO in India",
  "Multi-City Agency Local SEO | Fundaking",
  "How agencies with multiple city offices structure GBP, pages, and governance without duplicate thin content.",
  "Local SEO", ["agency", "multi-city", "local"],
  ["multi-location-local-seo-india", "local-landing-page-template-india", "nap-consistency-india-directories"],
  `One listing per real office. Shared brand, unique proof. See [multi-location local SEO](/blog/multi-location-local-seo-india).
${depth("Multi-city agency local SEO in India", "local")}`);

add("local", "whatsapp-leads-from-google-maps-india",
  "WhatsApp Leads from Google Maps in India",
  "WhatsApp Leads from Google Maps India | Fundaking",
  "Turn Maps views into WhatsApp conversations — GBP CTAs, tracking, and follow-up that sales will use.",
  "Local SEO", ["whatsapp", "maps", "leads"],
  ["google-business-profile-optimization-india", "local-seo-for-clinics-india", "google-business-profile-posts-strategy"],
  `India converts on WhatsApp. Put the number on GBP, site, and landing pages consistently. Track calls vs chats.
${depth("WhatsApp leads from Google Maps in India", "local")}`);

// ——— Batch D: AI (5) ———
add("ai", "ai-overview-optimization-checklist",
  "AI Overview Optimization Checklist",
  "AI Overview Optimization Checklist | Fundaking",
  "A practical checklist to earn and survive Google AI Overviews — entities, passages, and technical gates.",
  "AI / Answer Engine SEO", ["aio", "checklist", "ai-seo"],
  ["google-ai-overviews-practical-guide", "entity-seo-for-ai-overviews", "what-is-ai-seo-definition-2026"],
  `Checklist companion to [AI Overviews practical guide](/blog/google-ai-overviews-practical-guide) and [entity SEO](/blog/entity-seo-for-ai-overviews).
${depth("AI Overview optimization checklist", "ai")}`);

add("ai", "brand-knowledge-panel-entity-cleanup",
  "Brand Knowledge Panel & Entity Cleanup",
  "Brand Knowledge Panel Entity Cleanup | Fundaking",
  "Clean Organization entity data so Knowledge Panels and AI answers stop misstating your brand.",
  "AI / Answer Engine SEO", ["entity", "knowledge-panel", "eeat"],
  ["entity-seo-for-ai-overviews", "fix-wrong-brand-facts-ai-hallucinations", "eeat-and-ai-generated-answers"],
  `Align site, GBP, LinkedIn, Wikipedia/Wikidata if any. Fix hallucinations with [wrong brand facts playbook](/blog/fix-wrong-brand-facts-ai-hallucinations).
${depth("Brand Knowledge Panel and entity cleanup", "ai")}`);

add("ai", "prompt-research-from-sales-calls",
  "Prompt Research from Sales Calls (AI SEO)",
  "Prompt Research from Sales Calls | Fundaking",
  "Build an AI SEO prompt library from real sales and support calls — not Keyword Planner alone.",
  "AI / Answer Engine SEO", ["prompts", "research", "sales"],
  ["prompt-library-workshop-seo-teams", "conversational-query-mapping-for-llm-seo", "ai-seo-roadmap-90-days"],
  `Mine CRM notes for “how do I…” questions. Workshop format: [prompt library workshop](/blog/prompt-library-workshop-seo-teams).
${depth("Prompt research from sales calls", "ai")}`);

add("ai", "ai-enablement-plus-ai-seo-same-stack",
  "AI Enablement + AI SEO: Same Stack, Two Outcomes",
  "AI Enablement and AI SEO | Fundaking",
  "How operational AI agents and public AI visibility reinforce each other — with Fundaking case context.",
  "AI / Answer Engine SEO", ["ai-enablement", "crm", "ai-seo"],
  ["ai-seo-for-indian-b2b-founders", "what-is-ai-seo-definition-2026", "ai-seo-roadmap-90-days"],
  `Internal agents enrich leads; public pages keep answers accurate. See [AI enablement](/ai-enablement), [Shubhshrey](/case-study/shubhshrey-industries), [CollegeAstra](/case-study/collegeastra).
${depth("AI enablement plus AI SEO same stack", "ai")}`);

add("ai", "measuring-ai-citations-without-vanity-tools",
  "Measuring AI Citations Without Vanity Tools",
  "Measuring AI Citations | Fundaking",
  "A lightweight citation log founders can run weekly — screenshots, prompts, and assisted pipeline.",
  "AI / Answer Engine SEO", ["measurement", "citations", "ai-seo"],
  ["measuring-visibility-in-ai-search", "competitor-citation-analysis", "ai-seo-roadmap-90-days"],
  `Spreadsheet > shiny dashboards. Method: [measuring visibility in AI search](/blog/measuring-visibility-in-ai-search).
${depth("Measuring AI citations without vanity tools", "ai")}`);

// ——— Write files ———
let written = 0;
const dateBase = Date.parse("2026-05-01T06:00:00Z");
POSTS.forEach((p, i) => {
  const P = PILLAR[p.pillar];
  const cat = p.category || P.cat;
  const date = new Date(dateBase + i * 86400000).toISOString().replace(".000", "");
  const fm = `---
title: "${p.title}"
meta_title: "${p.meta}"
description: "${p.desc}"
date: ${date}
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "${p.tag}"
read_time: "14 min read"
categories: ["${cat}"]
tags: ${JSON.stringify(p.tags)}
draft: false
---
`;
  const related = `
<!-- fk-cluster-links -->

## Related reading on Fundaking

- [${P.hubTitle}](/blog/${P.hub})
${p.siblings
  .slice(0, 2)
  .map((s) => {
    const sib = POSTS.find((x) => x.slug === s);
    const title = sib?.title || s;
    return `- [${title}](/blog/${s})`;
  })
  .join("\n")}
- [${P.serviceLabel}](${P.service})
- [${P.proofLabel}](${P.proof})

---

*Rahul Agarwal — Fundaking Media. SEO consultant based in Pune / Baramati, serving founders across India.*
`;
  fs.writeFileSync(
    path.join(blogDir, `${p.slug}.md`),
    fm + "\n" + p.body.trim() + "\n" + related + "\n",
    "utf8",
  );
  written++;
});
console.log(`[generate-42] Wrote ${written} posts`);

// ——— Update cluster-map.json ———
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
for (const p of POSTS) {
  map.posts[p.slug] = {
    pillar: PILLAR[p.pillar].key,
    ...(p.category ? { category: p.category } : {}),
    siblings: p.siblings,
  };
}
// Expand hub sibling lists
const hubAdds = {
  "seo-consultant-in-pune-founders-guide-2026": POSTS.filter((x) => x.pillar === "consulting").map((x) => x.slug),
  "technical-seo-audit-checklist-2026": POSTS.filter((x) => x.pillar === "technical").map((x) => x.slug),
  "local-seo-india-playbook": POSTS.filter((x) => x.pillar === "local").map((x) => x.slug),
  "what-is-ai-seo-definition-2026": POSTS.filter((x) => x.pillar === "ai").map((x) => x.slug),
};
for (const [hub, slugs] of Object.entries(hubAdds)) {
  const cur = new Set(map.posts[hub]?.siblings || []);
  slugs.forEach((s) => cur.add(s));
  map.posts[hub].siblings = [...cur];
}
fs.writeFileSync(mapPath, JSON.stringify(map, null, 2) + "\n", "utf8");
console.log("[generate-42] cluster-map.json updated");
