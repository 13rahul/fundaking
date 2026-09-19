<?php
/**
 * Case-study detail layout.
 * Set $csSlug plus $challengeHtml, $approachHtml, $shippedHtml before include.
 */
require_once __DIR__ . '/case-studies-data.php';

$study = fundaking_cs_get($csSlug ?? '');
if (!$study) {
    header('HTTP/1.1 404 Not Found');
    echo 'Case study not found.';
    exit;
}

$metaTitle = $study['metaTitle'];
$metaDesc = $study['metaDesc'];
$metaKeywords = $study['metaKeywords'] ?? 'case study, fundaking media';
$canonicalUrl = 'https://fundaking.com/case-studies/' . $study['slug'];
$ogTitle = $metaTitle;
$ogDesc = $metaDesc;
$activePage = 'case-studies';
$navCtaText = $navCtaText ?? 'Book a call';
$navContactHref = $navContactHref ?? '/#contact';

$tags = fundaking_cs_tag_labels($study['tags']);
$related = fundaking_cs_related($study['slug'], 3);
$kpiCount = max(1, count($study['kpis']));
$flip = !empty($study['flipSplit']);

$breadcrumbSchema = [
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => 'https://fundaking.com/'],
        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Case Studies', 'item' => 'https://fundaking.com/case-studies'],
        ['@type' => 'ListItem', 'position' => 3, 'name' => $study['title'], 'item' => $canonicalUrl],
    ],
];

$workSchema = [
    '@context' => 'https://schema.org',
    '@type' => 'CreativeWork',
    'name' => $study['title'],
    'headline' => $study['h1'],
    'description' => $metaDesc,
    'url' => $canonicalUrl,
    'mainEntityOfPage' => $canonicalUrl,
    'about' => array_values($tags),
    'author' => [
        '@type' => 'Person',
        'name' => 'Rahul Agarwal',
        'url' => 'https://fundaking.com/',
    ],
    'publisher' => [
        '@type' => 'Organization',
        'name' => 'Fundaking Media',
        'url' => 'https://fundaking.com/',
    ],
    'creator' => [
        '@type' => 'Organization',
        'name' => 'Fundaking Media',
        'url' => 'https://fundaking.com/',
    ],
];

include __DIR__ . '/theme-header.php';
?>
<script type="application/ld+json"><?php echo json_encode($breadcrumbSchema, JSON_UNESCAPED_SLASHES); ?></script>
<script type="application/ld+json"><?php echo json_encode($workSchema, JSON_UNESCAPED_SLASHES); ?></script>

<main>
    <article>
        <header class="cs-detail-hero container">
            <p class="cs-crumb">
                <a href="/">Home</a>
                <span class="cs-crumb__sep" aria-hidden="true">/</span>
                <a href="/case-studies">Case Studies</a>
                <span class="cs-crumb__sep" aria-hidden="true">/</span>
                <span><?php echo htmlspecialchars($study['client'], ENT_QUOTES, 'UTF-8'); ?></span>
            </p>
            <div class="cs-detail-tags">
                <?php foreach ($tags as $slug => $label): ?>
                <a class="cs-pill cs-pill--link" href="/case-studies?tag=<?php echo rawurlencode($slug); ?>"><?php echo htmlspecialchars($label, ENT_QUOTES, 'UTF-8'); ?></a>
                <?php endforeach; ?>
                <span class="cs-detail-meta"><?php echo htmlspecialchars($study['sector'], ENT_QUOTES, 'UTF-8'); ?> · <?php echo htmlspecialchars($study['duration'], ENT_QUOTES, 'UTF-8'); ?></span>
            </div>
            <h1 class="hero-title"><?php echo htmlspecialchars($study['h1'], ENT_QUOTES, 'UTF-8'); ?></h1>
            <p class="hero-sub"><?php echo htmlspecialchars($study['resultLine'], ENT_QUOTES, 'UTF-8'); ?></p>
            <div class="cs-detail-actions">
                <?php if (!empty($study['liveUrl'])): ?>
                <a class="cta-btn secondary" href="<?php echo htmlspecialchars($study['liveUrl'], ENT_QUOTES, 'UTF-8'); ?>" rel="noopener" target="_blank"><?php echo htmlspecialchars($study['liveLabel'] ?: 'View live site', ENT_QUOTES, 'UTF-8'); ?></a>
                <?php endif; ?>
                <a class="cta-btn" href="/#contact">Book a call</a>
            </div>
        </header>

        <section class="container cs-kpis cs-kpis--<?php echo (int) $kpiCount; ?>" aria-label="Outcomes">
            <?php foreach ($study['kpis'] as $kpi): ?>
            <div class="cs-kpi">
                <div class="cs-kpi__value"><?php echo htmlspecialchars($kpi['value'], ENT_QUOTES, 'UTF-8'); ?></div>
                <div class="cs-kpi__label"><?php echo htmlspecialchars($kpi['label'], ENT_QUOTES, 'UTF-8'); ?></div>
            </div>
            <?php endforeach; ?>
        </section>

        <section class="container cs-split<?php echo $flip ? ' cs-split--flip' : ''; ?>">
            <div class="cs-split__copy">
                <h2>The challenge</h2>
                <?php echo $challengeHtml; ?>
            </div>
            <figure class="cs-split__visual">
                <?php echo fundaking_cs_render_media($study, true); ?>
            </figure>
        </section>

        <section class="container cs-split cs-split--alt<?php echo $flip ? '' : ' cs-split--flip'; ?>">
            <div class="cs-split__copy">
                <h2>The approach</h2>
                <?php echo $approachHtml; ?>
            </div>
            <div class="cs-split__visual cs-scope-panel">
                <h3 class="cs-scope-heading">Scope</h3>
                <ul class="cs-scope">
                    <?php foreach ($study['scope'] as $item): ?>
                    <li><?php echo htmlspecialchars($item, ENT_QUOTES, 'UTF-8'); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </section>

        <section class="container cs-shipped">
            <h2>What we shipped</h2>
            <?php echo $shippedHtml; ?>
        </section>
    </article>

    <?php if ($related): ?>
    <section class="container cs-related" aria-labelledby="cs-related-heading">
        <h2 id="cs-related-heading">Related case studies</h2>
        <div class="cs-related-grid">
            <?php foreach ($related as $item): ?>
            <?php echo fundaking_cs_render_card($item); ?>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <section class="container cs-detail-cta">
        <p class="muted">I’m Rahul Agarwal — <a href="/">SEO consultant in Pune</a> and the builder behind these sites, serving brands across <a href="/seo-consultant-india">India</a>.</p>
        <h2>Build the next one with us</h2>
        <a class="cta-btn" href="/#contact">Book a call</a>
    </section>
</main>
<?php include __DIR__ . '/theme-footer.php'; ?>
