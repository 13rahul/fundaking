import { cpSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const target = join(root, "..", "theme-preview");

if (!existsSync(dist)) {
  console.error("Run npm run build first (dist/ missing).");
  process.exit(1);
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}

cpSync(dist, target, { recursive: true });
console.log(`Copied build to ${target}`);
console.log("Open: http://localhost/fundaking/theme-preview/");
