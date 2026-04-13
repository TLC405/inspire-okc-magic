import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Save, Trash2, Edit3, X, Loader2, Rss, Check, Clock, Eye, EyeOff, ExternalLink } from "lucide-react";

type FeedSource = {
  id: string;
  name: string;
  source_url: string | null;
  source_type: string;
  active: boolean;
  last_fetched_at: string | null;
};

type FeedItem = {
  id: string;
  source_id: string | null;
  title: string;
  content: string;
  external_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
};

const STATUSES = ["pending", "approved", "published", "rejected"];

export function FeedManager() {
  const [sources, setSources] = useState<FeedSource[]>([]);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"items" | "sources">("items");
  const [statusFilter, setStatusFilter] = useState<string>("pending");

  // Source editor
  const [creatingSource, setCreatingSource] = useState(false);
  const [sourceDraft, setSourceDraft] = useState({ name: "", source_url: "", source_type: "manual" });

  // Item editor
  const [creatingItem, setCreatingItem] = useState(false);
  const [itemDraft, setItemDraft] = useState({ title: "", content: "", external_url: "", source_id: "" });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const [{ data: s }, { data: i }] = await Promise.all([
      supabase.from("feed_sources").select("*").order("created_at", { ascending: false }),
      supabase.from("feed_items").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setSources((s as FeedSource[]) || []);
    setItems((i as FeedItem[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Realtime for feed items
  useEffect(() => {
    const channel = supabase
      .channel("feed_items_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "feed_items" }, () => {
        fetchData();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchData]);

  const saveSource = async () => {
    if (!sourceDraft.name.trim()) return;
    setSaving(true);
    await supabase.from("feed_sources").insert({
      name: sourceDraft.name,
      source_url: sourceDraft.source_url || null,
      source_type: sourceDraft.source_type,
    });
    setCreatingSource(false);
    setSourceDraft({ name: "", source_url: "", source_type: "manual" });
    setSaving(false);
    fetchData();
  };

  const deleteSource = async (id: string) => {
    await supabase.from("feed_sources").delete().eq("id", id);
    fetchData();
  };

  const saveItem = async () => {
    if (!itemDraft.title.trim()) return;
    setSaving(true);
    await supabase.from("feed_items").insert({
      title: itemDraft.title,
      content: itemDraft.content,
      external_url: itemDraft.external_url || null,
      source_id: itemDraft.source_id || null,
      status: "pending",
    });
    setCreatingItem(false);
    setItemDraft({ title: "", content: "", external_url: "", source_id: "" });
    setSaving(false);
    fetchData();
  };

  const updateItemStatus = async (id: string, status: string) => {
    const updates: Record<string, any> = { status };
    if (status === "published") updates.published_at = new Date().toISOString();
    await supabase.from("feed_items").update(updates).eq("id", id);
    fetchData();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("feed_items").delete().eq("id", id);
    fetchData();
  };

  const filteredItems = items.filter(i => statusFilter === "all" ? true : i.status === statusFilter);
  const sourceMap = new Map(sources.map(s => [s.id, s.name]));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={16} className="animate-spin text-accent mr-2" />
        <span className="text-xs text-muted-foreground">Loading feeds...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="headline text-foreground text-lg">Live Feeds</h2>
          <p className="text-xs text-muted-foreground">Manage incoming news, events, and editorial content</p>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="flex gap-1">
        <button onClick={() => setActiveTab("items")} className={`px-3 py-2 rounded text-xs font-medium ${activeTab === "items" ? "bg-accent/15 text-accent" : "text-muted-foreground"}`}>
          Feed Items ({items.length})
        </button>
        <button onClick={() => setActiveTab("sources")} className={`px-3 py-2 rounded text-xs font-medium ${activeTab === "sources" ? "bg-accent/15 text-accent" : "text-muted-foreground"}`}>
          Sources ({sources.length})
        </button>
      </div>

      {activeTab === "items" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {["pending", "approved", "published", "rejected", "all"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wider ${statusFilter === s ? "bg-accent/15 text-accent" : "text-muted-foreground"}`}>
                {s} {s !== "all" && `(${items.filter(i => i.status === s).length})`}
              </button>
            ))}
            <button onClick={() => setCreatingItem(true)} className="skeuo-btn text-xs ml-auto">
              <Plus size={12} /> Add Item
            </button>
          </div>

          {creatingItem && (
            <div className="skeuo-card-inset p-4 rounded space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="label-caps text-foreground">New Feed Item</h3>
                <button onClick={() => setCreatingItem(false)} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
              </div>
              <input
                value={itemDraft.title}
                onChange={(e) => setItemDraft(d => ({ ...d, title: e.target.value }))}
                placeholder="Headline..."
                className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <textarea
                value={itemDraft.content}
                onChange={(e) => setItemDraft(d => ({ ...d, content: e.target.value }))}
                placeholder="Content..."
                rows={3}
                className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent resize-y"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={itemDraft.external_url}
                  onChange={(e) => setItemDraft(d => ({ ...d, external_url: e.target.value }))}
                  placeholder="External URL (optional)"
                  className="px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <select
                  value={itemDraft.source_id}
                  onChange={(e) => setItemDraft(d => ({ ...d, source_id: e.target.value }))}
                  className="px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none"
                >
                  <option value="">No source</option>
                  {sources.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <button onClick={saveItem} disabled={saving || !itemDraft.title.trim()} className="skeuo-btn rounded text-xs">
                <Save size={12} /> {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}

          <div className="space-y-1">
            {filteredItems.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No items in this queue.</p>
            ) : filteredItems.map(item => (
              <div key={item.id} className="skeuo-card-inset p-3 rounded">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        item.status === "published" ? "bg-emerald-500/10 text-emerald-500" :
                        item.status === "approved" ? "bg-blue-500/10 text-blue-500" :
                        item.status === "rejected" ? "bg-red-500/10 text-red-400" :
                        "bg-amber-500/10 text-amber-500"
                      }`}>{item.status}</span>
                      {item.source_id && <span className="text-[9px] text-muted-foreground">{sourceMap.get(item.source_id) || "Unknown"}</span>}
                      <span className="text-[9px] text-muted-foreground/50 ml-auto">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    {item.content && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.content}</p>}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {item.status === "pending" && (
                      <>
                        <button onClick={() => updateItemStatus(item.id, "approved")} className="p-1.5 hover:bg-muted/30 rounded" title="Approve">
                          <Check size={12} className="text-emerald-500" />
                        </button>
                        <button onClick={() => updateItemStatus(item.id, "rejected")} className="p-1.5 hover:bg-muted/30 rounded" title="Reject">
                          <X size={12} className="text-red-400" />
                        </button>
                      </>
                    )}
                    {item.status === "approved" && (
                      <button onClick={() => updateItemStatus(item.id, "published")} className="p-1.5 hover:bg-muted/30 rounded" title="Publish">
                        <Eye size={12} className="text-accent" />
                      </button>
                    )}
                    {item.external_url && (
                      <a href={item.external_url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-muted/30 rounded">
                        <ExternalLink size={12} className="text-muted-foreground" />
                      </a>
                    )}
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 hover:bg-muted/30 rounded">
                      <Trash2 size={12} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "sources" && (
        <div className="space-y-3">
          <button onClick={() => setCreatingSource(true)} className="skeuo-btn text-xs">
            <Plus size={12} /> Add Source
          </button>

          {creatingSource && (
            <div className="skeuo-card-inset p-4 rounded space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="label-caps text-foreground">New Source</h3>
                <button onClick={() => setCreatingSource(false)} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={sourceDraft.name}
                  onChange={(e) => setSourceDraft(d => ({ ...d, name: e.target.value }))}
                  placeholder="Source name..."
                  className="px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <select
                  value={sourceDraft.source_type}
                  onChange={(e) => setSourceDraft(d => ({ ...d, source_type: e.target.value }))}
                  className="px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none"
                >
                  <option value="manual">Manual</option>
                  <option value="rss">RSS</option>
                  <option value="api">API</option>
                  <option value="scrape">Scrape</option>
                </select>
              </div>
              <input
                value={sourceDraft.source_url}
                onChange={(e) => setSourceDraft(d => ({ ...d, source_url: e.target.value }))}
                placeholder="Source URL (optional)"
                className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button onClick={saveSource} disabled={saving || !sourceDraft.name.trim()} className="skeuo-btn rounded text-xs">
                <Save size={12} /> Save
              </button>
            </div>
          )}

          <div className="space-y-1">
            {sources.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No sources configured yet.</p>
            ) : sources.map(src => (
              <div key={src.id} className="skeuo-card-inset p-3 rounded flex items-center gap-3">
                <Rss size={14} className={src.active ? "text-accent" : "text-muted-foreground/30"} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{src.name}</p>
                  <p className="text-[10px] text-muted-foreground">{src.source_type} {src.source_url && `· ${src.source_url}`}</p>
                </div>
                {src.last_fetched_at && (
                  <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                    <Clock size={9} /> {new Date(src.last_fetched_at).toLocaleDateString()}
                  </span>
                )}
                <button onClick={() => deleteSource(src.id)} className="p-1.5 hover:bg-muted/30 rounded">
                  <Trash2 size={12} className="text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
