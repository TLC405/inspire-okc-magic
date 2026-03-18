import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const narrativeBlocks = [
  {
    label: "The Problem",
    heading: "700,000 people. One city. Zero excuses.",
    body: "Oklahoma City has everything — culture, energy, neighborhoods with soul. Midtown, Bricktown, the Paseo Arts District, Plaza District. But connection doesn't happen by accident. People move here, people live here, and still feel like strangers. The infrastructure for belonging barely exists. INSPIRE Oklahoma City was built to change that equation.",
  },
  {
    label: "The Insight",
    heading: "People don't need another social network",
    body: "They need a map. A finder. Something that says: here's where the people are, here's what they're doing, here's how to show up. That's what a directory does. It removes the guesswork and leaves only the action. No algorithms, no feeds, no engagement metrics — just real connection points in your city.",
  },
  {
    label: "The Solution",
    heading: "Five directories. One mission.",
    body: "Social Singles for finding your people. Fitness Oklahoma City for moving your body. Volunteering Oklahoma City for giving back. Coach TLC for personal growth. Men-Talk Oklahoma City for real conversations. Each one independent. Each one free to browse. Each one designed to reduce the friction between wanting to belong and actually belonging.",
  },
];

const values = [
  { num: "01", title: "No Gatekeeping", text: "No membership, no application, no exclusive list. If you're in Oklahoma City, you're in." },
  { num: "02", title: "Reduce Friction", text: "The hardest part of belonging shouldn't be finding where to start." },
  { num: "03", title: "Stay Practical", text: "Directories that connect you to real people, real events, real places." },
  { num: "04", title: "Community First", text: "Every decision asks one question: does this make Oklahoma City more connected?" },
];

const Stories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero — Editorial mode feel */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="mono-data text-primary-foreground/20">Journal · Issue 001</span>
                <div className="h-px flex-1 bg-primary-foreground/10" />
              </div>
              <h1 className="display-hero mb-6">
                The Loneliness{" "}
                <span className="text-accent">Epidemic</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-lg leading-relaxed">
                Why we built five directories for one city — and why Oklahoma City deserved it first.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quote */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="italic text-2xl md:text-4xl font-light text-foreground/50 leading-snug">
                  "The problem isn't a lack of people.<br />It's the friction of finding them."
                </p>
                <p className="mono-data text-muted-foreground/40 mt-6">— The INSPIRE Thesis</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Narrative */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl space-y-16 md:space-y-24">
            {narrativeBlocks.map((block, i) => (
              <ScrollReveal key={block.label}>
                <div className={i % 2 === 0 ? "border-l-2 border-l-accent pl-6 md:pl-10" : "border-r-2 border-r-accent pr-6 md:pr-10 text-right"}>
                  <p className="label-caps text-accent mb-4 tracking-[0.3em]">{block.label}</p>
                  <h2 className="display-section text-foreground mb-6">{block.heading}</h2>
                  <p className={`text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl ${i % 2 !== 0 ? "ml-auto" : ""}`}>{block.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 md:py-20 border-t border-border bg-secondary/10">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <p className="label-caps text-accent tracking-[0.3em]">Principles</p>
                <div className="h-px flex-1 bg-border" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {values.map((v) => (
                <ScrollReveal key={v.num}>
                  <div className="p-8 md:p-10 bg-background hover-lift cursor-default">
                    <span className="mono-data text-signal-secondary">({v.num})</span>
                    <h3 className="text-lg font-bold text-foreground tracking-tight mt-2 mb-3">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground border-t border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <span className="mono-data text-accent mb-4 block">Next</span>
              <h2 className="display-section mb-6">See what we've built</h2>
              <p className="text-sm text-primary-foreground/40 max-w-md mb-8 leading-relaxed">
                Browse the five directories powering connection in Oklahoma City.
              </p>
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

export default Stories;
