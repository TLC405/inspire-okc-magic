import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { singlesEvents, singlesCategories, singlesTimeFilters } from "@/data/singlesEvents";
import { ExternalLink, Search } from "lucide-react";

const neighborhoods = ["All Areas", ...Array.from(new Set(singlesEvents.map((e) => e.neighborhood)))];

const Singles = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("All");
  const [time, setTime] = useState("All Events");
  const [hood, setHood] = useState("All Areas");

  const filtered = useMemo(() => {
    return singlesEvents.filter((evt) => {
      const q = search.toLowerCase();
      const matchSearch = !q || evt.name.toLowerCase().includes(q) || evt.organizer.toLowerCase().includes(q) || evt.venue.toLowerCase().includes(q) || evt.description.toLowerCase().includes(q) || evt.tags.some((t) => t.toLowerCase().includes(q)) || evt.neighborhood.toLowerCase().includes(q);
      const matchCat = category === "All" || evt.category === category;
      const matchTime = time === "All Events" || evt.frequency.toLowerCase().includes(time.toLowerCase());
      const matchHood = hood === "All Areas" || evt.neighborhood === hood;
      return matchSearch && matchCat && matchTime && matchHood;
    });
  }, [search, category, time, hood]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container pt-8 md:pt-12">
          <div className="rule-double mb-4" />
          <h1 className="section-head text-foreground mb-1">Singles Events</h1>
          <p className="dateline text-muted-foreground mb-4">Oklahoma City · {singlesEvents.length} Events · Live</p>
          <div className="rule-thin mb-6" />

          <div className="relative mb-6">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events, venues, neighborhoods..." className="search-input pl-11" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div>
              <p className="dateline text-muted-foreground/50 mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {singlesCategories.map((c) => (
                  <button key={c} onClick={() => setCategory(c)} className={c === category ? "filter-chip-active" : "filter-chip"}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="dateline text-muted-foreground/50 mb-2">Frequency</p>
              <div className="flex flex-wrap gap-1.5">
                {singlesTimeFilters.map((t) => (
                  <button key={t} onClick={() => setTime(t)} className={t === time ? "filter-chip-active" : "filter-chip"}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="dateline text-muted-foreground/50 mb-2">Neighborhood</p>
              <div className="flex flex-wrap gap-1.5">
                {neighborhoods.map((n) => (
                  <button key={n} onClick={() => setHood(n)} className={n === hood ? "filter-chip-active" : "filter-chip"}>{n}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="rule-heavy mb-2" />
          <p className="dateline text-foreground font-bold mb-4">{filtered.length} Results</p>
        </div>

        <div className="container pb-12">
          {filtered.map((evt, i) => (
            <article key={evt.id} className="article-block">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="font-black text-2xl md:text-3xl text-foreground/10 leading-none mt-1 w-8 flex-shrink-0 text-right">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="headline text-foreground">{evt.name}</h2>
                  <p className="subheadline mt-0.5">{evt.organizer} · {evt.venue}</p>
                  <p className="dateline text-muted-foreground/50 mt-1">{evt.neighborhood} · {evt.frequency} · {evt.price}</p>
                  <p className="body-text mt-2">{evt.description}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className="news-badge-accent">{evt.category}</span>
                    {evt.ageRange && <span className="news-badge">{evt.ageRange}</span>}
                    {evt.tags.map((t) => (<span key={t} className="news-badge">{t}</span>))}
                  </div>
                </div>
                <a href={evt.source} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-2 text-muted-foreground/30 hover:text-accent transition-colors"><ExternalLink size={14} /></a>
              </div>
            </article>
          ))}
          {filtered.length === 0 && <div className="py-16 text-center"><p className="dateline text-muted-foreground">No events match your filters</p></div>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Singles;
