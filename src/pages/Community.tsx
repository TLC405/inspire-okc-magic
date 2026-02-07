import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, HandHeart, Heart, Dumbbell, Target } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const programs = [
  {
    icon: HandHeart,
    title: "Volunteering OKC",
    tag: "Service",
    description: "Find real volunteer opportunities. Show up, give back, meet people who care.",
  },
  {
    icon: Heart,
    title: "Singles OKC",
    tag: "Community",
    description: "Not a dating app. Real events, real people, real connections for singles in OKC.",
  },
  {
    icon: Dumbbell,
    title: "Workout OKC",
    tag: "Fitness",
    description: "Group runs, gym meetups, outdoor workouts. All things fitness in OKC and metro.",
  },
  {
    icon: Target,
    title: "Coach TLC",
    tag: "Development",
    description: "Level up with personal coaching, mindset work, and accountability that sticks.",
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
              <p className="label-caps text-white/40 mb-4 tracking-[0.3em]">
                Programs
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4">
                Get Out &{" "}
                <span className="text-accent">Do Something</span>
              </h1>
              <p className="text-lg text-white/55 max-w-lg">
                Stop scrolling. Start showing up. Find your people in Oklahoma City.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Programs grid */}
        <section className="py-20 md:py-28">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
              {programs.map((program, i) => (
                <ScrollReveal key={program.title}>
                  <div className={`p-8 md:p-12 ${i < 2 ? 'border-b border-border' : ''} ${i % 2 === 0 ? 'md:border-r md:border-border' : ''} hover:bg-secondary/50 transition-colors duration-200`}>
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-11 h-11 bg-accent/10 flex items-center justify-center rounded-sm">
                        <program.icon size={20} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="label-caps text-accent mb-2">{program.tag}</p>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                          {program.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {program.description}
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs tracking-wide rounded-sm h-9 px-5"
                        >
                          <Link to="/apply">
                            Join <ArrowRight size={12} className="ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container text-center max-w-lg">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to show up?
              </h2>
              <p className="text-primary-foreground/50 mb-8">
                Apply and we'll match you with the right program.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm tracking-wide px-10 h-12 rounded-sm shadow-lg"
              >
                <Link to="/apply">Apply Now</Link>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
