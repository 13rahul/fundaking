---
title: "Crawl Budget and robots.txt for Large Indian Catalogues"
meta_title: "Crawl Budget & robots.txt India | Fundaking"
description: "Practical crawl-budget controls for large ecommerce and marketplace-style catalogues in India — robots.txt, parameters, sitemaps, and log proof."
date: 2026-11-04T08:00:00Z
date_modified: 2026-11-04T08:00:00Z
image: "/images/blog/featured/crawl-budget-robots-txt-india-catalogs.svg"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "Technical"
read_time: "14 min read"
categories: ["Technical SEO"]
tags: ["crawl-budget","robots-txt","technical-seo"]
draft: false
---

Large Indian catalogues (D2C Shopify Plus, custom marketplaces, B2B parts sites) waste crawl on filters, sort orders, and session URLs while money SKUs wait. Crawl budget is not mystical — it is **which URLs Googlebot fetches usefully**. Start from the [technical SEO audit checklist](/blog/technical-seo-audit-checklist-2026).

## Diagnose before you Disallow

Use [log file analysis](/blog/log-file-analysis-seo-guide) for two weeks:

1. Top paths Googlebot hits  
2. Status codes (soft 404s, 302 chains)  
3. Share of crawl on faceted / parameter URLs  
4. Whether sitemap URLs are actually fetched  

If bots never reach new products, fixing copy will not help.

## robots.txt rules that are usually safe

| Pattern | Intent |
| --- | --- |
| Block internal search | Prevent index bloat |
| Block cart / checkout / account | No SEO value |
| Allow product / category canonicals | Money paths |
| Avoid blocking CSS/JS needed to render | Rendering still matters |

Never Disallow a URL you still want indexed. Prefer canonical + noindex + parameter handling for borderline filters — see [faceted navigation SEO](/blog/faceted-navigation-seo-ecommerce) and [index bloat cleanup](/blog/index-bloat-cleanup-playbook).

## Sitemap discipline

Split product vs category vs content sitemaps. Only include **canonical 200** URLs. Keep lastmod honest. Guide: [XML sitemap best practices](/blog/xml-sitemap-best-practices-2026).

## Parameter playbook

1. Inventory tracking params (UTM should not create indexables)  
2. Decide indexable facets (rarely more than brand + one primary attribute)  
3. Canonical to clean URL  
4. Confirm in GSC URL Inspection after release  

## 14-day fix sequence

**Days 1–3:** Log sample + GSC “crawled – currently not indexed” themes.  
**Days 4–7:** robots + parameter rules + sitemap cleanup.  
**Days 8–11:** Facet templates noindex/canonical.  
**Days 12–14:** Re-check bot hits on new SKUs.

## FAQ

**Will Disallow fix ranking?** No — it only frees crawl. Rankings need content and links.

**Shopify?** Theme apps create parameter mess; pair with [Shopify technical SEO checklist](/blog/shopify-technical-seo-checklist).

**Need help?** [Technical SEO consulting](/technical-seo-consultant) — proof: [fintech organic growth](/case-study/fintech-organic-growth).


<!-- fk-cluster-links -->

## Related reading on Fundaking

- [Technical SEO Audit Checklist (2026)](/blog/technical-seo-audit-checklist-2026)
- [Faceted Navigation SEO for Ecommerce](/blog/faceted-navigation-seo-ecommerce)
- [Index Bloat Cleanup Playbook](/blog/index-bloat-cleanup-playbook)
- [Log File Analysis for SEO: A Practical Guide](/blog/log-file-analysis-seo-guide)
- [Technical SEO consulting](/technical-seo-consultant)
- [Fintech organic growth case study](/case-study/fintech-organic-growth)

---

*Rahul Agarwal — Fundaking Media. SEO consultant based in Pune / Baramati, serving founders across India.*
