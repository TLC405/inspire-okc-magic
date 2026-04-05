import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchSurface } from "@/components/SearchSurface";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { cityShowcase } from "@/data/cityShowcase";
import { ArrowRight, Building2, Scale, Leaf, Palette, TrendingUp, Heart, Dumbbell, HandHelping, MapPin, Clock, Users } from "lucide-react";
import heroImg from "@/assets/hero-okc-skyline.jpg";

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
        {/* Hero Image + Masthead */}
        <div className="relative">
          <div className="w-full h-[280px] md:h-[420px] overflow-hidden">
            <img src={heroImg} alt="Oklahoma City skyline at golden hour" className="w-full h-full object-cover object-center" width={1920} height={640} />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h1 className="masthead text-foreground text-center drop-shadow-sm">INSPIRE</h1>
            <p className="masthead-sub text-center text-foreground/80 mb-2 md:mb-3 drop-shadow-sm">Oklahoma City</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-4">
              <span className="dateline text-foreground/70">{dateStr}</span>
              <span className="dateline text-foreground/30">·</span>
              <span className="dateline text-foreground/70">{dayStr}</span>
              <span className="dateline text-foreground/30">·</span>
              <span className="dateline text-foreground font-bold">{totalListings} Listings</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="container -mt-8 relative z-10 mb-6 md:mb-10">
          <div className="max-w-2xl mx-auto">
            <div className="skeuo-card p-4 md:p-6 rounded-lg">
              <SearchSurface />
            </div>
          </div>
        </div>

        {/* Quick-Nav Cards (mobile) */}
        <div className="container py-4 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {[
              { to: "/singles", icon: Heart, label: "Singles", count: singlesEvents.length, desc: "Events" },
              { to: "/fitness", icon: Dumbbell, label: "Fitness", count: fitnessSpots.length, desc: "Spots" },
              { to: "/volunteering", icon: HandHelping, label: "Volunteer", count: volunteerOrgs.length, desc: "Orgs" },
            ].map(({ to, icon: Icon, label, count, desc }) => (
              <Link key={to} to={to} className="skeuo-card p-4 text-center rounded">
                <Icon size={24} className="mx-auto mb-2 text-accent" />
                <p className="label-caps text-foreground text-[10px]">{label}</p>
                <p className="text-2xl font-black text-foreground mt-1">{count}</p>
                <p className="dateline text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Sections — newspaper broadsheet */}
        <div className="container py-6 md:py-12 hidden md:block">
          <div className="rule-heavy mb-6" />
          
          <div className="grid grid-cols-3 gap-0">
            {/* Singles Column */}
            <div className="pr-6 border-r border-foreground/10">
              <div className="flex items-center gap-2 mb-3">
                <Heart size={16} className="text-accent" />
                <h2 className="section-head text-foreground text-xl">Singles</h2>
                <span className="news-badge-live signal-pulse ml-auto">Live</span>
              </div>
              <p className="dateline text-muted-foreground mb-4">{singlesEvents.length} verified events</p>
              
              {singlesEvents.filter(e => e.verificationStatus === "verified").slice(0, 4).map((evt, i) => (
                <div key={evt.id} className={`py-3 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground/10">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="headline text-foreground text-base leading-tight">{evt.name}</h3>
                      <p className="subheadline text-sm mt-0.5">{evt.venue}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="skeuo-badge-accent">{evt.category}</span>
                        <span className="mono-data text-muted-foreground/50">{evt.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link to="/singles" className="inline-flex items-center gap-2 mt-4 skeuo-btn">
                All {singlesEvents.length} events <ArrowRight size={12} />
              </Link>
            </div>

            {/* Fitness Column */}
            <div className="px-6 border-r border-foreground/10">
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell size={16} className="text-accent" />
                <h2 className="section-head text-foreground text-xl">Fitness</h2>
                <span className="news-badge ml-auto">{fitnessSpots.length}+</span>
              </div>
              <p className="dateline text-muted-foreground mb-4">29 categories · All districts</p>
              
              {fitnessSpots.slice(0, 4).map((spot, i) => (
                <div key={spot.id} className={`py-3 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground/10">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="headline text-foreground text-base leading-tight">{spot.name}</h3>
                      <p className="subheadline text-sm mt-0.5">{spot.neighborhood}</p>
                      <span className="skeuo-badge-accent mt-1">{spot.category}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link to="/fitness" className="inline-flex items-center gap-2 mt-4 skeuo-btn">
                All {fitnessSpots.length} spots <ArrowRight size={12} />
              </Link>
            </div>

            {/* Volunteering Column */}
            <div className="pl-6">
              <div className="flex items-center gap-2 mb-3">
                <HandHelping size={16} className="text-accent" />
                <h2 className="section-head text-foreground text-xl">Volunteering</h2>
              </div>
              <p className="dateline text-muted-foreground mb-4">{volunteerOrgs.length} organizations</p>
              
              {volunteerOrgs.slice(0, 4).map((org, i) => (
                <div key={org.id} className={`py-3 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground/10">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="headline text-foreground text-base leading-tight">{org.name}</h3>
                      <p className="subheadline text-sm mt-0.5">{org.neighborhood}</p>
                      <div className="flex gap-1.5 mt-1">
                        <span className="skeuo-badge-accent">{org.category}</span>
                        {org.commitment && <span className="skeuo-badge">{org.commitment}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link to="/volunteering" className="inline-flex items-center gap-2 mt-4 skeuo-btn">
                All {volunteerOrgs.length} orgs <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          <div className="rule-heavy mt-8" />
        </div>

        {/* City Showcase Teaser */}
        <div className="container py-6 md:py-12">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="section-head text-foreground">Discover Oklahoma City</h2>
              <p className="dateline text-muted-foreground mt-1">Architecture · Policy · Sustainability · Culture · Growth</p>
            </div>
            <Link to="/discover" className="skeuo-btn">
              View all 100 <ArrowRight size={12} />
            </Link>
          </div>

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
                <Link key={cat} to={`/discover?cat=${cat}`} className="skeuo-card p-4 md:p-5 min-w-[160px] md:min-w-0 flex-shrink-0 rounded">
                  <Icon size={18} className="text-accent mb-3" />
                  <h3 className="label-caps text-foreground mb-1">{label}</h3>
                  <p className="text-xl font-black text-foreground">{items.length}</p>
                  <p className="dateline text-muted-foreground mb-3">items</p>
                  {featured && (
                    <p className="body-text text-sm leading-tight line-clamp-2">{featured.title}</p>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="rule-thin mt-6" />
        </div>

        {/* Stats Bar */}
        <div className="container pb-8 hidden md:block">
          <div className="skeuo-card-inset p-6 rounded-lg">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-black text-foreground">{totalListings}</p>
                <p className="dateline text-muted-foreground mt-1">Total Listings</p>
              </div>
              <div>
                <p className="text-4xl font-black text-foreground">29</p>
                <p className="dateline text-muted-foreground mt-1">Fitness Categories</p>
              </div>
              <div>
                <p className="text-4xl font-black text-foreground">700K+</p>
                <p className="dateline text-muted-foreground mt-1">Population</p>
              </div>
              <div>
                <p className="text-4xl font-black text-foreground">405</p>
                <p className="dateline text-muted-foreground mt-1">Area Code</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
