import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fitnessSpots, fitnessCategories, categoryGroups, districts } from "@/data/fitnessSpots";
import { ExternalLink, Search, ChevronDown, ChevronUp, SlidersHorizontal, X, MapPin, Dumbbell } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImg from "@/assets/hero-fitness.jpg";
import { ListingImage } from "@/components/ListingImage";

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
                        <button key={c} onClick={() => setCategory(c)} className={`text-left ${c === category ? "skeuo-chip-active" : "skeuo-chip"}`}>
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
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0 animate-fade-in">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
          <img src={heroImg} alt="Fitness gym interior" className="w-full h-full object-cover" width={1920} height={512} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container pb-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="folder-tab px-3 py-1 text-[10px] font-black uppercase tracking-wider">Section C</span>
              <span className="ink-rule flex-1 h-px bg-border/60" />
              <span className="text-letterpress text-muted-foreground text-xs font-bold uppercase tracking-widest">The Lifestyle Report</span>
            </div>
            <h1 className="section-head text-foreground text-3xl md:text-5xl drop-shadow-sm">Fitness</h1>
            <p className="dateline text-foreground/70 mt-1 drop-shadow-sm">
              Oklahoma City · {fitnessSpots.length} Spots · {fitnessCategories.length - 1} Categories · All Districts
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="container pt-4 md:pt-6">
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

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger className="skeuo-btn">
                  <SlidersHorizontal size={14} /> Filters
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background overflow-y-auto">
                  <SheetHeader><SheetTitle className="section-head text-lg">Filters</SheetTitle></SheetHeader>
                  <div className="mt-6"><FilterPanel /></div>
                </SheetContent>
              </Sheet>
            </div>
            {activeFilters.map((f) => (
              <button key={f.label} onClick={f.clear} className="inline-flex items-center gap-1.5 skeuo-chip-active">
                {f.label} <X size={10} />
              </button>
            ))}
            <span className="dateline text-foreground font-bold ml-auto">{filtered.length} Results</span>
          </div>
          <div className="skeuo-divider mb-4" />
        </div>

        {/* Content */}
        <div className="container pb-12">
          <div className="flex gap-8">
            <aside className="hidden md:block w-72 flex-shrink-0">
              <div className="sticky top-4 skeuo-card-inset p-5 rounded overflow-y-auto max-h-[calc(100vh-2rem)]">
                <FilterPanel />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {/* Category Stats Bar */}
              {category !== "All" && (
                <div className="skeuo-card-inset p-4 rounded mb-4 flex items-center gap-4">
                  <Dumbbell size={20} className="text-accent" />
                  <div>
                    <p className="headline text-foreground">{category}</p>
                    <p className="dateline text-muted-foreground">{filtered.length} locations in Oklahoma City</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((spot) => (
                  <article key={spot.id} className="skeuo-card rounded overflow-hidden">
                    <ListingImage
                      listingType="fitness"
                      listingId={spot.id}
                      name={spot.name}
                      category={spot.category}
                      websiteUrl={spot.source}
                      className="w-full h-32 lg:h-36"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="headline text-foreground">{spot.name}</h2>
                        <a href={spot.source} target="_blank" rel="noopener noreferrer" className="skeuo-btn flex-shrink-0 !px-2 !py-1.5">
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <p className="flex items-center gap-1 dateline text-muted-foreground/60 mt-1">
                        <MapPin size={10} /> {spot.neighborhood}
                      </p>
                      <p className="body-text mt-2 line-clamp-2">{spot.description}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span className="skeuo-badge-accent">{spot.category}</span>
                        {spot.tags.slice(0, 3).map((t) => (
                          <span key={t} className="skeuo-badge">{t}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-16 text-center skeuo-card-inset p-8 rounded">
                  <Dumbbell size={32} className="mx-auto mb-3 text-muted-foreground/40" />
                  <p className="headline text-foreground mb-2">No spots match your filters</p>
                  <p className="body-text text-muted-foreground/60">Try adjusting your search or clearing filters.</p>
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
