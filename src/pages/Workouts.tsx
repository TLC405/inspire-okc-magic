import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fitnessSpots, fitnessCategories, categoryGroups, districts } from "@/data/fitnessSpots";
import { ExternalLink, Search, ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const activeFilters = [
    ...(category !== "All" ? [{ label: category, clear: () => setCategory("All") }] : []),
    ...(hood !== "All Areas" ? [{ label: hood, clear: () => setHood("All Areas") }] : []),
  ];

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* District Select */}
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">District</p>
        <Select value={hood} onValueChange={setHood}>
          <SelectTrigger className="w-full bg-transparent border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Groups */}
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Category</p>
        <button
          onClick={() => setCategory("All")}
          className={`mb-3 w-full text-left ${category === "All" ? "skeuo-chip-active" : "skeuo-chip"}`}
        >
          All ({fitnessSpots.length})
        </button>
        <div className="space-y-2">
          {Object.entries(categoryGroups).map(([groupName, cats]) => {
            const groupCount = fitnessSpots.filter((s) => cats.includes(s.category)).length;
            const isOpen = openGroups[groupName] || false;
            return (
              <Collapsible key={groupName} open={isOpen} onOpenChange={() => toggleGroup(groupName)}>
                <CollapsibleTrigger className="flex items-center gap-2 w-full text-left py-1.5 px-2 hover:bg-foreground/[0.03] transition-colors rounded">
                  <span className="dateline text-foreground/60 font-bold">{groupName}</span>
                  <span className="dateline text-muted-foreground/40">{groupCount}</span>
                  {isOpen ? <ChevronUp size={12} className="text-muted-foreground/40 ml-auto" /> : <ChevronDown size={12} className="text-muted-foreground/40 ml-auto" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-1 pt-1 pl-2">
                    {cats.map((c) => {
                      const count = fitnessSpots.filter((s) => s.category === c).length;
                      return (
                        <button
                          key={c}
                          onClick={() => setCategory(c)}
                          className={`text-left ${c === category ? "skeuo-chip-active" : "skeuo-chip"}`}
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
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="container pt-6 md:pt-12">
          <div className="skeuo-divider mb-4" />
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
              className="skeuo-search pl-11"
            />
          </div>

          {/* Active Filters + Mobile Filter Button */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {/* Mobile filter trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger className="skeuo-btn">
                  <SlidersHorizontal size={14} />
                  Filters
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="section-head text-lg">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {activeFilters.map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="inline-flex items-center gap-1.5 skeuo-chip-active"
              >
                {f.label}
                <X size={10} />
              </button>
            ))}

            <span className="dateline text-foreground font-bold ml-auto">{filtered.length} Results</span>
          </div>
          <div className="skeuo-divider mb-4" />
        </div>

        {/* Content: Sidebar + Results */}
        <div className="container pb-12">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-4 skeuo-card-inset p-5 rounded">
                <FilterPanel />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((spot) => (
                  <article key={spot.id} className="skeuo-card p-5 rounded">
                    <div className="flex items-start gap-3">
                      <div className="w-1 self-stretch rounded-full bg-accent/30 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="headline text-foreground">{spot.name}</h2>
                          <a
                            href={spot.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="skeuo-btn flex-shrink-0 !px-2 !py-1.5"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                        <p className="dateline text-muted-foreground/60 mt-1">
                          {spot.neighborhood} · {spot.category}
                        </p>
                        <p className="body-text mt-2 line-clamp-2">{spot.description}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                          <span className="skeuo-badge-accent">{spot.category}</span>
                          {spot.tags.slice(0, 3).map((t) => (
                            <span key={t} className="skeuo-badge">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <p className="dateline text-muted-foreground">No spots match your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Workouts;
