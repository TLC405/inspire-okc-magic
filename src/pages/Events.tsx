import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { singlesEvents, singlesCategories, getPublishableEvents } from "@/data/singlesEvents";
import { ListingImage } from "@/components/ListingImage";
import { ExternalLink, Heart, Search, Clock, MapPin, Shield, ShieldAlert } from "lucide-react";

const Events = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");

  const publishable = useMemo(() => getPublishableEvents(singlesEvents), []);

  const filtered = useMemo(() => {
    return publishable.filter((evt) => {
      const matchCat = category === "All" || evt.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        evt.name.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.neighborhood.toLowerCase().includes(q) ||
        evt.organizer.toLowerCase().includes(q);
      const matchTime =
        timeFilter === "All" ||
        (timeFilter === "Weekly" && evt.frequency.toLowerCase().includes("weekly")) ||
        (timeFilter === "Daily" && evt.frequency.toLowerCase().includes("daily")) ||
        (timeFilter === "Monthly" && evt.frequency.toLowerCase().includes("monthly"));
      return matchCat && matchSearch && matchTime;
    });
  }, [publishable, category, search, timeFilter]);

  const dateNights = filtered.filter((e) => e.category === "Date Night");
  const otherEvents = filtered.filter((e) => e.category !== "Date Night");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-[200px] md:h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-accent/10 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <Heart size={32} className="text-rose-400 mb-2" />
            <h1 className="masthead text-foreground text-center text-3xl md:text-5xl font-black">Events & Date Nights</h1>
            <p className="dateline text-muted-foreground mt-2">Oklahoma City's best experiences for couples, singles & adventurers</p>
          </div>
        </div>

        {/* Filters */}
        <div className="container py-4">
          <div className="skeuo-card p-4 rounded-lg space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events, venues, neighborhoods..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {singlesCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    category === cat
                      ? cat === "Date Night"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-400/30"
                        : "bg-accent/20 text-accent border border-accent/30"
                      : "bg-muted/30 text-muted-foreground border border-transparent hover:bg-muted/50"
                  }`}
                >
                  {cat === "Date Night" && "❤️ "}{cat}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              {["All", "Daily", "Weekly", "Monthly"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    timeFilter === t
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Clock size={10} className="inline mr-1" />{t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Date Nights Featured */}
        {(category === "All" || category === "Date Night") && dateNights.length > 0 && (
          <div className="container pb-6">
            <h2 className="section-head text-foreground mb-4 flex items-center gap-2">
              <Heart size={18} className="text-rose-400" /> Date Nights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dateNights.map((evt) => (
                <div
                  key={evt.id}
                  className="skeuo-card rounded-lg overflow-hidden border border-rose-400/10 hover:shadow-[0_0_20px_hsl(var(--accent)/0.15)] transition-shadow"
                >
                  <div className="h-40 relative">
                    <ListingImage
                      listingType="singles"
                      listingId={evt.id}
                      name={evt.name}
                      category={evt.category}
                      websiteUrl={evt.sources[0]?.url}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-[10px] font-semibold backdrop-blur-sm">
                        <Heart size={10} /> Date Night
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="headline text-foreground text-base font-bold leading-tight">{evt.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{evt.venue}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <MapPin size={12} />{evt.neighborhood}
                      <span className="text-foreground/20">·</span>
                      <Clock size={12} />{evt.frequency}
                      <span className="text-foreground/20">·</span>
                      <span className="font-semibold text-foreground">{evt.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{evt.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        {evt.verificationStatus === "verified" ? (
                          <Shield size={12} className="text-green-500" />
                        ) : (
                          <ShieldAlert size={12} className="text-amber-500" />
                        )}
                        <span className="text-[10px] text-muted-foreground">{evt.confidenceScore}%</span>
                      </div>
                      {evt.sources[0]?.url && (
                        <a
                          href={evt.sources[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                        >
                          Visit <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Events */}
        {otherEvents.length > 0 && (
          <div className="container pb-8">
            {category !== "Date Night" && (
              <>
                <h2 className="section-head text-foreground mb-4">
                  {category === "All" ? "All Events" : category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherEvents.map((evt) => (
                    <div key={evt.id} className="skeuo-card rounded-lg overflow-hidden">
                      <div className="h-32 relative">
                        <ListingImage
                          listingType="singles"
                          listingId={evt.id}
                          name={evt.name}
                          category={evt.category}
                          websiteUrl={evt.sources[0]?.url}
                          className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-2 left-3">
                          <span className="skeuo-badge-accent text-[10px]">{evt.category}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="headline text-foreground text-sm font-bold leading-tight">{evt.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{evt.venue}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <MapPin size={10} />{evt.neighborhood}
                          <span className="text-foreground/20">·</span>
                          <span className="font-semibold text-foreground">{evt.price}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1">
                            {evt.verificationStatus === "verified" ? (
                              <Shield size={12} className="text-green-500" />
                            ) : (
                              <ShieldAlert size={12} className="text-amber-500" />
                            )}
                            <span className="text-[10px] text-muted-foreground">{evt.confidenceScore}%</span>
                          </div>
                          {evt.sources[0]?.url && (
                            <a
                              href={evt.sources[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                            >
                              Visit <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="container py-12 text-center">
            <p className="text-muted-foreground">No events found matching your filters.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Events;
