import authorConfig from "@/config/author.json";
import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";

const PRODUCTION_ORIGIN = "https://fundaking.com";

/** Canonical public origin (production URL even when building for XAMPP). */
export function siteOrigin(): string {
  const fromConfig = config.site.base_url?.replace(/\/+$/, "") || "";
  if (fromConfig.includes("fundaking.com")) return fromConfig;
  return PRODUCTION_ORIGIN;
}

/** Strip Astro `base` prefix from pathname for canonical paths. */
export function pathFromAstroPathname(pathname: string): string {
  let base = import.meta.env.BASE_URL || "/";
  if (base !== "/") base = base.replace(/\/+$/, "");
  let path = pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return path.replace(/\/+$/, "") || "/";
}

export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const origin = siteOrigin();
  const segment = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${segment}`.replace(/([^:]\/)\/+/g, "$1");
}

const founder = {
  name: config.metadata.founder_name ?? config.metadata.meta_author,
  jobTitle: config.metadata.founder_job_title ?? "Founder, Fundaking Media",
  image: absoluteUrl(config.metadata.meta_image),
  url: absoluteUrl("/about"),
};

export function organizationNode() {
  const orgId = `${siteOrigin()}/#organization`;
  return {
    "@type": "Organization",
    "@id": orgId,
    name: "Fundaking Media OPC Pvt Ltd",
    alternateName: "Fundaking Media",
    url: siteOrigin(),
    logo: absoluteUrl(config.site.logo),
    email: config.params.footer_email,
    telephone: config.params.footer_phone,
    founder: { "@id": `${siteOrigin()}/#founder` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baramati",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };
}

export function personFounderNode() {
  const sameAs = authorConfig.same_as?.length
    ? authorConfig.same_as
    : undefined;
  return {
    "@type": "Person",
    "@id": `${siteOrigin()}/#founder`,
    name: founder.name,
    jobTitle: founder.jobTitle,
    url: founder.url,
    image: absoluteUrl(authorConfig.image ?? config.metadata.meta_image),
    ...(sameAs ? { sameAs } : {}),
    worksFor: { "@id": `${siteOrigin()}/#organization` },
  };
}

export function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${siteOrigin()}/#website`,
    url: siteOrigin(),
    name: "Fundaking Media",
    publisher: { "@id": `${siteOrigin()}/#organization` },
  };
}

export type WebPageSchemaType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage";

export function webPageNode(options: {
  name: string;
  description: string;
  url: string;
  pageType?: WebPageSchemaType;
}) {
  const pageType = options.pageType ?? "WebPage";
  return {
    "@type": pageType,
    "@id": `${options.url}#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": `${siteOrigin()}/#website` },
    about: { "@id": `${siteOrigin()}/#organization` },
  };
}

export type FaqSchemaItem = { question: string; answer: string };

export function faqPageNode(
  items: FaqSchemaItem[],
  pageUrl: string,
) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: plainify(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: plainify(item.answer),
      },
    })),
  };
}

const PATH_LABELS: Record<string, string> = {
  about: "About",
  features: "Features",
  contact: "Contact",
  pricing: "Pricing",
  integrations: "Integrations",
  blog: "Blog",
  "case-study": "Case Studies",
  careers: "Careers",
};

/** Breadcrumb trail for inner marketing pages (excludes home). */
export function autoBreadcrumbItems(pagePath: string) {
  const normalized = pagePath.replace(/\/+$/, "") || "/";
  if (normalized === "/") return [];

  const segments = normalized.split("/").filter(Boolean);
  const items: Array<{ name: string; url: string }> = [
    { name: "Home", url: absoluteUrl("/") },
  ];

  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    const label =
      PATH_LABELS[segment] ??
      segment
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    items.push({ name: label, url: absoluteUrl(acc) });
  }
  return items;
}

export function graphHasType(
  payload: Record<string, unknown>,
  type: string,
): boolean {
  const graph = payload["@graph"];
  if (!Array.isArray(graph)) return false;
  return graph.some(
    (node) =>
      node &&
      typeof node === "object" &&
      (node as Record<string, unknown>)["@type"] === type,
  );
}

export function mergeGraph(
  payload: Record<string, unknown>,
  extra: Record<string, unknown>[],
): Record<string, unknown> {
  if (!extra.length) return payload;
  const graph = payload["@graph"];
  const base = Array.isArray(graph) ? graph : [];
  return { ...payload, "@graph": [...base, ...extra] };
}

export function webPageTypeForPath(pagePath: string): WebPageSchemaType {
  const path = pagePath.replace(/\/+$/, "") || "/";
  if (path === "/about") return "AboutPage";
  if (path === "/contact") return "ContactPage";
  return "WebPage";
}

export function breadcrumbList(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingNode(options: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}) {
  const authorName = options.authorName ?? founder.name;
  return {
    "@type": "BlogPosting",
    "@id": `${options.url}#article`,
    headline: options.headline,
    description: options.description,
    url: options.url,
    mainEntityOfPage: { "@id": `${options.url}#webpage` },
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@id": `${siteOrigin()}/#founder`,
    },
    publisher: {
      "@type": "Organization",
      name: "Fundaking Media",
      url: siteOrigin(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(config.site.logo),
      },
    },
    image: options.image ? [options.image] : [founder.image],
  };
}

export function collectionPageNode(options: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@type": "CollectionPage",
    "@id": `${options.url}#collection`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": `${siteOrigin()}/#website` },
  };
}

/** Default graph for most Astro pages. */
export function pageGraph(options: {
  name: string;
  description: string;
  url: string;
  pageType?: WebPageSchemaType;
  extra?: Record<string, unknown>[];
}) {
  const graph = [
    organizationNode(),
    personFounderNode(),
    webSiteNode(),
    webPageNode({
      name: options.name,
      description: options.description,
      url: options.url,
      pageType: options.pageType,
    }),
    ...(options.extra ?? []),
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}

export function caseStudyArticleNode(options: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${options.url}#article`,
    headline: options.headline,
    description: options.description,
    url: options.url,
    mainEntityOfPage: { "@id": `${options.url}#webpage` },
    datePublished: options.datePublished,
    dateModified: options.datePublished,
    author: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.jobTitle,
      url: founder.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Fundaking Media",
      url: siteOrigin(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(config.site.logo),
      },
    },
    image: options.image ? [options.image] : [founder.image],
    articleSection: "Case Study",
  };
}

export function professionalServiceNode() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteOrigin()}/#professional-service`,
    name: "Fundaking Media — SEO Consulting",
    url: siteOrigin(),
    description: config.metadata.meta_description,
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "Country", name: "India" },
    ],
    provider: { "@id": `${siteOrigin()}/#founder` },
  };
}

export function getFounderDisplay() {
  return founder;
}
