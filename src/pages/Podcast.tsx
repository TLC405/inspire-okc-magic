import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MenTalkGate } from "@/components/MenTalkGate";
import { SignalChip } from "@/components/SignalChip";
import { MessageCircle, Shield, Users, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  { num: "01", icon: MessageCircle, title: "Real Conversations", text: "Unfiltered dialogue about the things that actually matter." },
  { num: "02", icon: Shield, title: "Safe Space", text: "What's said here stays here. A place to be honest without judgment." },
  { num: "03", icon: Users, title: "Brotherhood", text: "Men supporting men. Accountability, growth, and genuine connection." },
];

const Podcast = () => {
  return (
    <MenTalkGate>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
            <div className="container max-w-4xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <SignalChip label="Directory 05" variant="energy" />
                  <SignalChip label="Restricted" variant="energy" />
                </div>
                <h1 className="display-hero mb-4">Men-Talk</h1>
                <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-black tracking-[-0.03em] text-accent leading-[0.9] mb-6">Oklahoma City</h2>
                <p className="text-base md:text-lg text-primary-foreground/40 max-w-lg leading-relaxed">
                  Real conversations for men in Oklahoma City. No filters, no fluff, no posturing.
                </p>
              </ScrollReveal>
            </div>
          </section>

          <section className="py-16 md:py-20 border-b border-border">
            <div className="container max-w-3xl">
              <ScrollReveal>
                <div className="quote-block">
                  <p className="italic text-2xl md:text-4xl font-light text-foreground/50 leading-snug">
                    "Men don't need more advice.<br />They need a room where they can finally be honest."
                  </p>
                  <p className="mono-data text-muted-foreground/40 mt-6">— Men-Talk Principle</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="container max-w-4xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-10">
                  <p className="label-caps text-accent tracking-[0.3em]">Foundation</p>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
                {pillars.map((p) => (
                  <ScrollReveal key={p.num}>
                    <div className="bg-background p-8 group hover:bg-accent/5 transition-colors h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="mono-data text-signal-secondary">({p.num})</span>
                        <p.icon size={14} className="text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground tracking-tight mb-3">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 border-t border-border bg-secondary/10">
            <div className="container max-w-lg text-center">
              <ScrollReveal>
                <div className="border border-border p-10 md:p-14 bg-card">
                  <Calendar size={20} className="text-accent mx-auto mb-6" />
                  <p className="text-lg font-bold text-foreground mb-2">Sessions Launching Soon</p>
                  <span className="mono-data text-accent mb-4 block">Spring 2026</span>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    The room is being prepared.
                  </p>
                  <Link to="/explore" className="inline-flex items-center gap-2 border border-accent text-accent label-caps py-3 px-6 hover:bg-accent hover:text-accent-foreground transition-colors">
                    Explore Other Directories <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-primary text-primary-foreground border-t border-border">
            <div className="container max-w-3xl">
              <ScrollReveal>
                <span className="mono-data text-accent mb-4 block">Access Granted</span>
                <h2 className="display-section mb-6">Welcome to the room</h2>
                <p className="text-sm text-primary-foreground/40 max-w-md leading-relaxed">
                  You're here because someone trusted you with the code. Honor that trust. Show up. Be real.
                </p>
              </ScrollReveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MenTalkGate>
  );
};

export default Podcast;
