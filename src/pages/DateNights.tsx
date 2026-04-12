import { useState, useMemo, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { singlesEvents, getPublishableEvents } from "@/data/singlesEvents";
import { ListingImage } from "@/components/ListingImage";
import { ExternalLink, Heart, Search, Clock, MapPin, Shield, ShieldAlert, Sparkles, Shuffle, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const subCategories = ["All", "Creative", "Outdoor", "Food & Drink", "Entertainment"] as const;

function classifyDateNight(tags: string[], name: string): string {
  const all = [...tags, name].join(" ").toLowerCase();
  if (["paint", "pottery", "stained", "charcuterie", "craft", "glass", "art"].some(k => all.includes(k))) return "Creative";
  if (["outdoor", "garden", "drive-in", "botanical", "skating", "stars"].some(k => all.includes(k))) return "Outdoor";
  if (["cooking", "wine", "food", "dinner", "brunch", "sip"].some(k => all.includes(k))) return "Food & Drink";
  return "Entertainment";
}

function parsePriceLevel(price: string): number {
  if (price.toLowerCase().includes("free")) return 0;
  const matches = price.match(/\$/g);
  if (matches) return matches.length;
  const num = parseInt(price.replace(/[^0-9]/g, ""));
  if (!isNaN(num)) {
    if (num <= 15) return 1;
    if (num <= 40) return 2;
    return 3;
  }
  return 1;
}

const DateNights = () => {
  const [search, setSearch] = useState("");
  const [sub, setSub] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(3);
  const [surpriseEvent, setSurpriseEvent] = useState<typeof singlesEvents[0] | null>(null);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [surpriseAnimating, setSurpriseAnimating] = useState(false);

  const dateNights = useMemo(() => {
    return getPublishableEvents(singlesEvents).filter(e => e.category === "Date Night");
  }, []);

  const filtered = useMemo(() => {
    return dateNights.filter(evt => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        evt.name.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.neighborhood.toLowerCase().includes(q) ||
        evt.tags.some(t => t.toLowerCase().includes(q));
      const matchSub = sub === "All" || classifyDateNight(evt.tags, evt.name) === sub;
      const matchPrice = parsePriceLevel(evt.price) <= maxPrice;
      return matchSearch && matchSub && matchPrice;
    });
  }, [dateNights, search, sub, maxPrice]);

  const triggerSurprise = useCallback(() => {
    setSurpriseAnimating(true);
    setSurpriseRevealed(false);
    setSurpriseEvent(null);

    // Dramatic card-shuffle animation
    setTimeout(() => {
      const pool = filtered.length > 0 ? filtered : dateNights;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setSurpriseEvent(pick);
      setSurpriseRevealed(true);
      setSurpriseAnimating(false);
    }, 1200);
  }, [filtered, dateNights]);

  const priceLabels = ["Free", "$", "$$", "$$$"];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0 animate-fade-in">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-[240px] md:h-[320px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 via-pink-400/20 to-rose-600/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="flex items-center gap-3 mb-3">
              <Heart size={32} className="text-rose-400" fill="currentColor" />
              <Sparkles size={20} className="text-pink-300" />
            </div>
            <h1 className="text-center text-4xl md:text-6xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Date Nights
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2 text-center max-w-md">
              Curated romantic experiences across Oklahoma City
            </p>
            <p className="text-xs text-rose-400/60 mt-1 italic">
              Staff-selected, triple-verified, worth getting dressed up for
            </p>
          </div>
        </div>

        {/* Surprise Me */}
        <div className="container py-4">
          <div className="skeuo-card p-4 md:p-6 rounded-lg text-center">
            <button
              onClick={triggerSurprise}
              disabled={surpriseAnimating}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/15 text-rose-500 font-bold text-sm hover:bg-rose-500/25 transition-all border border-rose-400/20"
            >
              <Shuffle size={16} className={surpriseAnimating ? "animate-spin" : ""} />
              {surpriseAnimating ? "The editors are choosing..." : "Surprise Me"}
            </button>

            {surpriseRevealed && surpriseEvent && (
              <div className="mt-4 animate-fade-in">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-bold">The Editors Have Chosen</p>
                <div className="max-w-sm mx-auto skeuo-card rounded-lg overflow-hidden border border-rose-200/20">
                  <div className="h-40 relative">
                    <ListingImage
                      listingType="singles"
                      listingId={surpriseEvent.id}
                      name={surpriseEvent.name}
                      category={surpriseEvent.category}
                      websiteUrl={surpriseEvent.sources[0]?.url}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3">
                      <p className="text-white font-bold text-base">{surpriseEvent.name}</p>
                      <p className="text-white/70 text-xs">{surpriseEvent.venue}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={10} />{surpriseEvent.neighborhood}
                      <span className="text-foreground/20">·</span>
                      {surpriseEvent.price}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{surpriseEvent.description}</p>
                    {surpriseEvent.sources[0]?.url && (
                      <a href={surpriseEvent.sources[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs text-rose-500 hover:underline font-semibold">
                        Book This <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
                <button onClick={() => { setSurpriseEvent(null); setSurpriseRevealed(false); }} className="mt-2 text-xs text-muted-foreground hover:text-foreground">
                  <X size={10} className="inline mr-1" />Dismiss
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="container py-2">
          <div className="rounded-lg border border-rose-200/20 bg-rose-500/[0.03] p-4 space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400/60" />
              <input
                type="text"
                placeholder="Search date ideas, venues..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-background border border-rose-200/30 rounded text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-rose-400/50"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {subCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSub(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    sub === cat
                      ? "bg-rose-500/20 text-rose-500 border border-rose-400/30 shadow-sm"
                      : "bg-muted/30 text-muted-foreground border border-transparent hover:bg-rose-500/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Budget slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium w-16">Budget:</span>
              <Slider
                value={[maxPrice]}
                onValueChange={(v) => setMaxPrice(v[0])}
                min={0}
                max={3}
                step={1}
                className="flex-1"
              />
              <span className="text-xs font-bold text-rose-500 w-10 text-right">
                {maxPrice === 0 ? "Free" : "$".repeat(maxPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container pb-8 pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            <Heart size={12} className="inline text-rose-400 mr-1" />
            {filtered.length} date night{filtered.length !== 1 ? "s" : ""} found
          </p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(evt => (
                <DateNightCard key={evt.id} event={evt} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-bold text-foreground mb-1">No matches for these filters</p>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting your search, category, or budget</p>
              <button onClick={() => { setSearch(""); setSub("All"); setMaxPrice(3); }} className="px-4 py-2 rounded bg-rose-500/10 text-rose-500 text-sm font-medium hover:bg-rose-500/20 transition-colors">
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="container pb-8">
          <div className="rounded-lg border border-rose-200/10 bg-rose-500/[0.02] p-4 text-center">
            <p className="text-xs text-muted-foreground">
              All date nights are verified by our editorial team. Submissions portal coming soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DateNightCard = ({ event: evt }: { event: typeof singlesEvents[0] }) => (
  <div className="rounded-lg overflow-hidden border border-rose-200/15 bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div className="h-44 relative">
      <ListingImage
        listingType="singles"
        listingId={evt.id}
        name={evt.name}
        category={evt.category}
        websiteUrl={evt.sources[0]?.url}
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-rose-500/10" />
      <div className="absolute top-2 right-2">
        <Heart size={16} className="text-rose-400 drop-shadow-md" fill="currentColor" />
      </div>
      <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-100 text-[10px] font-semibold backdrop-blur-sm">
          Date Night
        </span>
        <span className="text-white/70 text-[10px] font-mono">{evt.price}</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-base font-bold text-foreground leading-tight">{evt.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{evt.venue}</p>
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <MapPin size={10} className="text-rose-400/60" />{evt.neighborhood}
        <span className="text-foreground/20">·</span>
        <Clock size={10} className="text-rose-400/60" />{evt.frequency}
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{evt.description}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {evt.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500/80 text-[9px] font-medium">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-rose-200/10">
        <div className="flex items-center gap-1">
          {evt.verificationStatus === "verified" ? (
            <Shield size={12} className="text-emerald-500" />
          ) : (
            <ShieldAlert size={12} className="text-amber-500" />
          )}
          <span className="text-[10px] text-muted-foreground">{evt.confidenceScore}%</span>
        </div>
        {evt.sources[0]?.url && (
          <a href={evt.sources[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-rose-500 hover:underline">
            Visit <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default DateNights;
