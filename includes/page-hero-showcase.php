<?php
/**
 * Compact showcase hero for inner pages.
 * Set $pageHeroEyebrow, $pageHeroTitle, $pageHeroSub before include.
 * Optional: $pageHeroBullets (string[]), $pageHeroPrimaryLabel, $pageHeroPanelHtml, $showPageHeroPanel
 */
$pageHeroEyebrow = $pageHeroEyebrow ?? 'Fundaking Media';
$pageHeroTitle = $pageHeroTitle ?? '';
$pageHeroSub = $pageHeroSub ?? '';
$pageHeroBullets = $pageHeroBullets ?? [];
$pageHeroPrimaryLabel = $pageHeroPrimaryLabel ?? 'Get free SEO audit';
$pageHeroSecondaryLabel = $pageHeroSecondaryLabel ?? 'WhatsApp';
$showPageHeroPanel = $showPageHeroPanel ?? true;
$pageHeroPanelTitle = $pageHeroPanelTitle ?? 'Independent SEO consulting';
$pageHeroPanelHtml = $pageHeroPanelHtml ?? '<p class="muted">Pune-based · serving brands across India. Senior strategy, capped client load, revenue-first roadmaps.</p>';
$pageHeroFootHtml = $pageHeroFootHtml ?? '';
?>
<section class="page-hero-showcase">
    <div class="hero-showcase__mesh" aria-hidden="true"></div>
    <div class="container page-hero-showcase__grid">
        <div class="page-hero-showcase__copy">
            <p class="hero-glass-pill">
                <i class="fas fa-arrow-trend-up" aria-hidden="true"></i>
                <?php echo htmlspecialchars($pageHeroEyebrow, ENT_QUOTES, 'UTF-8'); ?>
            </p>
            <h1 class="page-hero-showcase__title"><?php echo htmlspecialchars($pageHeroTitle, ENT_QUOTES, 'UTF-8'); ?></h1>
            <?php if ($pageHeroSub !== ''): ?>
            <div class="page-hero-showcase__sub"><?php echo $pageHeroSub; ?></div>
            <?php endif; ?>
            <?php if (!empty($pageHeroBullets)): ?>
            <ul class="page-hero-showcase__bullets">
                <?php foreach ($pageHeroBullets as $bullet): ?>
                <li><?php echo htmlspecialchars($bullet, ENT_QUOTES, 'UTF-8'); ?></li>
                <?php endforeach; ?>
            </ul>
            <?php endif; ?>
            <div class="hero-actions hero-actions--showcase">
                <a class="cta-btn" href="#contact"><?php echo htmlspecialchars($pageHeroPrimaryLabel, ENT_QUOTES, 'UTF-8'); ?></a>
                <a class="cta-btn secondary" href="https://wa.me/918421053710"><?php echo htmlspecialchars($pageHeroSecondaryLabel, ENT_QUOTES, 'UTF-8'); ?></a>
            </div>
            <?php if ($pageHeroFootHtml !== ''): ?>
            <div class="page-hero-showcase__foot"><?php echo $pageHeroFootHtml; ?></div>
            <?php endif; ?>
        </div>
        <?php if ($showPageHeroPanel): ?>
        <aside class="page-hero-showcase__panel reveal">
            <h2 class="page-hero-showcase__panel-title"><?php echo htmlspecialchars($pageHeroPanelTitle, ENT_QUOTES, 'UTF-8'); ?></h2>
            <?php echo $pageHeroPanelHtml; ?>
        </aside>
        <?php endif; ?>
    </div>
</section>
