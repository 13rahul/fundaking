<?php
$metaTitle = "SEO Consultant in Pune | Rahul Agarwal - Fundaking Media";
$metaDesc = "Top SEO Consultant in Pune helping CEOs, startups & agencies rank #1 on Google. Technical SEO, content strategy, CRO & monthly advisory.";
$metaKeywords = "SEO consultant in Pune, SEO expert Pune, best SEO consultant Pune, technical seo consultant, local seo expert";
$canonicalUrl = "https://fundaking.com/";
$activePage = 'home';
$navCtaText = "Book free SEO audit";
$navContactHref = '#contact';
$bodyClass = 'site-showcase home-showcase';

require_once __DIR__ . '/includes/case-studies-data.php';
include 'includes/header.php';

$featuredStudies = [
    fundaking_cs_get('fintech-organic-growth'),
    fundaking_cs_get('saas-demo-requests'),
    fundaking_cs_get('collegeastra'),
    fundaking_cs_get('ultralooper'),
];
$insightPosts = [
    ['slug' => 'how-to-choose-technical-seo-consultant', 'cat' => 'Technical SEO', 'title' => 'How to Choose a Technical SEO Consultant', 'desc' => 'Questions that separate real technical work from report generators.'],
    ['slug' => 'what-does-an-seo-consultant-do', 'cat' => 'SEO Strategy', 'title' => 'What Does an SEO Consultant Do?', 'desc' => 'The job is architecture, diagnosis, and revenue — not a monthly checklist.'],
    ['slug' => 'organic-seo-vs-paid', 'cat' => 'CRO', 'title' => 'Organic SEO vs Paid Ads', 'desc' => 'How search systems complement paid acquisition instead of competing with it.'],
];

// Prepare Structured Data for Homepage
$schemaData = [
    "@context" => "https://schema.org",
    "@type" => "ProfessionalService",
    "name" => "Rahul Agarwal - Fundaking Media",
    "image" => "https://fundaking.com/og-image.png",
    "url" => "https://fundaking.com/",
    "telephone" => "+918421053710",
    "email" => "consult@fundaking.com",
    "priceRange" => "$$$",
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
        ["@type" => "City", "name" => "Mumbai"],
        ["@type" => "City", "name" => "Bengaluru"],
        ["@type" => "Country", "name" => "India"]
    ],
    "openingHoursSpecification" => [
        "@type" => "OpeningHoursSpecification",
        "dayOfWeek" => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens" => "09:00",
        "closes" => "19:00"
    ],
    "sameAs" => [
        "https://www.linkedin.com/in/rahul-agarwal-510a5b79/",
        "https://twitter.com/fundaking"
    ],
    "founder" => [
        "@type" => "Person",
        "name" => "Rahul Agarwal",
        "jobTitle" => "SEO Consultant in Pune",
        "url" => "https://fundaking.com/",
        "image" => "https://fundaking.com/og-image.png",
        "sameAs" => [
            "https://www.linkedin.com/in/rahul-agarwal-510a5b79/",
            "https://twitter.com/fundaking"
        ],
        "worksFor" => [
            "@type" => "Organization",
            "name" => "Fundaking Media",
            "url" => "https://fundaking.com/"
        ],
        "knowsAbout" => [
            "Technical SEO",
            "Local SEO",
            "Ecommerce SEO",
            "Generative Engine Optimization"
        ]
    ],
    "description" => $metaDesc,
    "hasOfferCatalog" => [
        "@type" => "OfferCatalog",
        "name" => "SEO Services",
        "itemListElement" => [
            ["@type" => "Offer", "itemOffered" => ["@type" => "Service", "name" => "Technical SEO Consultation"]],
            ["@type" => "Offer", "itemOffered" => ["@type" => "Service", "name" => "Local SEO Strategy"]],
            ["@type" => "Offer", "itemOffered" => ["@type" => "Service", "name" => "Ecommerce SEO Growth"]]
        ]
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
        ]
    ]
];
// FAQ Schema
$faqSchema = [
    "@context" => "https://schema.org",
    "@type" => "FAQPage",
    "mainEntity" => [
        [
            "@type" => "Question",
            "name" => "How do I choose an SEO consultant in Pune?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Look for proven technical depth, clear revenue-focused process, named case results, and direct access to the strategist — not only junior account managers. Rahul Agarwal of Fundaking Media is an independent SEO consultant serving Pune businesses with 8+ years across SaaS, D2C, and B2B."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "How much does an SEO consultant in Pune charge?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Pricing depends on scope — audits, monthly advisory, or full technical + content roadmaps. Most Pune founders start with a free 30-minute strategy call, then a scoped proposal. There are no long lock-in contracts."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Do you work only with clients in Pune?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Pune is the primary service area (including Hinjewadi, Baner, Viman Nagar, Koregaon Park, and Wakad), with in-person meetings available. Remote advisory is also offered for Mumbai, Bangalore, and international teams."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "SEO agency vs independent SEO consultant — which is better?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Agencies suit high-volume execution. An independent SEO consultant is better when you need senior strategy, direct access, and deep technical work without account-manager dilution. Rahul caps active clients for focus."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "How long does it take to see SEO results in Pune?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Technical quick wins can appear within weeks. Meaningful organic pipeline growth for competitive Pune keywords typically takes 3–6 months of consistent execution across technical SEO, content, and CRO."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "What does an SEO consultant do?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "An SEO consultant diagnoses technical and content issues, builds a revenue-focused roadmap, and guides execution so organic search drives pipeline — not just rankings. Rahul Agarwal provides hands-on technical SEO, strategy, and monthly advisory."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "What SEO services do you offer in Pune?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Services include technical SEO audits, local SEO / Google Maps strategy, ecommerce SEO for Shopify and D2C, LLM / GEO optimization, content strategy, analytics & CRO, and monthly CEO-level SEO advisory."
            ]
        ]
    ]
];
// Review schema (matches visible homepage testimonials — no invented client names)
$reviewSchema = [
    "@context" => "https://schema.org",
    "@type" => "ProfessionalService",
    "name" => "Rahul Agarwal - Fundaking Media",
    "url" => "https://fundaking.com/",
    "aggregateRating" => [
        "@type" => "AggregateRating",
        "ratingValue" => "5",
        "bestRating" => "5",
        "worstRating" => "1",
        "ratingCount" => "2",
        "reviewCount" => "2"
    ],
    "review" => [
        [
            "@type" => "Review",
            "author" => [
                "@type" => "Person",
                "name" => "Founder, SaaS Platform"
            ],
            "reviewRating" => [
                "@type" => "Rating",
                "ratingValue" => "5",
                "bestRating" => "5"
            ],
            "reviewBody" => "Rahul found critical issues our agency missed for 18 months. Within 3 months we saw 42% more qualified leads from organic."
        ],
        [
            "@type" => "Review",
            "author" => [
                "@type" => "Person",
                "name" => "Head of Growth, D2C Brand"
            ],
            "reviewRating" => [
                "@type" => "Rating",
                "ratingValue" => "5",
                "bestRating" => "5"
            ],
            "reviewBody" => "Best decision we made. Clear strategy, precise execution guidance and zero fluff. Saved us lakhs in wasted spend."
        ]
    ]
];
?>

<script type="application/ld+json">
<?php echo json_encode($schemaData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); ?>
</script>
<script type="application/ld+json">
<?php echo json_encode($breadcrumbSchema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); ?>
</script>
<script type="application/ld+json">
<?php echo json_encode($faqSchema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); ?>
</script>
<script type="application/ld+json">
<?php echo json_encode($reviewSchema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); ?>
</script>

<main class="site-main site-main--home">
    <section class="hero-showcase" aria-labelledby="hero-showcase-title">
        <div class="hero-showcase__mesh" aria-hidden="true"></div>
        <div class="container hero-showcase__grid">
            <div class="hero-showcase__copy">
                <p class="hero-glass-pill">
                    <i class="fas fa-arrow-trend-up" aria-hidden="true"></i>
                    Top SEO consultant in Pune · Funda King
                </p>
                <h1 id="hero-showcase-title" class="hero-showcase__title">
                    <span class="visually-hidden">SEO consultant in Pune — </span>I build <span class="hero-showcase__gradient">SEO-driven</span> digital growth for founders.
                </h1>
                <p class="hero-showcase__sub">Rahul Agarwal — data-driven technical SEO, content architecture, and CRO for SaaS, D2C, and B2B. Search that feeds pipeline, not vanity reports.</p>
                <div class="hero-actions hero-actions--showcase">
                    <a class="cta-btn" href="#contact">Get started</a>
                    <a class="cta-btn secondary" href="<?php echo fk_url('/case-studies'); ?>">View work</a>
                </div>
                <div class="hero-team-card reveal">
                    <div class="hero-team-card__avatars" aria-hidden="true">
                        <span>FS</span><span>DS</span><span>SS</span>
                        <span class="hero-team-card__plus"><i class="fas fa-plus" aria-hidden="true"></i></span>
                    </div>
                    <p><strong>30+ founders</strong> across SaaS, D2C &amp; B2B · direct access to me, not a junior AM.</p>
                </div>
                <p class="hero-showcase__areas">Pune · Hinjewadi · Baner · Viman Nagar · Koregaon Park · Wakad</p>
            </div>
            <div class="hero-showcase__visual">
                <div class="hero-rings" aria-hidden="true">
                    <span></span><span></span><span></span>
                </div>
                <figure class="hero-portrait">
                    <div class="hero-portrait__frame">
                        <img src="<?php echo fk_url('/og-image.png'); ?>" width="420" height="420" alt="Rahul Agarwal — SEO consultant in Pune at Fundaking Media" loading="eager" decoding="async" />
                    </div>
                </figure>
                <div class="hero-deco hero-deco--chart" aria-hidden="true"><i class="fas fa-chart-column"></i></div>
                <div class="hero-deco hero-deco--bulb" aria-hidden="true"><i class="fas fa-lightbulb"></i></div>
                <aside class="hero-stat-card" aria-label="Results highlights">
                    <div class="hero-stat-card__row">
                        <strong>+200%</strong>
                        <span>Organic pipeline</span>
                    </div>
                    <div class="hero-stat-card__row">
                        <strong>+115%</strong>
                        <span>Demo requests · SaaS</span>
                    </div>
                    <div class="hero-stat-card__row hero-stat-card__row--accent">
                        <strong>8y+</strong>
                        <span>Technical SEO</span>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <section class="trust-strip" aria-label="Industries served">
        <div class="container trust-strip__inner">
            <p class="trust-strip__label">Trusted by founders across</p>
            <ul class="trust-strip__logos">
                <li>SaaS</li>
                <li>D2C</li>
                <li>B2B CRM</li>
                <li>Fintech</li>
                <li>Manufacturing</li>
                <li>EdTech</li>
                <li>Agencies</li>
            </ul>
        </div>
    </section>

    <section id="services" class="section-block section-block--paper">
        <div class="container">
            <header class="section-intro">
                <h2>SEO services in Pune</h2>
                <p class="muted">Revenue-focused SEO — strategy, technical depth, and governance your team can execute.</p>
            </header>
            <div class="grid-3 reveal">
                <article class="card service-card">
                    <h4><i class="fas fa-route" aria-hidden="true"></i> SEO strategy &amp; roadmap</h4>
                    <p class="muted">Keyword clusters, content pillars, and milestones for the next 6–12 months.</p>
                </article>
                <article class="card service-card">
                    <h4><i class="fas fa-code" aria-hidden="true"></i> Technical SEO &amp; CWV</h4>
                    <p class="muted">Crawl, index, schema, rendering, and Core Web Vitals your devs can ship.</p>
                </article>
                <article class="card service-card">
                    <h4><i class="fas fa-layer-group" aria-hidden="true"></i> Content strategy</h4>
                    <p class="muted">Intent-driven clusters and conversion-focused pages that rank and convert.</p>
                </article>
                <article class="card service-card">
                    <h4><i class="fas fa-chart-line" aria-hidden="true"></i> Analytics &amp; CRO</h4>
                    <p class="muted">GA4, funnels, and testing so traffic turns into demos and revenue.</p>
                </article>
                <article class="card service-card">
                    <h4><i class="fas fa-user-tie" aria-hidden="true"></i> Monthly SEO advisory</h4>
                    <p class="muted">CEO-level guidance, agency oversight, and performance governance.</p>
                </article>
                <article class="card service-card">
                    <h4><i class="fas fa-handshake" aria-hidden="true"></i> Agency mentorship</h4>
                    <p class="muted">White-label technical depth for Pune agencies winning larger clients.</p>
                </article>
            </div>
            <p class="section-foot"><a href="<?php echo fk_url('/seo-consulting-services'); ?>">All consulting services →</a></p>
        </div>
    </section>

    <section id="approach" class="path-band">
        <div class="container">
            <h2 class="path-band__title">From keywords to revenue</h2>
            <p class="path-band__lead">Rankings alone do not pay salaries. This is the path I design with you.</p>
            <ol class="path-steps">
                <li>Keywords</li>
                <li>Visibility</li>
                <li>Qualified traffic</li>
                <li>Conversion</li>
                <li>Revenue</li>
            </ol>
            <p class="path-band__note">Diagnose → architect → build → measure → compound. <a href="<?php echo fk_url('/technical-seo-consultant'); ?>">Technical depth →</a></p>
        </div>
    </section>

    <section id="work" class="section-block">
        <div class="container">
            <header class="section-intro">
                <h2>Case studies</h2>
                <p class="muted">Real numbers where we have Search Console data. Real builds where we shipped product.</p>
            </header>
            <div class="work-showcase reveal">
                <?php foreach ($featuredStudies as $study): ?>
                    <?php if ($study) echo fundaking_cs_render_card($study); ?>
                <?php endforeach; ?>
            </div>
            <p class="section-foot"><a class="cta-btn secondary" href="<?php echo fk_url('/case-studies'); ?>">All case studies</a></p>
        </div>
    </section>

    <section id="why" class="section-block section-block--paper">
        <div class="container">
            <header class="section-intro">
                <h2>Why work with an independent consultant</h2>
                <p class="muted">Business-first SEO with technical depth — the mix agencies rarely staff on your account.</p>
            </header>
            <div class="why-grid reveal">
                <article class="why-card">
                    <h3>Business-first SEO</h3>
                    <p class="muted">Every recommendation ties to revenue, LTV, and pipeline — not vanity metrics.</p>
                </article>
                <article class="why-card">
                    <h3>Deep technical mastery</h3>
                    <p class="muted">Log files, JavaScript rendering, indexation — fixes others miss.</p>
                </article>
                <article class="why-card">
                    <h3>Execution governance</h3>
                    <p class="muted">Playbooks and QA so your team or agency implements correctly.</p>
                </article>
                <article class="why-card">
                    <h3>Transparent &amp; actionable</h3>
                    <p class="muted">No fluff PDFs. Clear priorities CEOs can act on this week.</p>
                </article>
                <article class="why-card">
                    <h3>Quick wins + compounding</h3>
                    <p class="muted">Technical wins in weeks; durable growth over 3–6 months.</p>
                </article>
                <article class="why-card">
                    <h3>Pune-based, globally capable</h3>
                    <p class="muted">Local meetings across Pune; remote for Mumbai, Bangalore, and abroad.</p>
                </article>
            </div>
        </div>
    </section>

    <section id="compare" class="section-block">
        <div class="container">
            <header class="section-intro">
                <h2>Agency vs independent SEO consultant</h2>
                <p class="muted">Both can work — choose based on how much senior attention your problem needs.</p>
            </header>
            <div class="vs-table-wrapper reveal">
                <table class="vs-table">
                    <thead>
                        <tr>
                            <th scope="col">Factor</th>
                            <th scope="col">Typical SEO agency</th>
                            <th scope="col" class="brand-col">Rahul Agarwal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Strategy by</strong></td>
                            <td>Account manager (junior / mid)</td>
                            <td class="highlight-cell">Expert consultant (8+ years)</td>
                        </tr>
                        <tr>
                            <td><strong>Execution</strong></td>
                            <td>Interns / outsourced bench</td>
                            <td class="highlight-cell">Me + vetted specialists</td>
                        </tr>
                        <tr>
                            <td><strong>Communication</strong></td>
                            <td>Slow, via client service</td>
                            <td class="highlight-cell">Direct — WhatsApp / call</td>
                        </tr>
                        <tr>
                            <td><strong>Client volume</strong></td>
                            <td>50+ accounts</td>
                            <td class="highlight-cell">Capped active clients</td>
                        </tr>
                        <tr>
                            <td><strong>Contracts</strong></td>
                            <td>6–12 month lock-in</td>
                            <td class="highlight-cell">Flexible / performance-led</td>
                        </tr>
                        <tr>
                            <td><strong>Reporting</strong></td>
                            <td>Automated PDFs</td>
                            <td class="highlight-cell">Actionable insights &amp; roadmap</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="section-foot"><a href="<?php echo fk_url('/seo-consultant-vs-agency'); ?>">Full consultant vs agency guide →</a></p>
        </div>
    </section>

    <section id="about" class="section-block section-block--paper">
        <div class="container founder-split reveal">
            <div class="founder-split__about">
                <div class="founder-head">
                    <div class="founder-avatar" aria-hidden="true">RA</div>
                    <div>
                        <h2>About Rahul Agarwal</h2>
                        <p class="founder-role muted">Independent SEO consultant · Fundaking Media · Pune</p>
                    </div>
                </div>
                <p class="muted">8+ years helping startups and enterprises build organic growth engines — SaaS, D2C, B2B, travel, and enterprise tech across Pune, Mumbai, Bangalore, and international teams.</p>
                <p class="muted">You work with one senior strategist: technical diagnosis, roadmap, and honest measurement — not an account manager and a ticket queue.</p>
                <p class="muted founder-note">I live with 40% visual impairment; it sharpens how I structure problems, communicate priorities, and stay persistent on hard technical work.</p>
                <p class="muted founder-split__meta"><a href="<?php echo fk_url('/blog'); ?>">Insights on the blog →</a> · <a href="<?php echo fk_url('/hire-seo-consultant-pune'); ?>">Hiring guide →</a></p>
            </div>
            <div id="testimonials" class="founder-split__quotes">
                <h2 class="founder-split__quotes-title">What Pune founders say</h2>
                <div class="testimonials">
                <figure class="quote" itemscope itemtype="https://schema.org/Review">
                    <meta itemprop="itemReviewed" content="Rahul Agarwal SEO Consulting" />
                    <strong itemprop="author">Founder, SaaS Platform · Pune</strong>
                    <p class="muted" itemprop="reviewBody">"Rahul found critical issues our agency missed for 18 months. Within 3 months we saw 42% more qualified leads from organic."</p>
                    <div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                        <meta itemprop="ratingValue" content="5" /><span aria-label="5 out of 5 stars">★★★★★</span>
                    </div>
                </figure>
                <figure class="quote" itemscope itemtype="https://schema.org/Review">
                    <meta itemprop="itemReviewed" content="Rahul Agarwal SEO Consulting" />
                    <strong itemprop="author">Head of Growth, D2C Brand · Pune</strong>
                    <p class="muted" itemprop="reviewBody">"Best decision we made. Clear strategy, precise execution guidance and zero fluff. Saved us lakhs in wasted spend."</p>
                    <div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                        <meta itemprop="ratingValue" content="5" /><span aria-label="5 out of 5 stars">★★★★★</span>
                    </div>
                </figure>
                </div>
            </div>
            <p class="section-foot muted">Still deciding how to hire? <a href="<?php echo fk_url('/hire-seo-consultant-pune'); ?>">Pune hiring guide</a> · <a href="<?php echo fk_url('/seo-consultant-vs-agency'); ?>">Consultant vs agency</a></p>
        </div>
    </section>

    <section id="faq" class="section-block">
        <div class="container">
            <header class="section-intro">
                <h2>SEO consultant in Pune — FAQs</h2>
                <p class="muted">Straight answers before you book a call.</p>
            </header>
            <div class="faq-list reveal">
                <details class="faq-item">
                    <summary>How do I choose an SEO consultant in Pune?</summary>
                    <p class="muted">Look for proven technical depth, a clear revenue-focused process, named case results,
                        and direct access to the strategist — not only junior account managers. Rahul Agarwal of Fundaking
                        Media is an independent SEO consultant serving Pune businesses with 8+ years across SaaS, D2C, and
                        B2B. Use the
                        <a href="<?php echo fk_url('/hire-seo-consultant-pune'); ?>">hiring checklist</a>
                        and book a strategy call to validate fit.</p>
                </details>
                <details class="faq-item">
                    <summary>How much does an SEO consultant in Pune charge?</summary>
                    <p class="muted">Pricing depends on scope — audits, monthly advisory, or full technical + content
                        roadmaps. Most Pune founders start with a free 30-minute strategy call, then a scoped proposal. No
                        long lock-in contracts.</p>
                </details>
                <details class="faq-item">
                    <summary>Do you work only with clients in Pune?</summary>
                    <p class="muted">Pune is the primary service area (Hinjewadi, Baner, Viman Nagar, Koregaon Park, Wakad
                        and more), with in-person meetings available. Remote advisory is also offered for Mumbai, Bangalore,
                        and international teams.</p>
                </details>
                <details class="faq-item">
                    <summary>SEO agency vs independent SEO consultant — which is better?</summary>
                    <p class="muted">Agencies suit high-volume execution. An independent consultant is better when you need
                        senior strategy, direct access, and deep technical work without account-manager dilution. Active
                        clients are capped for focus. Full breakdown:
                        <a href="<?php echo fk_url('/seo-consultant-vs-agency'); ?>">consultant vs agency in Pune</a>.
                    </p>
                </details>
                <details class="faq-item">
                    <summary>How long does it take to see SEO results in Pune?</summary>
                    <p class="muted">Technical quick wins can appear within weeks. Meaningful organic pipeline growth for
                        competitive Pune keywords typically takes 3–6 months of consistent execution across technical SEO,
                        content, and CRO.</p>
                </details>
                <details class="faq-item">
                    <summary>What does an SEO consultant do?</summary>
                    <p class="muted">An SEO consultant diagnoses technical and content issues, builds a revenue-focused
                        roadmap, and guides execution so organic search drives pipeline — not just rankings. Read
                        <a href="<?php echo fk_url('/blog/what-does-an-seo-consultant-do'); ?>">what an SEO consultant
                            does</a> or browse
                        <a href="<?php echo fk_url('/seo-consulting-services'); ?>">SEO consulting services</a>.</p>
                </details>
                <details class="faq-item">
                    <summary>What SEO services do you offer in Pune?</summary>
                    <p class="muted">Technical SEO audits, local SEO / Google Maps strategy, ecommerce SEO for Shopify and
                        D2C, LLM / GEO optimization, content strategy, analytics & CRO, and monthly CEO-level SEO advisory.
                        Also serving <a href="<?php echo fk_url('/seo-consultant-india'); ?>">India</a>,
                        <a href="<?php echo fk_url('/seo-consultant-mumbai'); ?>">Mumbai</a> and
                        <a href="<?php echo fk_url('/seo-consultant-kolkata'); ?>">Kolkata</a>.
                    </p>
                </details>
            </div>
        </div>
    </section>

    <section id="contact" class="section-block section-block--paper">
        <div class="container">
            <header class="section-intro">
                <h2>Book a free SEO audit or strategy call</h2>
                <p class="muted">Thirty minutes. No lock-in. Pick a time or reach out on WhatsApp.</p>
            </header>
            <div class="contact-split">
                <div>
                    <iframe class="contact-frame" src="https://ultralooper.com/book/rahul-agarwal?embed=1" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="Book a strategy call with Rahul Agarwal"></iframe>
                </div>
                <aside class="panel">
                    <h3>Direct contact</h3>
                    <p class="small">Pune, Maharashtra · Fundaking Media</p>
                    <div class="contact-actions">
                        <a class="cta-btn secondary" href="mailto:consult@fundaking.com">Email me</a>
                        <a class="cta-btn" href="https://wa.me/918421053710">WhatsApp</a>
                        <a class="cta-btn secondary" href="tel:+918421053710">Call +91 84210 53710</a>
                    </div>
                    <div class="contact-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3791.601634630694!2d74.4610843!3d18.136178500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3a78b97137889%3A0x2464feeefb15a44d!2sFundaking%20Media%20OPC%20Pvt%20LTd!5e0!3m2!1sen!2sin!4v1764511435016!5m2!1sen!2sin"
                            width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"
                            title="Fundaking Media office map"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</main>

<?php include 'includes/footer.php'; ?>