import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fitnessSpots, fitnessCategories, categoryGroups, districts } from "@/data/fitnessSpots";
import { ExternalLink, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Workouts = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("All");
  const [hood, setHood] = useState("All Areas");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ Popular: true });

  const filtered = useMemo(() => {
    return fitnessSpots.filter((spot) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        spot.name.toLowerCase().includes(q) ||
        spot.description.toLowerCase().includes(q) ||
        spot.tags.some((t) => t.toLowerCase().includes(q)) ||
        spot.neighborhood.toLowerCase().includes(q) ||
        spot.category.toLowerCase().includes(q);
      const matchCat = category === "All" || spot.category === category;
      const matchHood = hood === "All Areas" || spot.neighborhood === hood;
      return matchSearch && matchCat && matchHood;
    });
  }, [search, category, hood]);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="container pt-6 md:pt-12">
          <div className="rule-double mb-4" />
          <h1 className="section-head text-foreground mb-1">Fitness</h1>
          <p className="dateline text-muted-foreground mb-2">
            Oklahoma City · {fitnessSpots.length} Spots · {fitnessCategories.length - 1} Categories
          </p>
          <div className="rule-thin mb-4" />

          {/* Search */}
          <div className="relative mb-4">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gyms, trails, classes, neighborhoods..."
              className="search-input pl-11"
            />
          </div>

          {/* District Bar — horizontal scroll */}
          <div className="mb-4">
            <p className="dateline text-muted-foreground/50 mb-2">District</p>
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setHood(d)}
                  className={`whitespace-nowrap flex-shrink-0 ${d === hood ? "filter-chip-active" : "filter-chip"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped Category Filters */}
          <div className="mb-4">
            <p className="dateline text-muted-foreground/50 mb-2">Category</p>
            <button
              onClick={() => setCategory("All")}
              className={`mb-2 ${category === "All" ? "filter-chip-active" : "filter-chip"}`}
            >
              All ({fitnessSpots.length})
            </button>
            <div className="space-y-2">
              {Object.entries(categoryGroups).map(([groupName, cats]) => {
                const groupCount = fitnessSpots.filter((s) => cats.includes(s.category)).length;
                const isOpen = openGroups[groupName] || false;
                return (
                  <Collapsible key={groupName} open={isOpen} onOpenChange={() => toggleGroup(groupName)}>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full text-left py-1">
                      <span className="dateline text-foreground/60 font-bold">{groupName}</span>
                      <span className="dateline text-muted-foreground/40">{groupCount}</span>
                      {isOpen ? <ChevronUp size={12} className="text-muted-foreground/40" /> : <ChevronDown size={12} className="text-muted-foreground/40" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cats.map((c) => {
                          const count = fitnessSpots.filter((s) => s.category === c).length;
                          return (
                            <button
                              key={c}
                              onClick={() => setCategory(c)}
                              className={c === category ? "filter-chip-active" : "filter-chip"}
                            >
                              {c} ({count})
                            </button>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>

          <div className="rule-heavy mb-2" />
          <p className="dateline text-foreground font-bold mb-4">{filtered.length} Results</p>
        </div>

        {/* Results */}
        <div className="container pb-12">
          {filtered.map((spot, i) => (
            <article key={spot.id} className="article-block">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="font-black text-2xl md:text-3xl text-foreground/10 leading-none mt-1 w-8 flex-shrink-0 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="headline text-foreground">{spot.name}</h2>
                  <p className="dateline text-muted-foreground/50 mt-1">
                    {spot.neighborhood} · {spot.category}
                  </p>
                  <p className="body-text mt-2">{spot.description}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className="news-badge-accent">{spot.category}</span>
                    {spot.tags.map((t) => (
                      <span key={t} className="news-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={spot.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 text-muted-foreground/30 hover:text-accent transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="dateline text-muted-foreground">No spots match your filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Workouts;
