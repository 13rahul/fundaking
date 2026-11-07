import config from "@/config/config.json";

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

  let segment = path.startsWith("/") ? path : `/${path}`;
  const bare = segment.split(/[?#]/)[0] ?? segment;
  const isFile = /\.[a-z0-9]{1,8}$/i.test(bare);
  if (
    config.site.trailing_slash &&
    !isFile &&
    segment !== "/" &&
    !segment.endsWith("/")
  ) {
    const qIndex = segment.search(/[?#]/);
    if (qIndex === -1) {
      segment = `${segment}/`;
    } else {
      segment = `${segment.slice(0, qIndex)}/${segment.slice(qIndex)}`;
    }
  }

  if (base === "/" || base === "") {
    return segment.replace(/([^:]\/)\/+/g, "$1");
  }

  return `${base}${segment}`.replace(/([^:]\/)\/+/g, "$1");
}
