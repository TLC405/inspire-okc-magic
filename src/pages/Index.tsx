import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchSurface } from "@/components/SearchSurface";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { ArrowRight } from "lucide-react";

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
        <div className="container pt-12 md:pt-20 pb-6">
          <div className="rule-double mb-6" />
          <h1 className="masthead text-foreground text-center">INSPIRE</h1>
          <p className="masthead-sub text-center text-muted-foreground mb-4">Oklahoma City</p>
          <div className="rule-heavy mb-4" />
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-6">
            <span className="dateline text-muted-foreground">{dateStr}</span>
            <span className="dateline text-muted-foreground/30">·</span>
            <span className="dateline text-muted-foreground">{dayStr}</span>
            <span className="dateline text-muted-foreground/30">·</span>
            <span className="dateline text-foreground font-bold">{totalListings} Listings</span>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchSurface />
          </div>
          <div className="rule-thin" />
        </div>

        {/* Three-column teasers */}
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Singles Column */}
            <div className="md:pr-6 md:border-r border-foreground/10 pb-8 md:pb-0">
              <div className="flex items-center gap-2 mb-5">
                <h2 className="section-head text-foreground">Singles</h2>
                <span className="news-badge-live signal-pulse">Live</span>
              </div>
              <p className="dateline text-muted-foreground mb-4">{singlesEvents.length} Events · Oklahoma City</p>
              {singlesEvents.slice(0, 3).map((evt, i) => (
                <div key={evt.id} className="article-block">
                  <span className="dateline text-muted-foreground/40 mr-2">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="headline text-foreground inline">{evt.name}</h3>
                  <p className="subheadline mt-1">{evt.venue}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="news-badge">{evt.category}</span>
                    <span className="news-badge">{evt.neighborhood}</span>
                  </div>
                </div>
              ))}
              <Link to="/singles" className="inline-flex items-center gap-2 mt-4 label-caps text-accent hover:text-foreground transition-colors">
                View all {singlesEvents.length} events <ArrowRight size={12} />
              </Link>
            </div>

            {/* Fitness Column */}
            <div className="md:px-6 md:border-r border-foreground/10 pb-8 md:pb-0 border-t md:border-t-0 border-foreground/10 pt-8 md:pt-0">
              <div className="flex items-center gap-2 mb-5">
                <h2 className="section-head text-foreground">Fitness</h2>
                <span className="news-badge-live signal-pulse">Live</span>
              </div>
              <p className="dateline text-muted-foreground mb-4">{fitnessSpots.length} Spots · Oklahoma City</p>
              {fitnessSpots.slice(0, 3).map((spot, i) => (
                <div key={spot.id} className="article-block">
                  <span className="dateline text-muted-foreground/40 mr-2">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="headline text-foreground inline">{spot.name}</h3>
                  <p className="subheadline mt-1">{spot.neighborhood}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="news-badge">{spot.category}</span>
                  </div>
                </div>
              ))}
              <Link to="/fitness" className="inline-flex items-center gap-2 mt-4 label-caps text-accent hover:text-foreground transition-colors">
                View all {fitnessSpots.length} spots <ArrowRight size={12} />
              </Link>
            </div>

            {/* Volunteering Column */}
            <div className="md:pl-6 border-t md:border-t-0 border-foreground/10 pt-8 md:pt-0">
              <div className="flex items-center gap-2 mb-5">
                <h2 className="section-head text-foreground">Volunteering</h2>
                <span className="news-badge-live signal-pulse">Live</span>
              </div>
              <p className="dateline text-muted-foreground mb-4">{volunteerOrgs.length} Organizations · Oklahoma City</p>
              {volunteerOrgs.slice(0, 3).map((org, i) => (
                <div key={org.id} className="article-block">
                  <span className="dateline text-muted-foreground/40 mr-2">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="headline text-foreground inline">{org.name}</h3>
                  <p className="subheadline mt-1">{org.neighborhood}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="news-badge">{org.category}</span>
                  </div>
                </div>
              ))}
              <Link to="/volunteering" className="inline-flex items-center gap-2 mt-4 label-caps text-accent hover:text-foreground transition-colors">
                View all {volunteerOrgs.length} orgs <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom edition bar */}
        <div className="container pb-8">
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
