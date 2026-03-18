import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { ArrowRight, Heart, Dumbbell, Target, HandHeart, MessageCircle, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Social", "Fitness", "Service", "Coaching", "Conversations"];

const programs = [
  { num: "01", title: "Social Singles", tag: "Social", icon: Heart, description: "Events, meetups, and social gatherings designed for real connection in Oklahoma City.", href: "/singles", energy: "high", status: "Coming Soon" },
  { num: "02", title: "Fitness Oklahoma City", tag: "Fitness", icon: Dumbbell, description: "Gyms, group runs, outdoor classes, and movement culture across the metro.", href: "/workouts", energy: "high", status: "Coming Soon" },
  { num: "03", title: "Volunteering", tag: "Service", icon: HandHeart, description: "Volunteer opportunities and meaningful ways to give back across neighborhoods.", href: "/volunteering", energy: "medium", status: "Coming Soon" },
  { num: "04", title: "Coach TLC", tag: "Coaching", icon: Target, description: "Personal coaching, mindset work, accountability, and growth resources.", href: "/coaching", energy: "medium", status: "Coming Soon" },
  { num: "05", title: "Men-Talk", tag: "Conversations", icon: MessageCircle, description: "Real conversations for men about life, growth, and purpose. Access code required.", href: "/men-talk", energy: "low", status: "Restricted" },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = programs.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.tag === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="5 Directories" variant="default" />
                <span className="mono-data text-primary-foreground/20">Oklahoma City</span>
              </div>
              <h1 className="display-hero mb-6">
                Explore
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                Browse-first discovery across Oklahoma City. Five directories. One mission: reduce the friction of belonging.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search + Category filters */}
        <section className="py-8 border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container max-w-5xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search directories..."
                  className="w-full bg-transparent border border-border text-foreground pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`label-caps px-3 py-2.5 border transition-all duration-150 ${
                      activeCategory === cat
                        ? "border-accent text-accent bg-accent/10"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Directory list */}
        <section className="py-12 md:py-16">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-data text-muted-foreground/40">{filtered.length} Results</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-4">
              {filtered.map((program) => (
                <ScrollReveal key={program.num}>
                  <Link
                    to={program.href}
                    className="group flex items-start gap-5 md:gap-8 p-6 md:p-8 border border-border hover:border-accent/40 transition-all duration-150 bg-card"
                  >
                    <span className="mono-data text-signal-secondary flex-shrink-0 w-8 pt-1">({program.num})</span>
                    <div className="flex-shrink-0 w-12 h-12 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                      <program.icon size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors">
                          {program.title}
                        </h2>
                        <SignalChip label={program.tag} variant="default" />
                        <SignalChip
                          label={program.status}
                          variant={program.status === "Restricted" ? "energy" : "near"}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground/20 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-12 md:py-16 border-t border-border">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-accent" />
                <span className="label-caps text-muted-foreground">Serving All of Oklahoma City</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {["Midtown", "Bricktown", "Paseo Arts", "Plaza District", "NW Oklahoma City", "Deep Deuce", "Automobile Alley", "Film Row", "Uptown 23rd", "Capitol Hill"].map((area) => (
                  <span key={area} className="border border-border px-3 py-2.5 text-sm text-muted-foreground hover:border-accent hover:text-foreground transition-colors cursor-default text-center">
                    {area}
                  </span>
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

export default Explore;
