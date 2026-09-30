export type ServiceKey =
  | "seo-consulting"
  | "technical-seo"
  | "local-seo"
  | "ai-enablement"
  | "web-development"
  | "quick-commerce";

export type CityKey = "pune" | "baramati";

export const SERVICE_META: Record<
  ServiceKey,
  { label: string; hub: string; icon: string; summary: string }
> = {
  "seo-consulting": {
    label: "SEO Consulting",
    hub: "/seo-consulting-services",
    icon: "/images/services/seo-consulting.svg",
    summary:
      "Roadmaps, audits, and monthly advisory tied to pipeline — not vanity rankings.",
  },
  "technical-seo": {
    label: "Technical SEO",
    hub: "/technical-seo-consultant",
    icon: "/images/services/technical-seo.svg",
    summary:
      "Crawl, indexation, Core Web Vitals, rendering, and schema your developers can ship.",
  },
  "local-seo": {
    label: "Local SEO",
    hub: "/local-seo-consultant",
    icon: "/images/services/local-seo.svg",
    summary:
      "Google Business Profile, Maps pack, reviews, and location pages that bring calls.",
  },
  "ai-enablement": {
    label: "AI Enablement",
    hub: "/ai-enablement",
    icon: "/images/services/ai-enablement.svg",
    summary:
      "AI agents, data pipelines, and workflow automation that save hours every week.",
  },
  "web-development": {
    label: "Web Development",
    hub: "/web-development",
    icon: "/images/services/web-development.svg",
    summary:
      "Fast, SEO-ready websites, CRMs, and web apps — frontend, backend, and hosting.",
  },
  "quick-commerce": {
    label: "Quick Commerce Enablement",
    hub: "/quick-commerce-enablement",
    icon: "/images/services/quick-commerce.svg",
    summary:
      "Get listed and ranking on Blinkit, Zepto, and Swiggy Instamart with catalogue and content that sells.",
  },
};

export const SERVICE_ORDER: ServiceKey[] = [
  "seo-consulting",
  "technical-seo",
  "local-seo",
  "ai-enablement",
  "web-development",
  "quick-commerce",
];

export const CITY_LABEL: Record<CityKey, string> = {
  pune: "Pune",
  baramati: "Baramati",
};

const CITY_SLUG_BASE: Record<ServiceKey, string> = {
  "seo-consulting": "seo-consulting",
  "technical-seo": "technical-seo",
  "local-seo": "local-seo",
  "ai-enablement": "ai-enablement",
  "web-development": "web-development",
  "quick-commerce": "quick-commerce",
};

export function serviceUrl(service: ServiceKey, city?: CityKey): string {
  if (!city) return SERVICE_META[service].hub;
  return `/${CITY_SLUG_BASE[service]}-${city}`;
}
