import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Play, Headphones } from "lucide-react";

const episodes = [
  { number: 24, title: "Finding Purpose in the City", guest: "Marcus Johnson", duration: "42 min", date: "Feb 20, 2026" },
  { number: 23, title: "Building Community from Scratch", guest: "Aisha Williams", duration: "38 min", date: "Feb 6, 2026" },
  { number: 22, title: "The Art of Self-Mastery", guest: "David Chen", duration: "45 min", date: "Jan 23, 2026" },
  { number: 21, title: "Wellness Beyond the Gym", guest: "Sarah Torres", duration: "36 min", date: "Jan 9, 2026" },
  { number: 20, title: "Love, Dating & Real Talk", guest: "Panel Discussion", duration: "55 min", date: "Dec 19, 2025" },
  { number: 19, title: "Money Moves for Millennials", guest: "James Porter", duration: "41 min", date: "Dec 5, 2025" },
  { number: 18, title: "Creative Hustle in OKC", guest: "Nina Rodriguez", duration: "39 min", date: "Nov 21, 2025" },
  { number: 17, title: "From Side Hustle to Full Time", guest: "Kyle Bennett", duration: "44 min", date: "Nov 7, 2025" },
];

const Podcast = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="editorial-caption text-primary-foreground/40 mb-4 tracking-[0.3em]">
                The Podcast
              </p>
              <h1 className="editorial-heading text-4xl md:text-6xl lg:text-7xl mb-6">
                Real Talk,{" "}
                <span className="italic text-accent">Real People</span>
              </h1>
              <p className="text-lg text-primary-foreground/60 font-sans font-light max-w-2xl leading-relaxed">
                Unfiltered conversations with the people shaping Oklahoma City's culture, community, and future.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container max-w-3xl">
            <div className="space-y-0">
              {episodes.map((ep, i) => (
                <ScrollReveal key={ep.number} delay={i * 0.05}>
                  <div className="group flex items-center gap-6 py-6 border-b border-border cursor-pointer hover:pl-4 transition-all duration-500">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-500">
                      <Play size={18} className="ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="editorial-label text-muted-foreground mb-1">
                        EP {ep.number} · {ep.duration} · {ep.date}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl font-medium text-foreground truncate group-hover:text-accent transition-colors duration-300">
                        {ep.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans mt-0.5">
                        with {ep.guest}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Podcast;
