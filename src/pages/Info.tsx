import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MapPin, Clock } from "lucide-react";

const faqs = [
  {
    question: "What is INSPIRE OKC?",
    answer: "INSPIRE OKC is a community platform for people in Oklahoma City. We offer programs, events, and resources designed to help you grow and build meaningful connections.",
  },
  {
    question: "How do I join a program?",
    answer: "Fill out the application form on the Apply page. We review every application personally.",
  },
  {
    question: "Are events free?",
    answer: "Many community events are free. Some workshops may have a small fee. Pricing is always clear upfront.",
  },
  {
    question: "Who can join?",
    answer: "INSPIRE OKC is open to anyone in the Oklahoma City area looking to grow and connect.",
  },
  {
    question: "Can I be part of multiple programs?",
    answer: "Yes. Many members participate in more than one program.",
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
              <p className="label-caps text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Information
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Everything You{" "}
                <span className="text-accent">Need to Know</span>
              </h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-24 border-b border-border">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal>
                <div className="text-center md:text-left">
                  <Mail size={24} className="text-accent mb-3 mx-auto md:mx-0" />
                  <h3 className="label-caps text-foreground mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@inspireokc.com</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="text-center md:text-left">
                  <MapPin size={24} className="text-accent mb-3 mx-auto md:mx-0" />
                  <h3 className="label-caps text-foreground mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Oklahoma City, OK</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="text-center md:text-left">
                  <Clock size={24} className="text-accent mb-3 mx-auto md:mx-0" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-2">
                    <AccordionTrigger className="text-base font-semibold text-foreground hover:text-accent hover:no-underline transition-colors py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Info;
