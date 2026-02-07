import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    date: "Mar 15",
    title: "Community Mixer",
    location: "The Jones Assembly",
    description: "An evening of connection, conversation, and culture.",
  },
  {
    date: "Mar 22",
    title: "Adulting 101 Workshop",
    location: "INSPIRE HQ",
    description: "Financial literacy and life skills for young professionals.",
  },
  {
    date: "Apr 05",
    title: "Podcast Live Recording",
    location: "Tower Theatre",
    description: "Watch the magic happen live with special guests.",
  },
];

export function EventsSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionHeading
          label="What's Next"
          title="Upcoming Events"
          subtitle="Gather, grow, and connect with the community."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, i) => (
            <ScrollReveal key={event.title} delay={i * 0.1}>
              <div className="group hover-lift border border-border p-8 md:p-10 bg-card transition-colors duration-500 hover:bg-secondary">
                <p className="editorial-label text-accent mb-4">{event.date}</p>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-card-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                  <MapPin size={14} />
                  <span>{event.location}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
