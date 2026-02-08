import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const values = [
  { num: "01", title: "No Gatekeeping", text: "There's no membership, no application, no exclusive list. If you're in OKC, you're in." },
  { num: "02", title: "Reduce Friction", text: "The hardest part of belonging shouldn't be finding where to start. We eliminate that barrier." },
  { num: "03", title: "Stay Practical", text: "We build tools, not platforms. Directories that connect you to real people, real events, real places." },
  { num: "04", title: "Community First", text: "Every decision we make asks one question: does this make Oklahoma City more connected?" },
];

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-primary-foreground/20 text-xs">REF: MANIFESTO</span>
                <div className="h-px flex-1 bg-primary-foreground/10" />
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-6">
                The Loneliness{" "}
                <span className="text-accent">Epidemic</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-lg leading-relaxed">
                Why we built five directories for one city — and why Oklahoma City deserved it first.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Big quote */}
        <section className="py-24 md:py-32 border-b-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="italic text-2xl md:text-4xl lg:text-5xl font-light text-foreground/60 leading-snug">
                  "The problem isn't a lack of people.<br />
                  It's the friction of finding them."
                </p>
                <p className="label-caps text-muted-foreground/40 mt-8">— The INSPIRE Thesis</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Narrative blocks */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl space-y-16 md:space-y-24">
            <ScrollReveal>
              <div>
                <p className="label-caps text-accent mb-4 tracking-[0.3em]">The Problem</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-foreground leading-[0.95] mb-6">
                  700,000 people. One city. Zero excuses.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Oklahoma City has everything — culture, energy, neighborhoods with soul. Midtown, Bricktown, the Paseo Arts District, Plaza District. But connection doesn't happen by accident. People move here, people live here, and still feel like strangers. The infrastructure for belonging barely exists. INSPIRE OKC was built to change that equation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <p className="label-caps text-accent mb-4 tracking-[0.3em]">The Insight</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-foreground leading-[0.95] mb-6">
                  People don't need another social network
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  They need a map. A finder. Something that says: here's where the people are, here's what they're doing, here's how to show up. That's what a directory does. It removes the guesswork and leaves only the action. No algorithms, no feeds, no engagement metrics — just real connection points in your city.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <p className="label-caps text-accent mb-4 tracking-[0.3em]">The Solution</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-foreground leading-[0.95] mb-6">
                  Five directories. One mission.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Social Singles OKC for finding your people. OKC Workouts for moving your body. Volunteering OKC for giving back. Coach TLC for personal growth. Men-Talk OKC for real conversations. Each one independent. Each one free to browse. Each one designed to reduce the friction between wanting to belong and actually belonging.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 border-t-2 border-border bg-secondary/20">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <p className="label-caps text-accent tracking-[0.3em]">Principles</p>
                <div className="h-px flex-1 bg-border" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-border">
              {values.map((v) => (
                <ScrollReveal key={v.num}>
                  <div className="p-8 md:p-10 border-b-2 md:odd:border-r-2 border-border last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0">
                    <span className="font-mono text-accent text-xs">({v.num})</span>
                    <h3 className="text-xl font-black text-foreground tracking-tight mt-2 mb-3">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <span className="font-mono text-accent text-xs mb-4 block">NEXT STEP</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-6">
                See what we've built
              </h2>
              <p className="text-sm text-primary-foreground/40 max-w-md mb-8 leading-relaxed">
                Browse the five directories powering connection in Oklahoma City.
              </p>
              <Link
                to="/community"
                className="inline-flex items-center gap-3 border-2 border-accent text-accent label-caps py-3 px-8 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
              >
                Browse Directories <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
