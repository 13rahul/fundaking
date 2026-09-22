/**
 * Merge site.base_url + site.base_path from config.local.json or config.production.json
 * into src/config/config.json before build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "src/config/config.json");
const mode = process.argv[2] || "production";
const overlayPath = path.join(
  root,
  `src/config/config.${mode === "local" ? "local" : "production"}.json`,
);

if (!fs.existsSync(overlayPath)) {
  console.error(`[apply-site-config] Missing ${overlayPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const overlay = JSON.parse(fs.readFileSync(overlayPath, "utf8"));
if (overlay.site) {
  config.site = { ...config.site, ...overlay.site };
}
fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
console.log(
  `[apply-site-config] ${mode} → base_path=${config.site.base_path} base_url=${config.site.base_url}`,
);
