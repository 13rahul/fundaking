import fs from "node:fs";
const h = fs.readFileSync("../blog/index.html", "utf8");
const imgs = [...h.matchAll(/src="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => /blog|featured|post-|_astro/i.test(s));
console.log([...new Set(imgs)].slice(0, 50).join("\n"));
console.log("--- unique", new Set(imgs).size, "total", imgs.length);
console.log("has featured", h.includes("featured"));
console.log("blog-card", (h.match(/blog-card/g) || []).length);

const single = fs.readFileSync(
  "../blog/what-is-ai-seo-definition-2026/index.html",
  "utf8",
);
const simgs = [...single.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
console.log(
  "--- single",
  simgs.filter((s) => /featured|blog|post-|_astro.*\.(svg|webp|png)/i.test(s)).join("\n"),
);

const md = fs.readFileSync(
  "src/content/blog/what-is-ai-seo-definition-2026.md",
  "utf8",
);
console.log("md image", md.match(/^image:.*/m)?.[0]);
console.log(
  "file exists",
  fs.existsSync("public/images/blog/featured/what-is-ai-seo-definition-2026.svg"),
);
console.log(
  "root exists",
  fs.existsSync("../images/blog/featured/what-is-ai-seo-definition-2026.svg"),
);
