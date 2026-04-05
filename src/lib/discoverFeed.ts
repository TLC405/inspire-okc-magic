import { singlesEvents, type SinglesEvent } from "@/data/singlesEvents";
import { fitnessSpots, type FitnessSpot } from "@/data/fitnessSpots";
import { volunteerOrgs, type VolunteerOrg } from "@/data/volunteerOrgs";
import { cityShowcase, type CityShowcaseItem } from "@/data/cityShowcase";

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  feedCategory: "event" | "fitness" | "volunteer" | "discover";
  sourceName: string;
  sourceBadgeColor: string;
  sourceUrl: string;
  neighborhood?: string;
  tags: string[];
  relevanceScore: number;
  listingType: string;
  listingId: string;
}

const SOURCE_MAP: Record<string, { name: string; color: string }> = {
  "visitokc.com": { name: "Visit OKC", color: "bg-blue-500" },
  "oklahoman.com": { name: "The Oklahoman", color: "bg-red-600" },
  "meetup.com": { name: "Meetup", color: "bg-red-500" },
  "eventbrite.com": { name: "Eventbrite", color: "bg-orange-500" },
  "facebook.com": { name: "Facebook", color: "bg-blue-600" },
  "instagram.com": { name: "Instagram", color: "bg-pink-500" },
  "scissortailpark.org": { name: "Community", color: "bg-emerald-600" },
  "famok.org": { name: "Community", color: "bg-emerald-600" },
  "okc.gov": { name: "OKC Metro", color: "bg-sky-600" },
};

function getSource(url: string): { name: string; color: string } {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    for (const [domain, info] of Object.entries(SOURCE_MAP)) {
      if (hostname.includes(domain)) return info;
    }
    return { name: hostname.split(".")[0].charAt(0).toUpperCase() + hostname.split(".")[0].slice(1), color: "bg-muted" };
  } catch {
    return { name: "Community", color: "bg-emerald-600" };
  }
}

function fromSingles(e: SinglesEvent): FeedItem {
  const src = e.sources[0];
  const source = getSource(src?.url || "");
  return {
    id: `feed-singles-${e.id}`,
    title: e.name,
    description: e.description,
    category: e.category,
    feedCategory: "event",
    sourceName: source.name,
    sourceBadgeColor: source.color,
    sourceUrl: src?.url || "",
    neighborhood: e.neighborhood,
    tags: e.tags,
    relevanceScore: e.confidenceScore + (e.category === "Date Night" ? 20 : 0) + (e.verificationStatus === "verified" ? 10 : 0),
    listingType: "singles",
    listingId: e.id,
  };
}

function fromFitness(f: FitnessSpot): FeedItem {
  const source = getSource(f.source);
  return {
    id: `feed-fitness-${f.id}`,
    title: f.name,
    description: f.description,
    category: f.category,
    feedCategory: "fitness",
    sourceName: source.name,
    sourceBadgeColor: source.color,
    sourceUrl: f.source,
    neighborhood: f.neighborhood,
    tags: f.tags,
    relevanceScore: 60,
    listingType: "fitness",
    listingId: f.id,
  };
}

function fromVolunteer(v: VolunteerOrg): FeedItem {
  const source = getSource(v.source);
  return {
    id: `feed-volunteer-${v.id}`,
    title: v.name,
    description: v.description,
    category: v.category,
    feedCategory: "volunteer",
    sourceName: source.name,
    sourceBadgeColor: source.color,
    sourceUrl: v.source,
    neighborhood: v.neighborhood,
    tags: v.tags,
    relevanceScore: 50,
    listingType: "volunteer",
    listingId: v.id,
  };
}

function fromShowcase(c: CityShowcaseItem): FeedItem {
  const source = getSource(c.sourceUrl);
  return {
    id: `feed-discover-${c.id}`,
    title: c.title,
    description: c.description,
    category: c.category,
    feedCategory: "discover",
    sourceName: source.name,
    sourceBadgeColor: source.color,
    sourceUrl: c.sourceUrl,
    tags: c.tags,
    relevanceScore: 40,
    listingType: "discover",
    listingId: c.id,
  };
}

export type FeedFilter = "all" | "event" | "fitness" | "volunteer" | "discover";

export function buildFeed(filter: FeedFilter = "all", query = ""): FeedItem[] {
  const items: FeedItem[] = [
    ...singlesEvents.map(fromSingles),
    ...fitnessSpots.slice(0, 30).map(fromFitness),
    ...volunteerOrgs.slice(0, 20).map(fromVolunteer),
    ...cityShowcase.slice(0, 20).map(fromShowcase),
  ];

  const q = query.toLowerCase();

  return items
    .filter((item) => {
      if (filter !== "all" && item.feedCategory !== filter) return false;
      if (q && !item.title.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q) && !item.tags.some((t) => t.toLowerCase().includes(q))) return false;
      return true;
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export const feedFilterOptions: { value: FeedFilter; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "🔥" },
  { value: "event", label: "Events & Dates", emoji: "💃" },
  { value: "fitness", label: "Fitness", emoji: "💪" },
  { value: "volunteer", label: "Volunteer", emoji: "🤝" },
  { value: "discover", label: "Discover", emoji: "🏙️" },
];
