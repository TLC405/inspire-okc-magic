import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MapPin, Clock } from "lucide-react";

const faqs = [
  {
    question: "What is INSPIRE OKC?",
    answer: "INSPIRE OKC is a community platform for young professionals in Oklahoma City. We offer programs, events, a podcast, and resources designed to help you grow personally and professionally while building meaningful connections.",
  },
  {
    question: "How do I join a program?",
    answer: "Simply fill out our application form on the Apply page. We review every application personally and will reach out to discuss which programs are the best fit for you.",
  },
  {
    question: "Are events free?",
    answer: "Many of our community events are free. Some specialized workshops and programs may have a small fee to cover materials and venue costs. We always make pricing clear upfront.",
  },
  {
    question: "Who can join?",
    answer: "INSPIRE OKC is open to anyone in the Oklahoma City area who is looking to grow, connect, and contribute to the community. While many of our members are young professionals (21-40), we welcome all ages.",
  },
  {
    question: "How often do programs meet?",
    answer: "Program schedules vary, but most groups meet bi-weekly or monthly. You'll receive a full schedule when you're accepted into a program.",
  },
  {
    question: "Can I be part of multiple programs?",
    answer: "Absolutely! Many of our members participate in more than one program. Just let us know your interests on the application.",
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
              <p className="editorial-caption text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Information
              </p>
              <h1 className="editorial-heading text-4xl md:text-6xl lg:text-7xl mb-6">
                Everything You{" "}
                <span className="italic text-accent">Need to Know</span>
              </h1>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact info */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0}>
                <div className="text-center md:text-left">
                  <Mail size={24} className="text-accent mb-3 mx-auto md:mx-0" />
                  <h3 className="editorial-caption text-foreground mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground font-sans">hello@inspireokc.com</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="text-center md:text-left">
                  <MapPin size={24} className="text-accent mb-3 mx-auto md:mx-0" />
                  <h3 className="editorial-caption text-foreground mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground font-sans">Oklahoma City, OK</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="text-center md:text-left">
                  <Clock size={24} className="text-accent mb-3 mx-auto md:mx-0" />
                  <h3 className="editorial-caption text-foreground mb-1">Response Time</h3>
                  <p className="text-sm text-muted-foreground font-sans">Within 48 hours</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-32">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <h2 className="editorial-heading text-3xl md:text-4xl text-foreground mb-12 text-center">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-0">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-2">
                    <AccordionTrigger className="font-serif text-lg font-medium text-foreground hover:text-accent hover:no-underline transition-colors py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-sans font-light leading-relaxed pb-4">
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
