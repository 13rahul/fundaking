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

const MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Fundaking+Media+-+Rahul+Agarwal/@21.0680074,82.7525294,5z/data=!3m1!4b1!4m6!3m5!1s0x3bc3a78b97137889:0x2464feeefb15a44d!8m2!3d21.0680074!4d82.7525294!16s%2Fg%2F11p4l9ptl4";
const WRITE_REVIEW_URL = "https://g.page/r/CU2kFfvu_mQkEAE/review";

export function organizationId() {
  return `${siteOrigin()}/#organization`;
}

export function founderId() {
  return `${siteOrigin()}/#founder`;
}

export function organizationNode() {
  const orgId = organizationId();
  return {
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": orgId,
    name: "Fundaking Media OPC Pvt Ltd",
    alternateName: "Fundaking Media",
    url: siteOrigin(),
    logo: absoluteUrl(config.site.logo || "/images/logo.png"),
    image: absoluteUrl(config.site.logo || "/images/logo.png"),
    email: config.params.footer_email || "consult@fundaking.com",
    telephone: "+918421053710",
    priceRange: "₹₹",
    founder: { "@id": founderId() },
    address: {
      "@type": "PostalAddress",
      streetAddress: "H S No. 155, Near Bhairavnath Temple, Pandare",
      addressLocality: "Baramati",
      addressRegion: "Maharashtra",
      postalCode: "413110",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.1517",
      longitude: "74.5777",
    },
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "City", name: "Baramati" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: [
      "https://www.linkedin.com/in/rahul-agarwal-510a5b79/",
      absoluteUrl("/about"),
      MAPS_PLACE_URL,
      WRITE_REVIEW_URL,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+918421053710",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    hasMap: "https://www.google.com/maps?cid=2623935863145284685",
  };
}

export function personFounderNode() {
  const sameAs = authorConfig.same_as?.length
    ? authorConfig.same_as
    : [
        "https://www.linkedin.com/in/rahul-agarwal-510a5b79/",
        absoluteUrl("/about"),
      ];
  return {
    "@type": "Person",
    "@id": founderId(),
    name: founder.name || "Rahul Agarwal",
    alternateName: "Rahul Vijay Agarwal",
    jobTitle:
      founder.jobTitle || "Founder & SEO Consultant, Fundaking Media",
    url: founder.url,
    image: absoluteUrl(
      authorConfig.image || "/images/author/rahul-agarwal.png",
    ),
    sameAs,
    worksFor: { "@id": organizationId() },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baramati",
      addressRegion: "Maharashtra",
      postalCode: "413110",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Technical SEO",
      "Local SEO",
      "SEO consulting",
      "Content architecture",
      "AI search visibility",
    ],
  };
}

export type GoogleReviewInput = {
  name: string;
  content: string;
  rating?: number;
  date_published?: string;
  google_url?: string;
};

export function googleReviewNodes(
  reviews: GoogleReviewInput[],
  itemReviewedId: string = organizationId(),
) {
  return reviews
    .filter((r) => r.google_url && r.content)
    .map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date_published,
      reviewBody: r.content,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating ?? 5),
        bestRating: "5",
        worstRating: "1",
      },
      url: r.google_url,
      itemReviewed: { "@id": itemReviewedId },
    }));
}

/** Attach AggregateRating + review[] onto the Organization node in a page graph. */
export function attachReviewsToOrganization(
  payload: Record<string, unknown>,
  options: {
    reviews: GoogleReviewInput[];
    ratingValue?: string | number;
    reviewCount?: string | number;
  },
): Record<string, unknown> {
  const reviewNodes = googleReviewNodes(options.reviews);
  if (!reviewNodes.length) return payload;

  const graph = Array.isArray(payload["@graph"])
    ? [...(payload["@graph"] as Record<string, unknown>[])]
    : [];
  const orgId = organizationId();
  const count = String(options.reviewCount ?? reviewNodes.length);
  const ratingValue = String(options.ratingValue ?? "5.0");

  const orgIndex = graph.findIndex((node) => {
    if (!node || typeof node !== "object") return false;
    const id = (node as Record<string, unknown>)["@id"];
    return id === orgId;
  });

  if (orgIndex >= 0) {
    const org = { ...(graph[orgIndex] as Record<string, unknown>) };
    org.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: count,
      bestRating: "5",
      worstRating: "1",
    };
    org.review = reviewNodes;
    graph[orgIndex] = org;
  }

  return { ...payload, "@graph": graph };
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
