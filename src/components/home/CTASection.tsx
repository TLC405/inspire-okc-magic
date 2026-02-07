import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container text-center">
        <ScrollReveal>
          <p className="editorial-caption text-primary-foreground/40 mb-6 tracking-[0.3em]">
            Join the Movement
          </p>
          <h2 className="editorial-heading text-4xl md:text-6xl lg:text-7xl mb-6 text-balance">
            Ready to Be{" "}
            <span className="italic text-accent">Inspired</span>?
          </h2>
          <p className="text-lg text-primary-foreground/60 font-sans font-light max-w-lg mx-auto mb-10 leading-relaxed">
            Whether you want to attend events, join a program, or start a conversation — we&apos;re here for it.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-sans text-sm tracking-wide px-10 h-12 rounded-none"
          >
            <Link to="/apply">Apply Now</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
