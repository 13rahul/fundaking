<?php
/**
 * Location / city SEO page renderer.
 * Required: $cityName, $canonicalUrl, $metaTitle, $metaDesc, $heroTitle, $heroSub
 * Optional: $heroEyebrow, $localities (array), $faqs (array of [q,a]), $activePage, $extraBullets
 */
$cityName = $cityName ?? 'India';
$heroEyebrow = $heroEyebrow ?? ("SEO Consultant in " . $cityName);
$localities = $localities ?? [];
$faqs = $faqs ?? [];
$extraBullets = $extraBullets ?? [
    'Technical SEO audits & crawl fixes',
    'Content & topical authority systems',
    'Local / Maps SEO where relevant',
    'Monthly CEO-level advisory'
];
$navCtaText = $navCtaText ?? 'Book Free SEO Audit';
$navContactHref = $navContactHref ?? '#contact';
$activePage = $activePage ?? 'location';
$breadcrumbName = $breadcrumbName ?? ("SEO Consultant in " . $cityName);
$deliveryNote = $deliveryNote ?? ("Remote-first delivery from Pune with on-request travel to {$cityName}.");

$serviceSchema = [
    "@context" => "https://schema.org",
    "@type" => "Service",
    "serviceType" => "SEO Consulting",
    "name" => "SEO Consultant in " . $cityName,
    "provider" => [
        "@type" => "Person",
        "name" => "Rahul Agarwal",
        "url" => "https://fundaking.com/",
        "jobTitle" => "SEO Consultant"
    ],
    "areaServed" => [
        ["@type" => "City", "name" => $cityName],
        ["@type" => "Country", "name" => "India"]
    ],
    "description" => $metaDesc,
    "url" => $canonicalUrl
];

$breadcrumbSchema = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => [
        ["@type" => "ListItem", "position" => 1, "name" => "Home", "item" => "https://fundaking.com/"],
        ["@type" => "ListItem", "position" => 2, "name" => "SEO Consultant India", "item" => "https://fundaking.com/seo-consultant-india"],
        ["@type" => "ListItem", "position" => 3, "name" => $breadcrumbName, "item" => $canonicalUrl]
    ]
];

$faqSchema = null;
if (!empty($faqs)) {
    $faqSchema = [
        "@context" => "https://schema.org",
        "@type" => "FAQPage",
        "mainEntity" => array_map(function ($f) {
            return [
                "@type" => "Question",
                "name" => $f['q'],
                "acceptedAnswer" => ["@type" => "Answer", "text" => $f['a']]
            ];
        }, $faqs)
    ];
}

include __DIR__ . '/theme-header.php';
?>
<script type="application/ld+json"><?php echo json_encode($serviceSchema, JSON_UNESCAPED_SLASHES); ?></script>
<script type="application/ld+json"><?php echo json_encode($breadcrumbSchema, JSON_UNESCAPED_SLASHES); ?></script>
<?php if ($faqSchema): ?>
<script type="application/ld+json"><?php echo json_encode($faqSchema, JSON_UNESCAPED_SLASHES); ?></script>
<?php endif; ?>

<div class="theme-php-content">
    <?php
    $pageHeroEyebrow = $heroEyebrow;
    $pageHeroTitle = $heroTitle;
    $pageHeroSub = $heroSub;
    $pageHeroBullets = $extraBullets;
    $pageHeroPanelTitle = 'Why ' . $cityName . ' teams hire me';
    ob_start();
    ?>
    <p class="muted"><?php echo htmlspecialchars($deliveryNote, ENT_QUOTES, 'UTF-8'); ?></p>
    <div class="kpi">
        <div class="kpi-item"><div class="k">8y+</div><div class="small">Experience</div></div>
        <div class="kpi-item"><div class="k">+200%</div><div class="small">Organic growth cases</div></div>
        <div class="kpi-item"><div class="k">Pune</div><div class="small">HQ · India-wide</div></div>
        <div class="kpi-item"><div class="k">5</div><div class="small">Max active clients</div></div>
    </div>
    <p class="small" style="margin-top:16px">Also see the
        <a href="<?php echo fk_url('/'); ?>">SEO consultant in Pune</a> home base and
        <a href="<?php echo fk_url('/seo-consultant-india'); ?>">India hub</a>.</p>
    <?php
    $pageHeroPanelHtml = ob_get_clean();
    if (!empty($localities)) {
        $pageHeroFootHtml = '<p class="page-hero-showcase__areas"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> Serving: '
            . htmlspecialchars(implode(' · ', $localities), ENT_QUOTES, 'UTF-8') . '</p>';
    }
    include __DIR__ . '/page-hero-showcase.php';
    ?>

    <section class="section container">
        <h2>SEO services for <?php echo htmlspecialchars($cityName); ?> businesses</h2>
        <div class="grid-3 reveal">
            <div class="card">
                <h4>Technical SEO</h4>
                <p class="muted">Crawl, indexation, CWV, JS rendering, schema — the blockers agencies miss.
                    <a href="/technical-seo-consultant" style="color:var(--accent-2)">Technical SEO →</a></p>
            </div>
            <div class="card">
                <h4>Local SEO</h4>
                <p class="muted">Maps, Local Pack, citations and reviews for service businesses in <?php echo htmlspecialchars($cityName); ?>.
                    <a href="/local-seo-consultant" style="color:var(--accent-2)">Local SEO →</a></p>
            </div>
            <div class="card">
                <h4>Ecommerce & SaaS</h4>
                <p class="muted">Product architecture, category clusters, B2B demand gen.
                    <a href="/ecommerce-seo-consultant" style="color:var(--accent-2)">Ecommerce</a> ·
                    <a href="/saas-seo-consultant" style="color:var(--accent-2)">SaaS</a></p>
            </div>
        </div>
    </section>

    <?php if (!empty($cityBodyHtml)): ?>
    <section class="section container article-body">
        <?php echo $cityBodyHtml; ?>
    </section>
    <?php endif; ?>

    <?php if (!empty($faqs)): ?>
    <section class="section container">
        <h2 style="text-align:center;margin-bottom:40px">FAQs — SEO consultant in <?php echo htmlspecialchars($cityName); ?></h2>
        <div class="faq-list reveal">
            <?php foreach ($faqs as $f): ?>
            <details class="faq-item">
                <summary><?php echo htmlspecialchars($f['q']); ?></summary>
                <p class="muted"><?php echo htmlspecialchars($f['a']); ?></p>
            </details>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <section id="contact" class="section container" style="margin-bottom:60px">
        <h2>Work with an SEO consultant for <?php echo htmlspecialchars($cityName); ?></h2>
        <p class="muted" style="text-align:center;max-width:700px;margin:0 auto 40px">Book a free 30-minute strategy call.
            HQ in Pune · serving <?php echo htmlspecialchars($cityName); ?> remotely and on-site when needed.</p>
        <div style="display:grid;grid-template-columns:1fr 440px;gap:30px">
            <div>
                <iframe src="https://ultralooper.com/book/rahul-agarwal?embed=1" style="width:100%;min-height:680px;border:1px solid rgba(148,163,184,0.45);border-radius:12px;background:#fff" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" scrolling="no"></iframe>
            </div>
            <aside class="panel">
                <h3>Quick Contact</h3>
                <div style="margin-top:24px;display:flex;flex-direction:column;gap:16px">
                    <a class="cta-btn secondary" href="mailto:consult@fundaking.com"><i class="fas fa-envelope"></i> Email</a>
                    <a class="cta-btn" style="background:#25D366;color:white" href="https://wa.me/918421053710"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <a class="cta-btn secondary" href="tel:+918421053710"><i class="fas fa-phone"></i> Call</a>
                    <a class="cta-btn secondary" href="/seo-consulting-services">SEO consulting services</a>
                </div>
            </aside>
        </div>
    </section>
</div>
<a class="sticky-cta" href="#contact"><span>Book Free Audit</span></a>
<?php include __DIR__ . '/theme-footer.php'; ?>
