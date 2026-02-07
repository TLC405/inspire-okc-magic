import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Headphones, Play } from "lucide-react";
import { Link } from "react-router-dom";

const episodes = [
  {
    number: "EP 24",
    title: "Finding Purpose in the City",
    guest: "with Marcus Johnson",
    duration: "42 min",
  },
  {
    number: "EP 23",
    title: "Building Community from Scratch",
    guest: "with Aisha Williams",
    duration: "38 min",
  },
  {
    number: "EP 22",
    title: "The Art of Self-Mastery",
    guest: "with David Chen",
    duration: "45 min",
  },
];

export function PodcastSection() {
  return (
    <section className="py-24 md:py-32 bg-editorial-warm">
      <div className="container">
        <SectionHeading
          label="Listen"
          title="The Podcast"
          subtitle="Real conversations with real people making a difference."
        />

        <div className="max-w-3xl mx-auto space-y-0">
          {episodes.map((ep, i) => (
            <ScrollReveal key={ep.title} delay={i * 0.08}>
              <div className="group flex items-center gap-6 py-6 border-b border-editorial-divider cursor-pointer hover:pl-4 transition-all duration-500">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-500">
                  <Play size={16} className="ml-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="editorial-label text-muted-foreground mb-1">
                    {ep.number} · {ep.duration}
                  </p>
                  <h3 className="font-serif text-lg md:text-xl font-medium text-foreground truncate">
                    {ep.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans mt-0.5">
                    {ep.guest}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link
            to="/podcast"
            className="inline-flex items-center gap-2 editorial-caption text-accent hover:text-foreground transition-colors"
          >
            <Headphones size={16} />
            View All Episodes
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
