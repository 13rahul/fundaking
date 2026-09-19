<?php
$csSlug = 'collegeastra';
$challengeHtml = <<<'HTML'
        <p class="muted">Students shortlisting colleges do not browse the way a brochure is written. They filter: city, specialisation, institution type, entrance exam, fees. CollegeAstra needed a product that matches that behaviour, not a marketing page with a PDF buried in the footer.</p>
        <p class="muted">That only works if college records are structured. A directory without a content model becomes a pile of inconsistent pages that cannot be filtered, compared, or expanded to new cities.</p>
HTML;
$approachHtml = <<<'HTML'
        <p class="muted">We designed the platform around locations and filters, then built the content model those pages sit on. Each college is a record with the fields the UI actually queries — not a free-text blob.</p>
        <ul class="article-list muted">
            <li><strong>UX:</strong> city landings and filter chips that match how students compare campuses.</li>
            <li><strong>Content system:</strong> structured college data so new listings inherit the same fields and templates.</li>
            <li><strong>Build:</strong> the public site at collegeastra.com, including location routes such as Chhatrapati Sambhajinagar / Aurangabad.</li>
        </ul>
HTML;
$shippedHtml = <<<'HTML'
        <p class="muted"><a href="https://collegeastra.com/" rel="noopener" target="_blank">CollegeAstra.com</a> is the live discovery layer: browse by location, then narrow by specialisation, type, exam, and fees. The content architecture is what lets that catalogue grow without a redesign.</p>
        <p class="muted">Tagged as both <a href="/case-studies?tag=web-development">web development</a> and <a href="/case-studies?tag=content-development">content development</a> because the UI only works if the records behind it are clean. Need a directory or catalogue like this? <a href="/#contact">Talk to us</a>.</p>
HTML;
include __DIR__ . '/../includes/case-study-post.php';
