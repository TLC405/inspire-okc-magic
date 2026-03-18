import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const prompts = [
  "Find something fun tonight",
  "Best coffee near Scissortail",
  "Good first date spots in OKC",
  "Where's the energy this weekend?",
  "Show me active places open now",
  "Outdoor workouts near me",
];

const Ask = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="AI-Powered" variant="trending" />
                <SignalChip label="Coming Soon" variant="default" />
              </div>
              <h1 className="display-hero mb-6">
                Ask Inspire
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-xl leading-relaxed">
                The fastest path from vague intent to actionable plan. Tell us what you're looking for — we'll build your night.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* AI Input Surface */}
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl">
            <ScrollReveal>
              <div className="border border-border p-8 md:p-12 bg-card">
                <div className="w-12 h-12 border border-accent flex items-center justify-center mb-6">
                  <Sparkles size={20} className="text-accent" />
                </div>
                <h2 className="title-lg mb-2">What are you looking for?</h2>
                <p className="text-sm text-muted-foreground mb-6">Describe what you want — a night out, a coffee spot, a workout, a date idea. Inspire will find it.</p>

                <div className="relative mb-6">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Find me a chill rooftop bar with good vibes for Friday night..."
                    rows={3}
                    className="w-full bg-transparent border border-border text-foreground p-4 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30 resize-none"
                  />
                </div>

                <button
                  disabled
                  className="w-full border border-accent/30 text-accent/40 label-caps py-3.5 cursor-not-allowed"
                >
                  Ask Inspire · Launching Soon
                </button>
              </div>
            </ScrollReveal>

            {/* Suggested prompts */}
            <ScrollReveal>
              <div className="mt-8">
                <span className="label-caps text-muted-foreground/40 mb-4 block">Try asking</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {prompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => setQuery(p)}
                      className="text-left px-4 py-3 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                    >
                      "{p}"
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What it will do */}
        <section className="py-16 md:py-20 border-t border-border bg-secondary/10">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <h3 className="title-md mb-8">What Ask Inspire Will Do</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Recommend", desc: "Find what matches your taste, timing, and context." },
                  { title: "Plan", desc: "Build itineraries — date night, group outing, solo wellness morning." },
                  { title: "Explain", desc: "Why this place, what this vibe is, what to expect." },
                  { title: "Connect", desc: "Link events to places, places to nearby options, ideas to action." },
                ].map((item) => (
                  <div key={item.title} className="border border-border p-6 bg-card">
                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container max-w-3xl text-center">
            <ScrollReveal>
              <p className="label-caps text-muted-foreground mb-4">While we build the AI</p>
              <h3 className="title-lg mb-6">Browse the Directories</h3>
              <Link to="/explore" className="inline-flex items-center gap-3 border border-accent text-accent label-caps py-3.5 px-8 hover:bg-accent hover:text-accent-foreground transition-all duration-150">
                Explore Now <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ask;
