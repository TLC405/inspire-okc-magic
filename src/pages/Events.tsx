import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { singlesEvents, singlesCategories, getPublishableEvents } from "@/data/singlesEvents";
import { ListingImage } from "@/components/ListingImage";
import { ExternalLink, Heart, Search, Clock, MapPin, Shield, ShieldAlert, Users, Sparkles, Zap } from "lucide-react";

const categoryLabels: Record<string, string> = {
  "All": "All Categories",
  "Date Night": "Date Night",
  "Team Building": "Team Building",
  "Speed Dating": "Speed Dating",
  "Mixer": "Mixer",
  "Social": "Social",
  "Dance": "Dance",
  "Activity": "Activity",
  "Faith": "Faith",
};

const editorialTaglines: Record<string, string> = {
  "Date Night": "Curated evenings for couples and adventurers across the metro",
  "Team Building": "Group experiences designed for real connection, not corporate clichés",
  "Speed Dating": "Structured introductions for singles on a schedule",
  "Mixer": "Low-pressure social gatherings across Oklahoma City",
  "Social": "Community events open to everyone — no RSVP required",
  "Dance": "From ballroom to bachata, the city's best dance floors",
  "Activity": "Hands-on group experiences beyond the usual happy hour",
  "Faith": "Community gatherings rooted in shared values and purpose",
};

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
        evt.organizer.toLowerCase().includes(q) ||
        evt.tags.some((t) => t.toLowerCase().includes(q));
      const matchTime =
        timeFilter === "All" ||
        (timeFilter === "Weekly" && evt.frequency.toLowerCase().includes("weekly")) ||
        (timeFilter === "Daily" && evt.frequency.toLowerCase().includes("daily")) ||
        (timeFilter === "Monthly" && evt.frequency.toLowerCase().includes("monthly"));
      return matchCat && matchSearch && matchTime;
    });
  }, [publishable, category, search, timeFilter]);

  const dateNights = filtered.filter((e) => e.category === "Date Night");
  const teamBuilding = filtered.filter((e) => e.category === "Team Building");
  const otherEvents = filtered.filter((e) => e.category !== "Date Night" && e.category !== "Team Building");

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-[220px] md:h-[300px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={28} className="text-accent" />
              <Sparkles size={20} className="text-accent/60" />
            </div>
            <h1 className="masthead text-foreground text-center text-3xl md:text-5xl font-black">
              Events &amp; Date Nights
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2 text-center max-w-lg">
              Oklahoma City's curated guide to experiences for couples, groups, and solo adventurers
            </p>
            <p className="dateline text-muted-foreground/60 mt-1">
              Staff Report · Community Desk
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="container py-4">
          <div className="skeuo-card p-4 rounded-lg space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events, venues, vibes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {singlesCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    category === cat
                      ? "bg-accent/20 text-accent border border-accent/30 shadow-sm"
                      : "bg-muted/30 text-muted-foreground border border-transparent hover:bg-muted/50"
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              {["All", "Daily", "Weekly", "Monthly"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    timeFilter === t ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Clock size={10} className="inline mr-1" />{t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category tagline */}
        {category !== "All" && editorialTaglines[category] && (
          <div className="container pb-2">
            <p className="text-center text-sm text-muted-foreground italic">
              {editorialTaglines[category]}
            </p>
          </div>
        )}

        {/* Date Nights Featured */}
        {(category === "All" || category === "Date Night") && dateNights.length > 0 && (
          <div className="container pb-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="section-head text-foreground flex items-center gap-2">
                <Heart size={18} className="text-accent" /> Date Nights
              </h2>
              <span className="text-xs text-muted-foreground italic ml-2 hidden md:inline">
                — Curated evenings for two
              </span>
            </div>
            <p className="dateline text-muted-foreground mb-4">{dateNights.length} curated date experiences</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dateNights.map((evt) => (
                <EventCard key={evt.id} event={evt} accent="rose" />
              ))}
            </div>
          </div>
        )}

        {/* Team Building Featured */}
        {(category === "All" || category === "Team Building") && teamBuilding.length > 0 && (
          <div className="container pb-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="section-head text-foreground flex items-center gap-2">
                <Users size={18} className="text-accent" /> Team Building
              </h2>
              <span className="text-xs text-muted-foreground italic ml-2 hidden md:inline">
                — Group experiences that foster genuine connection
              </span>
            </div>
            <p className="dateline text-muted-foreground mb-4">{teamBuilding.length} group experiences across the metro</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamBuilding.map((evt) => (
                <EventCard key={evt.id} event={evt} accent="blue" />
              ))}
            </div>
          </div>
        )}

        {/* Other Events */}
        {otherEvents.length > 0 && category !== "Date Night" && category !== "Team Building" && (
          <div className="container pb-8">
            <h2 className="section-head text-foreground mb-1">
              {category === "All" ? "All Events" : category}
            </h2>
            <p className="dateline text-muted-foreground mb-4">
              {otherEvents.length} events {category === "All" ? "across all categories" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} accent="accent" />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="container py-16 text-center">
            <p className="text-4xl mb-3">🦗</p>
            <p className="headline text-foreground mb-1">Nothing here but tumbleweeds</p>
            <p className="text-sm text-muted-foreground mb-4">Try different filters or search for something else!</p>
            <button onClick={() => { setSearch(""); setCategory("All"); setTimeFilter("All"); }} className="skeuo-btn">
              Clear all filters
            </button>
          </div>
        )}

        {/* Fun footer note */}
        <div className="container pb-8">
          <div className="skeuo-card-inset p-4 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              All events are verified by our editorial team.
              <br />
              <span className="italic">Have an event to submit? We're building a submissions portal — stay tuned.</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const EventCard = ({ event: evt, accent }: { event: typeof singlesEvents[0]; accent: "rose" | "blue" | "accent" }) => {
  const borderColor = accent === "rose" ? "border-accent/10" : accent === "blue" ? "border-accent/10" : "border-border/50";
  const badgeBg = "bg-accent/20 text-accent-foreground";

  return (
    <div className={`skeuo-card rounded-lg overflow-hidden border ${borderColor} transition-all hover:translate-y-[-2px]`}>
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
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${badgeBg} text-[10px] font-semibold backdrop-blur-sm`}>
            {emoji} {evt.category}
          </span>
          <span className="text-white/70 text-[10px] font-mono">{evt.price}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="headline text-foreground text-base font-bold leading-tight">{evt.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{evt.venue}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <MapPin size={10} />{evt.neighborhood}
          <span className="text-foreground/20">·</span>
          <Clock size={10} />{evt.frequency}
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{evt.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {evt.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="skeuo-badge text-[8px]">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-foreground/[0.06]">
          <div className="flex items-center gap-1">
            {evt.verificationStatus === "verified" ? (
              <Shield size={12} className="text-emerald-500" />
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
  );
};

export default Events;
