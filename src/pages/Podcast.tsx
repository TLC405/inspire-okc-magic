import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Podcast = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="label-caps text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Men-Talk OKC
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Real Talk,{" "}
                <span className="text-accent">Real People</span>
              </h1>
              <p className="text-base text-primary-foreground/50 max-w-xl">
                Conversations that matter. Coming soon.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container max-w-lg text-center">
            <ScrollReveal>
              <Headphones size={32} className="mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-foreground font-semibold mb-1">Episodes coming soon</p>
              <p className="text-sm text-muted-foreground mb-6">Stay tuned for real conversations.</p>
              <Button asChild variant="outline" size="sm" className="rounded-sm text-xs tracking-wide">
                <Link to="/apply">Get Notified</Link>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Podcast;
