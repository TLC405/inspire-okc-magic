import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { ArrowRight, Heart, Dumbbell, Target, HandHeart, MessageCircle, MapPin, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";

const categories = ["All", "Social", "Fitness", "Service", "Coaching", "Conversations"];

const programs = [
  { num: "01", title: "Singles Events", tag: "Social", icon: Heart, description: "Speed dating, mixers, and social gatherings for singles across Oklahoma City.", href: "/singles", count: singlesEvents.length },
  { num: "02", title: "Fitness Oklahoma City", tag: "Fitness", icon: Dumbbell, description: "Gyms, trails, CrossFit, climbing, and running clubs across the metro.", href: "/workouts", count: fitnessSpots.length },
  { num: "03", title: "Volunteering", tag: "Service", icon: HandHeart, description: "Volunteer organizations and community service opportunities.", href: "/volunteering", count: volunteerOrgs.length },
  { num: "04", title: "Coach TLC", tag: "Coaching", icon: Target, description: "Personal coaching, mindset work, and accountability.", href: "/coaching", count: 3 },
  { num: "05", title: "Men-Talk", tag: "Conversations", icon: MessageCircle, description: "Real conversations for men. Access code required.", href: "/men-talk", count: 0 },
];

// Build searchable items from all data
const searchableItems = [
  ...singlesEvents.map(e => ({ title: e.name, desc: e.description, type: "Singles Event", href: e.source, external: true, tags: [e.category, e.neighborhood, ...e.tags] })),
  ...fitnessSpots.map(s => ({ title: s.name, desc: s.description, type: "Fitness", href: s.source, external: true, tags: [s.category, s.neighborhood, ...s.tags] })),
  ...volunteerOrgs.map(o => ({ title: o.name, desc: o.description, type: "Volunteering", href: o.source, external: true, tags: [o.category, o.neighborhood, ...o.tags] })),
];

const Explore = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("All");

  const isSearching = search.trim().length > 0;

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.tag === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = search.toLowerCase();
    return searchableItems.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 20);
  }, [search, isSearching]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="5 Directories" variant="default" />
                <SignalChip label={`${searchableItems.length} Listings`} variant="live" pulse />
              </div>
              <h1 className="display-hero mb-4">Explore</h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Search across all directories — singles events, fitness spots, volunteer orgs, coaching, and more.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search + Category filters */}
        <section className="py-6 border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container max-w-5xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search everything — events, gyms, orgs, neighborhoods..."
                  className="w-full bg-transparent border border-border text-foreground pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`label-caps px-3 py-2.5 border transition-all duration-150 ${
                      activeCategory === cat
                        ? "border-accent text-accent bg-accent/10"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search results OR directory list */}
        <section className="py-8 md:py-12">
          <div className="container max-w-5xl">
            {isSearching ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <span className="mono-data text-muted-foreground/40">{searchResults.length} results for "{search}"</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-2">
                  {searchResults.map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.02}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4 p-5 border border-border hover:border-accent/30 transition-all bg-card"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-sm font-bold group-hover:text-accent transition-colors">{item.title}</h3>
                            <SignalChip label={item.type} variant={item.type === "Singles Event" ? "energy" : item.type === "Fitness" ? "default" : "free"} />
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{item.desc}</p>
                        </div>
                        <ExternalLink size={12} className="text-muted-foreground/20 flex-shrink-0 mt-1" />
                      </a>
                    </ScrollReveal>
                  ))}
                  {searchResults.length === 0 && (
                    <div className="text-center py-12 border border-border">
                      <p className="text-muted-foreground">No results found for "{search}"</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <span className="mono-data text-muted-foreground/40">{filteredPrograms.length} Directories</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-4">
                  {filteredPrograms.map((program) => (
                    <ScrollReveal key={program.num}>
                      <Link
                        to={program.href}
                        className="group flex items-start gap-5 md:gap-8 p-6 md:p-8 border border-border hover:border-accent/40 transition-all duration-150 bg-card"
                      >
                        <span className="mono-data text-signal-secondary flex-shrink-0 w-8 pt-1">({program.num})</span>
                        <div className="flex-shrink-0 w-12 h-12 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                          <program.icon size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors">
                              {program.title}
                            </h2>
                            <SignalChip label={program.tag} variant="default" />
                            {program.count > 0 && (
                              <span className="mono-data text-accent">{program.count} listings</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
                        </div>
                        <ArrowRight size={16} className="text-muted-foreground/20 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-12 md:py-16 border-t border-border">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-accent" />
                <span className="label-caps text-muted-foreground">Serving All of Oklahoma City</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {["Midtown", "Bricktown", "Paseo Arts", "Plaza District", "NW Oklahoma City", "Deep Deuce", "Automobile Alley", "Film Row", "Uptown 23rd", "Capitol Hill"].map((area) => (
                  <button
                    key={area}
                    onClick={() => setSearch(area)}
                    className="border border-border px-3 py-2.5 text-sm text-muted-foreground hover:border-accent hover:text-foreground transition-colors text-center"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
