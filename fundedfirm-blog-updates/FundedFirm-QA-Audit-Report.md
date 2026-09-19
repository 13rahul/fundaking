# FundedFirm.com — QA, SEO & Content Audit Report

**Site:** https://www.fundedfirm.com  
**Audit date:** September 17, 2026  
**Scope:** 122 sitemap URLs (117 OK, 5 broken blog slugs)

---

## Executive summary

| Area | Score | Notes |
|------|-------|--------|
| SEO fundamentals | 7.5/10 | Strong meta, canonical, JSON-LD |
| Front-end UI | 8/10 | Polished, consistent brand |
| Accessibility | 6/10 | H1 gaps, alt text, button labels |
| Rule/content accuracy | 6/10 | Blog vs `/trader-rules` conflicts |
| Performance (sample) | 8/10 | ~1.7s load on `/trader-rules` |

---

## Official rules (pricing widget + trader-rules)

| Program | Profit target | Daily loss | Overall loss | Min profitable days | Profit split | News |
|---------|---------------|------------|--------------|---------------------|--------------|------|
| 1 Step | 10% | 3% | 6% fixed | 3 | Up to 100% | Yes |
| 2 Step | P1 8% / P2 5% | 5% | 10% | 3 | Up to 100% | Yes |
| Instant | None | 3% trailing | 5% trailing | 5 | 80% / 60% | Yes |

**Trader-rules highlights:** News allowed; overnight/weekend holding allowed; no max time to pass challenge; 30-day inactivity may disable account; copy trading prohibited; same-pair hedging not allowed; 80%+ profit from one trade may be reviewed.

---

## Critical site issues

1. Inconsistent stats (animated homepage counters vs About page).
2. Iraq listed as restricted but mentioned in expansion copy on About.
3. Missing H1 on FAQ, Contact, Rules pages.
4. Homepage “No Max or Min Evaluation Days” block uses payout copy (wrong).
5. Compare table: Scaling Rule “No” vs About $2M scaling.
6. Footer “minimum monthly profit target” vs transparent-rules messaging.
7. Payout times: 24h vs 6–7h testimonials vs 30min bar.

---

## Blog rule conflicts (fix priority)

| Post | Issue |
|------|--------|
| 5-Prop-Firm-Trading-Rules-You-Must-Know-FundedFirm | News/weekend framed as bans — **updated draft provided** |
| 12-Best-Prop-Firms-For-Indian-Traders | “No automated trading/hedging” vs EAs in FAQ |
| FundedFirm-vs-FXIFY / DNAFunded / FundedNext / FundingPips | “Up to 90%”, generic 5%/10% drawdown |

---

## Broken sitemap URLs (5)

- Slugs with spaces or bad encoding in blog paths (fix redirects or slugs).

---

## Canonical references

- https://www.fundedfirm.com/trader-rules  
- https://www.fundedfirm.com/#price  
- https://www.fundedfirm.com/faq  
- https://www.fundedfirm.com/terms  
