import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Dumbbell, Target, HandHeart } from "lucide-react";

const programs = [
  {
    icon: HandHeart,
    title: "Volunteering OKC",
    tag: "Service",
    description: "Give back. Show up. Meet good people.",
  },
  {
    icon: Heart,
    title: "Singles OKC",
    tag: "Community",
    description: "Real events for real singles in the city.",
  },
  {
    icon: Dumbbell,
    title: "Workout OKC",
    tag: "Fitness",
    description: "Every kind of workout in OKC and metro.",
  },
  {
    icon: Target,
    title: "Coach TLC",
    tag: "Development",
    description: "Coaching. Mindset. Accountability.",
  },
];

export function CommunitySection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionHeading
          label="Programs"
          title="Find Your Thing"
          subtitle="Pick what fits. Show up. That's it."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {programs.map((program) => (
            <ScrollReveal key={program.title}>
              <Link
                to="/community"
                className="group hover-lift border border-border p-6 bg-card flex items-start gap-4 transition-colors duration-200 hover:border-accent/30"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-accent/10 flex items-center justify-center rounded-sm">
                  <program.icon size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="label-caps text-accent mb-1">{program.tag}</p>
                  <h3 className="text-base font-semibold text-card-foreground mb-1">{program.title}</h3>
                  <p className="text-xs text-muted-foreground">{program.description}</p>
                </div>
                <ArrowRight size={14} className="mt-1 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
