import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { MetricRail } from "@/components/MetricRail";
import { ArrowRight, MapPin, Brain, Compass, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { num: "01", title: "Mindset Coaching", desc: "Work with certified coaches on mental performance, emotional intelligence, and breakthroughs.", icon: Brain },
  { num: "02", title: "Life Direction", desc: "Career pivots, relationship goals, and lifestyle design — coached guidance for the next chapter.", icon: Compass },
  { num: "03", title: "Accountability", desc: "Weekly check-ins, progress tracking, and peer accountability groups.", icon: Flame },
];

const areas = ["Midtown", "Nichols Hills", "Edmond", "Norman", "NW Oklahoma City", "Downtown", "The Village", "Yukon"];

const Coaching = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Directory 04" variant="trending" />
                <SignalChip label="Development" variant="default" />
              </div>
              <h1 className="display-hero mb-4">Coach TLC</h1>
              <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-black tracking-[-0.03em] text-accent leading-[0.9] mb-6">Oklahoma City</h2>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Personal coaching, mindset work, accountability, and growth resources in Oklahoma City.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container max-w-5xl">
            <MetricRail items={[
              { label: "Areas", value: String(areas.length), accent: true },
              { label: "Tracks", value: "3" },
              { label: "Status", value: "Building", accent: true },
              { label: "Launch", value: "Spring 2026" },
            ]} />
          </div>
        </section>

        <section className="py-20 md:py-28 border-b border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="italic text-2xl md:text-4xl font-light text-foreground/50 leading-snug">
                  "Growth is not automatic.<br />It requires intentional pursuit."
                </p>
                <p className="mono-data text-muted-foreground/40 mt-6">— Coach TLC</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <p className="label-caps text-accent tracking-[0.3em]">What You'll Find</p>
                <div className="h-px flex-1 bg-border" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {features.map((f, i) => (
                <ScrollReveal key={f.num} delay={i * 0.06}>
                  <div className="bg-background p-8 group hover:bg-accent/5 transition-colors h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="mono-data text-signal-highlight">({f.num})</span>
                      <f.icon size={16} className="text-muted-foreground group-hover:text-signal-highlight transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-3">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 border-t border-border bg-secondary/10">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-accent" />
                <span className="label-caps text-muted-foreground">Coaching Areas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <span key={area} className="border border-border px-3 py-2 text-sm text-muted-foreground hover:border-signal-highlight hover:text-foreground transition-colors cursor-default">{area}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 md:py-16 border-t border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <div className="border border-accent p-8 md:p-12">
                <span className="mono-data text-accent mb-3 block">Status</span>
                <h2 className="display-section mb-4">Launching Spring 2026</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Personal growth coaching and accountability for Oklahoma City.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground border-t border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <Link to="/explore" className="inline-flex items-center gap-3 border border-accent text-accent label-caps py-3.5 px-8 hover:bg-accent hover:text-accent-foreground transition-all duration-150">
                Explore All Directories <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Coaching;
