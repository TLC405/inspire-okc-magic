import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Calendar } from "lucide-react";

export function EventsSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionHeading
          label="What's Next"
          title="Upcoming Events"
        />

        <ScrollReveal>
          <div className="max-w-md mx-auto text-center py-16 border border-border">
            <Calendar size={32} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-foreground font-semibold mb-1">No upcoming events</p>
            <p className="text-sm text-muted-foreground">Check back soon for new events in OKC.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
