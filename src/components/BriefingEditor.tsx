import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Save, Trash2, Eye, EyeOff, Pin, PinOff, Edit3, X } from "lucide-react";

type Briefing = {
  id: string;
  title: string;
  content: string;
  category: string;
  published: boolean;
  pinned: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
};

const CATEGORIES = ["city", "thunder", "comets", "growth", "culture", "breaking"];

export function BriefingEditor() {
  const { user } = useAuth();
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ title: "", content: "", category: "city", published: true, pinned: false });
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchBriefings = useCallback(async () => {
    const { data } = await supabase
      .from("briefings")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    setBriefings((data as Briefing[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBriefings(); }, [fetchBriefings]);

  const saveBriefing = async () => {
    if (!user || !draft.title.trim()) return;
    setSaving(true);
    if (editingId) {
      await supabase.from("briefings").update({
        title: draft.title,
        content: draft.content,
        category: draft.category,
        published: draft.published,
        pinned: draft.pinned,
      }).eq("id", editingId);
    } else {
      await supabase.from("briefings").insert({
        user_id: user.id,
        title: draft.title,
        content: draft.content,
        category: draft.category,
        published: draft.published,
        pinned: draft.pinned,
      });
    }
    setSaving(false);
    setEditingId(null);
    setCreating(false);
    setDraft({ title: "", content: "", category: "city", published: true, pinned: false });
    fetchBriefings();
  };

  const deleteBriefing = async (id: string) => {
    await supabase.from("briefings").delete().eq("id", id);
    fetchBriefings();
  };

  const togglePublish = async (b: Briefing) => {
    await supabase.from("briefings").update({ published: !b.published }).eq("id", b.id);
    fetchBriefings();
  };

  const togglePin = async (b: Briefing) => {
    await supabase.from("briefings").update({ pinned: !b.pinned }).eq("id", b.id);
    fetchBriefings();
  };

  const startEdit = (b: Briefing) => {
    setEditingId(b.id);
    setCreating(true);
    setDraft({ title: b.title, content: b.content, category: b.category, published: b.published, pinned: b.pinned });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setCreating(false);
    setDraft({ title: "", content: "", category: "city", published: true, pinned: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="headline text-foreground text-lg">City Briefings</h2>
          <p className="text-xs text-muted-foreground">Create and edit briefings — changes appear instantly on the homepage</p>
        </div>
        {!creating && (
          <button onClick={() => setCreating(true)} className="skeuo-btn rounded text-xs">
            <Plus size={12} /> New Briefing
          </button>
        )}
      </div>

      {/* Editor */}
      {creating && (
        <div className="skeuo-card-inset p-4 rounded space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="label-caps text-foreground">{editingId ? "Edit Briefing" : "New Briefing"}</h3>
            <button onClick={cancelEdit} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
          </div>
          <input
            value={draft.title}
            onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
            placeholder="Briefing headline..."
            className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <textarea
            value={draft.content}
            onChange={(e) => setDraft(d => ({ ...d, content: e.target.value }))}
            placeholder="Write your briefing content... (supports markdown)"
            rows={6}
            className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent resize-y"
          />
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={draft.category}
              onChange={(e) => setDraft(d => ({ ...d, category: e.target.value }))}
              className="px-3 py-1.5 bg-muted/30 border border-border/50 rounded text-xs text-foreground focus:outline-none"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={draft.published} onChange={(e) => setDraft(d => ({ ...d, published: e.target.checked }))} className="accent-accent" />
              Published
            </label>
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={draft.pinned} onChange={(e) => setDraft(d => ({ ...d, pinned: e.target.checked }))} className="accent-accent" />
              Pinned
            </label>
            <button onClick={saveBriefing} disabled={saving || !draft.title.trim()} className="skeuo-btn rounded text-xs ml-auto">
              <Save size={12} /> {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-xs text-muted-foreground text-center py-8">Loading briefings...</p>
      ) : briefings.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-8">No briefings yet. Create your first one above.</p>
      ) : (
        <div className="space-y-2">
          {briefings.map((b) => (
            <div key={b.id} className={`skeuo-card-inset p-4 rounded ${!b.published ? "opacity-60" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {b.pinned && <Pin size={10} className="text-accent flex-shrink-0" />}
                    <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-accent/10 text-accent">{b.category}</span>
                    {!b.published && <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">Draft</span>}
                    <span className="text-[9px] text-muted-foreground/50 ml-auto">{new Date(b.updated_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{b.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{b.content}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(b)} className="p-1.5 text-muted-foreground hover:text-foreground"><Edit3 size={12} /></button>
                  <button onClick={() => togglePublish(b)} className="p-1.5 text-muted-foreground hover:text-foreground">
                    {b.published ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                  <button onClick={() => togglePin(b)} className="p-1.5 text-muted-foreground hover:text-foreground">
                    {b.pinned ? <PinOff size={12} /> : <Pin size={12} />}
                  </button>
                  <button onClick={() => deleteBriefing(b.id)} className="p-1.5 text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
