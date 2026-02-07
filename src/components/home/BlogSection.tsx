import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FileText } from "lucide-react";

export function BlogSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionHeading
          label="Journal"
          title="Stories"
        />

        <ScrollReveal>
          <div className="max-w-md mx-auto text-center py-16 border border-border">
            <FileText size={32} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-foreground font-semibold mb-1">No stories yet</p>
            <p className="text-sm text-muted-foreground">Original content is on the way.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
