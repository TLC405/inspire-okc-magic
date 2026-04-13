import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Pin, Zap } from "lucide-react";

type Briefing = {
  id: string;
  title: string;
  content: string;
  category: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
};

const categoryColors: Record<string, string> = {
  city: "bg-accent/10 text-accent",
  thunder: "bg-[hsl(200,100%,45%)]/10 text-[hsl(200,100%,45%)]",
  comets: "bg-[hsl(270,55%,55%)]/10 text-[hsl(270,55%,55%)]",
  growth: "bg-emerald-500/10 text-emerald-500",
  culture: "bg-amber-500/10 text-amber-500",
  breaking: "bg-red-500/10 text-red-500",
};

export function LiveBriefings() {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBriefings = async () => {
      const { data } = await supabase
        .from("briefings")
        .select("id, title, content, category, pinned, created_at, updated_at")
        .eq("published", true)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(10);
      setBriefings((data as Briefing[]) || []);
      setLoading(false);
    };

    fetchBriefings();

    // Real-time subscription
    const channel = supabase
      .channel("briefings-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "briefings" }, () => {
        fetchBriefings();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (loading || briefings.length === 0) return null;

  return (
    <div className="skeuo-card p-4 md:p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={14} className="text-accent" />
        <h3 className="label-caps text-foreground">City Briefings</h3>
        <span className="ml-auto flex items-center gap-1 text-[9px] text-accent font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-accent signal-pulse" />
          Live
        </span>
      </div>
      <div className="space-y-3">
        {briefings.map((b) => (
          <div key={b.id} className="border-b border-foreground/[0.06] last:border-0 pb-3 last:pb-0">
            <div className="flex items-center gap-2 mb-1">
              {b.pinned && <Pin size={9} className="text-accent" />}
              <span className={`text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${categoryColors[b.category] || categoryColors.city}`}>
                {b.category}
              </span>
              <span className="text-[9px] text-muted-foreground/50 ml-auto">
                {new Date(b.updated_at).toLocaleDateString()}
              </span>
            </div>
            <h4 className="text-sm font-bold text-foreground leading-tight">{b.title}</h4>
            {b.content && (
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed whitespace-pre-line line-clamp-3">{b.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
