import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ExternalLink, Github, Code2, Smartphone, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const apps = [
  {
    num: "01",
    name: "INSPIRE Oklahoma City",
    desc: "Community directory platform for Oklahoma City — five directories for belonging, connection, and health.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: Globe,
    status: "Live",
    url: "/",
  },
  {
    num: "02",
    name: "Social Singles",
    desc: "Curated events and meetups directory for singles in Oklahoma City.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    icon: Smartphone,
    status: "In Development",
    url: "/singles",
  },
  {
    num: "03",
    name: "Fitness Oklahoma City",
    desc: "Comprehensive fitness directory — gyms, group runs, outdoor classes, and movement culture.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    icon: Code2,
    status: "In Development",
    url: "/workouts",
  },
  {
    num: "04",
    name: "Volunteering Oklahoma City",
    desc: "Directory for volunteer opportunities and community service across the metro.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    icon: Code2,
    status: "In Development",
    url: "/volunteering",
  },
  {
    num: "05",
    name: "Coach TLC",
    desc: "Personal coaching, mindset work, and accountability partner matching for Oklahoma City.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    icon: Code2,
    status: "In Development",
    url: "/coaching",
  },
];

const MyApps = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-24 md:pt-44 md:pb-36 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-primary-foreground/20 text-xs">REF: APP-PORTFOLIO</span>
                <div className="h-px flex-1 bg-primary-foreground/10" />
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-6">
                My{" "}
                <span className="text-accent">Apps</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Software I've built, shipped, and am currently developing. Each project represents a step toward making Oklahoma City more connected.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b-2 border-border bg-secondary/30 border-t-4 border-t-accent">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-3">
              {[
                { value: String(apps.length), label: "Projects" },
                { value: "1", label: "Live" },
                { value: String(apps.length - 1), label: "In Dev" },
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.05}>
                  <div className="py-8 md:py-10 px-6 border-r-2 border-border last:border-r-0 text-center">
                    <p className="text-3xl md:text-5xl font-black text-accent tracking-tight tabular-nums">{stat.value}</p>
                    <p className="label-caps text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Apps list */}
        <section className="py-20 md:py-28">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <p className="label-caps text-accent tracking-[0.3em]">Project Index</p>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-muted-foreground/40 text-xs">{apps.length} TOTAL</span>
              </div>
            </ScrollReveal>

            <div className="border-2 border-border">
              {apps.map((app) => (
                <ScrollReveal key={app.num}>
                  <Link
                    to={app.url}
                    className="group flex items-start gap-5 md:gap-8 p-6 md:p-8 border-b-2 border-border last:border-b-0 hover:bg-secondary/50 transition-all duration-150 border-l-4 border-l-transparent hover:border-l-accent"
                  >
                    <span className="font-mono text-accent text-sm flex-shrink-0 w-8 pt-1">({app.num})</span>
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 border-2 border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                      <app.icon size={22} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h2 className="text-lg md:text-xl font-black text-foreground tracking-tight group-hover:text-accent transition-colors">
                          {app.name}
                        </h2>
                        <span className={`label-caps ${app.status === "Live" ? "text-accent" : "text-muted-foreground/50"}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{app.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {app.tech.map((t) => (
                          <span key={t} className="text-[10px] font-mono text-muted-foreground/60 border border-border px-2 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <span className="font-mono text-accent text-xs mb-4 block">WANT TO SEE MORE?</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-8">
                Explore the Directories
              </h2>
              <Link
                to="/community"
                className="inline-flex items-center gap-3 border-2 border-accent text-accent label-caps py-4 px-10 hover:bg-accent hover:text-accent-foreground transition-all duration-150"
              >
                Browse Programs <ArrowRight size={14} />
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
