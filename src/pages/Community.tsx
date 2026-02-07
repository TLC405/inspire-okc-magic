import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, HandHeart, Heart, Dumbbell, Target, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <img
            src={heroBg}
            alt="INSPIRE OKC Community"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="container relative z-10 max-w-4xl">
            <ScrollReveal>
              <p className="label-caps text-white/30 mb-4 tracking-[0.3em]">
                Directories
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-[0.9] mb-4">
                Find Your{" "}
                <span className="text-accent">People</span>
              </h1>
              <p className="text-base text-white/45 max-w-lg">
                Browse community directories built to help you connect with real people and real opportunities in Oklahoma City.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Programs grid */}
        <section className="py-20 md:py-28">
          <div className="container max-w-4xl">
            <div className="border-2 border-border">
              {programs.map((program) => (
                <ScrollReveal key={program.title}>
                  <div className="flex items-center gap-6 p-6 md:p-8 border-b-2 border-border last:border-b-0 hover:bg-secondary/50 transition-colors duration-150">
                    <div className="flex-shrink-0 w-12 h-12 border-2 border-border flex items-center justify-center">
                      <program.icon size={20} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                          {program.title}
                        </h2>
                        <span className="label-caps text-muted-foreground">{program.tag}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {program.description}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground border-t-2 border-border">
          <div className="container max-w-2xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] mb-4">
                Connection starts with showing up
              </h2>
              <p className="text-sm text-primary-foreground/40 max-w-md">
                Every directory is free to browse. Find what resonates, and take the first step.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
