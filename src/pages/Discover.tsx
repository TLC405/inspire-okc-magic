import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cityShowcase, showcaseCategories, type ShowcaseCategory } from "@/data/cityShowcase";
import { ExternalLink, Search, Building2, Scale, Leaf, Palette, TrendingUp, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-discover.jpg";
import { ListingImage } from "@/components/ListingImage";
import { buildFeed, feedFilterOptions, type FeedFilter } from "@/lib/discoverFeed";

const categoryIcons: Record<ShowcaseCategory, typeof Building2> = {
  architecture: Building2,
  policy: Scale,
  sustainability: Leaf,
  culture: Palette,
  growth: TrendingUp,
};

const Discover = () => {
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFacts, setShowFacts] = useState(false);
  const [factCategory, setFactCategory] = useState<ShowcaseCategory | "all">("all");
  const [visibleCount, setVisibleCount] = useState(12);

  const feedItems = useMemo(() => buildFeed(feedFilter, searchQuery), [feedFilter, searchQuery]);

  const filteredFacts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return cityShowcase.filter((item) => {
      const matchCat = factCategory === "all" || item.category === factCategory;
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [factCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative w-full h-[220px] md:h-[340px] overflow-hidden">
          <img src={heroImg} alt="Oklahoma City skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 container pb-6">
            <h1 className="section-head text-foreground text-3xl md:text-5xl drop-shadow-lg">
              What's Happening in OKC
            </h1>
            <p className="dateline text-foreground/70 mt-1">
              Events, fitness, volunteering & city highlights — all in one feed
            </p>
          </div>
        </div>

        <div className="container pt-4 pb-6">
          {/* Search */}
          <div className="max-w-xl mx-auto mb-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={15} />
              <input
                type="text"
                placeholder="Search events, venues, activities…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="skeuo-search pl-11"
              />
            </div>
          </div>

          {/* Feed Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {feedFilterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setFeedFilter(opt.value); setVisibleCount(12); }}
                className={feedFilter === opt.value ? "skeuo-chip-active" : "skeuo-chip"}
              >
                <span className="mr-1">{opt.emoji}</span> {opt.label}
              </button>
            ))}
          </div>

          <div className="rule-thin mb-5" />

          <p className="dateline text-muted-foreground mb-4">
            {feedItems.length} {feedItems.length === 1 ? "item" : "items"} in feed
          </p>

          {/* Feed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {feedItems.slice(0, visibleCount).map((item) => (
              <article key={item.id} className="feed-card skeuo-card rounded-lg overflow-hidden">
                <div className="relative">
                  <ListingImage
                    listingType={item.listingType}
                    listingId={item.listingId}
                    name={item.title}
                    category={item.category}
                    websiteUrl={item.sourceUrl}
                    className="w-full h-44"
                  />
                  {/* Source Badge */}
                  <span className={`feed-source-badge ${item.sourceBadgeColor}`}>
                    {item.sourceName}
                  </span>
                  {/* Feed Category Tag */}
                  <span className="absolute top-2 left-2 skeuo-badge-accent text-[8px]">
                    {item.feedCategory === "event" ? "🎉 Event" : item.feedCategory === "fitness" ? "💪 Fitness" : item.feedCategory === "volunteer" ? "🤝 Volunteer" : "🏙️ Discover"}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="skeuo-badge">{item.category}</span>
                    {item.neighborhood && (
                      <span className="flex items-center gap-0.5 text-muted-foreground text-[10px] font-mono tracking-wider uppercase">
                        <MapPin size={9} /> {item.neighborhood}
                      </span>
                    )}
                  </div>
                  <h3 className="headline text-foreground leading-tight text-base">{item.title}</h3>
                  <p className="body-text mt-1.5 line-clamp-2 text-sm">{item.description}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="skeuo-badge text-[8px]">{tag}</span>
                    ))}
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="skeuo-btn !px-2 !py-1 ml-auto text-[10px]"
                      >
                        View <ExternalLink size={9} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleCount < feedItems.length && (
            <div className="text-center mb-8">
              <button onClick={() => setVisibleCount((c) => c + 12)} className="skeuo-btn">
                Load More ({feedItems.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {feedItems.length === 0 && (
            <div className="text-center py-12 skeuo-card-inset p-8 rounded mb-8">
              <p className="headline text-foreground mb-2">No items found</p>
              <button onClick={() => { setSearchQuery(""); setFeedFilter("all"); }} className="mt-4 skeuo-btn">
                Clear filters
              </button>
            </div>
          )}

          {/* Collapsible 100 Facts */}
          <div className="rule-thin mb-4" />
          <button
            onClick={() => setShowFacts(!showFacts)}
            className="w-full flex items-center justify-between py-3 px-1 group"
          >
            <span className="section-head text-foreground text-lg md:text-2xl">
              Explore 100 OKC Facts
            </span>
            {showFacts ? (
              <ChevronUp size={20} className="text-muted-foreground" />
            ) : (
              <ChevronDown size={20} className="text-muted-foreground" />
            )}
          </button>

          {showFacts && (
            <div className="mt-4 animate-in fade-in duration-300">
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {showcaseCategories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFactCategory(cat.value)}
                    className={factCategory === cat.value ? "skeuo-chip-active" : "skeuo-chip"}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <p className="dateline text-muted-foreground mb-4">
                {filteredFacts.length} facts
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFacts.map((item) => {
                  const Icon = categoryIcons[item.category];
                  return (
                    <article key={item.id} className="skeuo-card rounded overflow-hidden">
                      <ListingImage
                        listingType="discover"
                        listingId={item.id}
                        name={item.title}
                        category={item.category}
                        websiteUrl={item.sourceUrl}
                        className="w-full h-36"
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={14} className="text-accent" />
                          <span className="skeuo-badge-accent">{item.category}</span>
                          {item.stat && <span className="skeuo-badge ml-auto">{item.stat}</span>}
                        </div>
                        <h3 className="headline text-foreground leading-tight">{item.title}</h3>
                        <p className="subheadline mt-0.5">{item.subtitle}</p>
                        <p className="body-text mt-2 line-clamp-3">{item.description}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="skeuo-badge">{tag}</span>
                          ))}
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="skeuo-btn !px-2 !py-1 ml-auto"
                          >
                            Source <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
