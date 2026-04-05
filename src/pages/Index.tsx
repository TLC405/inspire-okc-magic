import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchSurface } from "@/components/SearchSurface";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { cityShowcase } from "@/data/cityShowcase";
import { ArrowRight, Building2, Scale, Leaf, Palette, TrendingUp, Heart, Dumbbell, HandHelping } from "lucide-react";

const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
const dayStr = `${dayNames[today.getDay()]} Edition`;
const totalListings = singlesEvents.length + fitnessSpots.length + volunteerOrgs.length;

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Masthead */}
        <div className="container pt-8 md:pt-20 pb-4 md:pb-6">
          <div className="skeuo-divider mb-4 md:mb-6" />
          <h1 className="masthead text-foreground text-center">INSPIRE</h1>
          <p className="masthead-sub text-center text-muted-foreground mb-3 md:mb-4">Oklahoma City</p>
          <div className="rule-heavy mb-3 md:mb-4" />
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-4 md:mb-6">
            <span className="dateline text-muted-foreground">{dateStr}</span>
            <span className="dateline text-muted-foreground/30">·</span>
            <span className="dateline text-muted-foreground">{dayStr}</span>
            <span className="dateline text-muted-foreground/30">·</span>
            <span className="dateline text-foreground font-bold">{totalListings} Listings</span>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-5 md:mb-8">
            <SearchSurface />
          </div>
          <div className="rule-thin" />
        </div>

        {/* Quick-Nav Cards (mobile) */}
        <div className="container py-4 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {[
              { to: "/singles", icon: Heart, label: "Singles", count: singlesEvents.length },
              { to: "/fitness", icon: Dumbbell, label: "Fitness", count: fitnessSpots.length },
              { to: "/volunteering", icon: HandHelping, label: "Volunteer", count: volunteerOrgs.length },
            ].map(({ to, icon: Icon, label, count }) => (
              <Link key={to} to={to} className="skeuo-card p-4 text-center rounded">
                <Icon size={20} className="mx-auto mb-2 text-accent" />
                <p className="label-caps text-foreground text-[10px]">{label}</p>
                <p className="dateline text-muted-foreground mt-1">{count}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Three-column teasers (desktop) */}
        <div className="container py-4 md:py-12 hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: "Singles", count: singlesEvents.length, items: singlesEvents.slice(0, 3).map(e => ({ id: e.id, name: e.name, sub: e.venue, badge: e.category })), link: "/singles", unit: "events" },
              { title: "Fitness", count: fitnessSpots.length, items: fitnessSpots.slice(0, 3).map(s => ({ id: s.id, name: s.name, sub: s.neighborhood, badge: s.category })), link: "/fitness", unit: "spots" },
              { title: "Volunteering", count: volunteerOrgs.length, items: volunteerOrgs.slice(0, 3).map(o => ({ id: o.id, name: o.name, sub: o.neighborhood, badge: o.category })), link: "/volunteering", unit: "orgs" },
            ].map((col) => (
              <div key={col.title} className="skeuo-card p-6 rounded">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="section-head text-foreground text-xl">{col.title}</h2>
                  <span className="news-badge-live signal-pulse">Live</span>
                </div>
                <p className="dateline text-muted-foreground mb-4">{col.count} {col.unit} · Oklahoma City</p>
                {col.items.map((item, i) => (
                  <div key={item.id} className="py-3 border-b border-foreground/[0.06] last:border-b-0">
                    <span className="dateline text-muted-foreground/30 mr-2">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="headline text-foreground inline text-base">{item.name}</h3>
                    <p className="subheadline mt-0.5 text-sm">{item.sub}</p>
                    <span className="skeuo-badge mt-1">{item.badge}</span>
                  </div>
                ))}
                <Link to={col.link} className="inline-flex items-center gap-2 mt-4 label-caps text-accent hover:text-foreground transition-colors">
                  View all {col.count} {col.unit} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* City Showcase Teaser */}
        <div className="container py-6 md:py-12">
          <div className="skeuo-divider mb-4 md:mb-6" />
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="section-head text-foreground">Discover Oklahoma City</h2>
            <Link to="/discover" className="skeuo-btn">
              View all 100 <ArrowRight size={12} />
            </Link>
          </div>
          <p className="dateline text-muted-foreground mb-4 md:mb-6">Architecture · Policy · Sustainability · Culture · Growth</p>

          <div className="flex md:grid md:grid-cols-5 gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
            {([
              { cat: 'architecture' as const, icon: Building2, label: 'Architecture' },
              { cat: 'policy' as const, icon: Scale, label: 'Policy' },
              { cat: 'sustainability' as const, icon: Leaf, label: 'Sustainability' },
              { cat: 'culture' as const, icon: Palette, label: 'Culture' },
              { cat: 'growth' as const, icon: TrendingUp, label: 'Growth' },
            ]).map(({ cat, icon: Icon, label }) => {
              const items = cityShowcase.filter(x => x.category === cat);
              const featured = items[0];
              return (
                <Link
                  key={cat}
                  to={`/discover?cat=${cat}`}
                  className="skeuo-card p-4 md:p-5 min-w-[160px] md:min-w-0 flex-shrink-0 rounded"
                >
                  <Icon size={16} className="text-muted-foreground mb-3" />
                  <h3 className="label-caps text-foreground mb-1">{label}</h3>
                  <p className="dateline text-muted-foreground mb-3">{items.length} items</p>
                  {featured && (
                    <>
                      <p className="headline text-foreground text-sm leading-tight">{featured.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 italic">{featured.subtitle}</p>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="rule-thin mt-6" />
        </div>

        {/* Bottom edition bar */}
        <div className="container pb-8 hidden md:block">
          <div className="rule-heavy mb-4" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="dateline text-muted-foreground/40">Community · Connection · Health</p>
            <p className="dateline text-muted-foreground/40">Population 700K+ · Metro 1.4M · 405</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
