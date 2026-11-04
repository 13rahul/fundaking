# Fundaking blog topical authority & internal linking audit

**Date:** 2026-11-04 (post-fix verification)  
**Corpus:** 114 published posts (all mapped in `scripts/cluster-map.json`)  
**Draft / ignore:** `post-1`…`post-6`, `human-touch-ai-marketing`

Re-run: `node automark-astro-main/scripts/audit-internal-links.mjs`

---

## Pillars & hubs (current)

| Pillar | Hub | Posts | Service | Proof |
| --- | --- | ---: | --- | --- |
| SEO Consulting | `/blog/seo-consultant-in-pune-founders-guide-2026` | 22 | `/seo-consulting-services` | SaaS demo requests |
| Technical SEO | `/blog/technical-seo-audit-checklist-2026` | 23 | `/technical-seo-consultant` | Fintech organic growth |
| Local SEO | `/blog/local-seo-india-playbook` | 20 | `/local-seo-consultant` | Real Group |
| AI / Answer Engine SEO | `/blog/what-is-ai-seo-definition-2026` | 41 | `/ai-enablement` | Shubhshrey |
| Quick Commerce | `/blog/quick-commerce-seo-visibility-playbook-india` | 4 | `/quick-commerce-enablement` | Contact (audit call) |
| Web Development × SEO | `/blog/seo-ready-website-builds-indian-b2b` | 4 | `/web-development` | Shubhshrey site/CRM |

---

## Verification scorecard (2026-11-04)

| Check | Status |
| --- | --- |
| Every post mapped to a pillar | Pass (0 unmapped) |
| Hub lists all spokes (all 6 pillars) | Pass (100% coverage) |
| Sibling reciprocity (neither / one-way) | Pass (0 / 0) |
| Related reading includes up to 3 siblings | Pass (`expand-thin-blogs.mjs`) |
| QC + web-dev service pages → new hubs | Pass |
| City service pages → cluster blogs | Pass |

### Scripts added / updated this fix

- `normalize-cluster-siblings.mjs` — bidirectional sibling edges  
- `repair-sibling-links.mjs` — contextual mid-body sibling links  
- `inject-contextual-and-hub-equity.mjs` — weak posts + tech/local hub equity  
- `seed-authority-deepeners.mjs` — 6 deepeners  
- `seed-qc-webdev-pillars.mjs` — QC + Web Dev pillars  
- `audit-internal-links.mjs` — verifier  

---

## Deepeners shipped

- `seo-for-edtech-coaching-india`  
- `link-building-india-2026-without-penalties`  
- `crawl-budget-robots-txt-india-catalogs`  
- `google-review-generation-system-india`  
- `gbp-qa-messaging-that-converts`  
- `ai-citation-share-tracker-spreadsheet`  

## New pillar spokes

**Quick Commerce:** listing keywords · catalogue ops · AI shopping bridge  

**Web Dev:** launch checklist · CRM/portal SEO · migration without traffic loss  

---

## Ongoing rules

1. Hub lists every spoke.  
2. Every spoke: hub + ≤3 siblings in Related reading + service + proof.  
3. ≥2 contextual in-body `/blog/` links.  
4. New post → same PR: map siblings + hub index + service `related` + normalize + expand Related reading.  
5. Prefer deepening thin sub-clusters over spawning a 7th pillar without a live service.
