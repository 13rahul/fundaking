/**
 * Generates two content-specific SVG infographics per blog post and embeds them in markdown.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const blogDir = path.join(root, "src/content/blog");
const outDir = path.join(root, "public/images/infographics/blog");
const configPath = path.join(root, "src/config/config.json");
const siteBase =
  JSON.parse(fs.readFileSync(configPath, "utf8")).site.base_path || "/";

function assetSrc(relativePath) {
  const base = siteBase.endsWith("/") ? siteBase.slice(0, -1) : siteBase;
  if (!base || base === "/") return relativePath;
  return `${base}${relativePath}`;
}

/** eWebGuru-style canvas (see fundaking/ewebguru-blog/*.svg) */
const W = 1152;
const H = 864;
const BG = "#071A2B";
const FONT = "Segoe UI, Helvetica, Arial, sans-serif";
const ACCENT = "#937AFF";
const TEAL = "#3EC6D4";
const LOGO = "#4D36D0";
const TEXT = "#FFFFFF";
const MUTED = "#A8C0D0";
const DIVIDER = "#1A4A5C";
const FOOT = "#7FA3B8";

function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripMd(str = "") {
  return str
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function truncate(str, max) {
  const s = stripMd(str);
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { fm: {}, fmBlock: "", body: raw };
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    fm[kv[1]] = val;
  }
  fm.draft = /^draft:\s*true\s*$/m.test(m[1]);
  return { fm, fmBlock: m[0].slice(0, m[0].indexOf(m[2])), body: m[2] };
}

function getCategory(fmText, fm) {
  const arr = fmText.match(/categories:\s*\n\s*-\s*"([^"]+)"/);
  if (arr) return arr[1];
  const inline = fmText.match(/categories:\s*\["([^"]+)"/);
  if (inline) return inline[1];
  return fm.tag || "Blog";
}

function extractH2(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((x) => stripMd(x[1]));
}

function extractNumberedSections(body) {
  const items = [];
  for (const m of body.matchAll(/^\*\*(\d+)\.\s+([^*]+)\*\*/gm)) {
    items.push(stripMd(m[2]));
  }
  return items.slice(0, 6);
}

function extractFirstBulletList(body) {
  return extractAllBullets(body).slice(0, 6);
}

function extractAllBullets(body) {
  const source = bodyForInfographics(body);
  const items = [];
  for (const line of source.split("\n")) {
    if (/^<!--\s*fk-expanded/i.test(line)) break;
    const bullet = line.match(/^[\s]*[-*]\s+(.+)/);
    if (bullet) items.push(stripMd(bullet[1]));
  }
  return items;
}

function extractFirstTable(body) {
  const lines = body.split("\n");
  const rows = [];
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].includes("|")) continue;
    if (lines[i].match(/^\|\s*[-:| ]+\|/)) continue;
    const cells = lines[i]
      .split("|")
      .map((c) => stripMd(c))
      .filter(Boolean);
    if (cells.length >= 2) rows.push(cells);
    if (rows.length >= 6) break;
  }
  return rows.length >= 2 ? rows : null;
}

function extractStats(body) {
  const found = new Set();
  const patterns = [
    /\b(\d{1,3}(?:\.\d+)?%)/g,
    /\b(₹[\d,]+(?:\s*(?:crore|Cr|lakh))?)/gi,
    /\b(\+\d{1,3}%)/g,
  ];
  for (const re of patterns) {
    for (const m of body.matchAll(re)) found.add(m[1]);
  }
  return [...found].slice(0, 4);
}

function bodyForInfographics(body) {
  const cut = body.indexOf("<!-- fk-expanded");
  return cut > 0 ? body.slice(0, cut) : body;
}

/** Rich rows: label, headline, detail (eWebGuru stack layout). */
function extractSectionRows(body, category) {
  const source = bodyForInfographics(body);
  const chunks = source.split(/^##\s+/m).slice(1);
  const rows = [];
  for (const chunk of chunks) {
    if (/fk-expanded/i.test(chunk)) continue;
    const lines = chunk.trim().split("\n");
    const heading = stripMd(lines[0] || "");
    if (!heading) continue;
    const rest = lines.slice(1).join("\n");
    const h3 = [...rest.matchAll(/^###\s+(.+)$/gm)].map((m) => stripMd(m[1]));
    const bullets = [...rest.matchAll(/^[\s]*[-*]\s+(.+)/gm)].map((m) =>
      stripMd(m[1]),
    );
    const para = stripMd(
      rest
        .replace(/^[\s]*[-*].+$/gm, "")
        .replace(/^###.+$/gm, "")
        .split("\n\n")[0]
        .replace(/\n/g, " "),
    );
    const detailSource =
      bullets.length >= 2
        ? bullets.slice(0, 2).join(" · ")
        : bullets[0] ||
          (h3[0] ? `${h3[0]}${h3[1] ? ` · ${h3[1]}` : ""}` : "") ||
          para ||
          "Expanded in the article — examples and steps below.";
    const labelBit = h3[0] ? truncate(h3[0], 22) : `Part ${rows.length + 1}`;
    rows.push({
      label: truncate(`${labelBit} · ${category}`, 34),
      headline: truncate(heading, 72),
      detail: truncate(detailSource, 130),
    });
    if (rows.length >= 4) break;
  }
  return rows;
}

function rowsFromBullets(bullets, category) {
  return bullets.slice(0, 4).map((b, i) => ({
    label: truncate(`Part ${i + 1} · ${category}`, 32),
    headline: truncate(b, 72),
    detail: truncate(
      bullets[i + 1] || "Action item from this guide — see the post for execution detail.",
      130,
    ),
  }));
}

function rowsFromTable(table) {
  return table.slice(1, 5).map((row, i) => ({
    label: truncate(row[0] || `Row ${i + 1}`, 34),
    headline: truncate(row[1] || row[0] || "Detail", 72),
    detail: truncate(
      row[2] || row.slice(2).join(" · ") || row[1] || "See full table in article.",
      130,
    ),
  }));
}

function svgShellStart() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <g fill="none" stroke="${ACCENT}" stroke-width="2" opacity="0.55" stroke-linecap="round">
    <path d="M980 36 l40 -8 m8 4 l28 -6"/>
    <path d="M1020 52 l36 -6"/>
    <circle cx="1072" cy="28" r="3" fill="${ACCENT}" stroke="none"/>
    <circle cx="1104" cy="44" r="2.5" fill="${TEAL}" stroke="none"/>
  </g>
  <rect x="56" y="40" width="44" height="44" rx="8" fill="${LOGO}"/>
  <text x="68" y="68" fill="${TEXT}" font-family="${FONT}" font-size="18" font-weight="800">FK</text>
  <text x="112" y="62" fill="${TEXT}" font-family="${FONT}" font-size="26" font-weight="800">Fundaking <tspan fill="${ACCENT}">Media</tspan></text>
  <text x="112" y="82" fill="${ACCENT}" font-family="${FONT}" font-size="11">SEO · LLM visibility · Pune</text>`;
}

function svgTitle(main, sub) {
  return `
  <text x="${W / 2}" y="150" text-anchor="middle" fill="${TEXT}" font-family="${FONT}" font-size="34" font-weight="800">${escapeXml(truncate(main, 64))}</text>
  <text x="${W / 2}" y="186" text-anchor="middle" fill="${MUTED}" font-family="${FONT}" font-size="18">${escapeXml(truncate(sub, 90))}</text>`;
}

function svgFooterLine(slug, note) {
  return `
  <text x="${W / 2}" y="828" text-anchor="middle" fill="${FOOT}" font-family="${FONT}" font-size="14">${escapeXml(note)} · fundaking.com/blog/${escapeXml(slug)}</text>
</svg>`;
}

/** Fig 1 — stacked spec sheet (eWebGuru “four carts” pattern). */
function buildStackInfographic(slug, title, subtitle, rows, extraFooter = "") {
  let svg = svgShellStart() + svgTitle(title, subtitle);
  svg += `\n  <rect x="72" y="216" width="1008" height="560" rx="18" fill="none" stroke="${TEAL}" stroke-width="2.5"/>`;
  svg += `\n  <g font-family="${FONT}">`;
  let y = 268;
  const slice = rows.length ? rows : [{ label: "Guide", headline: title, detail: subtitle }];
  slice.slice(0, 4).forEach((row, i) => {
    svg += `\n    <text x="104" y="${y}" fill="${TEAL}" font-size="15" font-weight="700">${escapeXml(row.label)}</text>`;
    svg += `\n    <text x="104" y="${y + 28}" fill="${TEXT}" font-size="22" font-weight="700">${escapeXml(row.headline)}</text>`;
    svg += `\n    <text x="104" y="${y + 54}" fill="${MUTED}" font-size="15">${escapeXml(row.detail || "See the section below for detail.")}</text>`;
    y += 88;
    if (i < slice.length - 1) {
      svg += `\n    <line x1="104" y1="${y - 14}" x2="1048" y2="${y - 14}" stroke="${DIVIDER}" stroke-width="1"/>`;
    }
  });
  if (extraFooter) {
    y += 24;
    svg += `\n    <line x1="104" y1="${y - 8}" x2="1048" y2="${y - 8}" stroke="${DIVIDER}" stroke-width="1"/>`;
    svg += `\n    <text x="104" y="${y + 16}" fill="${ACCENT}" font-size="16" font-weight="700">Numbers from this article</text>`;
    svg += `\n    <text x="104" y="${y + 44}" fill="${TEXT}" font-size="16">${escapeXml(extraFooter)}</text>`;
  } else if (slice.length <= 2) {
    svg += `\n    <text x="104" y="${y + 20}" fill="${ACCENT}" font-size="16" font-weight="700">Read the full article for step-by-step execution.</text>`;
  }
  svg += `\n  </g>`;
  svg += svgFooterLine(slug, "Infographic 1 — key sections from this post");
  return svg;
}

/** Fig 2 — dual panel comparison (eWebGuru “like-for-like” pattern). */
function buildSplitInfographic(
  slug,
  title,
  subtitle,
  leftTitle,
  leftBlocks,
  rightTitle,
  rightBlocks,
) {
  let svg = svgShellStart() + svgTitle(title, subtitle);
  const panel = (x, label, blocks) => {
    let g = `\n  <rect x="${x}" y="214" width="488" height="520" rx="18" fill="none" stroke="${TEAL}" stroke-width="2.5"/>`;
    g += `\n  <text x="${x + 244}" y="258" text-anchor="middle" fill="${TEAL}" font-family="${FONT}" font-size="18" font-weight="700">${escapeXml(label)}</text>`;
    g += `\n  <g font-family="${FONT}" fill="${TEXT}">`;
    let yy = 310;
    for (const block of blocks.slice(0, 3)) {
      g += `\n    <text x="${x + 32}" y="${yy}" font-size="20" font-weight="700">${escapeXml(truncate(block.title, 42))}</text>`;
      let dy = 32;
      for (const line of block.lines.slice(0, 3)) {
        g += `\n    <text x="${x + 32}" y="${yy + dy}" font-size="16" fill="${line.highlight ? ACCENT : MUTED}">${escapeXml(truncate(line.text, 52))}</text>`;
        dy += 28;
      }
      yy += dy + 24;
    }
    g += `\n  </g>`;
    return g;
  };
  svg += panel(72, leftTitle, leftBlocks);
  svg += panel(592, rightTitle, rightBlocks);
  svg += `\n  <text x="${W / 2}" y="774" text-anchor="middle" fill="${TEXT}" font-family="${FONT}" font-size="16">Match intent first — then scale content and technical depth.</text>`;
  svg += svgFooterLine(slug, "Infographic 2 — comparison from this post");
  return svg;
}

function blocksFromTable(table) {
  const headerA = table[0][0];
  const headerB = table[0][1];
  const left = [];
  const right = [];
  const leftHints = [
    "SERP snippets, rankings, crawl budget",
    "Intent-mapped headings & internal links",
    "Authority signals search engines trust",
    "CTR and impression trends in GSC",
  ];
  const rightHints = [
    "Definitional lede AI can quote cleanly",
    "Headings that match real buyer questions",
    "Brand mentions & entity consistency",
    "Citation rate in ChatGPT / Perplexity tests",
  ];
  table.slice(1, 5).forEach((row, i) => {
    const trad = row[0] || "Point";
    const llm = row[1] || "Point";
    const extraL = row[2] && table[0].length <= 2 ? row[2] : null;
    const extraR = row[3] || null;
    left.push({
      title: truncate(trad, 42),
      lines: [
        {
          text: extraL || leftHints[i] || leftHints[0],
          highlight: false,
        },
      ],
    });
    right.push({
      title: truncate(llm, 42),
      lines: [
        {
          text: extraR || rightHints[i] || rightHints[0],
          highlight: true,
        },
      ],
    });
  });
  return { headerA, headerB, left, right };
}

function bulletToBlock(text, accentLine) {
  const s = stripMd(text);
  const colon = s.indexOf(":");
  if (colon > 8 && colon < 55) {
    return {
      title: truncate(s.slice(0, colon), 48),
      lines: [
        {
          text: truncate(s.slice(colon + 1).trim() || s, 52),
          highlight: accentLine,
        },
      ],
    };
  }
  const words = s.split(/\s+/);
  if (words.length > 8) {
    return {
      title: truncate(words.slice(0, 6).join(" "), 48),
      lines: [
        {
          text: truncate(words.slice(6).join(" "), 52),
          highlight: accentLine,
        },
      ],
    };
  }
  return {
    title: truncate(s, 48),
    lines: [{ text: accentLine ? "Priority this sprint" : "Validate in analytics", highlight: accentLine }],
  };
}

function blocksFromLists(bullets) {
  const half = Math.ceil(bullets.length / 2) || 1;
  const leftItems = bullets.slice(0, half);
  const rightItems = bullets.slice(half);
  return {
    left: leftItems.slice(0, 3).map((t) => bulletToBlock(t, true)),
    right: rightItems.slice(0, 3).map((t) => bulletToBlock(t, false)),
  };
}

function blocksFromSectionSplit(body, category) {
  const rows = extractSectionRows(body, category);
  if (rows.length < 2) return null;
  const mid = Math.ceil(rows.length / 2);
  const toBlocks = (sectionRows, accent) =>
    sectionRows.slice(0, 3).map((r) => ({
      title: truncate(r.headline, 42),
      lines: [{ text: truncate(r.detail, 52), highlight: accent }],
    }));
  return {
    leftTitle: truncate(rows[0].headline, 22),
    rightTitle: truncate(rows[mid]?.headline || "Next steps", 22),
    left: toBlocks(rows.slice(0, mid), false),
    right: toBlocks(rows.slice(mid), true),
  };
}

function buildFig1(slug, title, description, body, category, bullets, table) {
  let rows = extractSectionRows(body, category);
  if (rows.length < 2 && table?.length >= 3) rows = rowsFromTable(table);
  if (rows.length < 2) rows = rowsFromBullets(bullets, category);
  const stats = extractStats(bodyForInfographics(body));
  const statsLine =
    stats.length > 0 ? stats.join("  |  ") : "";
  return buildStackInfographic(
    slug,
    truncate(title, 56),
    truncate(description || "Practical SEO & AI visibility — Fundaking Media", 88),
    rows,
    truncate(statsLine, 110),
  );
}

function buildFig2(slug, title, description, table, bullets, numbered, body, category) {
  const sub = truncate(
    description || "Side-by-side takeaways from this article",
    88,
  );
  if (table && table.length >= 2) {
    const { headerA, headerB, left, right } = blocksFromTable(table);
    return buildSplitInfographic(
      slug,
      truncate(title, 48),
      sub,
      truncate(headerA, 24),
      left.length ? left : [{ title: headerA, lines: [{ text: "See article" }] }],
      truncate(headerB, 24),
      right.length ? right : [{ title: headerB, lines: [{ text: "See article" }] }],
    );
  }
  const sectionSplit = blocksFromSectionSplit(body, category);
  if (sectionSplit) {
    return buildSplitInfographic(
      slug,
      truncate(title, 48),
      sub,
      sectionSplit.leftTitle,
      sectionSplit.left,
      sectionSplit.rightTitle,
      sectionSplit.right,
    );
  }
  const allBullets = extractAllBullets(body);
  const items =
    numbered.length >= 4
      ? numbered
      : allBullets.length >= 4
        ? allBullets
        : bullets;
  const { left, right } = blocksFromLists(
    items.length ? items : ["Audit foundations", "Fix blockers", "Measure weekly"],
  );
  return buildSplitInfographic(
    slug,
    truncate(title, 48),
    sub,
    "Do first",
    left,
    "Track & refine",
    right,
  );
}

function figureBlock(slug, n, caption) {
  const alt = escapeXml(truncate(caption, 120));
  const src = assetSrc(`/images/infographics/blog/${slug}-${n}.svg`);
  return `<figure class="blog-infographic">
  <img src="${src}" alt="${alt}" width="1152" height="864" loading="lazy" />
  <figcaption><strong>Figure ${n}.</strong> ${caption}</figcaption>
</figure>`;
}

function injectFigures(body, slug, title, table) {
  const clean = body.replace(/<figure class="blog-infographic">[\s\S]*?<\/figure>\s*/g, "");
  const cap1 = `At-a-glance summary of this article’s main sections (Fundaking infographic).`;
  const cap2 = table
    ? `Side-by-side comparison pulled from the table in this post.`
    : `Implementation checklist vs measurement focus — from this article.`;
  const block = `\n${figureBlock(slug, 1, cap1)}\n\n${figureBlock(slug, 2, cap2)}\n\n`;
  const h2Matches = [...clean.matchAll(/^##\s+.+$/gm)];
  if (h2Matches.length >= 2) {
    const second = h2Matches[1];
    const afterSecond = second.index + second[0].length;
    const third = h2Matches[2];
    const insertAt = third ? third.index : clean.length;
    const sectionEnd = clean.slice(afterSecond, insertAt).trimEnd().length;
    const pos = afterSecond + sectionEnd;
    return clean.slice(0, pos) + block + clean.slice(pos);
  }
  const idx = clean.search(/^##\s/m);
  if (idx === -1) {
    const hr = clean.indexOf("\n---");
    const at = hr > 0 ? hr : clean.length;
    return clean.slice(0, at) + block + clean.slice(at);
  }
  return clean.slice(0, idx) + block + clean.slice(idx);
}

function processBlog(file) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const fmEnd = raw.indexOf("---", 4);
  const fmText = raw.slice(0, fmEnd + 4);
  const { fm, body } = parseFrontmatter(raw);
  const isDraft = fm.draft === true;

  const title = fm.title || fm.meta_title || slug;
  const category = getCategory(fmText, fm);
  const contentBody = bodyForInfographics(body);
  const bullets = extractFirstBulletList(contentBody);
  const numbered = extractNumberedSections(contentBody);
  const table = extractFirstTable(contentBody);
  const description = fm.description || fm.meta_title || "";

  const svg1 = buildFig1(
    slug,
    title,
    description,
    contentBody,
    category,
    bullets,
    table,
  );
  const svg2 = buildFig2(
    slug,
    title,
    description,
    table,
    bullets,
    numbered,
    contentBody,
    category,
  );

  fs.writeFileSync(path.join(outDir, `${slug}-1.svg`), svg1, "utf8");
  fs.writeFileSync(path.join(outDir, `${slug}-2.svg`), svg2, "utf8");

  const newBody = injectFigures(body, slug, title, table);
  const rebuilt = `${fmText}\n${newBody.trim()}\n`;
  fs.writeFileSync(path.join(blogDir, file), rebuilt, "utf8");

  return { slug, ok: true, draft: isDraft };
}

fs.mkdirSync(outDir, { recursive: true });
const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".md") && f !== "-index.md");

const results = files.map(processBlog);
const done = results.filter((r) => r.ok).length;
const drafts = results.filter((r) => r.draft).length;
console.log(
  `[generate-blog-infographics] ${done} posts (2 SVGs each), ${drafts} drafts SVG-only`,
);
