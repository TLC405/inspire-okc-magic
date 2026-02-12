import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MenTalkGate } from "@/components/MenTalkGate";
import { MessageCircle, Shield, Users, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  { num: "01", icon: MessageCircle, title: "Real Conversations", text: "Unfiltered dialogue about the things that actually matter. No scripts, no performance." },
  { num: "02", icon: Shield, title: "Safe Space", text: "What's said here stays here. A place to be honest without judgment." },
  { num: "03", icon: Users, title: "Brotherhood", text: "Men supporting men. Accountability, growth, and genuine connection." },
];

const Podcast = () => {
  return (
    <MenTalkGate>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
            <div className="container max-w-4xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-primary-foreground/20 text-xs">REF: RESTRICTED-ACCESS</span>
                  <div className="h-px flex-1 bg-primary-foreground/10" />
                </div>
                <p className="label-caps text-accent mb-4 tracking-[0.3em]">Directory (05)</p>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-6">
                  Men-Talk{" "}
                  <span className="text-accent">OKC</span>
                </h1>
                <p className="text-base md:text-lg text-primary-foreground/40 max-w-lg leading-relaxed">
                  Real conversations for men in Oklahoma City. No filters, no fluff, no posturing. Just honest dialogue about life, growth, and purpose.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 md:py-28 border-b-2 border-border">
            <div className="container max-w-3xl">
              <ScrollReveal>
                <div className="quote-block">
                  <p className="italic text-2xl md:text-4xl font-light text-foreground/60 leading-snug">
                    "Men don't need more advice.<br />
                    They need a room where they can finally be honest."
                  </p>
                  <p className="label-caps text-muted-foreground/40 mt-6">— Men-Talk Principle</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Pillars */}
          <section className="py-20 md:py-28">
            <div className="container max-w-4xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-12">
                  <p className="label-caps text-accent tracking-[0.3em]">Foundation</p>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-border">
                {pillars.map((p) => (
                  <ScrollReveal key={p.num}>
                    <div className="p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-border last:border-r-0 last:border-b-0 group hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-accent text-xs">({p.num})</span>
                        <div className="w-8 h-8 border-2 border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                          <p.icon size={14} className="text-accent" />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-foreground tracking-tight mb-3">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Sessions launching */}
          <section className="py-20 md:py-28 border-t-2 border-border bg-secondary/20">
            <div className="container max-w-lg text-center">
              <ScrollReveal>
                <div className="border-2 border-border p-12 md:p-16">
                  <div className="w-12 h-12 border-2 border-accent flex items-center justify-center mx-auto mb-6">
                    <Calendar size={20} className="text-accent" />
                  </div>
                  <p className="text-xl font-black text-foreground mb-2">Sessions Launching Soon</p>
                  <p className="label-caps text-accent mb-4 tracking-[0.2em]">Spring 2026</p>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    Conversations, resources, and community updates will live here. The room is being prepared.
                  </p>
                  <Link
                    to="/community"
                    className="inline-flex items-center gap-2 border-2 border-accent text-accent label-caps py-3 px-6 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
                  >
                    Explore Other Directories <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
            <div className="container max-w-3xl">
              <ScrollReveal>
                <span className="font-mono text-accent text-xs mb-4 block">ACCESS GRANTED</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-6">
                  Welcome to the room
                </h2>
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
