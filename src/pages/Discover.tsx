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

const categoryColors: Record<ShowcaseCategory, string> = {
  architecture: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  policy: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  sustainability: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  culture: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  growth: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
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
        {/* Hero */}
        <div className="container pt-12 md:pt-20 pb-6">
          <div className="rule-double mb-6" />
          <h1 className="masthead text-foreground text-center">DISCOVER</h1>
          <p className="masthead-sub text-center text-muted-foreground mb-2">Oklahoma City</p>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 font-serif text-lg leading-relaxed">
            100 extraordinary facts about architecture, policy, sustainability, culture, and growth
            in one of America's most dynamic cities.
          </p>
          <div className="rule-heavy mb-6" />

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search 100 items — buildings, laws, culture…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-foreground/10 bg-background text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none transition-colors font-sans text-sm"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {showcaseCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`label-caps px-4 py-2 border transition-all duration-150 ${
                  activeCategory === cat.value
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {cat.label} <span className="opacity-50 ml-1">{categoryCounts[cat.value] || 0}</span>
              </button>
            ))}
          </div>

          <div className="rule-thin mb-8" />
        </div>

        {/* Results */}
        <div className="container pb-16">
          <p className="dateline text-muted-foreground mb-6">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'all' && ` in ${showcaseCategories.find(c => c.value === activeCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {filtered.map((item, index) => {
              const Icon = categoryIcons[item.category];
              return (
                <article
                  key={item.id}
                  className={`p-6 border-b border-foreground/10 ${
                    index % 3 !== 2 ? 'lg:border-r' : ''
                  } ${index % 2 !== 1 ? 'md:border-r lg:border-r-0' : 'md:border-r-0'} ${
                    index % 3 !== 2 ? 'lg:border-r' : 'lg:border-r-0'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="mt-0.5">
                      <Icon size={16} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mb-2 ${categoryColors[item.category]}`}>
                        {item.category}
                      </span>
                      <h3 className="headline text-foreground leading-tight">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 italic">{item.subtitle}</p>
                    </div>
                    {item.stat && (
                      <span className="text-xs font-black text-foreground bg-foreground/5 px-2 py-1 whitespace-nowrap">
                        {item.stat}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 font-serif">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="news-badge">{tag}</span>
                    ))}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-foreground transition-colors ml-auto"
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
                className="mt-4 label-caps text-accent hover:text-foreground transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="container pb-8">
          <div className="rule-heavy mb-4" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="dateline text-muted-foreground/40">Architecture · Policy · Sustainability · Culture · Growth</p>
            <p className="dateline text-muted-foreground/40">100 Reasons to Discover Oklahoma City</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
