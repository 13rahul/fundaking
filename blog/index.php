<?php
/** Legacy listing — Astro blog is canonical at /blog */
require_once __DIR__ . '/../includes/site-base.php';
header('Location: ' . fk_url('/blog'), true, 301);
exit;
