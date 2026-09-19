import { visit } from "unist-util-visit";

/** Prefix root-relative asset URLs in markdown HTML (img, a) with Astro base path. */
export function rehypeBasePath(basePath = "/") {
  const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const prefix = base === "" || base === "/" ? "" : base;

  return (tree) => {
    if (!prefix) return;
    visit(tree, "element", (node) => {
      if (!node.properties?.src) return;
      const src = String(node.properties.src);
      if (
        src.startsWith("/") &&
        !src.startsWith("//") &&
        !src.startsWith(prefix + "/")
      ) {
        node.properties.src = `${prefix}${src}`;
      }
    });
  };
}
