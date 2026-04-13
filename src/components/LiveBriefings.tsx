import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type Briefing = {
  id: string;
  title: string;
  content: string;
  category: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
};

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
  }) + " CT";
}

export function LiveBriefings() {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setTick] = useState(0);

  useEffect(() => {
    const fetchBriefings = async () => {
      const { data } = await supabase
        .from("briefings")
        .select("id, title, content, category, pinned, created_at, updated_at")
        .eq("published", true)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(12);
      setBriefings((data as Briefing[]) || []);
      setLoading(false);
    };

    fetchBriefings();

    const channel = supabase
      .channel("briefings-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "briefings" }, () => {
        fetchBriefings();
      })
      .subscribe();

    // Tick every 30s to update relative timestamps
    const ticker = setInterval(() => setTick((t) => t + 1), 30_000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(ticker);
    };
  }, []);

  if (loading || briefings.length === 0) return null;

  return (
    <section className="w-full">
      {/* Thick top rule */}
      <div className="h-[3px] bg-foreground" />

      {/* Section header */}
      <div className="flex items-baseline justify-between px-4 md:px-8 py-3 border-b border-foreground/20">
        <h3
          className="font-serif font-black text-lg md:text-xl tracking-tight text-foreground uppercase"
          style={{ fontVariant: "small-caps" }}
        >
          City Briefings
        </h3>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          Live Wire
          <span className="inline-block w-full h-px bg-accent/60 animate-pulse ml-0" />
        </span>
      </div>

      {/* Multi-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:divide-x md:divide-foreground/10">
        {briefings.map((b) => (
          <article
            key={b.id}
            className="px-4 md:px-6 py-5 border-b border-foreground/[0.06] last:border-b-0 md:last:border-b md:[&:nth-last-child(-n+3)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
          >
            {/* Category dateline + timestamp */}
            <div className="flex items-baseline gap-2 mb-1.5">
              {b.pinned && (
                <span className="text-foreground text-[10px] leading-none select-none" aria-label="Pinned">
                  &#9632;
                </span>
              )}
              <span
                className="text-[10px] tracking-[0.15em] text-muted-foreground font-semibold uppercase"
                style={{ fontVariant: "small-caps" }}
              >
                — {b.category}
              </span>
              <span className="ml-auto text-[9px] font-mono text-muted-foreground/60 whitespace-nowrap">
                {relativeTime(b.updated_at)}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-serif font-bold text-[15px] md:text-base text-foreground leading-snug mb-1">
              {b.title}
            </h4>

            {/* Content */}
            {b.content && (
              <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3 whitespace-pre-line">
                {b.content}
              </p>
            )}

            {/* Byline timestamp */}
            <p className="mt-2 text-[9px] font-mono text-muted-foreground/40 uppercase tracking-wider">
              Updated {formatTime(b.updated_at)}
            </p>
          </article>
        ))}
      </div>

      {/* Thin bottom rule */}
      <div className="h-px bg-foreground/20" />
    </section>
  );
}
