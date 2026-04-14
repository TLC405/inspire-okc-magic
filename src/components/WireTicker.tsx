import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tickerItems as staticTickerItems } from "@/data/civicData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings2 } from "lucide-react";

type DBTickerItem = {
  id: string;
  headline: string;
  link: string;
  category: string;
};

type CachedItem = {
  headline: string;
  category: string;
};

type Speed = "slow" | "medium" | "fast";

const ALL_CATEGORIES = [
  "THUNDER WIRE", "COMET WATCH", "ENERGY FC", "OKC BASEBALL",
  "CITY HALL", "MAPS 4 UPDATE", "PARKS DESK", "ARTS & CULTURE",
  "WEATHER DESK", "BUSINESS", "REAL ESTATE", "FOOD & DRINK",
  "COMMUNITY", "EDUCATION", "TRANSIT", "GROWTH REPORT",
  "HEALTH", "TECH", "SPORTS BRIEF",
];

const CATEGORY_COLORS: Record<string, string> = {
  "THUNDER WIRE": "hsl(210 100% 60%)",
  "COMET WATCH": "hsl(280 80% 65%)",
  "ENERGY FC": "hsl(140 70% 45%)",
  "OKC BASEBALL": "hsl(30 90% 55%)",
  "CITY HALL": "hsl(0 0% 100%)",
  "SPORTS BRIEF": "hsl(45 100% 55%)",
};

function loadPrefs() {
  try {
    const raw = localStorage.getItem("wire-ticker-prefs");
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function savePrefs(prefs: { categories: string[]; speed: Speed }) {
  localStorage.setItem("wire-ticker-prefs", JSON.stringify(prefs));
}

export function WireTicker() {
  const [dbItems, setDbItems] = useState<DBTickerItem[] | null>(null);
  const [aiItems, setAiItems] = useState<CachedItem[]>([]);
  const [enabledCategories, setEnabledCategories] = useState<Set<string>>(
    () => new Set(loadPrefs()?.categories || ALL_CATEGORIES)
  );
  const [speed, setSpeed] = useState<Speed>(
    () => loadPrefs()?.speed || "slow"
  );

  // Load DB ticker items
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

  // Load AI-generated wire feed cache
  useEffect(() => {
    supabase
      .from("wire_feed_cache")
      .select("headline, category")
      .gte("expires_at", new Date().toISOString())
      .then(({ data }) => {
        if (data && data.length > 0) setAiItems(data as CachedItem[]);
      });
  }, []);

  // Merge all sources: DB items > AI items > static items
  const allItems = useMemo(() => {
    const merged: { tag: string; headline: string }[] = [];

    if (dbItems && dbItems.length > 0) {
      dbItems.forEach((d) => merged.push({ tag: d.category, headline: d.headline }));
    }

    if (aiItems.length > 0) {
      aiItems.forEach((a) => merged.push({ tag: a.category, headline: a.headline }));
    }

    // Always include static items as base content
    staticTickerItems.forEach((s) => {
      // Avoid duplicates by headline
      if (!merged.some((m) => m.headline === s.headline)) {
        merged.push(s);
      }
    });

    return merged;
  }, [dbItems, aiItems]);

  // Filter by enabled categories
  const filteredItems = useMemo(
    () => allItems.filter((item) => enabledCategories.has(item.tag)),
    [allItems, enabledCategories]
  );

  const items = filteredItems.length > 0 ? filteredItems : allItems;

  const toggleCategory = (cat: string) => {
    setEnabledCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      const prefs = { categories: Array.from(next), speed };
      savePrefs(prefs);
      return next;
    });
  };

  const toggleAll = () => {
    if (enabledCategories.size === ALL_CATEGORIES.length) {
      setEnabledCategories(new Set());
    } else {
      setEnabledCategories(new Set(ALL_CATEGORIES));
    }
    savePrefs({ categories: enabledCategories.size === ALL_CATEGORIES.length ? [] : ALL_CATEGORIES, speed });
  };

  const changeSpeed = (s: Speed) => {
    setSpeed(s);
    savePrefs({ categories: Array.from(enabledCategories), speed: s });
  };

  return (
    <div className="wire-ticker">
      <div className="flex items-stretch">
        <Popover>
          <PopoverTrigger asChild>
            <div className="wire-ticker-badge">
              <span
                className="w-1.5 h-1.5 rounded-full bg-white signal-pulse"
                style={{ boxShadow: "0 0 0 0 rgba(255,255,255,0.7)" }}
              />
              WIRE
              <Settings2 className="w-3 h-3 ml-1 opacity-60" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-64 sm:w-72 p-3 max-h-72 overflow-y-auto"
            side="bottom"
            align="start"
            sideOffset={4}
            collisionPadding={8}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">Wire Categories</span>
                <button
                  onClick={toggleAll}
                  className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
                >
                  {enabledCategories.size === ALL_CATEGORIES.length ? "None" : "All"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {ALL_CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider cursor-pointer hover:bg-accent/20 rounded px-1 py-0.5"
                  >
                    <Checkbox
                      checked={enabledCategories.has(cat)}
                      onCheckedChange={() => toggleCategory(cat)}
                      className="w-3 h-3"
                    />
                    <span className="truncate">{cat}</span>
                  </label>
                ))}
              </div>

              <div className="border-t pt-2 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1.5">Speed</span>
                <div className="flex gap-1">
                  {(["slow", "medium", "fast"] as Speed[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => changeSpeed(s)}
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-mono transition ${
                        speed === s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[9px] text-muted-foreground pt-1 border-t">
                {items.length} headlines · {enabledCategories.size}/{ALL_CATEGORIES.length} categories
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="overflow-hidden flex-1 relative">
          <div className="wire-ticker-track" data-speed={speed}>
            {[...items, ...items].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center font-mono text-xs tracking-wide py-[9px]"
                style={{ color: "hsl(var(--background))" }}
              >
                <span
                  className="font-black mr-2 uppercase"
                  style={{ color: CATEGORY_COLORS[item.tag] || "hsl(var(--destructive))" }}
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
