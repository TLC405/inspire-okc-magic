import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
      <div className="container max-w-2xl">
        <ScrollReveal>
          <p className="label-caps text-primary-foreground/30 mb-6 tracking-[0.3em]">
            Connection starts here
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.95] mb-6">
            Find your people in OKC
          </h2>
          <p className="text-sm text-primary-foreground/45 max-w-md mb-10 leading-relaxed">
            Browse our directories to discover events, workouts, volunteering, coaching, 
            and conversations happening across Oklahoma City.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm tracking-wide px-10 h-12 rounded-none shadow-md"
          >
            <Link to="/community">Explore Programs</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
