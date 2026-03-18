import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { Calendar, Filter, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const filterCategories = ["All", "Music", "Wellness", "Social", "Dining", "Volunteering", "Fitness", "Art"];
const timeFilters = ["Today", "Tonight", "Tomorrow", "This Weekend", "This Week"];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Coming Soon" variant="trending" />
              </div>
              <h1 className="display-hero mb-6">Events</h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                High-signal event discovery across Oklahoma City. Every event worth knowing about, structured for fast decisions.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Filter architecture preview */}
        <section className="py-6 border-b border-border bg-card">
          <div className="container max-w-5xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                <Filter size={14} className="text-muted-foreground/40 flex-shrink-0" />
                {timeFilters.map((t) => (
                  <button key={t} className="label-caps px-3 py-2 border border-border text-muted-foreground/50 cursor-default flex-shrink-0">
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {filterCategories.map((c) => (
                  <button key={c} className="label-caps px-3 py-2 border border-border text-muted-foreground/50 cursor-default flex-shrink-0">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder content */}
        <section className="py-20 md:py-32">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <div className="border border-border p-12 md:p-20 bg-card">
                <div className="w-16 h-16 border border-accent flex items-center justify-center mx-auto mb-8">
                  <Calendar size={24} className="text-accent" />
                </div>
                <h2 className="display-section mb-4">Event Intelligence</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                  A structured, high-signal event index is being built for Oklahoma City. Categories, energy scores, vibe indicators, and real-time availability — all in one interface.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <SignalChip label="Energy Scores" variant="energy" />
                  <SignalChip label="Vibe Tags" variant="near" />
                  <SignalChip label="Live Status" variant="live" pulse />
                  <SignalChip label="Free Events" variant="free" />
                </div>
                <span className="mono-data text-accent">Launching Spring 2026</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Explore directories in the meantime */}
        <section className="py-16 md:py-20 border-t border-border bg-secondary/20">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <p className="label-caps text-muted-foreground mb-4">In the meantime</p>
              <h3 className="title-lg mb-6">Browse the Directories</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Each directory is already live with events and activities for Oklahoma City.
              </p>
              <Link to="/explore" className="inline-flex items-center gap-3 border border-accent text-accent label-caps py-3.5 px-8 hover:bg-accent hover:text-accent-foreground transition-all duration-150">
                Explore Directories <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
