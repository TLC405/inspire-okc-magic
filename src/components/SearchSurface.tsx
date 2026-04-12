import { Search } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";

interface SearchSurfaceProps {
  className?: string;
}

interface SearchResult {
  type: "singles" | "fitness" | "volunteering";
  label: string;
  route: string;
  count: number;
}

function scoreDataset(query: string, items: { name: string; tags: string[]; category: string }[]): number {
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
  ).length;
}

export function SearchSurface({ className }: SearchSurfaceProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim();
    if (!q) return [];

    const scores: SearchResult[] = [
      { type: "singles", label: "Singles Events", route: "/singles", count: scoreDataset(q, singlesEvents) },
      { type: "fitness", label: "Fitness Spots", route: "/fitness", count: scoreDataset(q, fitnessSpots) },
      { type: "volunteering", label: "Volunteering", route: "/volunteering", count: scoreDataset(q, volunteerOrgs.map(o => ({ ...o, tags: o.tags }))) },
    ];

    return scores.filter((s) => s.count > 0).sort((a, b) => b.count - a.count);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    if (results.length > 0) {
      navigate(`${results[0].route}?q=${encodeURIComponent(q)}`);
    } else {
      // No matches — search singles as general fallback
      navigate(`/singles?q=${encodeURIComponent(q)}`);
    }
    setShowResults(false);
  };

  const handleNavigate = (route: string) => {
    navigate(`${route}?q=${encodeURIComponent(query.trim())}`);
    setShowResults(false);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search singles events, fitness, volunteering..."
          className="search-input pl-11"
        />
      </form>

      {showResults && query.trim() && results.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-3 py-2 border-b border-border/50">
            <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">
              Results for "{query.trim()}"
            </span>
          </div>
          {results.map((r) => (
            <button
              key={r.type}
              onClick={() => handleNavigate(r.route)}
              className="w-full px-3 py-2.5 text-left hover:bg-muted/30 transition-colors flex items-center justify-between border-b border-border/30 last:border-0"
            >
              <span className="text-sm text-foreground font-medium">{r.label}</span>
              <span className="text-xs text-muted-foreground font-mono">{r.count} match{r.count !== 1 ? "es" : ""}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
