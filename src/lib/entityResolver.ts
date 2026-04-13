/**
 * Entity Resolver — lightweight NER-style disambiguation for OKC entities.
 * Maps aliases, abbreviations, and colloquial names to canonical entities.
 */

export type EntityType = "place" | "organization" | "category" | "venue" | "event" | "initiative";

export interface ResolvedEntity {
  canonical: string;
  type: EntityType;
  aliases: string[];
  neighborhood?: string;
  relatedCategories?: string[];
  metadata?: Record<string, string>;
}

// ── Entity Registry ──
const ENTITY_REGISTRY: ResolvedEntity[] = [
  // Neighborhoods / Places
  { canonical: "Midtown", type: "place", aliases: ["midtown", "mid-town", "mid town"], neighborhood: "Midtown" },
  { canonical: "Bricktown", type: "place", aliases: ["bricktown", "brick town", "the bricks"], neighborhood: "Bricktown" },
  { canonical: "Paseo Arts District", type: "place", aliases: ["paseo", "paseo district", "paseo arts", "the paseo"], neighborhood: "Paseo" },
  { canonical: "Plaza District", type: "place", aliases: ["plaza", "plaza district", "the plaza"], neighborhood: "Plaza District" },
  { canonical: "Automobile Alley", type: "place", aliases: ["auto alley", "automobile alley", "car alley"], neighborhood: "Automobile Alley" },
  { canonical: "Deep Deuce", type: "place", aliases: ["deep deuce", "deep duece"], neighborhood: "Deep Deuce" },
  { canonical: "Downtown", type: "place", aliases: ["downtown", "downtown okc", "city center", "central business district", "cbd"], neighborhood: "Downtown" },
  { canonical: "NW Oklahoma City", type: "place", aliases: ["northwest okc", "nw okc", "northwest", "nw oklahoma city"], neighborhood: "NW Oklahoma City" },
  { canonical: "South Oklahoma City", type: "place", aliases: ["south okc", "south side", "s okc", "south oklahoma city"], neighborhood: "South Oklahoma City" },
  { canonical: "Edmond", type: "place", aliases: ["edmond", "edmond ok"], neighborhood: "Edmond" },
  { canonical: "Norman", type: "place", aliases: ["norman", "norman ok"], neighborhood: "Norman" },
  { canonical: "Moore", type: "place", aliases: ["moore", "moore ok"], neighborhood: "Moore" },
  { canonical: "Del City", type: "place", aliases: ["del city"], neighborhood: "Del City" },
  { canonical: "Nichols Hills", type: "place", aliases: ["nichols hills", "nichols"], neighborhood: "Nichols Hills" },
  { canonical: "The Village", type: "place", aliases: ["the village", "village"], neighborhood: "The Village" },
  { canonical: "Uptown 23rd", type: "place", aliases: ["uptown", "uptown 23rd", "23rd street"], neighborhood: "Uptown 23rd" },
  { canonical: "Film Row", type: "place", aliases: ["film row"], neighborhood: "Film Row" },
  { canonical: "Wheeler District", type: "place", aliases: ["wheeler", "wheeler district"], neighborhood: "Wheeler District" },

  // Categories
  { canonical: "Speed Dating", type: "category", aliases: ["speed dating", "speed date", "quick dating", "rapid dating"], relatedCategories: ["Speed Dating"] },
  { canonical: "Mixer", type: "category", aliases: ["mixer", "mixers", "social mixer", "networking mixer"], relatedCategories: ["Mixer"] },
  { canonical: "Date Night", type: "category", aliases: ["date night", "date nights", "romantic evening", "couples night", "romantic"], relatedCategories: ["Date Night"] },
  { canonical: "CrossFit", type: "category", aliases: ["crossfit", "cross fit", "cf", "wod"], relatedCategories: ["CrossFit"] },
  { canonical: "Yoga", type: "category", aliases: ["yoga", "hot yoga", "vinyasa", "hatha", "power yoga", "yin yoga"], relatedCategories: ["Yoga"] },
  { canonical: "Running", type: "category", aliases: ["running", "run", "jogging", "5k", "marathon", "trail running"], relatedCategories: ["Running"] },
  { canonical: "Climbing", type: "category", aliases: ["climbing", "rock climbing", "bouldering", "indoor climbing"], relatedCategories: ["Climbing"] },
  { canonical: "Boxing", type: "category", aliases: ["boxing", "kickboxing", "muay thai"], relatedCategories: ["Boxing", "Martial Arts"] },
  { canonical: "Swimming", type: "category", aliases: ["swimming", "swim", "pool", "aquatics", "lap swim"], relatedCategories: ["Swimming"] },
  { canonical: "Cycling", type: "category", aliases: ["cycling", "biking", "spin", "bike", "spinning"], relatedCategories: ["Cycling"] },
  { canonical: "Dance", type: "category", aliases: ["dance", "dancing", "salsa", "swing", "two-step", "line dancing", "ballroom"], relatedCategories: ["Dance"] },
  { canonical: "Pilates", type: "category", aliases: ["pilates", "reformer"], relatedCategories: ["Pilates"] },
  { canonical: "HIIT", type: "category", aliases: ["hiit", "high intensity", "interval training", "tabata"], relatedCategories: ["HIIT", "Bootcamp"] },
  { canonical: "Pickleball", type: "category", aliases: ["pickleball", "pickle ball"], relatedCategories: ["Pickleball"] },
  { canonical: "Food", type: "category", aliases: ["food bank", "food pantry", "hunger", "meals", "feeding"], relatedCategories: ["Food"] },
  { canonical: "Environment", type: "category", aliases: ["environment", "environmental", "nature", "conservation", "cleanup", "green"], relatedCategories: ["Environment"] },
  { canonical: "Youth", type: "category", aliases: ["youth", "kids", "children", "mentoring", "tutoring", "big brothers"], relatedCategories: ["Youth"] },
  { canonical: "Animals", type: "category", aliases: ["animals", "pets", "shelter", "rescue", "dogs", "cats"], relatedCategories: ["Animals"] },

  // Notable Organizations
  { canonical: "OKC Thunder", type: "organization", aliases: ["thunder", "okc thunder", "oklahoma city thunder"], metadata: { context: "sports" } },
  { canonical: "Regional Food Bank of Oklahoma", type: "organization", aliases: ["food bank", "regional food bank", "rfbo"], relatedCategories: ["Food"] },
  { canonical: "Scissortail Park", type: "venue", aliases: ["scissortail", "scissortail park"], neighborhood: "Downtown" },
  { canonical: "Myriad Botanical Gardens", type: "venue", aliases: ["myriad gardens", "myriad", "botanical gardens"], neighborhood: "Downtown" },

  // City Initiatives
  { canonical: "MAPS 4", type: "initiative", aliases: ["maps 4", "maps4", "maps four", "maps program"], metadata: { context: "civic investment" } },
  { canonical: "MAPS 3", type: "initiative", aliases: ["maps 3", "maps3", "maps three"], metadata: { context: "civic investment" } },
];

// Build a fast lookup index
const aliasIndex = new Map<string, ResolvedEntity>();
for (const entity of ENTITY_REGISTRY) {
  for (const alias of entity.aliases) {
    aliasIndex.set(alias.toLowerCase(), entity);
  }
}

export interface EntityMatch {
  entity: ResolvedEntity;
  matchedTerm: string;
  originalTerms: string[];
}

/**
 * Resolve entities from a search query.
 * Tries multi-word phrases first (greedy), then single words.
 */
export function resolveEntities(query: string): EntityMatch[] {
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter(Boolean);
  const matches: EntityMatch[] = [];
  const matchedCanonicals = new Set<string>();

  // Try progressively shorter n-grams
  for (let n = Math.min(words.length, 4); n >= 1; n--) {
    for (let i = 0; i <= words.length - n; i++) {
      const phrase = words.slice(i, i + n).join(" ");
      const entity = aliasIndex.get(phrase);
      if (entity && !matchedCanonicals.has(entity.canonical)) {
        matches.push({
          entity,
          matchedTerm: phrase,
          originalTerms: words.slice(i, i + n),
        });
        matchedCanonicals.add(entity.canonical);
      }
    }
  }

  return matches;
}

/**
 * Extract neighborhood filters from entity matches.
 */
export function extractNeighborhoods(matches: EntityMatch[]): string[] {
  return matches
    .filter((m) => m.entity.neighborhood)
    .map((m) => m.entity.neighborhood!);
}

/**
 * Extract category filters from entity matches.
 */
export function extractCategories(matches: EntityMatch[]): string[] {
  return matches
    .flatMap((m) => m.entity.relatedCategories || []);
}

/**
 * Get non-entity terms (words that weren't resolved to entities).
 */
export function getNonEntityTerms(query: string, matches: EntityMatch[]): string[] {
  const allMatchedTerms = new Set(matches.flatMap((m) => m.originalTerms));
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !allMatchedTerms.has(w));
}

/**
 * Get all registered entities of a given type.
 */
export function getEntitiesByType(type: EntityType): ResolvedEntity[] {
  return ENTITY_REGISTRY.filter((e) => e.type === type);
}

export { ENTITY_REGISTRY };
