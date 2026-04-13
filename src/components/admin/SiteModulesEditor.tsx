import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GripVertical, Eye, EyeOff, Save, Plus, Trash2, Loader2 } from "lucide-react";

type SiteModule = {
  id: string;
  section_key: string;
  label: string;
  visible: boolean;
  sort_order: number;
  config: Record<string, any>;
};

const DEFAULT_MODULES = [
  { section_key: "hero_carousel", label: "Hero Carousel" },
  { section_key: "headline_block", label: "Front Page Headline" },
  { section_key: "search", label: "Search" },
  { section_key: "photo_grid", label: "Photo Grid" },
  { section_key: "newsletter", label: "Newsletter CTA" },
  { section_key: "tonight_block", label: "Tonight in OKC" },
  { section_key: "live_briefings", label: "Live Briefings" },
  { section_key: "broadsheet", label: "Broadsheet Columns" },
  { section_key: "civic_panels", label: "Civic Intelligence" },
  { section_key: "footer", label: "Footer" },
];

export function SiteModulesEditor() {
  const [modules, setModules] = useState<SiteModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchModules = useCallback(async () => {
    const { data } = await supabase
      .from("site_modules")
      .select("*")
      .order("sort_order", { ascending: true });
    
    if (data && data.length > 0) {
      setModules(data as SiteModule[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchModules(); }, [fetchModules]);

  const seedDefaults = async () => {
    setSaving(true);
    const inserts = DEFAULT_MODULES.map((m, i) => ({
      section_key: m.section_key,
      label: m.label,
      visible: true,
      sort_order: i * 10,
      config: {},
    }));
    await supabase.from("site_modules").insert(inserts);
    await fetchModules();
    setSaving(false);
  };

  const toggleVisibility = async (mod: SiteModule) => {
    await supabase.from("site_modules").update({ visible: !mod.visible }).eq("id", mod.id);
    setModules(prev => prev.map(m => m.id === mod.id ? { ...m, visible: !m.visible } : m));
  };

  const moveModule = async (index: number, direction: -1 | 1) => {
    const newModules = [...modules];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newModules.length) return;
    
    const tempOrder = newModules[index].sort_order;
    newModules[index].sort_order = newModules[swapIndex].sort_order;
    newModules[swapIndex].sort_order = tempOrder;
    
    [newModules[index], newModules[swapIndex]] = [newModules[swapIndex], newModules[index]];
    setModules(newModules);

    await Promise.all([
      supabase.from("site_modules").update({ sort_order: newModules[index].sort_order }).eq("id", newModules[index].id),
      supabase.from("site_modules").update({ sort_order: newModules[swapIndex].sort_order }).eq("id", newModules[swapIndex].id),
    ]);
  };

  const deleteModule = async (id: string) => {
    await supabase.from("site_modules").delete().eq("id", id);
    setModules(prev => prev.filter(m => m.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={16} className="animate-spin text-accent mr-2" />
        <span className="text-xs text-muted-foreground">Loading modules...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="headline text-foreground text-lg">Homepage Modules</h2>
          <p className="text-xs text-muted-foreground">Toggle visibility and reorder homepage sections</p>
        </div>
        {modules.length === 0 && (
          <button onClick={seedDefaults} disabled={saving} className="skeuo-btn rounded text-xs">
            <Plus size={12} /> Seed Default Modules
          </button>
        )}
      </div>

      {modules.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-6">No modules configured. Click "Seed Default Modules" to initialize.</p>
      ) : (
        <div className="space-y-1">
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              className={`skeuo-card-inset p-3 rounded flex items-center gap-3 ${!mod.visible ? "opacity-50" : ""}`}
            >
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveModule(i, -1)}
                  disabled={i === 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-20 text-[10px]"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveModule(i, 1)}
                  disabled={i === modules.length - 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-20 text-[10px]"
                >
                  ▼
                </button>
              </div>
              <GripVertical size={14} className="text-muted-foreground/30 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{mod.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{mod.section_key}</p>
              </div>
              <button onClick={() => toggleVisibility(mod)} className="p-1.5 hover:bg-muted/30 rounded">
                {mod.visible ? <Eye size={14} className="text-accent" /> : <EyeOff size={14} className="text-muted-foreground" />}
              </button>
              <button onClick={() => deleteModule(mod.id)} className="p-1.5 hover:bg-muted/30 rounded">
                <Trash2 size={12} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
