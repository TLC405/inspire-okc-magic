import { Link } from "react-router-dom";
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield } from "lucide-react";

const sections = [
  { label: "Singles", href: "/singles" },
  { label: "Events", href: "/events" },
  { label: "Date Nights", href: "/date-nights" },
  { label: "Fitness", href: "/fitness" },
  { label: "Volunteering", href: "/volunteering" },
  { label: "Discover", href: "/discover" },
];

export const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email: trimmed });
      if (error) {
        if (error.code === "23505") toast({ title: "Already subscribed", description: "You're on the list." });
        else throw error;
      } else {
        setDone(true);
        toast({ title: "Subscribed", description: "You'll get the Weekly Brief." });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
  };

  return (
    <footer ref={ref} {...props} className="mt-auto" style={{ boxShadow: "inset 0 2px 6px hsl(0 0% 0% / 0.04)" }}>
      <div className="h-[3px] bg-foreground" />
      <div className="h-[1px] bg-foreground/20 mt-[2px]" />

      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <span
                className="font-black tracking-[-0.03em] text-foreground text-2xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                INSPIRE
              </span>
              <span className="dateline text-muted-foreground ml-2">Oklahoma City</span>
            </Link>
            <p className="body-text text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
              Oklahoma City's most curated community guide. Every listing is editorially reviewed for accuracy, relevance, and trust.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Shield size={14} className="text-emerald-500" />
              <span className="mono-data text-emerald-600 dark:text-emerald-400 font-bold">All Listings Triple-Verified</span>
            </div>
          </div>

          {/* Sitemap column */}
          <div>
            <p className="dateline text-foreground font-bold mb-3">Sections</p>
            <nav className="flex flex-col gap-2">
              {sections.map((s) => (
                <Link
                  key={s.href}
                  to={s.href}
                  className="dateline text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter column */}
          <div>
            <p className="dateline text-foreground font-bold mb-3">Weekly Brief</p>
            <p className="text-xs text-muted-foreground mb-3">
              The best of OKC — events, fitness, and community — delivered every Monday.
            </p>
            {done ? (
              <p className="text-sm text-accent font-semibold">You're on the list.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button type="submit" className="skeuo-btn rounded px-3 py-2">
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-[1px] bg-foreground/10 mt-8 mb-4" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="dateline text-muted-foreground/40">
            © {new Date().getFullYear()} INSPIRE · Oklahoma City · Est. 2026
          </p>
          <p className="dateline text-muted-foreground/30 italic">
            "All the City's News That Inspires"
          </p>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = "Footer";
