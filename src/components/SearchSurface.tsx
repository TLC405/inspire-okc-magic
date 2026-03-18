import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Tonight", href: "/explore" },
  { label: "This Weekend", href: "/explore" },
  { label: "Fitness", href: "/workouts" },
  { label: "Date Night", href: "/singles" },
  { label: "Coffee", href: "/explore" },
  { label: "Free", href: "/explore" },
  { label: "Volunteering", href: "/volunteering" },
];

interface SearchSurfaceProps {
  variant?: "hero" | "compact";
  className?: string;
}

export function SearchSurface({ variant = "hero", className }: SearchSurfaceProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("relative", className)}>
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Oklahoma City..."
          className="w-full bg-secondary/50 border border-border text-foreground pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/40"
        />
      </form>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="relative mb-5">
        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for in Oklahoma City?"
          className="w-full bg-white/[0.04] border-2 border-white/10 text-white pl-14 pr-16 py-5 text-base md:text-lg font-medium focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all placeholder:text-white/25"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-accent transition-colors"
          aria-label="Search"
        >
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.href)}
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] font-semibold text-white/30 border border-white/8 hover:text-accent hover:border-accent/40 transition-all duration-150"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
