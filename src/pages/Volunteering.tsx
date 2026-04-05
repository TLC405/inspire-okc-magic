import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { volunteerOrgs, volunteerCategories, volunteerCommitments, volunteerTypes } from "@/data/volunteerOrgs";
import { ExternalLink, Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const neighborhoods = ["All Areas", ...Array.from(new Set(volunteerOrgs.map((o) => o.neighborhood)))];

const Volunteering = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("All");
  const [hood, setHood] = useState("All Areas");
  const [commitment, setCommitment] = useState("All Commitments");
  const [volType, setVolType] = useState("All Types");

  const filtered = useMemo(() => {
    return volunteerOrgs.filter((org) => {
      const q = search.toLowerCase();
      const matchSearch = !q || org.name.toLowerCase().includes(q) || org.description.toLowerCase().includes(q) || org.tags.some((t) => t.toLowerCase().includes(q)) || org.neighborhood.toLowerCase().includes(q) || org.category.toLowerCase().includes(q);
      const matchCat = category === "All" || org.category === category;
      const matchHood = hood === "All Areas" || org.neighborhood === hood;
      const matchCommit = commitment === "All Commitments" || org.commitment === commitment;
      const matchType = volType === "All Types" || org.type === volType;
      return matchSearch && matchCat && matchHood && matchCommit && matchType;
    });
  }, [search, category, hood, commitment, volType]);

  const activeFilters = [
    ...(category !== "All" ? [{ label: category, clear: () => setCategory("All") }] : []),
    ...(hood !== "All Areas" ? [{ label: hood, clear: () => setHood("All Areas") }] : []),
    ...(commitment !== "All Commitments" ? [{ label: commitment, clear: () => setCommitment("All Commitments") }] : []),
    ...(volType !== "All Types" ? [{ label: volType, clear: () => setVolType("All Types") }] : []),
  ];

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Category</p>
        <div className="flex flex-col gap-1">
          {volunteerCategories.map((c) => {
            const count = c === "All" ? volunteerOrgs.length : volunteerOrgs.filter((o) => o.category === c).length;
            return (
              <button key={c} onClick={() => setCategory(c)} className={`text-left ${c === category ? "skeuo-chip-active" : "skeuo-chip"}`}>
                {c} ({count})
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Commitment</p>
        <div className="flex flex-col gap-1">
          {volunteerCommitments.map((c) => (
            <button key={c} onClick={() => setCommitment(c)} className={`text-left ${c === commitment ? "skeuo-chip-active" : "skeuo-chip"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Type</p>
        <div className="flex flex-col gap-1">
          {volunteerTypes.map((t) => (
            <button key={t} onClick={() => setVolType(t)} className={`text-left ${t === volType ? "skeuo-chip-active" : "skeuo-chip"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Neighborhood</p>
        <Select value={hood} onValueChange={setHood}>
          <SelectTrigger className="w-full bg-transparent border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {neighborhoods.map((n) => (
              <SelectItem key={n} value={n}>{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container pt-6 md:pt-12">
          <div className="skeuo-divider mb-4" />
          <h1 className="section-head text-foreground mb-1">Volunteering</h1>
          <p className="dateline text-muted-foreground mb-2">Oklahoma City · {volunteerOrgs.length} Organizations · {volunteerCategories.length - 1} Categories</p>
          <div className="rule-thin mb-4" />

          <div className="relative mb-4">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search organizations, causes, neighborhoods..." className="skeuo-search pl-11" />
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
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

        <div className="container pb-12">
          <div className="flex gap-8">
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-4 skeuo-card-inset p-5 rounded overflow-y-auto max-h-[calc(100vh-2rem)]">
                <FilterPanel />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((org) => (
                  <article key={org.id} className="skeuo-card p-5 rounded">
                    <div className="flex items-start gap-3">
                      <div className="w-1 self-stretch rounded-full bg-accent/30 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="headline text-foreground">{org.name}</h2>
                          <a href={org.source} target="_blank" rel="noopener noreferrer" className="skeuo-btn flex-shrink-0 !px-2 !py-1.5">
                            <ExternalLink size={12} />
                          </a>
                        </div>
                        <p className="dateline text-muted-foreground/60 mt-1">{org.neighborhood} · {org.category}</p>
                        <p className="body-text mt-2 line-clamp-2">{org.description}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                          <span className="skeuo-badge-accent">{org.category}</span>
                          {org.commitment && <span className="skeuo-badge">{org.commitment}</span>}
                          {org.type && <span className="skeuo-badge">{org.type}</span>}
                          {org.tags.slice(0, 2).map((t) => (<span key={t} className="skeuo-badge">{t}</span>))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {filtered.length === 0 && <div className="py-16 text-center"><p className="dateline text-muted-foreground">No organizations match your filters</p></div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteering;
