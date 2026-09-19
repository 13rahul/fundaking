import { cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const target = join(root, "..");

/** Do not overwrite PHP app folders or source when merging the static build. */
const SKIP_NAMES = new Set([
  "automark-astro-main",
  "theme-preview",
  "includes",
  "case-studies",
  "assets",
  "data",
  "legacy-php",
  "node_modules",
  ".git",
  ".gemini",
]);

/** Never let Astro's generic .htaccess replace Fundaking rewrite rules. */
const SKIP_FILES = new Set([".htaccess"]);

if (!existsSync(dist)) {
  console.error("Run npm run build first (dist/ missing).");
  process.exit(1);
}

function copyMerge(srcDir, destDir) {
  for (const name of readdirSync(srcDir)) {
    const src = join(srcDir, name);
    const dest = join(destDir, name);

    if (destDir === target && SKIP_NAMES.has(name)) {
      console.log(`skip  ${name}/`);
      continue;
    }

    if (destDir === target && SKIP_FILES.has(name)) {
      console.log(`skip  ${name}`);
      continue;
    }

    const st = statSync(src);
    if (st.isDirectory()) {
      cpSync(src, dest, { recursive: true, force: true });
    } else {
      cpSync(src, dest, { force: true });
    }
  }
}

copyMerge(dist, target);

await import("./generate-theme-assets.mjs").catch((err) => {
  console.warn("theme-assets.php generation failed:", err.message);
});

console.log(`Merged Astro build into ${target}`);
console.log("Home: http://localhost/fundaking/");
console.log(
  "Note: blog/ and case-studies/ PHP folders were preserved; Astro uses /blog and /case-study.",
);
