import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");

// Insert AI hub cluster nav if missing
const aiPath = path.join(blogDir, "what-is-ai-seo-definition-2026.md");
let ai = fs.readFileSync(aiPath, "utf8");
if (!ai.includes("In this AI / Answer Engine SEO cluster")) {
  const nav = ` This page is the **hub** for Fundaking's AI / Answer Engine SEO cluster.

## In this AI / Answer Engine SEO cluster

| Sub-cluster | Start here |
| --- | --- |
| Foundations | [GEO basics](/blog/geo-generative-engine-optimization-basics) · [LLM SEO vs traditional SEO](/blog/llm-seo-vs-traditional-seo) |
| Google AI | [AI Overviews practical guide](/blog/google-ai-overviews-practical-guide) · [Entity SEO](/blog/entity-seo-for-ai-overviews) · [E-E-A-T](/blog/eeat-and-ai-generated-answers) |
| Citations | [How answer engines choose sources](/blog/how-chatgpt-chooses-sources-to-cite) · [Perplexity citations](/blog/perplexity-citation-strategies) · [Competitor citation analysis](/blog/competitor-citation-analysis) |
| Operations | [90-day AI SEO roadmap](/blog/ai-seo-roadmap-90-days) · [Weekly cadence](/blog/weekly-ai-seo-operating-cadence) · [Measuring AI visibility](/blog/measuring-visibility-in-ai-search) |
| Technical gates | [Technical SEO for AI discovery](/blog/technical-seo-for-ai-discovery) · [JS + AI crawlers](/blog/javascript-rendering-and-ai-crawlers) · [Structured data](/blog/structured-data-for-llm-crawlers) |
| India B2B | [AI SEO for Indian B2B founders](/blog/ai-seo-for-indian-b2b-founders) · [AI search trust](/blog/ai-search-trust-india-founders) |

Service path: [AI enablement](/ai-enablement). Proof: [Shubhshrey AI CRM](/case-study/shubhshrey-industries), [CollegeAstra](/case-study/collegeastra).

`;
  ai = ai.replace(
    "assistants baked into software your buyers already use.",
    "assistants baked into software your buyers already use." + nav,
  );
  fs.writeFileSync(aiPath, ai);
  console.log("AI hub nav inserted");
} else {
  console.log("AI hub nav ok");
}

const more = {
  "core-web-vitals-indian-saas.md": `---
title: "Core Web Vitals for Indian SaaS Sites"
meta_title: "Core Web Vitals for Indian SaaS | Technical SEO | Fundaking"
description: "How to fix LCP, INP, and CLS on Indian SaaS marketing sites — real network conditions, third-party scripts, and revenue-page priorities."
date: 2026-04-14T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "Technical SEO"
read_time: "14 min read"
categories: ["Technical SEO"]
tags: ["cwv", "technical-seo", "saas"]
draft: false
---

Core Web Vitals (LCP, INP, CLS) are not a vanity lab score. On Indian SaaS sites they show up as **slow pricing pages**, abandoned demos, and crawl inefficiency on JS-heavy stacks. This guide sits in Fundaking’s [Technical SEO audit](/blog/technical-seo-audit-checklist-2026) cluster.

## Why India changes the CWV conversation

Lab tests on fibre in Bangalore can hide what a founder on 4G in a Tier-2 city experiences. Prioritize:

- Field data (CrUX / Search Console) over Lighthouse alone
- Marketing routes (\`/\`, \`/pricing\`, \`/demo\`) before logged-in app shells
- Image and font budgets on hero sections

## LCP — largest contentful paint

Usual culprits: uncompressed hero WebPs still too large, late-discovered CSS, chat widgets blocking, CDN misconfig. Fix order: optimize hero asset → preload critical font → defer non-critical JS → reserve space.

## INP — interaction to next paint

Heavy main-thread work from analytics bundles, A/B tools, and React hydration on public pages. Split marketing site from app when possible; hydrate less above the fold.

## CLS — layout shift

Cookie banners, webfonts, and late ads. Set width/height on images; use font-display: swap with fallback metrics close to final face.

## Measurement cadence

Weekly field check on money URLs; pair with [JavaScript rendering and AI crawlers](/blog/javascript-rendering-and-ai-crawlers) when content is client-only.

## When to get help

If engineering bandwidth exists but prioritization does not, [technical SEO consulting](/technical-seo-consultant) scopes CWV as P1 after indexation.

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [Technical SEO Audit Checklist (2026)](/blog/technical-seo-audit-checklist-2026)
- [JavaScript Rendering and AI Crawlers](/blog/javascript-rendering-and-ai-crawlers)
- [Technical SEO consulting](/technical-seo-consultant)
- [Fintech organic growth case study](/case-study/fintech-organic-growth)

---

*Rahul Agarwal — Fundaking Media.*
`,

  "site-migration-seo-checklist.md": `---
title: "Site Migration SEO Checklist"
meta_title: "Site Migration SEO Checklist | Preserve Rankings | Fundaking"
description: "URL maps, 301s, sitemap swaps, Search Console monitoring — a practical SEO checklist for redesigns and platform migrations."
date: 2026-04-15T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "Technical SEO"
read_time: "14 min read"
categories: ["Technical SEO"]
tags: ["migration", "technical-seo", "redirects"]
draft: false
---

Migrations destroy organic pipeline when teams redesign first and “SEO later.” Use this checklist before you cut DNS or flip the theme. Hub: [Technical SEO audit checklist](/blog/technical-seo-audit-checklist-2026).

## Pre-launch

1. Export all indexed URLs (GSC + crawl).
2. Build a **1:1 URL map** — old → new. No map, no launch.
3. Preserve title/H1 intent on money pages; do not “refresh copy” and change URLs the same day without need.
4. Staging behind auth; noindex staging.
5. Prepare 301 rules (including trailing slash and http→https).

## Launch day

- Deploy redirects before or with the new site
- Submit new sitemap; remove obsolete sitemap refs
- Spot-check top 50 URLs for 200 + correct canonical
- Verify analytics and conversion events fire

## Post-launch (30 days)

- Monitor Coverage and 404 spikes daily for two weeks
- Fix soft 404s and redirect chains
- Reclaim lost internal links ([prune/noindex guidance](/blog/prune-noindex-ai-era) if you keep legacy junk)
- Watch rankings and organic conversions — not vanity traffic alone

## Platform moves (WordPress → Next, Shopify theme swaps)

Rendering changes matter. Confirm public HTML still contains pricing and FAQs. See [JS rendering and AI crawlers](/blog/javascript-rendering-and-ai-crawlers).

Need a second pair of eyes? [Technical SEO consulting](/technical-seo-consultant).

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [Technical SEO Audit Checklist (2026)](/blog/technical-seo-audit-checklist-2026)
- [Pruning and Noindex in the AI Era](/blog/prune-noindex-ai-era)
- [Technical SEO consulting](/technical-seo-consultant)
- [Fintech organic growth case study](/case-study/fintech-organic-growth)

---

*Rahul Agarwal — Fundaking Media.*
`,

  "google-business-profile-optimization-india.md": `---
title: "Google Business Profile Optimization for India"
meta_title: "GBP Optimization India | Local SEO | Fundaking"
description: "Optimize Google Business Profile for Indian businesses: categories, NAP, services, photos, reviews, and service-area settings that win Maps."
date: 2026-04-16T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "Local SEO"
read_time: "14 min read"
categories: ["Local SEO"]
tags: ["gbp", "local-seo", "india"]
draft: false
---

Google Business Profile (GBP) is still the front door for city and “near me” demand in India. This spoke supports the [Local SEO India playbook](/blog/local-seo-india-playbook).

## Categories and services

Pick one primary category that matches revenue. Secondary categories only if you truly deliver them. Add services with clear INR ranges when honest — vague “contact for price” everywhere weakens relevance.

## NAP and address policy

Spell the city and PIN the same way as your site footer and invoices. Dual-language address lines should not contradict. Service-area businesses: hide address only when policy allows and you truly have no storefront.

## Photos and posts

Weekly posts beat abandoned profiles. Show real premises, team, and delivery proof. Geotagged spam photos are not a strategy.

## Reviews

Ask after fulfilment via WhatsApp. Reply to every review. Never buy ratings — short-term Maps gains, long-term trust risk.

## Website bridge

GBP should click through to a **location or service page** with matching NAP and schema — not only the homepage. Pair with [local SEO consultant checklist](/blog/local-seo-consultant-checklist).

Service: [Local SEO consulting](/local-seo-consultant).

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [Local SEO India Playbook: Maps, GBP, and Organic](/blog/local-seo-india-playbook)
- [Local SEO Consultant Checklist](/blog/local-seo-consultant-checklist)
- [Local SEO consulting](/local-seo-consultant)
- [Real Group case study](/case-study/real-group)

---

*Rahul Agarwal — Fundaking Media.*
`,

  "multi-location-local-seo-india.md": `---
title: "Multi-Location Local SEO in India"
meta_title: "Multi-Location Local SEO India | Fundaking"
description: "How to structure GBP, location pages, and citations for multi-city and multi-branch brands in India without duplicate thin content."
date: 2026-04-17T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "Local SEO"
read_time: "14 min read"
categories: ["Local SEO"]
tags: ["local-seo", "multi-location", "india"]
draft: false
---

Opening a second branch without an information architecture plan creates duplicate GBP listings, thin city pages, and citation chaos. Hub: [Local SEO India playbook](/blog/local-seo-india-playbook).

## One listing per real location

Do not create city listings for places you only “serve remotely.” Google suppresses fake proximity. Service-area businesses use service areas; storefronts use verified addresses.

## Location page template

Each page needs unique proof: team, parking/landmarks, local FAQs, local case snippets. Spun paragraphs with city-name swaps fail. Link from a locations index and the homepage.

## Citation consistency

Syndicate the same NAP to major India directories; fix duplicates before building more. Track with a simple sheet: source, NAP string, URL, last verified.

## Pune multi-corridor example

Hinjewadi vs Baner demand differs — see [Pune tech corridors local SEO](/blog/pune-hinjewadi-baner-seo-consultant-local-search). Same brand, different landing proof.

## Governance

Assign one owner for GBP across branches. Shared login chaos causes suspended listings.

Need help structuring locations? [Local SEO consulting](/local-seo-consultant).

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [Local SEO India Playbook: Maps, GBP, and Organic](/blog/local-seo-india-playbook)
- [Hinjewadi, Baner & Pune Tech Corridors: Local SEO vs Organic for B2B](/blog/pune-hinjewadi-baner-seo-consultant-local-search)
- [Local SEO consulting](/local-seo-consultant)
- [Real Group case study](/case-study/real-group)

---

*Rahul Agarwal — Fundaking Media.*
`,

  "seo-advisory-vs-project-first-90-days.md": `---
title: "SEO Advisory vs Project: What the First 90 Days Should Deliver"
meta_title: "SEO Advisory vs Project | First 90 Days | Fundaking"
description: "Choose monthly SEO advisory or a fixed project — and what a serious first 90 days must deliver for Pune and India founders."
date: 2026-04-18T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "SEO Consulting"
read_time: "14 min read"
categories: ["SEO Consulting"]
tags: ["advisory", "pricing", "seo-consultant-pune"]
draft: false
---

Founders often ask whether to buy a **fixed SEO project** or a **monthly advisory**. The wrong answer wastes a quarter. This spoke supports the hub [SEO consultant in Pune: founder’s guide](/blog/seo-consultant-in-pune-founders-guide-2026).

## Project fits when…

- You need an audit + roadmap your team will execute
- A migration or redesign is imminent
- Budget is capped and scope can be written crisply

## Advisory fits when…

- Priorities change weekly and you need a senior brain on call
- In-house or agency executes; you need governance
- Measurement and backlog grooming matter more than a one-off PDF

Pricing context: [SEO consulting pricing in India](/blog/seo-consulting-pricing-india). Hire path: [SEO consulting services](/seo-consulting-services).

## First 90 days — non-negotiable outcomes

| Phase | Outcome |
| --- | --- |
| Days 1–14 | Baseline: GSC, crawl, CWV on money URLs, 5 prompt screenshots |
| Days 15–45 | P0/P1 fixes live; one BOFU page rewrite |
| Days 46–90 | Cluster links wired; report on enquiries, not only ranks |

If a retainer cannot describe this cadence, you are renting activity.

## Hybrid model Fundaking uses

Audit project → optional advisory. Direct access to the strategist. Cap active clients. Book via [contact](/contact).

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [SEO Consultant in Pune: A Founder's Guide (2026)](/blog/seo-consultant-in-pune-founders-guide-2026)
- [SEO Consulting Pricing in India (2026)](/blog/seo-consulting-pricing-india)
- [SEO consulting services](/seo-consulting-services)
- [SaaS demo requests case study](/case-study/saas-demo-requests)

---

*Rahul Agarwal — Fundaking Media.*
`,

  "ai-seo-for-indian-b2b-founders.md": `---
title: "AI SEO for Indian B2B Founders"
meta_title: "AI SEO for Indian B2B Founders | Fundaking"
description: "A practical AI SEO plan for Indian B2B and SaaS founders: prompt libraries, BOFU pages, entity trust, and how it ties to AI enablement."
date: 2026-04-19T06:00:00Z
image: "/images/blog/post-1.png"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "AI SEO"
read_time: "16 min read"
categories: ["AI / Answer Engine SEO"]
tags: ["ai-seo", "b2b", "india", "deep-dive"]
draft: false
---

Indian B2B buyers increasingly ask ChatGPT or Perplexity before they fill a demo form. If the answer misstates your pricing, integrations, or geography, you lose the meeting. This guide applies the hub [What is AI SEO?](/blog/what-is-ai-seo-definition-2026) to founder-led SaaS and services companies.

## Reality check for India B2B

- Sales cycles still need humans — AI changes **education and shortlists**
- English + regional language queries both matter; start with English BOFU accuracy
- Trust signals (GST entity name, founder LinkedIn, case studies) must match the site

Related: [AI search trust for India founders](/blog/ai-search-trust-india-founders).

## Week-one plan

1. Collect 20 prompts from discovery calls (“best X for Y in India”).
2. Screenshot who gets cited.
3. Fix factual mismatches on pricing, About, and LinkedIn.
4. Rewrite one comparison or integration page for quotability.

Ops detail: [90-day AI SEO roadmap](/blog/ai-seo-roadmap-90-days).

## Tie AI SEO to product and ops

Fundaking’s [AI enablement](/ai-enablement) work — CRM, agents, enrichment — pairs with public AI visibility. Example: [Shubhshrey Industries AI CRM case study](/case-study/shubhshrey-industries) and [CollegeAstra](/case-study/collegeastra).

## Technical floor still wins

If your Next.js marketing site hides copy from fetchers, citations fail. Start from [technical SEO for AI discovery](/blog/technical-seo-for-ai-discovery).

## Measurement

Citation log + assisted demo requests beats vanity traffic. See [measuring visibility in AI search](/blog/measuring-visibility-in-ai-search).

<!-- fk-cluster-links -->

## Related reading on Fundaking

- [What Is AI SEO? A Practical Definition for 2026](/blog/what-is-ai-seo-definition-2026)
- [AI Search and Trust: Notes for India Founders](/blog/ai-search-trust-india-founders)
- [AI enablement](/ai-enablement)
- [Shubhshrey AI CRM case study](/case-study/shubhshrey-industries)

---

*Rahul Agarwal — Fundaking Media.*
`,
};

for (const [file, body] of Object.entries(more)) {
  fs.writeFileSync(path.join(blogDir, file), body.trim() + "\n", "utf8");
  console.log("wrote", file);
}
console.log("gap posts done");
