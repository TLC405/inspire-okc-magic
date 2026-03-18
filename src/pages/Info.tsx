import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignalChip } from "@/components/SignalChip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MapPin, Clock, Phone } from "lucide-react";

const contactCards = [
  { icon: Mail, label: "Email", value: "hello@inspireokc.com", sub: "Primary contact", accent: true },
  { icon: MapPin, label: "Location", value: "Oklahoma City, OK", sub: "The Big Friendly", accent: false },
  { icon: Phone, label: "Area Code", value: "405", sub: "Oklahoma City Metro", accent: true },
  { icon: Clock, label: "Response", value: "Within 48hrs", sub: "Usually faster", accent: false },
];

const faqs = [
  { question: "What is INSPIRE Oklahoma City?", answer: "A set of five community directories built in Oklahoma City, for Oklahoma City. We make it easier to find singles events, fitness opportunities, volunteering, coaching, and real conversations. There's nothing to join or apply to — just browse and show up." },
  { question: "How do the directories work?", answer: "Each directory focuses on one area — fitness, volunteering, singles events, coaching, or men's conversations. Browse what's available, find what resonates, and show up. No accounts required, no algorithms deciding what you see." },
  { question: "Is it free?", answer: "The directories are free to browse. Pricing for individual events, classes, or services depends on whoever is hosting them — it's always listed upfront. INSPIRE Oklahoma City doesn't charge for access." },
  { question: "Who is this for?", answer: "Anyone in the Oklahoma City metro area looking to connect with people and opportunities." },
  { question: "Can I use multiple directories?", answer: "Absolutely. They're all independent tools. Use one, use all five — whatever fits your life right now." },
  { question: "What makes this different from Meetup or Facebook Groups?", answer: "We're not a social network. We're a set of curated finders designed specifically for Oklahoma City. No feeds, no engagement loops, no algorithms. Just practical directories that connect you to real things happening in your city." },
  { question: "What is Men-Talk Oklahoma City?", answer: "A private space for men in Oklahoma City to have real conversations about life, growth, and purpose. Access requires a code — ask someone in the community or reach out to us directly." },
];

const Info = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <SignalChip label="Info" variant="default" />
              </div>
              <h1 className="display-hero mb-6">
                Need to <span className="text-accent">Know</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-lg leading-relaxed">
                Everything about INSPIRE Oklahoma City — who we are, how it works, and how to reach us.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-8 border-b border-border">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {contactCards.map((card, i) => (
                <ScrollReveal key={card.label} delay={i * 0.05}>
                  <div className="bg-background p-6 md:p-8">
                    <card.icon size={16} className={card.accent ? "text-accent mb-3" : "text-muted-foreground mb-3"} />
                    <p className="mono-data text-muted-foreground/50 mb-1">{card.label}</p>
                    <p className="text-lg font-bold text-foreground tracking-tight">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="label-caps text-accent mb-4 tracking-[0.3em]">About</p>
                <h2 className="title-lg text-foreground mb-6 leading-tight">
                  Community infrastructure for Oklahoma City
                </h2>
                <p className="text-base text-foreground/70 leading-relaxed">
                  INSPIRE Oklahoma City is a collection of five community directories designed to make belonging effortless. No memberships, no dues, no applications.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <p className="label-caps text-accent tracking-[0.3em]">FAQ</p>
                <div className="h-px flex-1 bg-border" />
                <span className="mono-data text-muted-foreground/40">{faqs.length} Questions</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="border border-border">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-b-0 px-6 md:px-8 data-[state=open]:bg-secondary/20">
                      <AccordionTrigger className="text-sm md:text-base font-bold text-foreground hover:text-accent hover:no-underline transition-colors py-5">
                        <span className="flex items-center gap-4 text-left">
                          <span className="mono-data text-accent flex-shrink-0">({String(i + 1).padStart(2, "0")})</span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pl-10">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-primary text-primary-foreground border-t border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <span className="mono-data text-accent mb-4 block">Contact</span>
              <h2 className="display-section mb-6">Still have questions?</h2>
              <p className="text-sm text-primary-foreground/40 max-w-md mb-4 leading-relaxed">
                Reach out at hello@inspireokc.com — we respond within 48 hours.
              </p>
              <p className="mono-data text-primary-foreground/15">405 · Oklahoma City · 73507</p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Info;
