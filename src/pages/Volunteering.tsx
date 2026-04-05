import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { MetricRail } from "@/components/MetricRail";
import { ExternalLink, Filter, HandHeart, MapPin } from "lucide-react";
import { volunteerOrgs, volunteerCategories, type VolunteerOrg } from "@/data/volunteerOrgs";

const Volunteering = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return volunteerOrgs.filter((o) => activeCategory === "All" || o.category === activeCategory);
  }, [activeCategory]);

  const neighborhoods = [...new Set(volunteerOrgs.map(o => o.neighborhood))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Directory 03" variant="free" />
                <SignalChip label={`${volunteerOrgs.length} Organizations`} variant="live" pulse />
              </div>
              <h1 className="display-hero mb-2">Volunteering</h1>
              <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-black tracking-[-0.03em] text-signal-positive leading-[0.9] mb-4">Oklahoma City</h2>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Real organizations doing real work. Find where to give your time across Oklahoma City.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container max-w-5xl">
            <MetricRail items={[
              { label: "Organizations", value: String(volunteerOrgs.length), accent: true },
              { label: "Categories", value: String(volunteerCategories.length - 1) },
              { label: "Areas", value: String(neighborhoods.length) },
              { label: "Status", value: "Live", accent: true },
            ]} />
          </div>
        </section>

        <section className="py-4 border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={14} className="text-muted-foreground/40 flex-shrink-0" />
              {volunteerCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`label-caps px-3 py-2 border transition-all duration-150 flex-shrink-0 ${
                    activeCategory === cat
                      ? "border-signal-positive text-signal-positive bg-signal-positive/10"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Org listings — unique layout with category accent bar */}
        <section className="py-8 md:py-12">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-data text-muted-foreground/40">{filtered.length} Organizations</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              {filtered.map((org, i) => (
                <ScrollReveal key={org.id} delay={i * 0.03}>
                  <a
                    href={org.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 md:gap-6 p-5 md:p-6 border border-border hover:border-signal-positive/40 transition-all bg-card"
                  >
                    <div className="w-1 self-stretch bg-signal-positive/20 group-hover:bg-signal-positive transition-colors flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base md:text-lg font-bold text-foreground tracking-tight group-hover:text-signal-positive transition-colors">
                          {org.name}
                        </h3>
                        <SignalChip label={org.category} variant="free" />
                      </div>
                      <p className="mono-data text-signal-positive mb-2">{org.neighborhood}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{org.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {org.tags.map(t => (
                          <span key={t} className="mono-data text-muted-foreground/30">{t}</span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground/20 group-hover:text-signal-positive flex-shrink-0 mt-1 transition-colors" />
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 border-t border-border bg-secondary/10">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-signal-positive" />
                <span className="label-caps text-muted-foreground">Communities Served</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((area) => (
                  <span key={area} className="border border-border px-3 py-2 text-sm text-muted-foreground hover:border-signal-positive hover:text-foreground transition-colors cursor-default">{area}</span>
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

export default Volunteering;
