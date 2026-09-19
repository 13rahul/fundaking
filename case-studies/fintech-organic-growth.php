<?php
$csSlug = 'fintech-organic-growth';
$challengeHtml = <<<'HTML'
        <p class="muted">The site had thousands of URLs competing with each other. Index bloat diluted crawl budget, and keyword targeting was spread across thin pages that never had a chance to rank for investor-intent queries.</p>
        <p class="muted">Leadership wanted traffic, but the real leak was structural: low-quality pages kept receiving internal links that should have gone to a handful of commercial silos.</p>
HTML;
$approachHtml = <<<'HTML'
        <p class="muted">We audited 5,000+ URLs, then treated pruning as a ranking project — not a housekeeping ticket. Roughly 40% of low-quality content came off the index so remaining pages could consolidate equity.</p>
        <ul class="article-list muted">
            <li><strong>Technical prune:</strong> removed 2,000+ zombie pages and redirected where a successor existed.</li>
            <li><strong>Content silos:</strong> topic clusters for personal loans and investments, with a hub-and-spoke internal-link map.</li>
            <li><strong>Schema:</strong> aggregate rating and FAQ markup on the pages that already converted.</li>
        </ul>
        <p class="muted">Measurement lived in Search Console, not vanity dashboards. See how this sits inside <a href="/technical-seo-consultant">technical SEO consulting</a> and <a href="/seo-consulting-services">ongoing advisory</a>.</p>
HTML;
$shippedHtml = <<<'HTML'
        <p class="muted">A cleaner index, fewer competing URLs, and silos that match how people actually search for finance products. Clicks rose 57%, impressions 29%, CTR 21%, and average position improved 18% across the 6-month window.</p>
        <p class="muted">This is an SEO programme, not a redesign. The pages that stayed got the links, the schema, and the briefs. The rest stopped wasting crawl.</p>
HTML;
include __DIR__ . '/../includes/case-study-post.php';
