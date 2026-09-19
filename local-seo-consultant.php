<?php
$metaTitle = "Local SEO Consultant in Pune | Google Maps & Local Pack Expert - Rahul Agarwal";
$metaDesc = "Top Local SEO Consultant in Pune helping businesses dominate Google Maps, Local Pack & 'near me' searches in Hinjewadi, Baner, Kharadi, Viman Nagar, Koregaon Park, Wakad & all of Pune. GMB optimization, citations, reviews & hyper-local ranking.";
$metaKeywords = "local seo consultant, local seo consultant pune, local seo expert pune, google maps local seo pune, gmb optimization pune, google maps seo consultant, near me seo pune, local pack ranking pune";
$canonicalUrl = "https://fundaking.com/local-seo-consultant";
$ogTitle = $metaTitle;
$ogDesc = $metaDesc;
$ogImage = "https://fundaking.com/og-image.png";
$ogUrl = $canonicalUrl;
$activePage = 'local';
$navCtaText = "Book Free Local Audit";
$navContactHref = '#contact';

include 'includes/theme-header.php';

// LocalBusiness Schema
$localBusinessSchema = [
    "@context" => "https://schema.org",
    "@type" => "LocalBusiness",
    "name" => "Rahul Agarwal - Local SEO Expert Pune",
    "image" => "https://fundaking.com/og-image.png",
    "@id" => "https://fundaking.com/local-seo-consultant",
    "url" => "https://fundaking.com/local-seo-consultant",
    "telephone" => "+918421053710",
    "address" => [
        "@type" => "PostalAddress",
        "streetAddress" => "H S No. 155, Near Bhairavnath Temple, Pandare",
        "addressLocality" => "Baramati",
        "addressRegion" => "Maharashtra",
        "postalCode" => "413110",
        "addressCountry" => "IN"
    ],
    "geo" => [
        "@type" => "GeoCoordinates",
        "latitude" => 18.1361785,
        "longitude" => 74.4610843
    ],
    "areaServed" => [
        ["@type" => "City", "name" => "Pune"],
        "Hinjewadi",
        "Baner",
        "Viman Nagar",
        "Koregaon Park",
        "Wakad",
        "Kharadi"
    ],
    "priceRange" => "$$"
];

// Service Schema
$serviceSchema = [
    "@context" => "https://schema.org",
    "@type" => "Service",
    "serviceType" => "Local SEO Consultation",
    "provider" => [
        "@type" => "Person",
        "name" => "Rahul Agarwal",
        "url" => "https://fundaking.com/"
    ],
    "description" => "Get your business to rank #1 on Google Maps and Local Pack in Pune."
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
            "name" => "Local SEO Consultant",
            "item" => $canonicalUrl
        ]
    ]
];
?>

<script type="application/ld+json">
<?php echo json_encode($localBusinessSchema, JSON_UNESCAPED_SLASHES); ?>
</script>
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
                <div class="hero-eyebrow">Local SEO Consultant in Pune</div>
                <h1 class="hero-title">Rank #1 on Google Maps & “Near Me” Searches in Pune</h1>
                <p class="hero-sub">I’m Rahul Agarwal — Pune’s leading Local SEO Consultant. I help clinics,
                    restaurants,
                    salons, gyms, real estate agents & service businesses dominate Google Maps and the Local Pack in
                    Hinjewadi,
                    Baner, Kharadi, Viman Nagar, Koregaon Park, Wakad, Aundh & every Pune locality.</p>

                <ul class="hero-bullets">
                    <li><i class="fas fa-check-circle"></i> Google Business Profile (GMB) Optimization</li>
                    <li><i class="fas fa-check-circle"></i> Local Citations & NAP Consistency</li>
                    <li><i class="fas fa-check-circle"></i> Review Generation & Reputation Strategy</li>
                    <li><i class="fas fa-check-circle"></i> Hyper-Local Content & Landing Pages</li>
                    <li><i class="fas fa-check-circle"></i> Local Schema & Geo-Targeting</li>
                    <li><i class="fas fa-check-circle"></i> Near Me Keyword Domination</li>
                </ul>

                <div style="margin-top:32px;display:flex;gap:14px;flex-wrap:wrap">
                    <a class="cta-btn" href="#contact">Get Free Local SEO Audit</a>
                    <a class="cta-btn secondary" href="https://wa.me/918421053710"><i class="fab fa-whatsapp"></i>
                        WhatsApp Now</a>
                </div>

                <div style="margin-top:24px;color:var(--muted);font-size:0.9rem;opacity:0.8">
                    <i class="fas fa-map-marker-alt" style="margin-right:6px"></i> Serving: Hinjewadi • Baner • Kharadi
                    • Viman
                    Nagar • Koregaon Park • Wakad • Aundh • Magarpatta • Hadapsar • Pimpri-Chinchwad
                </div>
            </div>

            <aside class="panel reveal">
                <h3>Why Pune Businesses Trust Me for Local SEO</h3>
                <p class="small">Proven system to get you to the top 3 of Google Maps — fast.</p>
                <div class="kpi">
                    <div class="kpi-item">
                        <div class="k">92%</div>
                        <div class="small">Clients in Local Pack top 3</div>
                    </div>
                    <div class="kpi-item">
                        <div class="k">+450%</div>
                        <div class="small">Avg. GMB traffic growth</div>
                    </div>
                    <div class="kpi-item">
                        <div class="k">150+</div>
                        <div class="small">Pune businesses ranked</div>
                    </div>
                </div>
                <div style="margin-top:20px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.05)">
                    <p class="small">In-person meetings available in Pune</p>
                </div>
            </aside>
        </div>
    </section>

    <section class="section container">
        <div style="text-align:center;max-width:700px;margin:0 auto 50px">
            <h2>Local SEO Consultant Services (Pune & India)</h2>
            <p class="muted">Dominate Google Maps and Local Pack — whether you are a local SEO consultant’s client in
                Pune or a multi-city brand. Precision local SEO for footfall and phone leads.</p>
        </div>
        <div class="grid-3 reveal">
            <div class="card">
                <h4><i class="fas fa-map-marked-alt" style="color:var(--accent);margin-right:10px"></i> GMB Mastery</h4>
                <p class="muted">Photos, posts, services, Q&A, attributes, geo-tagged images — everything optimized for
                    max
                    visibility.</p>
            </div>
            <div class="card">
                <h4><i class="fas fa-list-ul" style="color:var(--accent);margin-right:10px"></i> Local Citations</h4>
                <p class="muted">Fix inconsistent NAP (Name, Address, Phone), build 100+ high-authority local citations.
                </p>
            </div>
            <div class="card">
                <h4><i class="fas fa-star" style="color:var(--accent);margin-right:10px"></i> Review Strategy</h4>
                <p class="muted">Automated review requests, response templates, and reputation recovery to build trust.
                </p>
            </div>
            <div class="card">
                <h4><i class="fas fa-city" style="color:var(--accent);margin-right:10px"></i> Hyper-Local Pages</h4>
                <p class="muted">City + service pages that rank for “service + locality” keywords across Pune.</p>
            </div>
            <div class="card">
                <h4><i class="fas fa-code" style="color:var(--accent);margin-right:10px"></i> Local Schema</h4>
                <p class="muted">LocalBusiness, opening hours, geo coordinates, reviews schema for rich results.</p>
            </div>
            <div class="card">
                <h4><i class="fas fa-microphone" style="color:var(--accent);margin-right:10px"></i> Voice Search</h4>
                <p class="muted">Rank for “best dentist near me”, “cafe open now” and other voice queries.</p>
            </div>
        </div>
    </section>

    <section class="section container"
        style="background:linear-gradient(180deg,rgba(124,92,255,0.04),transparent);padding:100px 0;border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05)">
        <h2 style="text-align:center;margin-bottom:60px">You Need a Local SEO Consultant If…</h2>
        <div class="grid-3 reveal" style="max-width:1000px;margin:0 auto">
            <div class="card">
                <h4 style="color:#00e1ff">Your GMB is not showing in the top 3</h4>
                <p class="muted">I’ll get you there in 4–8 weeks using proven signals.</p>
            </div>
            <div class="card">
                <h4 style="color:#00e1ff">You’re getting calls from outside Pune</h4>
                <p class="muted">I fix geo-targeting and service area settings so you get relevant leads.</p>
            </div>
            <div class="card">
                <h4 style="color:#00e1ff">Competitors with worse reviews rank higher</h4>
                <p class="muted">I use Google’s exact ranking factors to overtake them systematically.</p>
            </div>
        </div>
    </section>

    <section id="contact" class="section container" style="margin-bottom:60px">
        <h2>Work With Pune’s #1 Local SEO Consultant</h2>
        <p class="muted" style="text-align:center;max-width:700px;margin:0 auto 40px">Book a free 30-min call or get a
            complete Google Maps + Local SEO audit. No contracts. Results guaranteed.</p>

        <div style="display:grid;grid-template-columns:1fr 440px;gap:30px;margin-top:50px">
            <div id="inline-widget-meet-with-rahul-agarwal"></div>
            <aside class="panel">
                <h3>Quick Contact</h3>
                <p class="small">Reach me directly:</p>
                <div style="margin-top:24px;display:flex;flex-direction:column;gap:16px">
                    <a class="cta-btn secondary" href="mailto:consult@fundaking.com"><i class="fas fa-envelope"></i>
                        Email
                        Me</a>
                    <a class="cta-btn" style="background:#25D366;color:white" href="https://wa.me/918421053710"><i
                            class="fab fa-whatsapp"></i> WhatsApp</a>
                    <a class="cta-btn secondary" href="tel:+918421053710"><i class="fas fa-phone"></i> Call Now</a>
                </div>
            </aside>
        </div>
    </section>
</main>

<a class="sticky-cta" href="#contact">
    <span class="fas fa-map-marker-alt"></span><span>Free Local Audit</span>
</a>

<?php include 'includes/theme-footer.php'; ?>