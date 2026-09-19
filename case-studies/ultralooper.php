<?php
$csSlug = 'ultralooper';
$challengeHtml = <<<'HTML'
        <p class="muted">UltraLooper is an AI agent platform with a workplace of apps around it. The product is dense: pre-trained agents, mail, docs, tasks, credits. A generic SaaS landing page would flatten that into “AI for marketing” and lose the actual offer.</p>
        <p class="muted">The site had to explain the fleet, the workspace, and how billing works — without making visitors read a white paper before they understand the product.</p>
HTML;
$approachHtml = <<<'HTML'
        <p class="muted">We designed the information architecture as a product story: what the agents do, how Ultra Workplace fits, then pricing. Content pages exist to answer evaluation questions, not to pad a blog.</p>
        <ul class="article-list muted">
            <li><strong>IA:</strong> agents, workplace apps, and credits as three legs of one product, not three microsites.</li>
            <li><strong>UI:</strong> a dark, high-contrast product aesthetic that can carry screenshots and comparison tables without collapsing.</li>
            <li><strong>Content:</strong> page types for the fleet, apps, and pricing so new agents can ship as pages, not one-off layouts.</li>
        </ul>
HTML;
$shippedHtml = <<<'HTML'
        <p class="muted">The live layer is <a href="https://ultralooper.com/" rel="noopener" target="_blank">ultralooper.com</a> — marketing and product web for the agent platform, including workplace and pricing surfaces. Copy and structure are part of the build; this is not a theme dropped on a feature list.</p>
        <p class="muted">Filed under <a href="/case-studies?tag=web-development">web development</a> and <a href="/case-studies?tag=content-development">content development</a>. If you are launching a product site with the same density, <a href="/#contact">book a call</a>.</p>
HTML;
include __DIR__ . '/../includes/case-study-post.php';
