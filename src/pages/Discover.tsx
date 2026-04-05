import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cityShowcase, showcaseCategories, type ShowcaseCategory } from "@/data/cityShowcase";
import { ExternalLink, Search, Building2, Scale, Leaf, Palette, TrendingUp } from "lucide-react";

const categoryIcons: Record<ShowcaseCategory, typeof Building2> = {
  architecture: Building2,
  policy: Scale,
  sustainability: Leaf,
  culture: Palette,
  growth: TrendingUp,
};

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return cityShowcase.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: cityShowcase.length };
    cityShowcase.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container pt-8 md:pt-16 pb-6">
          <div className="skeuo-divider mb-6" />
          <h1 className="masthead text-foreground text-center">DISCOVER</h1>
          <p className="masthead-sub text-center text-muted-foreground mb-2">Oklahoma City</p>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 font-serif text-lg leading-relaxed">
            100 extraordinary facts about architecture, policy, sustainability, culture, and growth.
          </p>
          <div className="rule-heavy mb-6" />

          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={15} />
              <input
                type="text"
                placeholder="Search 100 items — buildings, laws, culture…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="skeuo-search pl-11"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {showcaseCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={activeCategory === cat.value ? 'skeuo-chip-active' : 'skeuo-chip'}
              >
                {cat.label} <span className="opacity-50 ml-1">{categoryCounts[cat.value] || 0}</span>
              </button>
            ))}
          </div>
          <div className="rule-thin mb-6" />
        </div>

        <div className="container pb-16">
          <p className="dateline text-muted-foreground mb-6">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'all' && ` in ${showcaseCategories.find(c => c.value === activeCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const Icon = categoryIcons[item.category];
              return (
                <article key={item.id} className="skeuo-card p-5 rounded">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-1 self-stretch rounded-full bg-accent/30 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} className="text-muted-foreground" />
                        <span className="skeuo-badge-accent">{item.category}</span>
                        {item.stat && (
                          <span className="skeuo-badge ml-auto">{item.stat}</span>
                        )}
                      </div>
                      <h3 className="headline text-foreground leading-tight">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 italic">{item.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 font-serif line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
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
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-serif text-lg">No items found.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 skeuo-btn"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
