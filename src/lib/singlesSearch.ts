import type { SinglesEvent } from "@/data/singlesEvents";

interface SearchResult {
  event: SinglesEvent;
  score: number;
  matchReasons: string[];
}

const WEIGHTS = {
  name: 10,
  organizer: 7,
  venue: 6,
  neighborhood: 5,
  category: 4,
  tags: 3,
  description: 2,
  source: 1,
};

export function searchAndRank(
  events: SinglesEvent[],
  query: string,
  filters: {
    category: string;
    time: string;
    hood: string;
    verifiedOnly: boolean;
    sortBy: "relevance" | "confidence" | "newest";
  }
): SearchResult[] {
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/).filter(Boolean);

  let results: SearchResult[] = events
    .filter((evt) => {
      if (filters.verifiedOnly && evt.verificationStatus !== "verified") return false;
      if (filters.category !== "All" && evt.category !== filters.category) return false;
      if (filters.time !== "All Events" && !evt.frequency.toLowerCase().includes(filters.time.toLowerCase())) return false;
      if (filters.hood !== "All Areas" && evt.neighborhood !== filters.hood) return false;
      return true;
    })
    .map((evt) => {
      if (!q) return { event: evt, score: evt.confidenceScore, matchReasons: [] };

      let score = 0;
      const matchReasons: string[] = [];

      for (const term of terms) {
        if (evt.name.toLowerCase().includes(term)) {
          score += WEIGHTS.name;
          matchReasons.push(`Name: "${evt.name}"`);
        }
        if (evt.organizer.toLowerCase().includes(term)) {
          score += WEIGHTS.organizer;
          matchReasons.push(`Organizer: "${evt.organizer}"`);
        }
        if (evt.venue.toLowerCase().includes(term)) {
          score += WEIGHTS.venue;
          matchReasons.push(`Venue: "${evt.venue}"`);
        }
        if (evt.neighborhood.toLowerCase().includes(term)) {
          score += WEIGHTS.neighborhood;
          matchReasons.push(`Area: ${evt.neighborhood}`);
        }
        if (evt.category.toLowerCase().includes(term)) {
          score += WEIGHTS.category;
          matchReasons.push(`Category: ${evt.category}`);
        }
        if (evt.tags.some((t) => t.toLowerCase().includes(term))) {
          score += WEIGHTS.tags;
          const matched = evt.tags.find((t) => t.toLowerCase().includes(term));
          matchReasons.push(`Tag: ${matched}`);
        }
        if (evt.description.toLowerCase().includes(term)) {
          score += WEIGHTS.description;
          matchReasons.push("Matched in description");
        }
        if (evt.sources.some((s) => s.title?.toLowerCase().includes(term) || s.provider.toLowerCase().includes(term))) {
          score += WEIGHTS.source;
          matchReasons.push("Matched in source");
        }
      }

      // Boost verified events
      if (evt.verificationStatus === "verified") score += 5;
      // Boost by confidence
      score += evt.confidenceScore / 20;

      return { event: evt, score, matchReasons: [...new Set(matchReasons)] };
    })
    .filter((r) => !q || r.score > 0);

  // Sort
  if (filters.sortBy === "confidence") {
    results.sort((a, b) => b.event.confidenceScore - a.event.confidenceScore);
  } else if (filters.sortBy === "newest") {
    results.sort((a, b) => new Date(b.event.lastVerifiedAt).getTime() - new Date(a.event.lastVerifiedAt).getTime());
  } else {
    results.sort((a, b) => b.score - a.score);
  }

  return results;
}
