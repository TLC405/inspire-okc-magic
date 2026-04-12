import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchSurface } from "@/components/SearchSurface";
import { singlesEvents } from "@/data/singlesEvents";
import { ListingImage } from "@/components/ListingImage";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { cityShowcase } from "@/data/cityShowcase";
import { ArrowRight, Building2, Scale, Leaf, Palette, TrendingUp, Heart, Dumbbell, HandHelping, Mail } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroSingles from "@/assets/hero-singles.jpg";
import heroFitness from "@/assets/hero-fitness.jpg";
import heroVolunteer from "@/assets/hero-volunteer.jpg";
import okcChar2 from "@/assets/okc-char-2.png";
import heroSingles from "@/assets/hero-singles.jpg";
import heroFitness from "@/assets/hero-fitness.jpg";
import heroVolunteer from "@/assets/hero-volunteer.jpg";
import okcChar2 from "@/assets/okc-char-2.png";

const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
const dayStr = `${dayNames[today.getDay()]} Edition`;
const totalListings = singlesEvents.length + fitnessSpots.length + volunteerOrgs.length;

function getDiverseSinglesTeaser(count = 4) {
  const seen = new Set<string>();
  const result: typeof singlesEvents = [];
  for (const evt of singlesEvents) {
    if (evt.verificationStatus !== "verified") continue;
    if (seen.has(evt.category)) continue;
    seen.add(evt.category);
    result.push(evt);
    if (result.length >= count) break;
  }
  if (result.length < count) {
    for (const evt of singlesEvents) {
      if (evt.verificationStatus !== "verified") continue;
      if (result.find(r => r.id === evt.id)) continue;
      result.push(evt);
      if (result.length >= count) break;
    }
  }
  return result;
}

function getDiverseFitnessTeaser(count = 4) {
  const priorityCategories = ["Yoga", "Gym", "HIIT", "Climbing", "Boxing", "Pilates", "Cycling", "Martial Arts", "Outdoor", "CrossFit"];
  const result: typeof fitnessSpots = [];
  const seen = new Set<string>();
  for (const cat of priorityCategories) {
    if (result.length >= count) break;
    const spot = fitnessSpots.find(s => s.category === cat && !seen.has(s.id));
    if (spot) {
      seen.add(spot.id);
      result.push(spot);
    }
  }
  if (result.length < count) {
    for (const spot of fitnessSpots) {
      if (seen.has(spot.id)) continue;
      result.push(spot);
      seen.add(spot.id);
      if (result.length >= count) break;
    }
  }
  return result;
}

// Pick diverse showcase photos — avoid duplicating categories
const yogaSpot = fitnessSpots.find(s => s.category === "Yoga");
const gymSpot = fitnessSpots.find(s => s.category === "Gym");
const showcasePhotos = [
  { type: "singles", id: singlesEvents[0]?.id || "s1", name: singlesEvents[0]?.name || "Event", cat: singlesEvents[0]?.category, url: singlesEvents[0]?.sources[0]?.url },
  { type: "fitness", id: yogaSpot?.id || "f-yoga", name: yogaSpot?.name || "Yoga Studio", cat: yogaSpot?.category || "Yoga", url: yogaSpot?.source },
  { type: "fitness", id: gymSpot?.id || "f-gym", name: gymSpot?.name || "Gym", cat: gymSpot?.category || "Gym", url: gymSpot?.source },
  { type: "volunteer", id: volunteerOrgs[0]?.id || "v1", name: volunteerOrgs[0]?.name || "Org", cat: volunteerOrgs[0]?.category, url: volunteerOrgs[0]?.source },
  { type: "discover", id: cityShowcase[0]?.id || "d1", name: cityShowcase[0]?.title || "Landmark", cat: cityShowcase[0]?.category, url: cityShowcase[0]?.sourceUrl },
  { type: "discover", id: cityShowcase[4]?.id || "d5", name: cityShowcase[4]?.title || "Landmark", cat: cityShowcase[4]?.category, url: cityShowcase[4]?.sourceUrl },
];

/** Decorative section header with ornaments */
function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon?: React.ElementType }) {
  return (
    <div className="mb-4">
      <div className="h-[2px] bg-foreground mb-2" />
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-accent" />}
        <h2 className="section-head text-foreground text-lg md:text-xl">{title}</h2>
        <span className="text-foreground/20 text-xs ml-1">✦</span>
      </div>
      <p className="dateline text-muted-foreground mt-1">{subtitle}</p>
      <div className="h-[1px] bg-foreground/15 mt-2" />
    </div>
  );
}

/** Folio line decoration between sections */
function FolioLine({ page, note }: { page: string; note?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-3">
      <span className="block flex-1 h-[1px] bg-foreground/10" />
      <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground/50">
        {page}{note && ` · ${note}`}
      </span>
      <span className="block flex-1 h-[1px] bg-foreground/10" />
    </div>
  );
}

const Index = () => {
  const singlesTeaser = getDiverseSinglesTeaser(4);
  const fitnessTeaser = getDiverseFitnessTeaser(4);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email: trimmed });
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already subscribed", description: "You're on the list." });
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
        toast({ title: "Subscribed", description: "You'll get the Weekly Brief." });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Try again.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1">
        {/* ═══ Hero Photo Carousel ═══ */}
        <div className="relative">
          <HeroCarousel />
        </div>

        {/* ═══ Newspaper Front Page Headline ═══ */}
        <div className="container relative z-10 -mt-6">
          <div className="bg-background border-t-[4px] border-foreground pt-4 pb-3">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="block flex-1 h-[1px] bg-foreground/30" />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">✦ {dayStr} ✦</span>
              <span className="block flex-1 h-[1px] bg-foreground/30" />
            </div>

            <h2
              className="text-center font-black tracking-[-0.02em] leading-[0.9] text-foreground"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 3.2rem)" }}
            >
              Your Guide to Oklahoma City
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2">
              <span className="dateline text-muted-foreground">{dateStr}</span>
              <span className="text-foreground/20">·</span>
              <span className="dateline text-foreground font-bold">{totalListings} Listings</span>
              <span className="text-foreground/20">·</span>
              <span className="dateline text-muted-foreground">Singles · Fitness · Volunteering · Date Nights</span>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="block flex-1 h-[2px] bg-foreground" />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground">Oklahoma City</span>
              <span className="block flex-1 h-[2px] bg-foreground" />
            </div>
          </div>
        </div>

        {/* ═══ Search ═══ */}
        <div className="container mt-6 relative z-10 mb-4 md:mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="skeuo-card p-4 md:p-6 rounded-lg">
              <SearchSurface />
            </div>
          </div>
        </div>

        <FolioLine page="Page A1" note="Front Page" />

        {/* ═══ Photo Grid Showcase ═══ */}
        <div className="container py-4 md:py-6">
          <SectionHeader title="📸 Around the City" subtitle="Staff Photography · Community Highlights" />
          <div className="photo-grid-showcase">
            {showcasePhotos.map((p, i) => (
              <div key={p.id + i} className={`photo-grid-item ${i === 0 ? "photo-grid-featured" : ""}`}>
                <ListingImage listingType={p.type} listingId={p.id} name={p.name} category={p.cat} websiteUrl={p.url} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-white text-[10px] font-bold uppercase tracking-wider drop-shadow">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="rule-thin mt-4" />
        </div>

        {/* ═══ Quick-Nav Cards (mobile) ═══ */}
        <div className="container py-4 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {[
              { to: "/singles", icon: Heart, label: "Singles", count: singlesEvents.length, desc: "Events", img: heroSingles },
              { to: "/fitness", icon: Dumbbell, label: "Fitness", count: fitnessSpots.length, desc: "Spots", img: heroFitness },
              { to: "/volunteering", icon: HandHelping, label: "Volunteer", count: volunteerOrgs.length, desc: "Orgs", img: heroVolunteer },
            ].map(({ to, icon: Icon, label, count, desc, img }) => (
              <Link key={to} to={to} className="skeuo-card rounded overflow-hidden">
                <div className="relative h-24">
                  <img src={img} alt={label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-3 text-center">
                  <Icon size={20} className="mx-auto mb-1 text-accent" />
                  <p className="label-caps text-foreground text-[10px]">{label}</p>
                  <p className="text-xl font-black text-foreground mt-0.5">{count}</p>
                  <p className="dateline text-muted-foreground">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <FolioLine page="Page A2" note="Broadsheet" />

        {/* ═══ Broadsheet Columns ═══ */}
        <div className="container py-4 md:py-10 hidden md:block">
          <div className="rule-heavy mb-1" />
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted-foreground">❧ Community Desk ❧</span>
          </div>

          <div className="grid grid-cols-3 gap-0">
            {/* Singles Column */}
            <div className="pr-6 border-r border-foreground/15">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-2xl text-foreground/20 leading-none">1</span>
                <div className="h-[1px] flex-1 bg-foreground/10" />
              </div>
              <div className="relative mb-4 rounded overflow-hidden">
                <img src={heroSingles} alt="OKC Singles Events" className="column-lead-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <Heart size={14} className="text-white" />
                  <span className="label-caps text-white text-[10px]">Singles</span>
                  <span className="news-badge-live signal-pulse text-[8px] ml-auto">Live</span>
                </div>
              </div>
              <p className="dateline text-muted-foreground mb-3">{singlesEvents.length} verified events · Staff Report</p>

              {singlesTeaser.map((evt, i) => (
                <div key={evt.id} className={`py-2.5 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground/30 mt-1 font-bold">{i + 1}.</span>
                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden">
                      <ListingImage listingType="singles" listingId={evt.id} name={evt.name} category={evt.category} websiteUrl={evt.sources[0]?.url} className="w-full h-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="headline text-foreground text-[15px] leading-tight truncate">{evt.name}</h3>
                      <p className="subheadline text-sm mt-0.5 truncate">{evt.venue}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="skeuo-badge-accent">{evt.category}</span>
                        <span className="mono-data text-muted-foreground/50">{evt.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/singles" className="inline-flex items-center gap-2 mt-3 skeuo-btn rounded">
                All {singlesEvents.length} events <ArrowRight size={12} />
              </Link>
            </div>

            {/* Fitness Column */}
            <div className="px-6 border-r border-foreground/15">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-2xl text-foreground/20 leading-none">2</span>
                <div className="h-[1px] flex-1 bg-foreground/10" />
              </div>
              <div className="relative mb-4 rounded overflow-hidden">
                <img src={heroFitness} alt="OKC Fitness Spots" className="column-lead-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <Dumbbell size={14} className="text-white" />
                  <span className="label-caps text-white text-[10px]">Fitness</span>
                  <span className="news-badge text-[8px] bg-white/20 text-white ml-auto">{fitnessSpots.length}+</span>
                </div>
              </div>
              <p className="dateline text-muted-foreground mb-3">29 categories · All districts · Staff Report</p>

              {getDiverseFitnessTeaser(4).map((spot, i) => (
                <div key={spot.id} className={`py-2.5 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground/30 mt-1 font-bold">{i + 1}.</span>
                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden">
                      <ListingImage listingType="fitness" listingId={spot.id} name={spot.name} category={spot.category} websiteUrl={spot.source} className="w-full h-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="headline text-foreground text-[15px] leading-tight truncate">{spot.name}</h3>
                      <p className="subheadline text-sm mt-0.5 truncate">{spot.neighborhood}</p>
                      <span className="skeuo-badge-accent mt-1">{spot.category}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/fitness" className="inline-flex items-center gap-2 mt-3 skeuo-btn rounded">
                All {fitnessSpots.length} spots <ArrowRight size={12} />
              </Link>
            </div>

            {/* Volunteering Column */}
            <div className="pl-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-2xl text-foreground/20 leading-none">3</span>
                <div className="h-[1px] flex-1 bg-foreground/10" />
              </div>
              <div className="relative mb-4 rounded overflow-hidden">
                <img src={heroVolunteer} alt="OKC Volunteering" className="column-lead-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <HandHelping size={14} className="text-white" />
                  <span className="label-caps text-white text-[10px]">Volunteer</span>
                </div>
              </div>
              <p className="dateline text-muted-foreground mb-3">{volunteerOrgs.length} organizations · Community Desk</p>

              {volunteerOrgs.slice(0, 4).map((org, i) => (
                <div key={org.id} className={`py-2.5 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground/30 mt-1 font-bold">{i + 1}.</span>
                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden">
                      <ListingImage listingType="volunteer" listingId={org.id} name={org.name} category={org.category} websiteUrl={org.source} className="w-full h-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="headline text-foreground text-[15px] leading-tight truncate">{org.name}</h3>
                      <p className="subheadline text-sm mt-0.5 truncate">{org.neighborhood}</p>
                      <div className="flex gap-1.5 mt-1">
                        <span className="skeuo-badge-accent">{org.category}</span>
                        {org.commitment && <span className="skeuo-badge">{org.commitment}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/volunteering" className="inline-flex items-center gap-2 mt-3 skeuo-btn rounded">
                All {volunteerOrgs.length} orgs <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          <div className="rule-heavy mt-6" />
        </div>

        <FolioLine page="Page A3" note="Lifestyle" />

        {/* ═══ Pull Quote ═══ */}
        <div className="container py-4 md:py-6 hidden md:block">
          <div className="max-w-xl mx-auto text-center py-6">
            <span className="text-5xl text-foreground/15 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>"</span>
            <p
              className="text-foreground/70 italic leading-relaxed -mt-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
            >
              From Bricktown to Paseo, from first dates to last reps — this is your city, curated.
            </p>
            <span className="text-5xl text-foreground/15 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>"</span>
            <p className="dateline text-muted-foreground mt-2">— The Editors</p>
          </div>
          <div className="rule-thin" />
        </div>

        {/* ═══ Date Nights Showcase ═══ */}
        <div className="container py-4 md:py-8">
          <SectionHeader title="Date Nights" subtitle="Curated experiences for couples & adventurers" icon={Heart} />
          <div className="flex items-center justify-end mb-3">
            <Link to="/events" className="skeuo-btn rounded">
              All Events <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {singlesEvents
              .filter((e) => e.category === "Date Night" && e.verificationStatus === "verified")
              .slice(0, 6)
              .map((evt) => (
                <Link
                  key={evt.id}
                  to="/events"
                  className="skeuo-card rounded-lg overflow-hidden min-w-[260px] md:min-w-[300px] flex-shrink-0 hover:shadow-lg transition-shadow"
                >
                  <div className="h-36 relative">
                    <ListingImage listingType="singles" listingId={evt.id} name={evt.name} category={evt.category} websiteUrl={evt.sources[0]?.url} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <h3 className="text-white font-bold text-sm leading-tight">{evt.name}</h3>
                      <p className="text-white/70 text-xs mt-0.5">{evt.venue}</p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{evt.neighborhood}</span>
                    <span className="text-xs font-semibold text-foreground">{evt.price}</span>
                  </div>
                </Link>
              ))}
          </div>
          <div className="rule-thin mt-6" />
        </div>

        <FolioLine page="Page A4" note="City & Culture" />

        {/* ═══ City Showcase Teaser ═══ */}
        <div className="container py-4 md:py-8">
          <SectionHeader title="Discover Oklahoma City" subtitle="Architecture · Policy · Sustainability · Culture · Growth" />
          <div className="flex items-center justify-end mb-3">
            <Link to="/discover" className="skeuo-btn rounded">
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

        <FolioLine page="Page B1" note="Back Page" />

        {/* ═══ Character accent ═══ */}
        <div className="container py-4 flex items-center gap-4">
          <img src={okcChar2} alt="OKC Character" className="w-20 md:w-28 drop-shadow-lg" />
          <div>
            <p className="headline text-foreground text-sm md:text-base">Your guide to everything Oklahoma City</p>
            <p className="text-xs text-muted-foreground mt-0.5">From Bricktown to Paseo — we've got it covered.</p>
          </div>
        </div>

        {/* ═══ Stats Bar ═══ */}
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
