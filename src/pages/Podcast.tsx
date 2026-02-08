import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MenTalkGate } from "@/components/MenTalkGate";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Podcast = () => {
  return (
    <MenTalkGate>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
            <div className="container max-w-4xl">
              <ScrollReveal>
                <p className="label-caps text-primary-foreground/30 mb-4 tracking-[0.3em]">
                  Men-Talk OKC
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-4">
                  Real Talk,{" "}
                  <span className="text-accent">Real People</span>
                </h1>
                <p className="text-sm text-primary-foreground/40 max-w-lg">
                  Real conversations for men in Oklahoma City. No filters, no fluff.
                </p>
              </ScrollReveal>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="container max-w-lg text-center">
              <ScrollReveal>
                <div className="border-2 border-border p-12">
                  <MessageCircle size={28} className="mx-auto text-muted-foreground/40 mb-4" />
                  <p className="text-foreground font-bold mb-1">Content coming soon</p>
                  <p className="text-sm text-muted-foreground mb-8">Stay tuned for real conversations.</p>
                  <Button asChild variant="outline" size="sm" className="rounded-none text-xs tracking-wide border-2">
                    <Link to="/community">Explore Directories</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MenTalkGate>
  );
};

export default Podcast;
