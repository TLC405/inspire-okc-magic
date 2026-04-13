import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tickerItems as staticTickerItems } from "@/data/civicData";

type DBTickerItem = {
  id: string;
  headline: string;
  link: string;
  category: string;
};

export function WireTicker() {
  const [dbItems, setDbItems] = useState<DBTickerItem[] | null>(null);

  useEffect(() => {
    supabase
      .from("ticker_items")
      .select("id, headline, link, category")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setDbItems(data as DBTickerItem[]);
      });
  }, []);

  const items = dbItems
    ? dbItems.map((d) => ({ tag: d.category, headline: d.headline }))
    : staticTickerItems;

  return (
    <div className="wire-ticker">
      <div className="flex items-stretch">
        <div className="wire-ticker-badge">
          <span
            className="w-1.5 h-1.5 rounded-full bg-white signal-pulse"
            style={{ boxShadow: '0 0 0 0 rgba(255,255,255,0.7)' }}
          />
          WIRE
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div className="wire-ticker-track">
            {[...items, ...items].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center font-mono text-[11px] tracking-wide py-[9px]"
                style={{ color: 'hsl(var(--background))' }}
              >
                <span
                  className="font-black mr-2 uppercase"
                  style={{ color: 'hsl(var(--destructive))' }}
                >
                  {item.tag}:
                </span>
                <span style={{ opacity: 0.88 }}>{item.headline}</span>
                <span className="mx-8 opacity-30">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
