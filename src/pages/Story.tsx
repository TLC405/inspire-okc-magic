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
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-6">
                The Loneliness{" "}
                <span className="text-accent">Epidemic</span>
              </h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32 border-b-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <p className="label-caps text-accent mb-4 tracking-[0.3em]">The Problem</p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    The U.S. Surgeon General has called loneliness an epidemic. Research links chronic 
                    disconnection to a 26% increase in early mortality — comparable to smoking 15 
                    cigarettes a day. It increases the risk of heart disease by 29%, stroke by 32%, 
                    and dementia by 50%. This isn't a feelings problem. It's a public health crisis.
                  </p>
                </div>

                <div className="w-full h-[2px] bg-border" />

                <div>
                  <p className="label-caps text-accent mb-4 tracking-[0.3em]">The Insight</p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    The antidote isn't complicated. Psychology research consistently shows that 
                    belonging — feeling connected to a community — is one of the strongest 
                    predictors of wellbeing. People don't need more apps. They need easier ways 
                    to find each other and do things together in real life.
                  </p>
                </div>

                <div className="w-full h-[2px] bg-border" />

                <div>
                  <p className="label-caps text-accent mb-4 tracking-[0.3em]">INSPIRE OKC</p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    INSPIRE OKC is a set of community directories and tools — built in Oklahoma City, 
                    for Oklahoma City. There's nothing to join or apply to. We simply make it easier 
                    to find singles events, fitness opportunities, volunteering, coaching, and real 
                    conversations. Because connection shouldn't be hard to find.
                  </p>
                </div>
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
