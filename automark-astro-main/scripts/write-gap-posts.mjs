/**
 * Writes priority gap / pillar posts from the topic cluster plan.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");

const posts = {
  "technical-seo-audit-checklist-2026.md": `---
title: "Technical SEO Audit Checklist (2026)"
meta_title: "Technical SEO Audit Checklist 2026 | Fundaking"
description: "A founder-ready technical SEO audit checklist: crawl, index, Core Web Vitals, JavaScript, schema, migrations, and internal links — mapped to AI discovery."
date: 2026-04-10T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "Technical SEO"
read_time: "22 min read"
categories: ["Technical SEO"]
tags: ["technical-seo", "audit", "checklist", "deep-dive"]
draft: false
---

A technical SEO audit is not a 100-page PDF of tool screenshots. It is a **prioritized stack** of blockers that stop Google — and AI fetchers — from finding, understanding, and trusting your money pages. This checklist is the **hub** for Fundaking’s Technical SEO cluster and the same sequence I run for Pune SaaS, D2C, and B2B sites.

## In this Technical SEO cluster

- [How to choose a technical SEO consultant](/blog/how-to-choose-technical-seo-consultant)
- [Technical SEO still gates AI discovery](/blog/technical-seo-for-ai-discovery)
- [JavaScript rendering and AI crawlers](/blog/javascript-rendering-and-ai-crawlers)
- [Structured data for LLM crawlers](/blog/structured-data-for-llm-crawlers)
- [Pruning and noindex in the AI era](/blog/prune-noindex-ai-era)
- [AI crawlers in your logs](/blog/ai-crawler-logs-user-agents)
- [Core Web Vitals for Indian SaaS](/blog/core-web-vitals-indian-saas)
- [Site migration SEO checklist](/blog/site-migration-seo-checklist)

Service: [Technical SEO consulting](/technical-seo-consultant) · [Technical SEO Pune](/technical-seo-pune).

## Before you open a crawler

1. List the **five URLs that should earn revenue** (home, pricing, product, demo, flagship service).
2. Confirm analytics and Search Console access for 16+ months if available.
3. Note stack: WordPress, Next.js, Shopify, Webflow, custom — rendering strategy changes the audit.
4. Screenshot current AI answers for three branded prompts (wrong facts = trust debt).

Without that scope, audits become encyclopedia tours.

## 1. Crawl and discovery

| Check | Pass looks like | Fail looks like |
| --- | --- | --- |
| XML sitemap | Money URLs present, lastmod sane, submitted in GSC | Orphan money pages; sitemap of 40k parameter URLs |
| robots.txt | Allows important paths; blocks junk deliberately | Blocks /app assets that include public docs |
| Status codes | Soft-404s fixed; 301 chains ≤1 hop | Chains of 3–5 redirects to the homepage |
| Canonicals | Self-referencing on canonical money pages | Cross-domain or parameter canonical chaos |
| Pagination / facets | Indexable only when intentional | Infinite crawl of filters eating budget |

**Action:** Export “Crawled – currently not indexed” and “Discovered – currently not indexed” from Search Console. Map each money URL.

## 2. Indexation hygiene

- Duplicate titles/H1s across template pages
- Thin tag/category archives competing with pillars
- Staging or UTM-parameter URLs indexed
- Soft 404s returning 200 with “no results” copy

Use [pruning and noindex](/blog/prune-noindex-ai-era) when the library is bloated. Prefer **consolidation** over deleting history that earns links.

## 3. Rendering and JavaScript

If critical copy (pricing, locations, FAQs) only appears after client-side hydration, classic bots and many AI fetchers may miss it. Validate:

- View-source vs rendered DOM for definitions
- Server-side or pre-render for public marketing routes
- Avoid infinite scroll as the only way to discover products

Deep dive: [JavaScript rendering and AI crawlers](/blog/javascript-rendering-and-ai-crawlers).

## 4. Core Web Vitals and UX signals

LCP, INP, and CLS still matter for rankings and conversion. On Indian networks, image weight and third-party scripts (chat, analytics, A/B) dominate failures. See [Core Web Vitals for Indian SaaS](/blog/core-web-vitals-indian-saas).

Audit focus: LCP element on pricing and demo pages; font swap; reserve space for banners; defer non-critical JS.

## 5. Structured data that matches the page

Organization, WebSite, BreadcrumbList, Article/BlogPosting, FAQ where visible, Product/Offer only when accurate. Schema that invents reviews or prices is a liability for both Google and LLM trust. Guide: [Structured data for LLM crawlers](/blog/structured-data-for-llm-crawlers).

## 6. Internal linking architecture

- Every new blog → hub + 1 service + 1 proof page
- Orphan case studies fixed
- Anchor text that names the topic (not “click here”)
- Hub pages list the cluster (like this one)

Weak internal links are why thin blogs never compound.

## 7. Logs and crawlers (optional but powerful)

Sample access logs for Googlebot and AI user-agents. Confirm bots hit HTML of money pages, not only assets. [AI crawler logs](/blog/ai-crawler-logs-user-agents) and [technical SEO for AI discovery](/blog/technical-seo-for-ai-discovery) extend this section.

## 8. Migrations and redesigns

If a redesign is in flight, pause vanity content and run [site migration SEO checklist](/blog/site-migration-seo-checklist): URL map, 301s, sitemap swap, GSC monitoring for 30 days.

## How I score priorities (P0 / P1 / P2)

- **P0** — Money URL not indexable, blocked, or returning wrong content
- **P1** — Rendering/CWV/schema issues on revenue templates
- **P2** — Nice-to-have crawl efficiencies, secondary templates

Founders get a one-pager, not a guilt trip. Implementation can be in-house or via [technical SEO consulting](/technical-seo-consultant).

## FAQ

**How long does an audit take?** Serious site: 1–3 weeks depending on stack and access. Rush audits miss rendering and log reality.

**Do I need AI SEO in the same audit?** Yes at the floor level — if bots cannot read facts, answer engines will invent them. Full GEO work follows once the floor is stable.

**What about local businesses?** Add GBP and NAP consistency after crawl/index; start from the [local SEO India playbook](/blog/local-seo-india-playbook).

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [How to Choose a Technical SEO Consultant](/blog/how-to-choose-technical-seo-consultant)
- [Technical SEO Still Gates AI Discovery](/blog/technical-seo-for-ai-discovery)
- [Technical SEO consulting](/technical-seo-consultant)
- [Fintech organic growth case study](/case-study/fintech-organic-growth)

---

*Rahul Agarwal — Fundaking Media. Technical SEO consultant serving Pune, Baramati, and remote India teams.*
`,

  "local-seo-india-playbook.md": `---
title: "Local SEO India Playbook: Maps, GBP, and Organic"
meta_title: "Local SEO India Playbook 2026 | GBP, Maps, Organic | Fundaking"
description: "A practical local SEO playbook for India: Google Business Profile, NAP consistency, reviews, service-area pages, Maps vs organic, and AI answers."
date: 2026-04-12T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "Local SEO"
read_time: "20 min read"
categories: ["Local SEO"]
tags: ["local-seo", "india", "gbp", "deep-dive"]
draft: false
---

Local SEO in India is not “add city name to title tags.” It is **Maps visibility + organic landing pages + consistent entity data** for how people actually search — in English, Hindi, and often WhatsApp-first journeys. This playbook is Fundaking’s **Local SEO hub**.

## In this Local SEO cluster

- [Local SEO consultant checklist](/blog/local-seo-consultant-checklist)
- [Hinjewadi, Baner & Pune tech corridors](/blog/pune-hinjewadi-baner-seo-consultant-local-search)
- [Local SEO when answers come from AI](/blog/local-seo-plus-ai-answers)
- [Google Business Profile optimization India](/blog/google-business-profile-optimization-india)
- [Multi-location local SEO India](/blog/multi-location-local-seo-india)

Services: [Local SEO consultant](/local-seo-consultant) · [Local SEO Pune](/local-seo-pune) · [Local SEO Baramati](/local-seo-baramati).

## Who this playbook is for

- Clinics, education, manufacturing, real estate, home services, multi-city agencies
- Founders who confuse **national SEO** with **map pack** needs
- Teams opening a second branch without a location architecture

SaaS selling pan-India demos often needs **less** Maps and more category SEO — say so early. See [SEO consultant in Pune guide](/blog/seo-consultant-in-pune-founders-guide-2026).

## Layer 1 — Google Business Profile (GBP)

Primary lever for “near me” and city+service queries.

| Element | India-specific notes |
| --- | --- |
| Categories | Primary must match the core money service; avoid vanity categories |
| Service areas | Use for true service-area businesses; do not fake coverage |
| NAP | Match site footer, invoice letterhead, and directories — spelling of Maharashtra cities varies |
| Hours | Festival closures and delivery hours matter for trust |
| Photos | Real premises and team; stock photos underperform |
| Products/services | Price ranges in INR when honest |

Full checklist: [GBP optimization India](/blog/google-business-profile-optimization-india).

## Layer 2 — Reviews that are not spam

Ask after successful delivery (WhatsApp works). Respond to negatives with facts. Never buy reviews. UGC photos help Maps engagement. Tie review themes back into FAQ content on the location page.

## Layer 3 — Location and service-area pages

One thin “Pune SEO” page is not a strategy. Build pages that answer:

- Who you serve in that city/corridor
- Proof (case studies, reviews, address policy)
- Distinct services and FAQs

For Pune tech corridors: [Hinjewadi / Baner local SEO](/blog/pune-hinjewadi-baner-seo-consultant-local-search). For chains: [multi-location local SEO](/blog/multi-location-local-seo-india).

## Layer 4 — On-site technical basics

Local pages still need crawlability, mobile speed, and correct LocalBusiness/Organization schema. Duplicate location pages with spun paragraphs get filtered. Link from homepage and contact to the right location URL.

## Layer 5 — Maps vs organic vs AI answers

| Intent | Primary surface | Content |
| --- | --- | --- |
| “near me” / city+service | Map pack + GBP | Categories, reviews, proximity |
| Research / hire guide | Organic | Cluster blogs + service pages |
| “best X in city” AI answer | AI Overviews / chat | Consistent NAP + citations |

Bridge article: [Local SEO + AI answers](/blog/local-seo-plus-ai-answers).

## 30-day local sprint

**Week 1:** Claim/verify GBP; NAP audit across top 10 citations; photo refresh.  
**Week 2:** Fix website location page + schema; embed map; add FAQs from real calls.  
**Week 3:** Review ask campaign; reply backlog.  
**Week 4:** One corridor or service-area page; internal links from blog and homepage.

## Measurement

- GBP calls, direction requests, website clicks
- Organic landing-page conversions from city pages
- Branded + city query impressions in Search Console
- AI answer accuracy for “best [service] in [city]”

## When to hire a local SEO consultant

Bring help when you have multiple locations, messy citations, or a redesign that breaks NAP. Start with [local SEO consultant checklist](/blog/local-seo-consultant-checklist) or book via [local SEO consulting](/local-seo-consultant).

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [Local SEO Consultant Checklist](/blog/local-seo-consultant-checklist)
- [Google Business Profile Optimization India](/blog/google-business-profile-optimization-india)
- [Local SEO consulting](/local-seo-consultant)
- [Real Group case study](/case-study/real-group)

---

*Rahul Agarwal — Fundaking Media. Local and organic SEO for Pune, Baramati, and multi-city India brands.*
`,
};

for (const [file, body] of Object.entries(posts)) {
  fs.writeFileSync(path.join(blogDir, file), body.trim() + "\n", "utf8");
  console.log("wrote", file);
}
console.log("done pillars");
