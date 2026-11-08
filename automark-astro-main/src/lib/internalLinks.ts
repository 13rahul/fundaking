import clusterMap from "../../scripts/cluster-map.json";
import type { CityKey, ServiceKey } from "@/lib/services";
import type { CollectionEntry } from "astro:content";

type BlogEntry = CollectionEntry<"blog">;

export type PillarKey = keyof typeof clusterMap.pillars;

type PillarMeta = {
  hub: string;
  secondaryHub?: string;
  category: string;
  service: string;
  serviceLabel: string;
  proof: string;
  proofLabel: string;
};

const pillars = clusterMap.pillars as Record<string, PillarMeta>;
const posts = clusterMap.posts as Record<
  string,
  { pillar: string; isHub?: boolean }
>;

export const SERVICE_PILLAR: Record<ServiceKey, PillarKey> = {
  "seo-consulting": "seo-consulting",
  "technical-seo": "technical-seo",
  "local-seo": "local-seo",
  "ai-enablement": "ai-answer-engine",
  "web-development": "web-development-seo",
  "quick-commerce": "quick-commerce",
};

export const PILLAR_ORDER: PillarKey[] = [
  "seo-consulting",
  "technical-seo",
  "local-seo",
  "ai-answer-engine",
  "web-development-seo",
  "quick-commerce",
];

export function pillarMeta(pillar: PillarKey): PillarMeta {
  return pillars[pillar];
}

export function pillarForPost(slug: string): PillarKey | undefined {
  return posts[slug]?.pillar as PillarKey | undefined;
}

function published(all: BlogEntry[]) {
  return all.filter((p) => !p.data.draft);
}

function dateValue(p: BlogEntry) {
  const d = p.data.date_modified ?? p.data.date;
  return d ? new Date(d).getTime() : 0;
}

/**
 * Guides for one topic: hub first, then posts mentioning the city in the
 * slug, then the most recently updated posts in the pillar.
 */
export function guidesForPillar(
  all: BlogEntry[],
  pillar: PillarKey,
  options: { limit?: number; city?: CityKey; exclude?: string[] } = {},
): BlogEntry[] {
  const { limit = 4, city, exclude = [] } = options;
  const meta = pillars[pillar];
  const pool = published(all).filter(
    (p) => posts[p.id]?.pillar === pillar && !exclude.includes(p.id),
  );
  const score = (p: BlogEntry) =>
    (p.id === meta.hub ? 100 : 0) +
    (p.id === meta.secondaryHub ? 50 : 0) +
    (city && p.id.includes(city) ? 20 : 0);
  return pool
    .sort((a, b) => score(b) - score(a) || dateValue(b) - dateValue(a))
    .slice(0, limit);
}

/** One hub guide per pillar, in display order. */
export function hubGuides(all: BlogEntry[]): BlogEntry[] {
  const live = published(all);
  return PILLAR_ORDER.map((key) =>
    live.find((p) => p.id === pillars[key].hub),
  ).filter((p): p is BlogEntry => Boolean(p));
}

export function latestGuides(
  all: BlogEntry[],
  limit = 3,
  exclude: string[] = [],
): BlogEntry[] {
  return published(all)
    .filter((p) => !exclude.includes(p.id))
    .sort((a, b) => dateValue(b) - dateValue(a))
    .slice(0, limit);
}

/** Case study slug linked to a pillar, if the pillar has one. */
export function proofStudySlug(pillar: PillarKey): string | undefined {
  const proof = pillars[pillar]?.proof ?? "";
  const m = proof.match(/^\/case-study\/([^/]+)/);
  return m?.[1];
}
