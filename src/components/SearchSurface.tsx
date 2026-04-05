import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SearchSurfaceProps {
  className?: string;
}

export function SearchSurface({ className }: SearchSurfaceProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    if (/dating|singles|mixer|speed|nightlife|romance/.test(q)) {
      navigate(`/singles?q=${encodeURIComponent(query)}`);
    } else if (/gym|crossfit|run|trail|climb|fitness|yoga|outdoor/.test(q)) {
      navigate(`/fitness?q=${encodeURIComponent(query)}`);
    } else if (/volunteer|food bank|habitat|donate|help|community/.test(q)) {
      navigate(`/volunteering?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/singles?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search singles events, fitness, volunteering..."
        className="search-input pl-11"
      />
    </form>
  );
}
