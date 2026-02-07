import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Dumbbell, Target, HandHeart } from "lucide-react";

const programs = [
  {
    icon: HandHeart,
    title: "Volunteering OKC",
    tag: "Service",
  },
  {
    icon: Heart,
    title: "Singles OKC",
    tag: "Community",
  },
  {
    icon: Dumbbell,
    title: "Workout OKC",
    tag: "Fitness",
  },
  {
    icon: Target,
    title: "Coach TLC",
    tag: "Development",
  },
];

export function CommunitySection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionHeading
          label="Programs"
          title="Community"
          subtitle="Curated programs to help you grow, connect, and thrive in OKC."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((program) => (
            <ScrollReveal key={program.title}>
              <Link
                to="/community"
                className="group flex items-center gap-5 hover-lift border border-border p-6 md:p-8 bg-card transition-colors duration-200 hover:border-accent/30"
              >
                <div className="flex-shrink-0 w-12 h-12 border border-border flex items-center justify-center group-hover:border-accent/40 transition-colors">
                  <program.icon size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="label-caps text-accent mb-1">{program.tag}</p>
                  <h3 className="text-lg font-semibold text-card-foreground">{program.title}</h3>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
