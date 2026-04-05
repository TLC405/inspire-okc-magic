import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cityShowcase, showcaseCategories, type ShowcaseCategory } from "@/data/cityShowcase";
import { ExternalLink, Search, Building2, Scale, Leaf, Palette, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-discover.jpg";

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
    cityShowcase.forEach(item => { counts[item.category] = (counts[item.category] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative w-full h-[200px] md:h-[320px] overflow-hidden">
          <img src={heroImg} alt="Oklahoma City Boathouse District" className="w-full h-full object-cover" width={1920} height={512} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container pb-6">
            <h1 className="section-head text-foreground text-3xl md:text-5xl drop-shadow-sm">Discover OKC</h1>
            <p className="dateline text-foreground/70 mt-1 drop-shadow-sm">
              100 extraordinary facts about architecture, policy, sustainability, culture, and growth
            </p>
          </div>
        </div>

        <div className="container pt-4 md:pt-6 pb-6">
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={15} />
              <input type="text" placeholder="Search buildings, laws, culture…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="skeuo-search pl-11" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {showcaseCategories.map((cat) => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className={activeCategory === cat.value ? 'skeuo-chip-active' : 'skeuo-chip'}>
                {cat.label} <span className="opacity-50 ml-1">{categoryCounts[cat.value] || 0}</span>
              </button>
            ))}
          </div>
          <div className="rule-thin mb-6" />

          <p className="dateline text-muted-foreground mb-6">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'all' && ` in ${showcaseCategories.find(c => c.value === activeCategory)?.label}`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const Icon = categoryIcons[item.category];
              return (
                <article key={item.id} className="skeuo-card p-5 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className="text-accent" />
                    <span className="skeuo-badge-accent">{item.category}</span>
                    {item.stat && <span className="skeuo-badge ml-auto">{item.stat}</span>}
                  </div>
                  <h3 className="headline text-foreground leading-tight">{item.title}</h3>
                  <p className="subheadline mt-0.5">{item.subtitle}</p>
                  <p className="body-text mt-2 line-clamp-3">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {item.tags.slice(0, 3).map((tag) => (<span key={tag} className="skeuo-badge">{tag}</span>))}
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="skeuo-btn !px-2 !py-1 ml-auto">
                      Source <ExternalLink size={10} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 skeuo-card-inset p-8 rounded">
              <p className="headline text-foreground mb-2">No items found</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-4 skeuo-btn">Clear filters</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
