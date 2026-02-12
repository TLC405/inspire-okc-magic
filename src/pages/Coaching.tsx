import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Target, MapPin, Brain, Compass, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { num: "01", title: "Mindset Coaching", desc: "Work with certified coaches on mental performance, emotional intelligence, and personal breakthroughs.", icon: Brain },
  { num: "02", title: "Life Direction", desc: "Career pivots, relationship goals, and lifestyle design — coached guidance for the next chapter.", icon: Compass },
  { num: "03", title: "Accountability", desc: "Weekly check-ins, progress tracking, and peer accountability groups to keep you moving forward.", icon: Flame },
];

const neighborhoods = ["Midtown", "Nichols Hills", "Edmond", "Norman", "NW OKC", "Downtown", "The Village", "Yukon"];

const Coaching = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-24 md:pt-44 md:pb-36 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-primary-foreground/20 text-xs">REF: OKC-COACH-004</span>
                <div className="h-px flex-1 bg-primary-foreground/10" />
              </div>
              <p className="label-caps text-accent mb-4 tracking-[0.3em]">Directory (04)</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-6">
                Coach{" "}
                <span className="text-accent">TLC</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Connect with personal coaching, mindset work, accountability partners, and growth resources in OKC.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quote */}
        <section className="py-24 md:py-32 border-b-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="italic text-3xl md:text-5xl font-light text-foreground/60 leading-snug">
                  "Growth is not automatic.<br />
                  It requires intentional pursuit."
                </p>
                <p className="label-caps text-muted-foreground/40 mt-8">— Coach TLC</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What You'll Find */}
        <section className="py-20 md:py-28">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <p className="label-caps text-accent tracking-[0.3em]">What You'll Find</p>
                <div className="h-px flex-1 bg-border" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <ScrollReveal key={f.num} delay={i * 0.08}>
                  <div className="border-2 border-border p-8 hover:border-accent transition-colors group h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-accent text-sm">({f.num})</span>
                      <div className="w-10 h-10 border-2 border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                        <f.icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black tracking-tight mb-3">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-16 md:py-20 border-t-2 border-border bg-secondary/20">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <MapPin size={14} className="text-accent" />
                <p className="label-caps text-muted-foreground tracking-[0.3em]">Coaching Areas</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {neighborhoods.map((area) => (
                  <span key={area} className="border-2 border-border px-4 py-3 text-sm text-muted-foreground font-medium hover:border-accent hover:text-foreground transition-colors cursor-default text-center">
                    {area}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Launching */}
        <section className="py-16 md:py-20 border-t-2 border-border">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="border-2 border-accent p-8 md:p-12 text-center">
                <span className="font-mono text-accent text-xs mb-3 block">STATUS</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Launching Spring 2026</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Coach TLC is in development. Personal growth coaching and accountability for Oklahoma City.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <span className="font-mono text-accent text-xs mb-4 block">EXPLORE MORE</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-8">
                Browse All Directories
              </h2>
              <Link
                to="/community"
                className="inline-flex items-center gap-3 border-2 border-accent text-accent label-caps py-4 px-10 hover:bg-accent hover:text-accent-foreground transition-all duration-150"
              >
                View Programs <ArrowRight size={14} />
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
