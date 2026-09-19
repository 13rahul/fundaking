import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src/content/blog");
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".md") || f === "-index.md") continue;
  const file = path.join(dir, f);
  let t = fs.readFileSync(file, "utf8");
  t = t.replace(/author: "Search Insights Desk"/g, 'author: "Rahul Agarwal"');
  if (!t.includes("author_title:") && t.includes('author: "Rahul Agarwal"')) {
    t = t.replace(
      /author: "Rahul Agarwal"\r?\n/,
      'author: "Rahul Agarwal"\nauthor_title: "Founder, Fundaking Media"\n',
    );
  }
  t = t.replace(
    /author_image: "\/images\/avatar.png"/g,
    'author_image: "/images/og-image.png"',
  );
  fs.writeFileSync(file, t);
  console.log("updated", f);
}
