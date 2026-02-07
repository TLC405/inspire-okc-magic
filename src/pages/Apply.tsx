import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Apply = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Application submitted!", {
        description: "We'll be in touch soon.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-primary-foreground">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <p className="label-caps text-primary-foreground/40 mb-4 tracking-[0.3em]">
                Join Us
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Apply to{" "}
                <span className="text-accent">INSPIRE</span>
              </h1>
              <p className="text-base text-primary-foreground/50 max-w-xl">
                Tell us about yourself and which programs interest you.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container max-w-2xl">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="label-caps">First Name</Label>
                    <Input required placeholder="Your first name" className="rounded-sm border-border bg-background h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="label-caps">Last Name</Label>
                    <Input required placeholder="Your last name" className="rounded-sm border-border bg-background h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="label-caps">Email</Label>
                  <Input required type="email" placeholder="your@email.com" className="rounded-sm border-border bg-background h-12" />
                </div>

                <div className="space-y-2">
                  <Label className="label-caps">Phone</Label>
                  <Input placeholder="(405) 555-0123" className="rounded-sm border-border bg-background h-12" />
                </div>

                <div className="space-y-2">
                  <Label className="label-caps">Program Interest</Label>
                  <Select>
                    <SelectTrigger className="rounded-sm border-border bg-background h-12">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="volunteering">Volunteering OKC</SelectItem>
                      <SelectItem value="singles">Singles OKC</SelectItem>
                      <SelectItem value="workout">Workout OKC</SelectItem>
                      <SelectItem value="coach">Coach TLC</SelectItem>
                      <SelectItem value="multiple">Multiple Programs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="label-caps">Tell Us About Yourself</Label>
                  <Textarea
                    placeholder="What are you looking to gain from INSPIRE OKC?"
                    rows={5}
                    className="rounded-sm border-border bg-background resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-sm tracking-wide h-12 rounded-sm shadow-md"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
