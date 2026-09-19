/** Prefix internal paths with Astro `base` (e.g. /fundaking locally, / in production). */
export function withBase(path: string): string {
  if (
    !path ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  let base = import.meta.env.BASE_URL || "/";
  if (base !== "/") {
    base = base.replace(/\/+$/, "");
  }

  const segment = path.startsWith("/") ? path : `/${path}`;
  if (base === "/" || base === "") {
    return segment.replace(/([^:]\/)\/+/g, "$1");
  }

  return `${base}${segment}`.replace(/([^:]\/)\/+/g, "$1");
}
