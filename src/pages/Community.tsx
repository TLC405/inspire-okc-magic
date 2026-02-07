import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, HandHeart, Heart, Dumbbell, Target } from "lucide-react";

const programs = [
  {
    icon: HandHeart,
    title: "Volunteering OKC",
    tag: "Service",
    description: "Community service and volunteer opportunities across Oklahoma City.",
  },
  {
    icon: Heart,
    title: "Singles OKC",
    tag: "Community",
    description: "Social connections and real community for singles in the OKC metro.",
  },
  {
    icon: Dumbbell,
    title: "Workout OKC",
    tag: "Fitness",
    description: "All things fitness in OKC and metro — group workouts, wellness, accountability.",
  },
  {
    icon: Target,
    title: "Coach TLC",
    tag: "Development",
    description: "Personal coaching, mindset mastery, and growth development.",
  },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="label-caps text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Community Programs
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Grow Together,{" "}
                <span className="text-accent">Rise Together</span>
              </h1>
              <p className="text-base text-primary-foreground/50 max-w-xl">
                Pick your path and join a community that has your back.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program) => (
                <ScrollReveal key={program.title}>
                  <div className="border border-border p-8 md:p-10 hover-lift">
                    <div className="w-12 h-12 border border-border flex items-center justify-center mb-6">
                      <program.icon size={22} className="text-accent" />
                    </div>
                    <p className="label-caps text-accent mb-2">{program.tag}</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {program.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8">
                      {program.description}
                    </p>
                    <Button
                      asChild
                      className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm tracking-wide px-6 rounded-sm"
                    >
                      <Link to="/apply">
                        Apply Now <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </Button>
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

export default Community;
