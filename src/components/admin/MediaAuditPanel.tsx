import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { ImageOff, Image, Check, Search, Save, Loader2, ExternalLink } from "lucide-react";

type ImageCacheEntry = {
  listing_type: string;
  listing_id: string;
  image_url: string;
  quality_score: number | null;
};

type MediaOverride = {
  id: string;
  listing_type: string;
  listing_id: string;
  image_url: string;
  status: string;
  notes: string | null;
};

type ListingInfo = {
  type: string;
  id: string;
  name: string;
  category: string;
  cachedUrl: string | null;
  overrideUrl: string | null;
  status: "manual" | "auto" | "missing";
};

export function MediaAuditPanel() {
  const [cached, setCached] = useState<ImageCacheEntry[]>([]);
  const [overrides, setOverrides] = useState<MediaOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "missing" | "auto" | "manual">("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [{ data: cacheData }, { data: overrideData }] = await Promise.all([
        supabase.from("image_cache").select("listing_type, listing_id, image_url, quality_score"),
        supabase.from("media_overrides").select("*"),
      ]);
      setCached((cacheData as ImageCacheEntry[]) || []);
      setOverrides((overrideData as MediaOverride[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  const allListings = useMemo((): ListingInfo[] => {
    const cacheMap = new Map(cached.map(c => [`${c.listing_type}:${c.listing_id}`, c.image_url]));
    const overrideMap = new Map(overrides.map(o => [`${o.listing_type}:${o.listing_id}`, o.image_url]));

    const items: ListingInfo[] = [];

    for (const evt of singlesEvents) {
      const key = `singles:${evt.id}`;
      const ov = overrideMap.get(key);
      const ca = cacheMap.get(key);
      items.push({
        type: "singles", id: evt.id, name: evt.name, category: evt.category,
        cachedUrl: ca || null, overrideUrl: ov || null,
        status: ov ? "manual" : ca ? "auto" : "missing",
      });
    }
    for (const spot of fitnessSpots) {
      const key = `fitness:${spot.id}`;
      const ov = overrideMap.get(key);
      const ca = cacheMap.get(key);
      items.push({
        type: "fitness", id: spot.id, name: spot.name, category: spot.category,
        cachedUrl: ca || null, overrideUrl: ov || null,
        status: ov ? "manual" : ca ? "auto" : "missing",
      });
    }
    for (const org of volunteerOrgs) {
      const key = `volunteer:${org.id}`;
      const ov = overrideMap.get(key);
      const ca = cacheMap.get(key);
      items.push({
        type: "volunteer", id: org.id, name: org.name, category: org.category,
        cachedUrl: ca || null, overrideUrl: ov || null,
        status: ov ? "manual" : ca ? "auto" : "missing",
      });
    }

    return items;
  }, [cached, overrides]);

  const filtered = useMemo(() => {
    return allListings.filter(item => {
      if (filter !== "all" && item.status !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.type.includes(q);
      }
      return true;
    });
  }, [allListings, filter, search]);

  const stats = useMemo(() => ({
    total: allListings.length,
    manual: allListings.filter(i => i.status === "manual").length,
    auto: allListings.filter(i => i.status === "auto").length,
    missing: allListings.filter(i => i.status === "missing").length,
  }), [allListings]);

  const saveOverride = async (item: ListingInfo) => {
    if (!editUrl.trim()) return;
    setSaving(true);
    
    const existing = overrides.find(o => o.listing_type === item.type && o.listing_id === item.id);
    if (existing) {
      await supabase.from("media_overrides").update({ image_url: editUrl.trim() }).eq("id", existing.id);
    } else {
      await supabase.from("media_overrides").insert({
        listing_type: item.type,
        listing_id: item.id,
        image_url: editUrl.trim(),
        status: "manual",
      });
    }

    // Refresh overrides
    const { data } = await supabase.from("media_overrides").select("*");
    setOverrides((data as MediaOverride[]) || []);
    setEditingId(null);
    setEditUrl("");
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={16} className="animate-spin text-accent mr-2" />
        <span className="text-xs text-muted-foreground">Auditing media coverage...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="headline text-foreground text-lg">Media Audit</h2>
        <p className="text-xs text-muted-foreground">Track image coverage and set manual overrides for any listing</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => setFilter("all")} className={`skeuo-card-inset p-3 rounded text-center ${filter === "all" ? "ring-1 ring-accent" : ""}`}>
          <p className="text-lg font-black text-foreground">{stats.total}</p>
          <p className="text-[10px] text-muted-foreground">Total</p>
        </button>
        <button onClick={() => setFilter("manual")} className={`skeuo-card-inset p-3 rounded text-center ${filter === "manual" ? "ring-1 ring-accent" : ""}`}>
          <p className="text-lg font-black text-accent">{stats.manual}</p>
          <p className="text-[10px] text-muted-foreground">Manual</p>
        </button>
        <button onClick={() => setFilter("auto")} className={`skeuo-card-inset p-3 rounded text-center ${filter === "auto" ? "ring-1 ring-accent" : ""}`}>
          <p className="text-lg font-black text-emerald-500">{stats.auto}</p>
          <p className="text-[10px] text-muted-foreground">Auto</p>
        </button>
        <button onClick={() => setFilter("missing")} className={`skeuo-card-inset p-3 rounded text-center ${filter === "missing" ? "ring-1 ring-accent" : ""}`}>
          <p className="text-lg font-black text-red-400">{stats.missing}</p>
          <p className="text-[10px] text-muted-foreground">Missing</p>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search listings..."
          className="w-full pl-9 pr-4 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <p className="dateline text-muted-foreground">{filtered.length} listings</p>

      {/* List */}
      <div className="space-y-1 max-h-[500px] overflow-y-auto">
        {filtered.map(item => {
          const itemKey = `${item.type}:${item.id}`;
          const isEditing = editingId === itemKey;
          return (
            <div key={itemKey} className="skeuo-card-inset p-3 rounded">
              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-muted/30 flex items-center justify-center">
                  {(item.overrideUrl || item.cachedUrl) ? (
                    <img src={item.overrideUrl || item.cachedUrl!} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageOff size={14} className="text-muted-foreground/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0">{item.type}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{item.category}</p>
                </div>
                {/* Status */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.status === "manual" && <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-bold">MANUAL</span>}
                  {item.status === "auto" && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">AUTO</span>}
                  {item.status === "missing" && <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold">MISSING</span>}
                  <button
                    onClick={() => {
                      if (isEditing) { setEditingId(null); setEditUrl(""); }
                      else { setEditingId(itemKey); setEditUrl(item.overrideUrl || item.cachedUrl || ""); }
                    }}
                    className="p-1.5 hover:bg-muted/30 rounded"
                  >
                    <Image size={12} className="text-accent" />
                  </button>
                </div>
              </div>
              {isEditing && (
                <div className="mt-2 pt-2 border-t border-border/30 flex gap-2">
                  <input
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 px-3 py-1.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button onClick={() => saveOverride(item)} disabled={saving} className="skeuo-btn text-xs">
                    <Save size={12} /> Save
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
