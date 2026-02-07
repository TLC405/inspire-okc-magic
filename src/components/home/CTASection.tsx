import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-balance">
            Ready to join?
          </h2>
          <p className="text-base text-primary-foreground/50 max-w-md mx-auto mb-10">
            Apply to INSPIRE OKC and become part of something real.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm tracking-wide px-10 h-12 rounded-sm shadow-md"
          >
            <Link to="/apply">Apply Now</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
