import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Brain, Heart, Dumbbell } from "lucide-react";

const programs = [
  {
    icon: Users,
    title: "Adulting 101",
    tag: "Life Skills",
    description: "Navigate the real world with confidence. Financial literacy, career development, practical life skills — everything school didn't teach you.",
    features: ["Financial planning workshops", "Career development sessions", "Life skills bootcamps", "Peer mentorship circles"],
  },
  {
    icon: Heart,
    title: "Singles Connect",
    tag: "Relationships",
    description: "Meaningful connections for singles who want to grow together. Not a dating app — a community of people who believe in building real relationships.",
    features: ["Group social events", "Relationship workshops", "Communication skills", "Community activities"],
  },
  {
    icon: Dumbbell,
    title: "Movement & Wellness",
    tag: "Wellness",
    description: "Transform your body and mind with group workouts, wellness workshops, and accountability partners who keep you on track.",
    features: ["Group fitness sessions", "Wellness workshops", "Nutrition guidance", "Accountability partnerships"],
  },
  {
    icon: Brain,
    title: "Self-Mastery",
    tag: "Growth",
    description: "The deepest work you'll ever do. Mindset mastery, emotional intelligence, and the discipline to become who you were meant to be.",
    features: ["Mindset workshops", "Emotional intelligence training", "Goal-setting frameworks", "Personal coaching sessions"],
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
              <p className="editorial-caption text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Community Programs
              </p>
              <h1 className="editorial-heading text-4xl md:text-6xl lg:text-7xl mb-6">
                Grow Together,{" "}
                <span className="italic text-accent">Rise Together</span>
              </h1>
              <p className="text-lg text-primary-foreground/60 font-sans font-light max-w-2xl leading-relaxed">
                Curated programs designed to help you level up in every area of life. Pick your path and join a community that has your back.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container">
            <div className="space-y-16 md:space-y-24">
              {programs.map((program, i) => (
                <ScrollReveal key={program.title}>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}>
                    {/* Image placeholder */}
                    <div className={`aspect-[4/3] bg-secondary flex items-center justify-center ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                      <program.icon size={48} className="text-muted-foreground/30" />
                    </div>

                    {/* Content */}
                    <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                      <p className="editorial-label text-accent mb-3">{program.tag}</p>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {program.title}
                      </h2>
                      <p className="text-muted-foreground font-sans font-light leading-relaxed mb-6">
                        {program.description}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {program.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm font-sans text-foreground">
                            <span className="w-1 h-1 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        asChild
                        className="bg-accent text-accent-foreground hover:bg-accent/90 font-sans text-sm tracking-wide px-6 rounded-none"
                      >
                        <Link to="/apply">
                          Apply Now <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </Button>
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

export default Community;
