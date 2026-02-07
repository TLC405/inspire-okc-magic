import { ScrollReveal } from "@/components/ScrollReveal";

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-background border-b-2 border-border">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <p className="label-caps text-accent mb-6 tracking-[0.3em]">
            What Is INSPIRE OKC
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-foreground leading-[0.95] mb-8">
            Built from the science of loneliness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Research shows that disconnection is one of the biggest health crises of our time — 
              linked to depression, heart disease, and early death at rates comparable to smoking. 
              INSPIRE OKC exists because we believe the antidote is simple: make it easier for 
              people to find each other and do things together.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              We're not a club. There's nothing to join or apply to. INSPIRE OKC is a set of 
              community directories and tools — built in Oklahoma City, for Oklahoma City — that 
              help you find singles events, fitness opportunities, volunteering, coaching, and 
              real conversations with other people who care about connection.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
