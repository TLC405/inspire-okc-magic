import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    title: "Adulting 101",
    description: "Life skills, financial literacy, and personal development for young adults navigating the real world.",
    tag: "Life Skills",
  },
  {
    title: "Singles Connect",
    description: "Meaningful connections and community for singles who want to grow together, not just date.",
    tag: "Relationships",
  },
  {
    title: "Movement & Wellness",
    description: "Group workouts, wellness workshops, and accountability for a healthier lifestyle.",
    tag: "Wellness",
  },
  {
    title: "Self-Mastery",
    description: "Deep personal development — mindset, discipline, purpose, and becoming your best self.",
    tag: "Growth",
  },
];

export function CommunitySection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionHeading
          label="Programs"
          title="Community"
          subtitle="Curated programs designed to help you grow, connect, and thrive."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.1}>
              <Link
                to="/community"
                className="group block hover-lift border border-border p-8 md:p-10 bg-card transition-colors duration-500 hover:border-accent/30"
              >
                <p className="editorial-label text-accent mb-4">{program.tag}</p>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-card-foreground mb-3">
                  {program.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                  {program.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground font-sans group-hover:text-accent transition-colors">
                  <span>Learn more</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
