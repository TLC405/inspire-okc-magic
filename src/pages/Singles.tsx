import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Heart, Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { num: "01", title: "Curated Events", desc: "Mixers, speed-dates, and social gatherings designed for real connection — not swiping.", icon: Calendar },
  { num: "02", title: "Group Meetups", desc: "Weekly and monthly group outings across Oklahoma City neighborhoods. Low pressure, high energy.", icon: Users },
  { num: "03", title: "Experience-Based", desc: "From rooftop socials to food crawls — events built around shared experiences, not awkward small talk.", icon: Sparkles },
];

const neighborhoods = ["Midtown", "Bricktown", "Paseo Arts", "Plaza District", "Deep Deuce", "Automobile Alley", "Film Row", "Uptown 23rd"];

const Singles = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-24 md:pt-44 md:pb-36 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-primary-foreground/20 text-xs">REF: OKLAHOMA-CITY-SINGLES-001</span>
                <div className="h-px flex-1 bg-primary-foreground/10" />
              </div>
              <p className="label-caps text-accent mb-4 tracking-[0.3em]">Directory (01)</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-6">
                Social Singles{" "}
                <span className="text-accent">Oklahoma City</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Events, meetups, and social gatherings built for singles who want to meet real people in Oklahoma City.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 md:py-32 border-b-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="italic text-3xl md:text-5xl font-light text-foreground/60 leading-snug">
                  "Connection doesn't happen<br />behind a screen."
                </p>
                <p className="label-caps text-muted-foreground/40 mt-8">— Social Singles Oklahoma City</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

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

        <section className="py-16 md:py-20 border-t-2 border-border bg-secondary/20">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <MapPin size={14} className="text-accent" />
                <p className="label-caps text-muted-foreground tracking-[0.3em]">Oklahoma City Neighborhoods</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {neighborhoods.map((area) => (
                  <span key={area} className="border-2 border-border px-4 py-3 text-sm text-muted-foreground font-medium hover:border-accent hover:text-foreground transition-colors cursor-default text-center">{area}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-20 border-t-2 border-border">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="border-2 border-accent p-8 md:p-12 text-center">
                <span className="font-mono text-accent text-xs mb-3 block">STATUS</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Launching Spring 2026</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Social Singles Oklahoma City is currently in development. Be among the first to experience curated connection events.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <span className="font-mono text-accent text-xs mb-4 block">EXPLORE MORE</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-8">Browse All Directories</h2>
              <Link to="/community" className="inline-flex items-center gap-3 border-2 border-accent text-accent label-caps py-4 px-10 hover:bg-accent hover:text-accent-foreground transition-all duration-150">
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

export default Singles;
