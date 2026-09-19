<?php
/**
 * Niche service page renderer.
 * Required: $nicheName, $canonicalUrl, $metaTitle, $metaDesc, $heroTitle, $heroSub, $services (array of [title,text])
 * Optional: $faqs, $activePage, $heroEyebrow, $relatedLinks
 */
$navCtaText = $navCtaText ?? 'Book Free SEO Audit';
$navContactHref = $navContactHref ?? '#contact';
$activePage = $activePage ?? 'niche';
$heroEyebrow = $heroEyebrow ?? $nicheName;
$faqs = $faqs ?? [];
$services = $services ?? [];
$relatedLinks = $relatedLinks ?? [];

$serviceSchema = [
    "@context" => "https://schema.org",
    "@type" => "Service",
    "serviceType" => $nicheName,
    "provider" => ["@type" => "Person", "name" => "Rahul Agarwal", "url" => "https://fundaking.com/"],
    "areaServed" => [["@type" => "Country", "name" => "India"]],
    "description" => $metaDesc,
    "url" => $canonicalUrl
];
$breadcrumbSchema = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => [
        ["@type" => "ListItem", "position" => 1, "name" => "Home", "item" => "https://fundaking.com/"],
        ["@type" => "ListItem", "position" => 2, "name" => $nicheName, "item" => $canonicalUrl]
    ]
];
$faqSchema = null;
if ($faqs) {
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
<?php if ($faqSchema): ?><script type="application/ld+json"><?php echo json_encode($faqSchema, JSON_UNESCAPED_SLASHES); ?></script><?php endif; ?>

<div class="theme-php-content">
    <?php
    $pageHeroEyebrow = $heroEyebrow;
    $pageHeroTitle = $heroTitle;
    $pageHeroSub = $heroSub;
    $pageHeroPanelHtml = '<p class="muted">Pune-based · serving brands across India. Senior strategy, capped client load, revenue-first roadmaps.</p>'
        . '<p class="small" style="margin-top:12px"><a href="' . fk_url('/') . '">SEO consultant in Pune</a> · '
        . '<a href="' . fk_url('/seo-consultant-india') . '">India</a></p>';
    include __DIR__ . '/page-hero-showcase.php';
    ?>

    <?php if ($services): ?>
    <section class="section container">
        <h2>What I deliver</h2>
        <div class="grid-3 reveal">
            <?php foreach ($services as $s): ?>
            <div class="card">
                <h4><?php echo htmlspecialchars($s['title']); ?></h4>
                <p class="muted"><?php echo htmlspecialchars($s['text']); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <?php if (!empty($nicheBodyHtml)): ?>
    <section class="section container article-body"><?php echo $nicheBodyHtml; ?></section>
    <?php endif; ?>

    <?php if ($relatedLinks): ?>
    <section class="section container">
        <h2>Related services</h2>
        <div class="outcomes reveal">
            <?php foreach ($relatedLinks as $href => $label): ?>
            <a class="outcome" href="<?php echo htmlspecialchars($href); ?>" style="text-decoration:none;color:inherit"><?php echo htmlspecialchars($label); ?></a>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <?php if ($faqs): ?>
    <section class="section container">
        <h2 style="text-align:center;margin-bottom:40px">FAQs</h2>
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
        <h2>Book <?php echo htmlspecialchars($nicheName); ?></h2>
        <p class="muted" style="text-align:center;max-width:700px;margin:0 auto 40px">Free 30-minute strategy call. No long contracts.</p>
        <div style="display:grid;grid-template-columns:1fr 440px;gap:30px">
            <iframe src="https://ultralooper.com/book/rahul-agarwal?embed=1" style="width:100%;min-height:680px;border:1px solid rgba(148,163,184,0.45);border-radius:12px;background:#fff" loading="lazy"></iframe>
            <aside class="panel">
                <h3>Quick Contact</h3>
                <div style="margin-top:24px;display:flex;flex-direction:column;gap:16px">
                    <a class="cta-btn secondary" href="mailto:consult@fundaking.com"><i class="fas fa-envelope"></i> Email</a>
                    <a class="cta-btn" style="background:#25D366;color:white" href="https://wa.me/918421053710"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                </div>
            </aside>
        </div>
    </section>
</div>
<a class="sticky-cta" href="#contact"><span>Book Free Audit</span></a>
<?php include __DIR__ . '/theme-footer.php'; ?>
