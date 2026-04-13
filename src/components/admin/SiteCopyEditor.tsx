import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Save, Trash2, Edit3, X, Loader2 } from "lucide-react";

type SiteCopy = {
  id: string;
  copy_key: string;
  copy_value: string;
  context: string;
  updated_at: string;
};

const CONTEXTS = ["general", "homepage", "navbar", "footer", "newsletter", "editorial"];

const DEFAULT_COPY: { copy_key: string; copy_value: string; context: string }[] = [
  { copy_key: "masthead_title", copy_value: "Your Guide to Oklahoma City", context: "homepage" },
  { copy_key: "masthead_subtitle", copy_value: "Singles · Fitness · Volunteering · Date Nights", context: "homepage" },
  { copy_key: "navbar_nameplate", copy_value: "INSPIRE OKC", context: "navbar" },
  { copy_key: "newsletter_headline", copy_value: "Get the Weekly Brief", context: "newsletter" },
  { copy_key: "newsletter_description", copy_value: "Oklahoma City's best events, fitness, and community — delivered every Monday.", context: "newsletter" },
  { copy_key: "footer_tagline", copy_value: "Oklahoma City's civic intelligence platform", context: "footer" },
  { copy_key: "pull_quote", copy_value: "The best way to predict the future of a city is to build it — together.", context: "editorial" },
];

export function SiteCopyEditor() {
  const [entries, setEntries] = useState<SiteCopy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ copy_key: "", copy_value: "", context: "general" });
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchEntries = useCallback(async () => {
    const { data } = await supabase
      .from("site_copy")
      .select("*")
      .order("context", { ascending: true });
    setEntries((data as SiteCopy[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  const seedDefaults = async () => {
    setSaving(true);
    await supabase.from("site_copy").insert(DEFAULT_COPY);
    await fetchEntries();
    setSaving(false);
  };

  const saveCopy = async () => {
    if (!draft.copy_key.trim()) return;
    setSaving(true);
    if (editingId) {
      await supabase.from("site_copy").update({
        copy_value: draft.copy_value,
        context: draft.context,
      }).eq("id", editingId);
    } else {
      await supabase.from("site_copy").insert(draft);
    }
    setSaving(false);
    setEditingId(null);
    setCreating(false);
    setDraft({ copy_key: "", copy_value: "", context: "general" });
    fetchEntries();
  };

  const deleteCopy = async (id: string) => {
    await supabase.from("site_copy").delete().eq("id", id);
    fetchEntries();
  };

  const startEdit = (e: SiteCopy) => {
    setEditingId(e.id);
    setCreating(true);
    setDraft({ copy_key: e.copy_key, copy_value: e.copy_value, context: e.context });
  };

  const cancel = () => {
    setEditingId(null);
    setCreating(false);
    setDraft({ copy_key: "", copy_value: "", context: "general" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={16} className="animate-spin text-accent mr-2" />
        <span className="text-xs text-muted-foreground">Loading copy...</span>
      </div>
    );
  }

  // Group by context
  const grouped = entries.reduce<Record<string, SiteCopy[]>>((acc, e) => {
    (acc[e.context] = acc[e.context] || []).push(e);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="headline text-foreground text-lg">Site Copy</h2>
          <p className="text-xs text-muted-foreground">Edit headlines, taglines, and text blocks across the site</p>
        </div>
        <div className="flex gap-2">
          {entries.length === 0 && (
            <button onClick={seedDefaults} disabled={saving} className="skeuo-btn rounded text-xs">
              <Plus size={12} /> Seed Defaults
            </button>
          )}
          {!creating && (
            <button onClick={() => setCreating(true)} className="skeuo-btn rounded text-xs">
              <Plus size={12} /> New Entry
            </button>
          )}
        </div>
      </div>

      {creating && (
        <div className="skeuo-card-inset p-4 rounded space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="label-caps text-foreground">{editingId ? "Edit Copy" : "New Copy Entry"}</h3>
            <button onClick={cancel} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={draft.copy_key}
              onChange={(e) => setDraft(d => ({ ...d, copy_key: e.target.value }))}
              placeholder="Key (e.g. masthead_title)"
              disabled={!!editingId}
              className="px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
            />
            <select
              value={draft.context}
              onChange={(e) => setDraft(d => ({ ...d, context: e.target.value }))}
              className="px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none"
            >
              {CONTEXTS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <textarea
            value={draft.copy_value}
            onChange={(e) => setDraft(d => ({ ...d, copy_value: e.target.value }))}
            placeholder="Copy text..."
            rows={3}
            className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent resize-y"
          />
          <button onClick={saveCopy} disabled={saving || !draft.copy_key.trim()} className="skeuo-btn rounded text-xs">
            <Save size={12} /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      )}

      {Object.entries(grouped).map(([context, items]) => (
        <div key={context} className="space-y-1">
          <p className="label-caps text-accent text-[10px] mb-1">{context}</p>
          {items.map(entry => (
            <div key={entry.id} className="skeuo-card-inset p-3 rounded flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-muted-foreground">{entry.copy_key}</p>
                <p className="text-sm text-foreground mt-0.5">{entry.copy_value || <span className="italic text-muted-foreground/50">Empty</span>}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => startEdit(entry)} className="p-1.5 hover:bg-muted/30 rounded"><Edit3 size={12} className="text-accent" /></button>
                <button onClick={() => deleteCopy(entry.id)} className="p-1.5 hover:bg-muted/30 rounded"><Trash2 size={12} className="text-red-400" /></button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {entries.length === 0 && !creating && (
        <p className="text-xs text-muted-foreground text-center py-6">No copy entries yet. Seed defaults or add one manually.</p>
      )}
    </div>
  );
}
