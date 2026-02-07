import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookOpen } from "lucide-react";

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="label-caps text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Our Story
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Built by the City,{" "}
                <span className="text-accent">for the City</span>
              </h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container max-w-lg text-center">
            <ScrollReveal>
              <BookOpen size={32} className="mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-foreground font-semibold mb-1">Our story is being written</p>
              <p className="text-sm text-muted-foreground">Real content coming soon.</p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
