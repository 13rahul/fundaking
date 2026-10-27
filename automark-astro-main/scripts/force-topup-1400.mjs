import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const TARGET = 1400;

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  return {
    fm: m[1],
    body: m[2],
    draft: /^draft:\s*true/m.test(m[1]),
    title: m[1].match(/^title:\s*"(.*)"/m)?.[1] ?? "",
  };
}
function wc(body) {
  return body
    .replace(/<figure[\s\S]*?<\/figure>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function padBlock(title, n) {
  return `
<!-- fk-force-topup-${n} -->

## Field notes ${n}: applying “${title}” with a small team

Indian founding teams usually have one marketer wearing five hats. For “${title},” that means you cannot boil the ocean. Pick the single revenue URL this article supports, fix crawl and facts first, then ship one scannable asset (table, checklist, or FAQ) that sales can send after a call.

I recommend a shared Notion or Sheet with: URL, owner, due date, status, and the KPI you expect to move. Review it in the same weekly meeting where you review pipeline — not a separate “SEO theatre” call. If engineering is blocked, write the ticket with acceptance criteria (status code, visible copy, schema match) so the PR can be reviewed without another discovery call.

When you outgrow DIY prioritization, bring a consultant for roadmap and QA while your team executes — that hybrid is how most Fundaking [SEO consulting](/seo-consulting-services) engagements run from Pune and Baramati for clients across India.
`;
}

let n = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "-index.md")) {
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const post = parse(raw);
  if (!post || post.draft) continue;
  let body = post.body;
  let round = 1;
  while (wc(body) < TARGET && round <= 5) {
    if (!body.includes(`<!-- fk-force-topup-${round} -->`)) {
      body = body.trimEnd() + padBlock(post.title, round);
    }
    round++;
    if (round > 5) break;
  }
  if (body !== post.body) {
    fs.writeFileSync(path.join(blogDir, file), `---\n${post.fm}\n---\n${body.trim()}\n`, "utf8");
    n++;
  }
}
console.log(`[force-topup-1400] Updated ${n} posts`);
