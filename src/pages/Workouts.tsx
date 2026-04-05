import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { MetricRail } from "@/components/MetricRail";
import { ExternalLink, Filter, Dumbbell, MapPin } from "lucide-react";
import { fitnessSpots, fitnessCategories, type FitnessSpot } from "@/data/fitnessSpots";

const Workouts = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return fitnessSpots.filter((s) => activeCategory === "All" || s.category === activeCategory);
  }, [activeCategory]);

  const neighborhoods = [...new Set(fitnessSpots.map(s => s.neighborhood))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Directory 02" variant="energy" />
                <SignalChip label={`${fitnessSpots.length} Spots`} variant="live" pulse />
              </div>
              <h1 className="display-hero mb-2">Fitness</h1>
              <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-black tracking-[-0.03em] text-accent leading-[0.9] mb-4">Oklahoma City</h2>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                CrossFit boxes, trails, running clubs, climbing gyms — every way to move in the metro.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container max-w-5xl">
            <MetricRail items={[
              { label: "Locations", value: String(fitnessSpots.length), accent: true },
              { label: "Categories", value: String(fitnessCategories.length - 1) },
              { label: "Areas", value: String(neighborhoods.length) },
              { label: "Status", value: "Live", accent: true },
            ]} />
          </div>
        </section>

        {/* Filter bar */}
        <section className="py-4 border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={14} className="text-muted-foreground/40 flex-shrink-0" />
              {fitnessCategories.map((cat) => (
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
          </div>
        </section>

        {/* Location cards — grid layout (different from Singles list) */}
        <section className="py-8 md:py-12">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-data text-muted-foreground/40">{filtered.length} Results</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((spot, i) => (
                <ScrollReveal key={spot.id} delay={i * 0.03}>
                  <a
                    href={spot.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 border border-border hover:border-accent/40 transition-all bg-card h-full"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Dumbbell size={14} className="text-accent" />
                        <SignalChip label={spot.category} variant="default" />
                      </div>
                      <ExternalLink size={12} className="text-muted-foreground/20 group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-accent transition-colors">{spot.name}</h3>
                    <p className="mono-data text-accent mb-3">{spot.neighborhood}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{spot.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {spot.tags.map(t => (
                        <span key={t} className="mono-data text-muted-foreground/30">{t}</span>
                      ))}
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Spots map teaser */}
        <section className="py-12 md:py-16 border-t border-border bg-secondary/10">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-accent" />
                <span className="label-caps text-muted-foreground">Fitness Areas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((area) => (
                  <span key={area} className="border border-border px-3 py-2 text-sm text-muted-foreground hover:border-accent hover:text-foreground transition-colors cursor-default">{area}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Workouts;
