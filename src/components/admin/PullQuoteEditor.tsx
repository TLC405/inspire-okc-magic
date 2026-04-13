import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function PullQuoteEditor() {
  const { user } = useAuth();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("admin_settings").select("*").eq("user_id", user.id).in("setting_key", ["pull_quote_text", "pull_quote_author"]).then(({ data }) => {
      data?.forEach((d: any) => {
        if (d.setting_key === "pull_quote_text") setQuote(d.setting_value);
        if (d.setting_key === "pull_quote_author") setAuthor(d.setting_value);
      });
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    await Promise.all([
      supabase.from("admin_settings").upsert({ user_id: user.id, setting_key: "pull_quote_text", setting_value: quote }, { onConflict: "user_id,setting_key" }),
      supabase.from("admin_settings").upsert({ user_id: user.id, setting_key: "pull_quote_author", setting_value: author }, { onConflict: "user_id,setting_key" }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="label-caps text-foreground">Homepage Pull Quote</h3>
        <p className="text-xs text-muted-foreground mt-0.5">The featured editorial quote on the homepage. Leave blank for default.</p>
      </div>
      <div className="skeuo-card-inset p-4 rounded space-y-3">
        <div>
          <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">Quote Text</label>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Oklahoma City doesn't just grow — it reinvents itself..."
            className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent min-h-[80px] resize-y"
          />
        </div>
        <div>
          <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">Attribution</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="INSPIRE Editorial Board"
            className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={save} disabled={saving} className="skeuo-btn text-xs">
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />} Save Quote
          </button>
          {saved && <span className="text-xs text-emerald-500">Saved</span>}
        </div>
      </div>
    </div>
  );
}
