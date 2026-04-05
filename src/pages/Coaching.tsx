import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { MetricRail } from "@/components/MetricRail";
import { ArrowRight, Brain, Compass, Flame, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const tracks = [
  {
    num: "01",
    title: "Mindset Coaching",
    desc: "Work with certified coaches on mental performance, emotional intelligence, and personal breakthroughs.",
    icon: Brain,
    focus: ["Confidence", "Decision-making", "Emotional resilience", "Self-awareness"],
  },
  {
    num: "02",
    title: "Life Direction",
    desc: "Career pivots, relationship clarity, lifestyle design — coached guidance for your next chapter.",
    icon: Compass,
    focus: ["Career transitions", "Goal setting", "Relationship goals", "Life design"],
  },
  {
    num: "03",
    title: "Accountability",
    desc: "Weekly check-ins, progress tracking, and peer accountability groups that actually work.",
    icon: Flame,
    focus: ["Weekly check-ins", "Progress tracking", "Peer groups", "Habit building"],
  },
];

const areas = ["Midtown", "Nichols Hills", "Edmond", "Norman", "NW Oklahoma City", "Downtown", "The Village", "Yukon"];

const Coaching = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Directory 04" variant="trending" />
                <SignalChip label="Accepting Clients" variant="live" pulse />
              </div>
              <h1 className="display-hero mb-2">Coach TLC</h1>
              <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-black tracking-[-0.03em] text-signal-highlight leading-[0.9] mb-4">Oklahoma City</h2>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Personal coaching, mindset work, and accountability for people ready to level up in Oklahoma City.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container max-w-5xl">
            <MetricRail items={[
              { label: "Tracks", value: "3", accent: true },
              { label: "Areas", value: String(areas.length) },
              { label: "Format", value: "1-on-1 + Group" },
              { label: "Status", value: "Active", accent: true },
            ]} />
          </div>
        </section>

        {/* Service cards — unique layout with focus areas */}
        <section className="py-12 md:py-16">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="label-caps text-signal-highlight tracking-[0.3em]">Coaching Tracks</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-4">
              {tracks.map((track, i) => (
                <ScrollReveal key={track.num} delay={i * 0.06}>
                  <div className="border border-border p-6 md:p-8 hover:border-signal-highlight/30 transition-all bg-card">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 border border-signal-highlight/30 flex items-center justify-center flex-shrink-0">
                        <track.icon size={20} className="text-signal-highlight" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="mono-data text-signal-highlight">({track.num})</span>
                          <h3 className="text-xl font-bold tracking-tight">{track.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{track.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {track.focus.map(f => (
                            <span key={f} className="border border-border px-2 py-1 text-xs text-muted-foreground/60">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA — unique to coaching */}
        <section className="py-12 md:py-16 border-t border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <div className="border border-signal-highlight/30 p-8 md:p-12">
                <Mail size={24} className="mx-auto mb-4 text-signal-highlight" />
                <h2 className="display-section mb-4">Start a Conversation</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Coaching is personal. Reach out to discuss what you're working on and find the right track.
                </p>
                <Link
                  to="/ask"
                  className="inline-flex items-center gap-3 border border-signal-highlight text-signal-highlight label-caps py-3.5 px-8 hover:bg-signal-highlight hover:text-background transition-all duration-150"
                >
                  Ask Inspire <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 md:py-16 border-t border-border bg-secondary/10">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-signal-highlight" />
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
      </main>
      <Footer />
    </div>
  );
};

export default Coaching;
