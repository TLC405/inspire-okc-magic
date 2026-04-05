import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { Calendar, Filter, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";

const allEvents = [
  ...singlesEvents.map(e => ({ ...e, directory: "Singles" as const, type: "event" as const })),
  ...fitnessSpots.map(s => ({ ...s, directory: "Fitness" as const, type: "spot" as const, frequency: "", price: "" })),
  ...volunteerOrgs.map(o => ({ ...o, directory: "Volunteering" as const, type: "org" as const, frequency: "", price: "" })),
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Aggregated" variant="live" pulse />
                <SignalChip label={`${allEvents.length} Listings`} variant="default" />
              </div>
              <h1 className="display-hero mb-2">Events</h1>
              <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-black tracking-[-0.03em] text-accent leading-[0.9] mb-4">Oklahoma City</h2>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Everything happening across all directories — singles events, fitness spots, volunteer opportunities — in one feed.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quick directory links */}
        <section className="py-4 border-b border-border bg-card">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <Filter size={14} className="text-muted-foreground/40 flex-shrink-0" />
              <Link to="/singles" className="label-caps px-3 py-2 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all flex-shrink-0">
                Singles · {singlesEvents.length}
              </Link>
              <Link to="/workouts" className="label-caps px-3 py-2 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all flex-shrink-0">
                Fitness · {fitnessSpots.length}
              </Link>
              <Link to="/volunteering" className="label-caps px-3 py-2 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all flex-shrink-0">
                Volunteering · {volunteerOrgs.length}
              </Link>
              <Link to="/coaching" className="label-caps px-3 py-2 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all flex-shrink-0">
                Coaching
              </Link>
            </div>
          </div>
        </section>

        {/* Aggregated feed */}
        <section className="py-8 md:py-12">
          <div className="container max-w-5xl">
            {/* Singles section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="label-caps text-signal-secondary tracking-[0.2em]">Singles Events</span>
                <div className="h-px flex-1 bg-border" />
                <Link to="/singles" className="mono-data text-accent hover:text-foreground transition-colors">View All →</Link>
              </div>
              <div className="space-y-2">
                {singlesEvents.slice(0, 5).map((event) => (
                  <a key={event.id} href={event.source} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 border border-border hover:border-accent/30 transition-all bg-card">
                    <SignalChip label={event.category} variant="energy" />
                    <span className="text-sm font-bold group-hover:text-accent transition-colors flex-1 truncate">{event.name}</span>
                    <span className="mono-data text-muted-foreground/40 hidden md:block">{event.neighborhood}</span>
                    <span className="mono-data text-signal-highlight hidden md:block">{event.price}</span>
                    <ExternalLink size={12} className="text-muted-foreground/20 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Fitness section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="label-caps text-accent tracking-[0.2em]">Fitness Spots</span>
                <div className="h-px flex-1 bg-border" />
                <Link to="/workouts" className="mono-data text-accent hover:text-foreground transition-colors">View All →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {fitnessSpots.slice(0, 4).map((spot) => (
                  <a key={spot.id} href={spot.source} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 border border-border hover:border-accent/30 transition-all bg-card">
                    <SignalChip label={spot.category} variant="default" />
                    <span className="text-sm font-bold group-hover:text-accent transition-colors flex-1 truncate">{spot.name}</span>
                    <span className="mono-data text-muted-foreground/40">{spot.neighborhood}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Volunteering section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="label-caps text-signal-positive tracking-[0.2em]">Volunteer Opportunities</span>
                <div className="h-px flex-1 bg-border" />
                <Link to="/volunteering" className="mono-data text-accent hover:text-foreground transition-colors">View All →</Link>
              </div>
              <div className="space-y-2">
                {volunteerOrgs.slice(0, 4).map((org) => (
                  <a key={org.id} href={org.source} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 border border-border hover:border-signal-positive/30 transition-all bg-card">
                    <SignalChip label={org.category} variant="free" />
                    <span className="text-sm font-bold group-hover:text-signal-positive transition-colors flex-1 truncate">{org.name}</span>
                    <span className="mono-data text-muted-foreground/40">{org.neighborhood}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
