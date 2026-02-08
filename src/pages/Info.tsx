import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MapPin, Clock, Phone, ExternalLink } from "lucide-react";

const contactCards = [
  { icon: Mail, label: "Email", value: "hello@inspireokc.com", sub: "Primary contact" },
  { icon: MapPin, label: "Location", value: "Oklahoma City, OK", sub: "The Big Friendly" },
  { icon: Phone, label: "Area Code", value: "405", sub: "OKC Metro" },
  { icon: Clock, label: "Response", value: "Within 48hrs", sub: "Usually faster" },
];

const faqs = [
  {
    question: "What is INSPIRE OKC?",
    answer: "A set of five community directories built in Oklahoma City, for Oklahoma City. We make it easier to find singles events, fitness opportunities, volunteering, coaching, and real conversations. There's nothing to join or apply to — just browse and show up.",
  },
  {
    question: "How do the directories work?",
    answer: "Each directory focuses on one area — fitness, volunteering, singles events, coaching, or men's conversations. Browse what's available, find what resonates, and show up. No accounts required, no algorithms deciding what you see.",
  },
  {
    question: "Is it free?",
    answer: "The directories are free to browse. Pricing for individual events, classes, or services depends on whoever is hosting them — it's always listed upfront. INSPIRE OKC doesn't charge for access.",
  },
  {
    question: "Who is this for?",
    answer: "Anyone in the Oklahoma City metro area looking to connect with people and opportunities. From Midtown to Bricktown, Paseo to NW OKC. No age requirement, no membership, no gatekeeping.",
  },
  {
    question: "Can I use multiple directories?",
    answer: "Absolutely. They're all independent tools. Use one, use all five — whatever fits your life right now. Many people start with one and discover the others organically.",
  },
  {
    question: "What makes this different from Meetup or Facebook Groups?",
    answer: "We're not a social network. We're a set of curated finders designed specifically for OKC. No feeds, no engagement loops, no algorithms. Just practical directories that connect you to real things happening in your city.",
  },
  {
    question: "What is Men-Talk OKC?",
    answer: "A private space for men in OKC to have real conversations about life, growth, and purpose. Access requires a code — ask someone in the community or reach out to us directly.",
  },
];

const Info = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-primary-foreground/20 text-xs">REF: INFO-DESK</span>
                <div className="h-px flex-1 bg-primary-foreground/10" />
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-6">
                Need to{" "}
                <span className="text-accent">Know</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/40 max-w-lg leading-relaxed">
                Everything about INSPIRE OKC — who we are, how it works, and how to reach us.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-16 md:py-20 border-b-2 border-border">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-border">
              {contactCards.map((card, i) => (
                <ScrollReveal key={card.label} delay={i * 0.05}>
                  <div className="p-6 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-border last:border-r-0 last:border-b-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r-2">
                    <card.icon size={18} className="text-accent mb-4" />
                    <p className="label-caps text-muted-foreground/50 mb-1">{card.label}</p>
                    <p className="text-lg md:text-xl font-black text-foreground tracking-tight">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* About block */}
        <section className="py-20 md:py-28 border-b-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="quote-block">
                <p className="label-caps text-accent mb-4 tracking-[0.3em]">About</p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  INSPIRE OKC is a collection of five community directories designed to make belonging in Oklahoma City effortless. We serve the entire metro — from Deep Deuce to Automobile Alley, Film Row to Uptown 23rd. No memberships, no dues, no applications. Just tools that help you find your people.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <p className="label-caps text-accent tracking-[0.3em]">FAQ</p>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-muted-foreground/40 text-xs">{faqs.length} QUESTIONS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border-2 border-border">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-border last:border-b-0 px-6 md:px-8">
                      <AccordionTrigger className="text-base md:text-lg font-bold text-foreground hover:text-accent hover:no-underline transition-colors py-6">
                        <span className="flex items-center gap-4 text-left">
                          <span className="font-mono text-accent text-xs flex-shrink-0">({String(i + 1).padStart(2, "0")})</span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 pl-10">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground border-t-2 border-border">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <span className="font-mono text-accent text-xs mb-4 block">READY?</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-6">
                Still have questions?
              </h2>
              <p className="text-sm text-primary-foreground/40 max-w-md mb-4 leading-relaxed">
                Reach out at hello@inspireokc.com — we respond within 48 hours.
              </p>
              <p className="text-xs text-primary-foreground/15 font-mono">
                405 · Oklahoma City · 73507
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Info;
