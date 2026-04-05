import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { MetricRail } from "@/components/MetricRail";
import { ExternalLink, Filter, Heart, MapPin } from "lucide-react";
import { singlesEvents, singlesCategories, type SinglesEvent } from "@/data/singlesEvents";

const neighborhoods = [...new Set(singlesEvents.map(e => e.neighborhood))];

const Singles = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTime, setActiveTime] = useState<string>("All Events");

  const filtered = useMemo(() => {
    return singlesEvents.filter((e) => {
      const matchCat = activeCategory === "All" || e.category === activeCategory;
      const matchTime = activeTime === "All Events" ||
        (activeTime === "Weekly" && e.frequency.toLowerCase().includes("weekly")) ||
        (activeTime === "Monthly" && e.frequency.toLowerCase().includes("monthly")) ||
        (activeTime === "Seasonal" && (e.frequency.toLowerCase().includes("seasonal") || e.frequency.toLowerCase().includes("quarterly") || e.frequency.toLowerCase().includes("bi-monthly")));
      return matchCat && matchTime;
    });
  }, [activeCategory, activeTime]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero — distinct from other pages */}
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Directory 01" variant="energy" />
                <SignalChip label={`${singlesEvents.length} Events`} variant="live" pulse />
              </div>
              <h1 className="display-hero mb-2">Singles Events</h1>
              <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-black tracking-[-0.03em] text-accent leading-[0.9] mb-4">Oklahoma City</h2>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Every speed dating night, mixer, social gathering, and singles activity in the metro — researched and verified.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Signal strip */}
        <section className="border-b border-border bg-card">
          <div className="container max-w-5xl">
            <MetricRail items={[
              { label: "Events", value: String(singlesEvents.length), accent: true },
              { label: "Neighborhoods", value: String(neighborhoods.length) },
              { label: "Categories", value: String(singlesCategories.length - 1) },
              { label: "Status", value: "Live", accent: true },
            ]} />
          </div>
        </section>

        {/* Filter bar — sticky */}
        <section className="py-4 border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container max-w-5xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Filter size={14} className="text-muted-foreground/40 flex-shrink-0" />
                {singlesCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`label-caps px-3 py-2 border transition-all duration-150 flex-shrink-0 ${
                      activeCategory === cat
                        ? "border-accent text-accent bg-accent/10"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["All Events", "Weekly", "Monthly", "Seasonal"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTime(t)}
                    className={`label-caps px-3 py-2 border transition-all duration-150 flex-shrink-0 ${
                      activeTime === t
                        ? "border-signal-secondary text-signal-secondary bg-signal-secondary/10"
                        : "border-border text-muted-foreground/50 hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Event list */}
        <section className="py-8 md:py-12">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-data text-muted-foreground/40">{filtered.length} Results</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              {filtered.map((event, i) => (
                <ScrollReveal key={event.id} delay={i * 0.03}>
                  <EventCard event={event} index={i} />
                </ScrollReveal>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 border border-border">
                <Heart size={24} className="mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">No events match your filters.</p>
              </div>
            )}
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-12 md:py-16 border-t border-border bg-secondary/10">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-accent" />
                <span className="label-caps text-muted-foreground">Neighborhoods</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((area) => {
                  const count = singlesEvents.filter(e => e.neighborhood === area).length;
                  return (
                    <button
                      key={area}
                      onClick={() => {}}
                      className="border border-border px-3 py-2 text-sm text-muted-foreground hover:border-accent hover:text-foreground transition-colors cursor-default flex items-center gap-2"
                    >
                      {area}
                      <span className="mono-data text-accent text-[10px]">{count}</span>
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

function EventCard({ event, index }: { event: SinglesEvent; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <a
      href={event.source}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-5 md:gap-8 p-6 md:p-8 border-2 border-border hover:border-accent/60 transition-all duration-200 bg-card"
    >
      <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-1">
        <span className="text-2xl md:text-3xl font-black text-signal-secondary">({num})</span>
        <div className="w-px h-8 bg-border group-hover:bg-accent transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-black text-foreground tracking-tight group-hover:text-accent transition-colors mb-2">
          {event.name}
        </h3>
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <span className="mono-data text-accent font-bold">{event.venue}</span>
          <span className="mono-data text-signal-secondary">{event.neighborhood}</span>
          <span className="mono-data text-muted-foreground">{event.frequency}</span>
          <span className="text-sm font-bold text-signal-highlight">{event.price}</span>
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">{event.description}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <SignalChip label={event.category} variant={event.category === "Speed Dating" ? "energy" : event.category === "Nightlife" ? "live" : "default"} />
          {event.ageRange && <SignalChip label={event.ageRange} variant="near" />}
          {event.tags.slice(0, 3).map(t => (
            <span key={t} className="mono-data text-muted-foreground/50 border border-border px-2 py-0.5">{t}</span>
          ))}
        </div>
      </div>
      <ExternalLink size={16} className="text-muted-foreground/30 group-hover:text-accent flex-shrink-0 mt-2 transition-colors" />
    </a>
  );
}

export default Singles;
