import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MapPin, Clock } from "lucide-react";

const faqs = [
  {
    question: "What is INSPIRE OKC?",
    answer: "A set of community directories built in Oklahoma City, for Oklahoma City. We make it easier to find singles events, fitness opportunities, volunteering, coaching, and real conversations. There's nothing to join or apply to.",
  },
  {
    question: "How do the directories work?",
    answer: "Each directory focuses on one area — fitness, volunteering, singles events, coaching, or men's conversations. Browse what's available, find what resonates, and show up. That's it.",
  },
  {
    question: "Is it free?",
    answer: "The directories are free to browse. Pricing for individual events, classes, or services depends on whoever is hosting them — it's always listed upfront.",
  },
  {
    question: "Who is this for?",
    answer: "Anyone in the Oklahoma City area looking to connect with people and opportunities. No age requirement, no membership, no gatekeeping.",
  },
  {
    question: "Can I use multiple directories?",
    answer: "Yes. They're all independent tools. Use one, use all five — whatever fits your life right now.",
  },
];

const Info = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="label-caps text-primary-foreground/30 mb-4 tracking-[0.3em]">
                Information
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-4">
                Need to{" "}
                <span className="text-accent">Know</span>
              </h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-24 border-b-2 border-border">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal>
                <div className="border-2 border-border p-6">
                  <Mail size={20} className="text-accent mb-3" />
                  <h3 className="label-caps text-foreground mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@inspireokc.com</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="border-2 border-border p-6">
                  <MapPin size={20} className="text-accent mb-3" />
                  <h3 className="label-caps text-foreground mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Oklahoma City, OK</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="border-2 border-border p-6">
                  <Clock size={20} className="text-accent mb-3" />
                  <h3 className="label-caps text-foreground mb-1">Response Time</h3>
                  <p className="text-sm text-muted-foreground">Within 48 hours</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <p className="label-caps text-accent mb-4 tracking-[0.3em]">FAQ</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-foreground mb-12">
                Common Questions
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border-2 border-border">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-border last:border-b-0 px-6">
                      <AccordionTrigger className="text-base font-bold text-foreground hover:text-accent hover:no-underline transition-colors py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Info;
