import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Loader2, Send, Edit3, CheckCircle2, X, FileText } from "lucide-react";

export function NewsroomPanel() {
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [drafting, setDrafting] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [recentBriefings, setRecentBriefings] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load recent published feed items for context
    supabase.from("feed_items").select("*").order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => setFeedItems(data || []));
    // Load recent briefings
    supabase.from("briefings").select("*").order("created_at", { ascending: false }).limit(10)
      .then(({ data }) => setRecentBriefings(data || []));
  }, []);

  const generateDraft = async () => {
    setDrafting(true);
    setError("");
    setDraftTitle("");
    setDraftContent("");
    setPublished(false);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("newsroom-draft", {
        body: { feedItems: feedItems.slice(0, 10).map(f => ({ title: f.title, content: f.content?.slice(0, 200) })) },
      });
      if (fnError) throw fnError;
      setDraftTitle(data?.title || "City Briefing");
      setDraftContent(data?.content || "No content generated.");
    } catch (e: any) {
      setError(e.message || "Failed to generate draft");
    }
    setDrafting(false);
  };

  const publishDraft = async () => {
    if (!draftTitle || !draftContent) return;
    setPublishing(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setPublishing(false); return; }

    const { error: insertError } = await supabase.from("briefings").insert({
      title: draftTitle,
      content: draftContent,
      category: "city",
      published: true,
      user_id: user.id,
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      setPublished(true);
      setDraftTitle("");
      setDraftContent("");
      // Refresh briefings
      const { data } = await supabase.from("briefings").select("*").order("created_at", { ascending: false }).limit(10);
      setRecentBriefings(data || []);
    }
    setPublishing(false);
  };

  return (
    <div className="space-y-6">
      {/* Draft Generator */}
      <div className="skeuo-card p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-accent" />
          <h3 className="font-bold text-foreground">AI Briefing Generator</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Generate a city briefing from your latest {feedItems.length} feed items. AI drafts the content, you review and publish.
        </p>

        {!draftContent && !drafting && (
          <button onClick={generateDraft} className="skeuo-btn px-4 py-2 text-sm">
            <Sparkles size={14} className="mr-2" /> Generate Draft Briefing
          </button>
        )}

        {drafting && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <Loader2 className="animate-spin" size={16} />
            AI is drafting your city briefing…
          </div>
        )}

        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

        {draftContent && !published && (
          <div className="space-y-3 mt-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Title</label>
              <input value={draftTitle} onChange={e => setDraftTitle(e.target.value)} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Content</label>
              <textarea value={draftContent} onChange={e => setDraftContent(e.target.value)} rows={10} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground mt-1 font-mono" />
            </div>
            <div className="flex gap-2">
              <button onClick={publishDraft} disabled={publishing} className="skeuo-btn px-4 py-2 text-sm flex-1 justify-center">
                {publishing ? <Loader2 size={14} className="animate-spin mr-1" /> : <Send size={14} className="mr-1" />}
                Publish to Live Briefings
              </button>
              <button onClick={() => { setDraftContent(""); setDraftTitle(""); }} className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                <X size={14} /> Discard
              </button>
            </div>
          </div>
        )}

        {published && (
          <div className="flex items-center gap-2 text-sm text-emerald-500 py-4">
            <CheckCircle2 size={16} /> Briefing published successfully!
            <button onClick={() => setPublished(false)} className="ml-2 text-xs text-muted-foreground hover:text-foreground">Generate Another</button>
          </div>
        )}
      </div>

      {/* Recent Briefings */}
      <div className="skeuo-card p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-accent" />
          <h3 className="font-bold text-foreground">Recent Briefings</h3>
        </div>
        <div className="space-y-2">
          {recentBriefings.map(b => (
            <div key={b.id} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/20 text-sm">
              <span className={`w-2 h-2 rounded-full ${b.published ? "bg-emerald-500" : "bg-amber-500"}`} />
              <span className="text-foreground font-medium truncate flex-1">{b.title}</span>
              <span className="text-[10px] text-muted-foreground">{b.category}</span>
              <span className="text-[10px] text-muted-foreground">{new Date(b.created_at).toLocaleDateString()}</span>
            </div>
          ))}
          {recentBriefings.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No briefings yet</p>}
        </div>
      </div>

      {/* Feed Items Context */}
      <div className="skeuo-card p-4 rounded-lg">
        <h4 className="text-sm font-bold text-foreground mb-2">Feed Items Available ({feedItems.length})</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {feedItems.slice(0, 15).map(f => (
            <div key={f.id} className="flex items-center gap-2 text-xs px-2 py-1">
              <span className={`w-1.5 h-1.5 rounded-full ${f.status === "published" ? "bg-emerald-500" : f.status === "approved" ? "bg-blue-500" : "bg-muted-foreground"}`} />
              <span className="text-foreground truncate">{f.title}</span>
              <span className="text-muted-foreground ml-auto">{f.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
