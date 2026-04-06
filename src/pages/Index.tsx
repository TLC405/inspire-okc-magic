import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchSurface } from "@/components/SearchSurface";
import { singlesEvents } from "@/data/singlesEvents";
import { ListingImage } from "@/components/ListingImage";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { cityShowcase } from "@/data/cityShowcase";
import { ArrowRight, Building2, Scale, Leaf, Palette, TrendingUp, Heart, Dumbbell, HandHelping, MapPin, Clock, Users } from "lucide-react";
import heroImg from "@/assets/hero-okc-skyline.jpg";
import heroSingles from "@/assets/hero-singles.jpg";
import heroFitness from "@/assets/hero-fitness.jpg";
import heroVolunteer from "@/assets/hero-volunteer.jpg";
import okcChar1 from "@/assets/okc-char-1.png";
import okcChar2 from "@/assets/okc-char-2.png";

const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
const dayStr = `${dayNames[today.getDay()]} Edition`;
const totalListings = singlesEvents.length + fitnessSpots.length + volunteerOrgs.length;

/** Pick one verified event per unique category for diverse teasers */
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

/** Top photos for the photo grid showcase */
const showcasePhotos = [
  { type: "singles", id: singlesEvents[0]?.id || "s1", name: singlesEvents[0]?.name || "Event", cat: singlesEvents[0]?.category, url: singlesEvents[0]?.sources[0]?.url },
  { type: "fitness", id: fitnessSpots[0]?.id || "f1", name: fitnessSpots[0]?.name || "Gym", cat: fitnessSpots[0]?.category, url: fitnessSpots[0]?.source },
  { type: "fitness", id: fitnessSpots[5]?.id || "f6", name: fitnessSpots[5]?.name || "Studio", cat: fitnessSpots[5]?.category, url: fitnessSpots[5]?.source },
  { type: "volunteer", id: volunteerOrgs[0]?.id || "v1", name: volunteerOrgs[0]?.name || "Org", cat: volunteerOrgs[0]?.category, url: volunteerOrgs[0]?.source },
  { type: "discover", id: cityShowcase[0]?.id || "d1", name: cityShowcase[0]?.title || "Landmark", cat: cityShowcase[0]?.category, url: cityShowcase[0]?.sourceUrl },
  { type: "discover", id: cityShowcase[4]?.id || "d5", name: cityShowcase[4]?.title || "Landmark", cat: cityShowcase[4]?.category, url: cityShowcase[4]?.sourceUrl },
];

const Index = () => {
  const singlesTeaser = getDiverseSinglesTeaser(4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ═══ Hero ═══ */}
        <div className="relative">
          <div className="w-full h-[340px] md:h-[500px] overflow-hidden">
            <img src={heroImg} alt="Oklahoma City skyline at golden hour" className="w-full h-full object-cover object-center" width={1920} height={640} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-4">
              <span className="dateline text-white/80 masthead-shadow">{dateStr}</span>
              <span className="dateline text-white/40">·</span>
              <span className="dateline text-white/80 masthead-shadow">{dayStr}</span>
              <span className="dateline text-white/40">·</span>
              <span className="dateline text-white font-bold masthead-shadow">{totalListings} Listings</span>
            </div>
          </div>
        </div>

        {/* ═══ Search ═══ */}
        <div className="container -mt-14 relative z-10 mb-4 md:mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="skeuo-card p-4 md:p-6 rounded-lg">
              <SearchSurface />
            </div>
          </div>
        </div>

        {/* ═══ Photo Grid Showcase ═══ */}
        <div className="container py-4 md:py-6">
          <h2 className="section-head text-foreground text-lg md:text-xl mb-3">📸 Around the City</h2>
          <div className="photo-grid-showcase">
            {showcasePhotos.map((p, i) => (
              <div key={p.id + i} className={`photo-grid-item ${i === 0 ? "photo-grid-featured" : ""}`}>
                <ListingImage
                  listingType={p.type}
                  listingId={p.id}
                  name={p.name}
                  category={p.cat}
                  websiteUrl={p.url}
                  className="w-full h-full"
                />
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

        {/* ═══ Broadsheet Columns ═══ */}
        <div className="container py-4 md:py-10 hidden md:block">
          <div className="rule-heavy mb-5" />
          
          <div className="grid grid-cols-3 gap-0">
            {/* Singles Column */}
            <div className="pr-6 border-r border-foreground/10">
              <div className="relative mb-4 rounded overflow-hidden">
                <img src={heroSingles} alt="OKC Singles Events" className="column-lead-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <Heart size={14} className="text-white" />
                  <span className="label-caps text-white text-[10px]">Singles</span>
                  <span className="news-badge-live signal-pulse text-[8px] ml-auto">Live</span>
                </div>
              </div>
              <p className="dateline text-muted-foreground mb-3">{singlesEvents.length} verified events</p>
              
              {singlesTeaser.map((evt, i) => (
                <div key={evt.id} className={`py-2.5 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-start gap-2">
                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden">
                      <ListingImage
                        listingType="singles"
                        listingId={evt.id}
                        name={evt.name}
                        category={evt.category}
                        websiteUrl={evt.sources[0]?.url}
                        className="w-full h-full"
                      />
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
            <div className="px-6 border-r border-foreground/10">
              <div className="relative mb-4 rounded overflow-hidden">
                <img src={heroFitness} alt="OKC Fitness Spots" className="column-lead-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <Dumbbell size={14} className="text-white" />
                  <span className="label-caps text-white text-[10px]">Fitness</span>
                  <span className="news-badge text-[8px] bg-white/20 text-white ml-auto">{fitnessSpots.length}+</span>
                </div>
              </div>
              <p className="dateline text-muted-foreground mb-3">29 categories · All districts</p>
              
              {fitnessSpots.slice(0, 4).map((spot, i) => (
                <div key={spot.id} className={`py-2.5 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-start gap-2">
                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden">
                      <ListingImage
                        listingType="fitness"
                        listingId={spot.id}
                        name={spot.name}
                        category={spot.category}
                        websiteUrl={spot.source}
                        className="w-full h-full"
                      />
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
              <div className="relative mb-4 rounded overflow-hidden">
                <img src={heroVolunteer} alt="OKC Volunteering" className="column-lead-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <HandHelping size={14} className="text-white" />
                  <span className="label-caps text-white text-[10px]">Volunteer</span>
                </div>
              </div>
              <p className="dateline text-muted-foreground mb-3">{volunteerOrgs.length} organizations</p>
              
              {volunteerOrgs.slice(0, 4).map((org, i) => (
                <div key={org.id} className={`py-2.5 ${i < 3 ? "border-b border-foreground/[0.06]" : ""}`}>
                  <div className="flex items-start gap-2">
                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden">
                      <ListingImage
                        listingType="volunteer"
                        listingId={org.id}
                        name={org.name}
                        category={org.category}
                        websiteUrl={org.source}
                        className="w-full h-full"
                      />
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

        {/* ═══ Date Nights Showcase ═══ */}
        <div className="container py-4 md:py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="section-head text-foreground flex items-center gap-2">
                <Heart size={18} className="text-accent" /> Date Nights
              </h2>
              <p className="dateline text-muted-foreground mt-1">Curated experiences for couples & adventurers</p>
            </div>
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
                    <ListingImage
                      listingType="singles"
                      listingId={evt.id}
                      name={evt.name}
                      category={evt.category}
                      websiteUrl={evt.sources[0]?.url}
                      className="w-full h-full"
                    />
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

        {/* ═══ City Showcase Teaser ═══ */}
        <div className="container py-4 md:py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="section-head text-foreground">Discover Oklahoma City</h2>
              <p className="dateline text-muted-foreground mt-1">Architecture · Policy · Sustainability · Culture · Growth</p>
            </div>
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

        {/* ═══ Character accent ═══ */}
        <div className="container py-4 flex items-center gap-4">
          <img src={okcChar2} alt="OKC Character" className="w-20 md:w-28 drop-shadow-lg" />
          <div>
            <p className="headline text-foreground text-sm md:text-base">Your guide to everything OKC</p>
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
