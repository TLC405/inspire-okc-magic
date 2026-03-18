import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { ExternalLink, Code2, Smartphone, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const apps = [
  { num: "01", name: "INSPIRE Oklahoma City", desc: "Community directory platform — five directories for belonging, connection, and health.", tech: ["React", "TypeScript", "Tailwind"], icon: Globe, status: "Live", url: "/" },
  { num: "02", name: "Social Singles", desc: "Curated events and meetups directory for singles.", tech: ["React", "TypeScript"], icon: Smartphone, status: "In Dev", url: "/singles" },
  { num: "03", name: "Fitness Oklahoma City", desc: "Comprehensive fitness directory — gyms, runs, outdoor classes.", tech: ["React", "TypeScript"], icon: Code2, status: "In Dev", url: "/workouts" },
  { num: "04", name: "Volunteering Oklahoma City", desc: "Directory for volunteer opportunities across the metro.", tech: ["React", "TypeScript"], icon: Code2, status: "In Dev", url: "/volunteering" },
  { num: "05", name: "Coach TLC", desc: "Personal coaching and accountability partner matching.", tech: ["React", "TypeScript"], icon: Code2, status: "In Dev", url: "/coaching" },
];

const MyApps = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Portfolio" variant="default" />
              </div>
              <h1 className="display-hero mb-6">My <span className="text-accent">Apps</span></h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Software built to make Oklahoma City more connected.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-data text-muted-foreground/40">{apps.length} Projects</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              {apps.map((app) => (
                <ScrollReveal key={app.num}>
                  <Link to={app.url} className="group flex items-start gap-5 md:gap-8 p-6 md:p-8 border border-border hover:border-accent/40 transition-all bg-card">
                    <span className="mono-data text-signal-secondary flex-shrink-0 w-8 pt-1">({app.num})</span>
                    <div className="flex-shrink-0 w-12 h-12 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                      <app.icon size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-accent transition-colors">{app.name}</h2>
                        <SignalChip label={app.status} variant={app.status === "Live" ? "live" : "default"} pulse={app.status === "Live"} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{app.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {app.tech.map((t) => (
                          <span key={t} className="mono-data text-muted-foreground/40 border border-border px-2 py-0.5">{t}</span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground/20 group-hover:text-accent transition-all flex-shrink-0 mt-1" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground border-t border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <Link to="/explore" className="inline-flex items-center gap-3 border border-accent text-accent label-caps py-3.5 px-8 hover:bg-accent hover:text-accent-foreground transition-all duration-150">
                Explore Directories <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MyApps;
