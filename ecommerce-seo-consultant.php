<?php
$metaTitle = "Ecommerce SEO Consultant in Pune | D2C & Shopify SEO Expert - Rahul Agarwal";
$metaDesc = "Top Ecommerce SEO Consultant in Pune helping D2C, Shopify & Magento stores rank #1 and scale organic revenue. Product page optimization, category clustering, schema, site speed & conversion-focused SEO.";
$metaKeywords = "ecommerce seo consultant, ecommerce seo consultant pune, shopify seo expert pune, d2c seo consultant, magento seo expert, ecommerce seo agency pune, product page seo, category page seo, woocommerce seo consulting";
$canonicalUrl = "https://fundaking.com/ecommerce-seo-consultant";
$ogTitle = $metaTitle;
$ogDesc = $metaDesc;
$ogImage = "https://fundaking.com/og-image.png";
$ogUrl = $canonicalUrl;
$activePage = 'ecommerce';
$navCtaText = "Free Ecommerce Audit";
$navContactHref = '#contact';

include 'includes/theme-header.php';

// Service Schema
$serviceSchema = [
    "@context" => "https://schema.org",
    "@type" => "Service",
    "serviceType" => "Ecommerce SEO Consultation",
    "provider" => [
        "@type" => "Person",
        "name" => "Rahul Agarwal",
        "url" => "https://fundaking.com/"
    ],
    "areaServed" => [
        ["@type" => "City", "name" => "Pune"],
        ["@type" => "Country", "name" => "India"]
    ],
    "description" => $metaDesc,
    "offers" => [
        "@type" => "Offer",
        "priceCurrency" => "USD",
        "price" => "0",
        "description" => "Free 30-minute ecommerce SEO audit"
    ]
];

// Breadcrumb Schema
$breadcrumbSchema = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => [
        [
            "@type" => "ListItem",
            "position" => 1,
            "name" => "Home",
            "item" => "https://fundaking.com/"
        ],
        [
            "@type" => "ListItem",
            "position" => 2,
            "name" => "Ecommerce SEO Consultant",
            "item" => $canonicalUrl
        ]
    ]
];
?>

<script type="application/ld+json">
<?php echo json_encode($serviceSchema, JSON_UNESCAPED_SLASHES); ?>
</script>
<script type="application/ld+json">
<?php echo json_encode($breadcrumbSchema, JSON_UNESCAPED_SLASHES); ?>
</script>

<main>
    <section class="hero container">
        <div class="hero-grid">
            <div>
                <div class="hero-eyebrow">Ecommerce SEO Consultant in Pune</div>
                <h1 class="hero-title">I Help D2C & Shopify Stores Turn Google Into Their #1 Revenue Channel</h1>
                <p class="hero-sub">I’m Rahul Agarwal — Pune-based Ecommerce SEO Consultant specializing in Shopify,
                    Magento,
                    WooCommerce & custom stores. I optimize product pages, category architecture, schema, site speed &
                    internal
                    linking so you rank higher and convert better.</p>

                <ul class="hero-bullets">
                    <li><i class="fas fa-check-circle"></i> Product & Category Page Optimization</li>
                    <li><i class="fas fa-check-circle"></i> Shopify SEO Mastery</li>
                    <li><i class="fas fa-check-circle"></i> Rich Snippets & Product Schema</li>
                    <li><i class="fas fa-check-circle"></i> Site Speed + Core Web Vitals</li>
                    <li><i class="fas fa-check-circle"></i> Conversion-Driven Internal Linking</li>
                    <li><i class="fas fa-check-circle"></i> Faceted Navigation & Filtering Fixes</li>
                </ul>

                <div style="margin-top:28px;display:flex;gap:14px;flex-wrap:wrap">
                    <a class="cta-btn" href="#contact">Get Free Ecommerce SEO Audit</a>
                    <a class="cta-btn secondary" href="https://wa.me/918421053710"><i class="fab fa-whatsapp"></i>
                        WhatsApp Now</a>
                </div>
            </div>

            <aside class="panel reveal">
                <h3>Real Revenue Growth for Ecommerce Brands</h3>
                <p class="small">Not just traffic — I focus on organic transactions, AOV and ROAS.</p>
                <div class="kpi">
                    <div class="kpi-item">
                        <div class="k">+320%</div>
                        <div class="small">Avg. organic revenue growth</div>
                    </div>
                    <div class="kpi-item">
                        <div class="k">+18%</div>
                        <div class="small">Avg. conversion rate uplift</div>
                    </div>
                    <div class="kpi-item">
                        <div class="k">40+</div>
                        <div class="small">D2C & Shopify stores scaled</div>
                    </div>
                </div>
                <div style="margin-top:20px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.05)">
                    <p class="small">Pune • Mumbai • Delhi • Bangalore • Remote India</p>
                </div>
            </aside>
        </div>
    </section>

    <section class="section container">
        <div style="text-align:center;max-width:700px;margin:0 auto 50px">
            <h2>Ecommerce SEO Services That Drive Sales</h2>
            <p class="muted">A complete system to capture high-intent shoppers and scale your store.</p>
        </div>
        <div class="grid-3 reveal">
            <div class="card">
                <h4><i class="fab fa-shopify" style="color:var(--accent);margin-right:10px"></i> Shopify SEO</h4>
                <p class="muted">App conflicts, theme speed, collection structure, metafields, JSON-LD schema — solved.
                </p>
            </div>
            <div class="card">
                <h4><i class="fab fa-wordpress" style="color:var(--accent);margin-right:10px"></i> WooCommerce SEO
                    Consulting</h4>
                <p class="muted">Product schema, category architecture, facet filters, crawl waste and speed on WordPress
                    stores — full WooCommerce SEO consulting.</p>
            </div>
            <div class="card">
                <h4><i class="fas fa-box-open" style="color:var(--accent);margin-right:10px"></i> Product Page SEO</h4>
                <p class="muted">Keyword-optimized titles, descriptions, bullet points, image alt text, reviews schema.
                </p>
            </div>
            <div class="card">
                <h4><i class="fas fa-sitemap" style="color:var(--accent);margin-right:10px"></i> Site Architecture</h4>
                <p class="muted">Topical authority via parent-child category strategy and silo structure for max link
                    juice.
                </p>
            </div>
            <div class="card">
                <h4><i class="fas fa-star-half-alt" style="color:var(--accent);margin-right:10px"></i> Schema Markup
                </h4>
                <p class="muted">Product, Offer, Review, AggregateRating, Breadcrumb — fully compliant rich results.</p>
            </div>
            <div class="card">
                <h4><i class="fas fa-bolt" style="color:var(--accent);margin-right:10px"></i> Site Speed (CWV)</h4>
                <p class="muted">Image lazy loading, font optimization, app cleanup, CDN config, Core Web Vitals
                    optimization.
                </p>
            </div>
            <div class="card">
                <h4><i class="fas fa-link" style="color:var(--accent);margin-right:10px"></i> Internal Linking</h4>
                <p class="muted">Avoid duplicate content, pass link equity, fix faceted navigation and improve crawl
                    depth.
                </p>
            </div>
        </div>
    </section>

    <section class="section container"
        style="background:linear-gradient(180deg,rgba(124,92,255,0.04),transparent);padding:100px 0;border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05)">
        <h2 style="text-align:center;margin-bottom:60px">You Need an Ecommerce SEO Consultant If…</h2>
        <div class="grid-3 reveal" style="max-width:1000px;margin:0 auto">
            <div class="card">
                <h4 style="color:#00e1ff">Your product pages aren’t ranking beyond page 3</h4>
                <p class="muted">I fix thin content, poor structure, and missing schema to get you visible.</p>
            </div>
            <div class="card">
                <h4>Your Shopify store is slow and losing mobile traffic</h4>
                <p class="muted">I remove bloat, optimize images, and fix Core Web Vitals for better UX.</p>
            </div>
            <div class="card">
                <h4 style="color:#00e1ff">You’re spending lakhs on ads but organic is flat</h4>
                <p class="muted">I build a predictable, compounding organic revenue engine to lower your blended CAC.
                </p>
            </div>
        </div>
    </section>

    <section id="contact" class="section container" style="margin-bottom:60px">
        <h2>Work With Pune’s Leading Ecommerce SEO Consultant</h2>
        <p class="muted" style="text-align:center;max-width:700px;margin:0 auto 40px">Book a free 30-minute strategy
            call
            or get a full ecommerce SEO audit (Shopify, Magento, custom stores welcome).</p>

        <div style="display:grid;grid-template-columns:1fr 440px;gap:30px;margin-top:50px">
            <div id="inline-widget-meet-with-rahul-agarwal"></div>
            <aside class="panel">
                <h3>Quick Contact</h3>
                <p class="small">Ready to scale? Let's talk:</p>
                <div style="margin-top:24px;display:flex;flex-direction:column;gap:16px">
                    <a class="cta-btn secondary" href="mailto:consult@fundaking.com"><i class="fas fa-envelope"></i>
                        Email
                        Me</a>
                    <a class="cta-btn" style="background:#25D366;color:white" href="https://wa.me/918421053710"><i
                            class="fab fa-whatsapp"></i> WhatsApp</a>
                    <a class="cta-btn secondary" href="tel:+918421053710"><i class="fas fa-phone"></i> Call Now</a>
                    <a class="cta-btn secondary" href="/"><i class="fas fa-arrow-left"></i> Back to Main
                        Site</a>
                </div>
            </aside>
        </div>
    </section>
</main>

<a class="sticky-cta" href="#contact">
    <span class="fas fa-shopping-cart"></span><span>Free Ecommerce Audit</span>
</a>

<?php include 'includes/theme-footer.php'; ?>