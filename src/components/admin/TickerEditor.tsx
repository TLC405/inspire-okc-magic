import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

type TickerItem = {
  id: string;
  headline: string;
  link: string;
  category: string;
  active: boolean;
  sort_order: number;
};

export function TickerEditor() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("ticker_items")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems((data as TickerItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    const { data } = await supabase.from("ticker_items").insert({
      headline: "New headline",
      link: "/",
      category: "CITY",
      sort_order: items.length,
      active: true,
    }).select().single();
    if (data) setItems((prev) => [...prev, data as TickerItem]);
  };

  const updateItem = async (id: string, updates: Partial<TickerItem>) => {
    await supabase.from("ticker_items").update(updates).eq("id", id);
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteItem = async (id: string) => {
    await supabase.from("ticker_items").delete().eq("id", id);
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) return <div className="flex items-center gap-2 py-4 justify-center"><Loader2 size={16} className="animate-spin text-accent" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="label-caps text-foreground">Wire Ticker Headlines</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Edit the scrolling news ticker. Active items override defaults.</p>
        </div>
        <button onClick={addItem} className="skeuo-btn text-xs"><Plus size={12} /> Add</button>
      </div>

      {items.length === 0 ? (
        <div className="skeuo-card-inset p-4 rounded text-center">
          <p className="text-sm text-muted-foreground">No custom ticker items. Using defaults.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className={`skeuo-card-inset p-3 rounded flex items-center gap-3 ${!item.active ? "opacity-50" : ""}`}>
              <div className="flex-shrink-0 w-20">
                <input
                  value={item.category}
                  onChange={(e) => setItems((p) => p.map((t) => (t.id === item.id ? { ...t, category: e.target.value } : t)))}
                  onBlur={() => updateItem(item.id, { category: item.category })}
                  className="w-full px-1.5 py-1 bg-muted/30 border border-border/50 rounded text-[10px] font-bold uppercase text-foreground focus:outline-none focus:ring-1 focus:ring-accent text-center"
                />
              </div>
              <input
                value={item.headline}
                onChange={(e) => setItems((p) => p.map((t) => (t.id === item.id ? { ...t, headline: e.target.value } : t)))}
                onBlur={() => updateItem(item.id, { headline: item.headline })}
                className="flex-1 px-2 py-1 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <input
                value={item.link}
                onChange={(e) => setItems((p) => p.map((t) => (t.id === item.id ? { ...t, link: e.target.value } : t)))}
                onBlur={() => updateItem(item.id, { link: item.link })}
                className="w-24 px-2 py-1 bg-muted/30 border border-border/50 rounded text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="/link"
              />
              <button
                onClick={() => updateItem(item.id, { active: !item.active })}
                className={`p-1.5 rounded ${item.active ? "text-emerald-500" : "text-muted-foreground"}`}
              >
                {item.active ? <Eye size={12} /> : <EyeOff size={12} />}
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded text-red-400 hover:bg-red-500/10">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
