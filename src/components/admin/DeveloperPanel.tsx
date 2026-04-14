import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Copy, CheckCircle2, Globe, Loader2 } from "lucide-react";

const EDGE_FUNCTIONS = [
  { name: "city-concierge", desc: "AI-powered city Q&A" },
  { name: "smart-search", desc: "Natural language search" },
  { name: "wire-feed", desc: "AI headline generation" },
  { name: "image-search", desc: "Photo lookup for listings" },
  { name: "admin-chat", desc: "Admin AI assistant" },
  { name: "admin-scanner", desc: "Site audit & upgrades" },
  { name: "moderate-content", desc: "AI content moderation" },
  { name: "newsroom-draft", desc: "AI article drafting" },
  { name: "log-visitor", desc: "Visitor analytics logging" },
  { name: "singles-ai", desc: "Dating event AI helper" },
];

const TICKER_SNIPPET = `import { WireTicker } from "./components/WireTicker";

// Drop into any layout:
<WireTicker />

// Requires: Supabase client configured with
// tables: ticker_items, wire_feed_cache
// CSS: wire-ticker classes from index.css`;

const HERO_SNIPPET = `import { HeroCarousel } from "./components/HeroCarousel";

// Full-width hero with DB-driven slides:
<HeroCarousel />

// Requires: hero_slides table in Supabase
// Falls back to static slides if table is empty`;

const CIVIC_SNIPPET = `import { CivicPanels } from "./components/CivicPanels";

// City data dashboard panels:
<CivicPanels />

// Uses static data from src/data/civicData.ts
// No database dependency`;

export function DeveloperPanel() {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const downloadManifest = async () => {
    setDownloading(true);
    try {
      const [copyRes, modulesRes, tickerRes, heroRes] = await Promise.all([
        supabase.from("site_copy").select("*"),
        supabase.from("site_modules").select("*").order("sort_order"),
        supabase.from("ticker_items").select("*").eq("active", true).order("sort_order"),
        supabase.from("hero_slides").select("*").order("sort_order"),
      ]);

      const manifest = {
        exported_at: new Date().toISOString(),
        project: "Inspire OKC",
        site_copy: copyRes.data || [],
        site_modules: modulesRes.data || [],
        ticker_items: tickerRes.data || [],
        hero_slides: heroRes.data || [],
        edge_functions: EDGE_FUNCTIONS.map(f => ({
          ...f,
          url: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${f.name}`,
        })),
      };

      const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inspire-okc-manifest-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const copySnippet = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Download */}
      <div className="skeuo-card-inset p-4 rounded">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="label-caps text-foreground">Source Config Export</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Download a JSON manifest of all site configuration — copy, modules, ticker items, hero slides, and API endpoints.
            </p>
          </div>
          <button onClick={downloadManifest} disabled={downloading} className="skeuo-btn text-xs">
            {downloading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
            {downloading ? "Exporting…" : "Download Manifest"}
          </button>
        </div>
      </div>

      {/* Integration Snippets */}
      <div className="skeuo-card-inset p-4 rounded">
        <h3 className="label-caps text-foreground mb-3">Integration Snippets</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Copy-paste these into any React app to embed Inspire OKC components.
        </p>
        <div className="space-y-4">
          {[
            { key: "ticker", label: "Wire Ticker", code: TICKER_SNIPPET },
            { key: "hero", label: "Hero Carousel", code: HERO_SNIPPET },
            { key: "civic", label: "Civic Panels", code: CIVIC_SNIPPET },
          ].map(({ key, label, code }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-foreground">{label}</span>
                <button onClick={() => copySnippet(key, code)} className="text-[10px] text-accent hover:underline flex items-center gap-1">
                  {copied === key ? <><CheckCircle2 size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                </button>
              </div>
              <pre className="text-[11px] font-mono bg-muted/30 border border-border/30 rounded p-3 overflow-x-auto text-muted-foreground whitespace-pre-wrap">
                {code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="skeuo-card-inset p-4 rounded">
        <h3 className="label-caps text-foreground mb-3">API Endpoints</h3>
        <div className="space-y-1.5">
          {EDGE_FUNCTIONS.map((fn) => (
            <div key={fn.name} className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
              <div className="flex items-center gap-2">
                <Globe size={10} className="text-accent" />
                <span className="font-mono text-xs text-foreground">{fn.name}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{fn.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
