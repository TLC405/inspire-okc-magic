import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="editorial-caption text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Our Story
              </p>
              <h1 className="editorial-heading text-4xl md:text-6xl lg:text-7xl mb-6">
                Built by the City, <br />
                <span className="italic text-accent">for the City</span>
              </h1>
              <p className="text-lg text-primary-foreground/60 font-sans font-light max-w-2xl leading-relaxed">
                INSPIRE OKC began as a simple idea — what if we created a space where Oklahoma City's young professionals could truly connect, grow, and build something meaningful together?
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="drop-cap text-foreground font-sans font-light text-lg leading-[1.9] space-y-6">
                <p>
                  In a world where everyone is connected online but increasingly isolated in real life, INSPIRE OKC was born from the belief that real community still matters. We started in 2022 with a handful of people and a conviction that Oklahoma City deserved something different.
                </p>
                <p>
                  What started as informal meetups quickly evolved into something much bigger. We discovered that people were hungry for authentic connection — not networking events with name tags and elevator pitches, but real spaces where they could be themselves, learn from each other, and grow together.
                </p>
                <p>
                  Today, INSPIRE OKC is a thriving community of creators, professionals, dreamers, and doers. Through our programs — Adulting 101, Singles Connect, Movement & Wellness, and Self-Mastery — we're building the infrastructure for a more connected, empowered Oklahoma City.
                </p>
                <p>
                  Our podcast amplifies the voices of people making a difference. Our events bring people together in ways that matter. And our community programs give people the tools, accountability, and support they need to become their best selves.
                </p>
                <p>
                  This isn't just an organization. It's a movement. And we're just getting started.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="mt-16">
              <div className="border-l-2 border-accent pl-8 py-2">
                <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
                  "We don't just build programs. We build people."
                </blockquote>
                <p className="mt-4 editorial-caption text-muted-foreground">
                  — INSPIRE OKC Founding Team
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
