import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="label-caps text-primary-foreground/30 mb-4 tracking-[0.3em]">
                Why We Exist
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-8">
                The Loneliness{" "}
                <span className="text-accent">Epidemic</span>
              </h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="italic text-2xl md:text-4xl font-light text-foreground/70 leading-snug">
                  "The problem isn't a lack of people.<br />
                  It's the friction of finding them."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
