# Automark Astro theme (Fundaking)

The theme source lives at **`fundaking/automark-astro-main/`**. It powers the static Astro site (home, about, features, blog, case studies, contact) and supplies hashed CSS/JS for the **PHP theme shell** on legacy SEO landings.

## Local XAMPP

1. Open a terminal in `automark-astro-main`.
2. Run:

```bash
npm install
npm run build:main
```

3. Open **http://localhost/fundaking/** — `DirectoryIndex index.html index.php` serves Astro `index.html` first.

PHP service pages (e.g. `/technical-seo-consultant`) use `includes/theme-header.php` / `theme-footer.php` and load the same Automark assets via `includes/theme-assets.php` (regenerated on every `build:main`).

## What `build:main` does

- Builds Astro to `automark-astro-main/dist/`
- Copies dist into the site root (`fundaking/`), **skipping** `.htaccess`, `includes/`, `assets/`, `legacy-php/`, and other protected folders
- Runs `scripts/generate-theme-assets.mjs` → writes `includes/theme-assets.php` with current `_astro/*.css` and `/scripts/*.js` hashes

Never overwrite the root **`.htaccess`** from dist — Fundaking rewrite rules (HTTPS, extensionless PHP, `/case-studies` → `/case-study`, retired `/pricing` and `/careers` redirects) live there.

## Theme-only preview

```bash
npm run build:xampp
```

→ **http://localhost/fundaking/theme-preview/**

## Dev server (hot reload)

```bash
cd automark-astro-main
npm run dev
```

## Production (fundaking.com)

Before building for production, edit `automark-astro-main/src/config/config.json`:

| Key | Production value |
|-----|------------------|
| `site.base_url` | `https://fundaking.com` |
| `site.base_path` | `/` |

Then run `npm run build:main` and upload the merged site root (HTML, `_astro/`, `images/`, `scripts/`, PHP, `includes/`) to Hostinger.

**Post-deploy checklist**

- [ ] Home loads Astro theme at `/`
- [ ] One PHP landing (e.g. `/technical-seo-consultant`) shows matching header/footer/preloader
- [ ] `/case-study` lists all case studies; old `/case-studies` redirects
- [ ] Contact form / lead gen reaches `/contact` (no `/api/lead` on static host)
- [ ] `includes/theme-assets.php` updated (CSS/JS not 404)
- [ ] `https://fundaking.com/llms.txt` and `/llms-full.txt` load (regenerated on every `npm run build`)
- [ ] `robots.txt` includes `Sitemap: https://fundaking.com/sitemap-index.xml`
- [ ] Spot-check JSON-LD (Rich Results / View Source): home FAQ + LocalBusiness, blog `BlogPosting`, case study `Article`, inner pages `FAQPage` where FAQs show

## SEO & LLM discoverability

| Item | Location |
|------|----------|
| JSON-LD graph (Organization, Person, WebSite, WebPage) | `src/lib/schema.ts`, `SchemaJsonLd.astro`, PHP `includes/schema-fundaking.php` |
| FAQ schema | Same FAQ markdown as UI (`faq.md`, `faq-features.md`) via `faqSlug` on `Base.astro` |
| Breadcrumbs schema | Auto on inner routes unless page supplies its own `BreadcrumbList` |
| Blog / case study | `BlogPosting` + `Article` respectively |
| Sitemap | `@astrojs/sitemap` at `/sitemap-index.xml` (production `base_url`) |
| `llms.txt` / `llms-full.txt` | `scripts/generate-llms.mjs` → `public/` before build |
| Canonical + OG/Twitter | `Base.astro` (production URLs via `absoluteUrl()`) |

**Not automatic:** hundreds of PHP niche landings use the shared PHP graph only (no per-page FAQ unless added in PHP). Careers routes are `noindex`. Live Search Console / Bing verification and hreflang are out of scope unless you add tags in config.

## Blog infographics (per post)

On every `npm run build`, `scripts/generate-blog-infographics.mjs`:

- Reads each published blog markdown (`draft: false`)
- Builds **two unique SVGs** from that file’s **H2 outline**, **tables**, **lists**, **numbered steps**, and **% / ₹ stats** in the body
- Writes `public/images/infographics/blog/{slug}-1.svg` and `-2.svg`
- Embeds `<figure class="blog-infographic">` before the first `##` section

Edit the article → rebuild → infographics refresh. Draft posts are skipped.

**Style:** Infographics follow the same layout pattern as `fundaking/ewebguru-blog/infographic-01-four-carts.svg` (1152×864, navy panel, stacked rows + dual comparison). Reference preview: open `ewebguru-blog/infographics-preview.html` locally.

## Config notes

- Local dev uses `base_path: /fundaking/` so links work under XAMPP; Astro components use `withBase()` from `src/lib/paths.ts`.
- Contact forms use mailto / contact page until a server endpoint is wired.
- Careers routes are `noindex`; `/careers` redirects to `/contact` in `.htaccess`.

## Hybrid architecture

- **Full Astro:** marketing hub pages and content collections (blog, case study markdown).
- **PHP body + theme shell:** niche/location landings, blog/case-study PHP fallbacks, tools like `eeat-grader.php` (can stay on old header until migrated).
- **Bridge CSS:** `assets/css/php-theme-bridge.css` styles legacy markup inside the dark theme.
