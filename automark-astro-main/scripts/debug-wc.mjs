import fs from "node:fs";
const raw = fs.readFileSync(
  "src/content/blog/javascript-rendering-and-ai-crawlers.md",
  "utf8",
);
console.log("has CRLF", raw.includes("\r\n"));
const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
console.log("parsed", !!m, "bodyLen", m?.[2]?.length);
const body = m ? m[2] : raw;
const clean = body
  .replace(/<figure[\s\S]*?<\/figure>/g, " ")
  .replace(/<!--[\s\S]*?-->/g, " ");
const words = clean.split(/\s+/).filter(Boolean);
console.log("words", words.length);
console.log("first20", words.slice(0, 20).join("|"));
console.log("last20", words.slice(-20).join("|"));
