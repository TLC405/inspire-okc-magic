import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PodcastSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <SectionHeading
          label="Listen"
          title="Men-Talk OKC"
          subtitle="Real conversations. Real growth."
        />

        <ScrollReveal>
          <div className="max-w-md mx-auto text-center py-16 border border-border bg-card">
            <Headphones size={32} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-foreground font-semibold mb-1">Episodes coming soon</p>
            <p className="text-sm text-muted-foreground mb-6">Stay tuned for conversations that matter.</p>
            <Button asChild variant="outline" size="sm" className="rounded-sm text-xs tracking-wide">
              <Link to="/apply">Get Notified</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
