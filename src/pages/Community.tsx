import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Heart, Dumbbell, Target, HandHeart, MessageCircle, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const programs = [
  { num: "01", title: "Social Singles OKC", tag: "Community", icon: Heart, description: "Discover singles events, meetups, and social gatherings across Oklahoma City. From casual mixers to curated experiences.", href: "/community" },
  { num: "02", title: "OKC Workouts", tag: "Fitness", icon: Dumbbell, description: "All things fitness — gyms, group runs, outdoor classes, and movement culture in OKC and the greater metro.", href: "/community" },
  { num: "03", title: "Volunteering OKC", tag: "Service", icon: HandHeart, description: "Find volunteer opportunities and meaningful ways to give back across Oklahoma City neighborhoods.", href: "/community" },
  { num: "04", title: "Coach TLC", tag: "Development", icon: Target, description: "Connect with personal coaching, mindset work, accountability partners, and growth resources.", href: "/community" },
  { num: "05", title: "Men-Talk OKC", tag: "Conversation", icon: MessageCircle, description: "Real conversations for men about life, growth, and purpose. No filters, no fluff.", href: "/men-talk" },
];

const stats = [
  { value: "700K+", label: "OKC Population" },
  { value: "5", label: "Directories" },
  { value: "405", label: "Area Code" },
  { value: "∞", label: "Potential" },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden">
          <img
            src={heroBg}
            alt="INSPIRE OKC Community"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="container relative z-10 max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-white/20 text-xs">REF: OKC-DIRECTORIES</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-white leading-[0.85] mb-6">
                Find Your{" "}
                <span className="text-accent">People</span>
              </h1>
              <p className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed">
                Five community directories built to help you connect with real people and real opportunities across Oklahoma City.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b-2 border-border bg-secondary/30">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.05}>
                  <div className="py-8 md:py-10 px-6 border-r-2 border-border last:border-r-0 text-center">
                    <p className="text-3xl md:text-4xl font-black text-accent tracking-tight">{stat.value}</p>
                    <p className="label-caps text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-20 md:py-28 border-b-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="italic text-2xl md:text-4xl font-light text-foreground/60 leading-snug">
                  "The problem isn't a lack of people.<br />
                  It's the friction of finding them."
                </p>
                <p className="label-caps text-muted-foreground/40 mt-6">— The INSPIRE Thesis</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission strip */}
        <section className="py-16 md:py-20 border-b-2 border-border">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-start gap-6 md:gap-12">
                <div className="flex-shrink-0 w-1 bg-accent self-stretch" />
                <div>
                  <p className="label-caps text-accent mb-3 tracking-[0.3em]">Our Approach</p>
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
                    We don't build clubs. We build finders. Each directory is a practical tool designed to reduce the effort of belonging — from Midtown to Bricktown, Paseo to Plaza District, and everywhere in between.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Programs grid */}
        <section className="py-20 md:py-28">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <p className="label-caps text-accent tracking-[0.3em]">Directory Index</p>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-muted-foreground/40 text-xs">{programs.length} ACTIVE</span>
              </div>
            </ScrollReveal>

            <div className="border-2 border-border">
              {programs.map((program) => (
                <ScrollReveal key={program.num}>
                  <Link
                    to={program.href}
                    className="group flex items-center gap-5 md:gap-8 p-6 md:p-8 border-b-2 border-border last:border-b-0 hover:bg-secondary/50 transition-colors duration-150"
                  >
                    <span className="font-mono text-accent text-sm flex-shrink-0 w-8">({program.num})</span>
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 border-2 border-border flex items-center justify-center group-hover:border-accent transition-colors">
                      <program.icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h2 className="text-lg md:text-xl font-black text-foreground tracking-tight group-hover:text-accent transition-colors">
                          {program.title}
                        </h2>
                        <span className="label-caps text-muted-foreground/50">{program.tag}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
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
                <p className="label-caps text-muted-foreground tracking-[0.3em]">Serving All of OKC</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Midtown", "Bricktown", "Paseo Arts", "Plaza District", "NW OKC", "Deep Deuce", "Automobile Alley", "Film Row", "Uptown 23rd", "Capitol Hill"].map((area) => (
                  <span key={area} className="border-2 border-border px-4 py-2 text-sm text-muted-foreground font-medium hover:border-accent hover:text-foreground transition-colors cursor-default">
                    {area}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <span className="font-mono text-accent text-xs mb-4 block">ACTION REQUIRED</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-6">
                Connection starts with showing up
              </h2>
              <p className="text-sm text-primary-foreground/40 max-w-md mb-8 leading-relaxed">
                Every directory is free to browse. Find what resonates, take the first step. No applications. No dues. No gatekeeping.
              </p>
              <div className="flex items-center gap-3">
                <Users size={14} className="text-primary-foreground/20" />
                <p className="text-xs text-primary-foreground/20 font-mono">
                  Population: 700,000+ · Metro: 1.4M · Directories: 5
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
