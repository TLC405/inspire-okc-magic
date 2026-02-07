import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Dumbbell, Target, HandHeart, MessageCircle } from "lucide-react";

const programs = [
  {
    icon: HandHeart,
    title: "Volunteering OKC",
    tag: "Service",
    description: "Find volunteer opportunities and places to give back across Oklahoma City.",
  },
  {
    icon: Heart,
    title: "Singles OKC",
    tag: "Community",
    description: "Discover singles events, meetups, and social gatherings in OKC.",
  },
  {
    icon: Dumbbell,
    title: "Workout OKC",
    tag: "Fitness",
    description: "All things fitness — gyms, runs, classes, outdoor workouts in OKC and metro.",
  },
  {
    icon: Target,
    title: "Coach TLC",
    tag: "Development",
    description: "Connect with personal coaching, mindset work, and growth resources.",
  },
  {
    icon: MessageCircle,
    title: "Men-Talk OKC",
    tag: "Conversation",
    description: "Real conversations for men about life, growth, and purpose.",
  },
];

export function CommunitySection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <ScrollReveal>
          <p className="label-caps text-accent mb-4 tracking-[0.3em]">
            Directories
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-foreground leading-[0.95] mb-4">
            Find what you're looking for
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mb-12">
            Each tool helps you discover real opportunities and real people in Oklahoma City.
          </p>
        </ScrollReveal>

        <div className="border-2 border-border">
          {programs.map((program, i) => (
            <ScrollReveal key={program.title}>
              <Link
                to="/community"
                className="group flex items-center gap-6 p-6 md:p-8 hover:bg-secondary/50 transition-colors duration-150 border-b-2 border-border last:border-b-0"
              >
                <div className="flex-shrink-0 w-12 h-12 border-2 border-border flex items-center justify-center">
                  <program.icon size={20} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                      {program.title}
                    </h3>
                    <span className="label-caps text-muted-foreground">{program.tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
