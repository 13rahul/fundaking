<?php
$csSlug = 'real-group';
$challengeHtml = <<<'HTML'
        <p class="muted">Real Group needed a corporate website that reads as one organisation. Visitors who land cold should understand the group, find the relevant business, and know how to get in touch — without hunting through files.</p>
        <p class="muted">The risk with group sites is an org-chart homepage: every entity shouting at once, no story, no path. We planned against that.</p>
HTML;
$approachHtml = <<<'HTML'
        <p class="muted">Information architecture came first. We mapped the questions outsiders actually ask — who you are, what you do, where you operate, how to contact you — then designed a visual system that feels corporate without going sterile.</p>
        <ul class="article-list muted">
            <li><strong>IA:</strong> group narrative, business areas, and a single contact pattern.</li>
            <li><strong>UI:</strong> hierarchy with type and space, not a wall of equal-weight boxes.</li>
            <li><strong>Build:</strong> a maintainable frontend so the team can update the story without a redesign every quarter.</li>
        </ul>
HTML;
$shippedHtml = <<<'HTML'
        <p class="muted">A designed and developed corporate site: clear group story, routes into the businesses, and an enquiry path. We are not publishing a live URL here so the wrong “Real Group” does not get the credit.</p>
        <p class="muted">This is a <a href="/case-studies?tag=web-development">web development</a> case — structure, design, and engineering — not an SEO experiment. For a similar corporate build, <a href="/#contact">book a call</a>.</p>
HTML;
include __DIR__ . '/../includes/case-study-post.php';
