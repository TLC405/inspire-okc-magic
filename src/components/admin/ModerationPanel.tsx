import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, CheckCircle2, XCircle, AlertTriangle, Loader2, Eye, Trash2 } from "lucide-react";

type QueueItem = {
  id: string;
  content_type: string;
  content_id: string | null;
  content_preview: string;
  severity: string;
  ai_explanation: string;
  status: string;
  created_at: string;
};

const severityConfig: Record<string, { color: string; icon: typeof AlertTriangle }> = {
  critical: { color: "text-red-500 bg-red-500/10", icon: XCircle },
  warning: { color: "text-amber-500 bg-amber-500/10", icon: AlertTriangle },
  info: { color: "text-blue-500 bg-blue-500/10", icon: Eye },
};

export function ModerationPanel() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [decidingId, setDecidingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const fetchQueue = async () => {
    setLoading(true);
    let query = supabase.from("moderation_queue").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    const { data } = await query.limit(100);
    setQueue((data as QueueItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchQueue(); }, [statusFilter]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("moderation-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "moderation_queue" }, () => fetchQueue())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [statusFilter]);

  const makeDecision = async (itemId: string, decision: "approve" | "reject" | "redact") => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("moderation_decisions").insert({
      queue_item_id: itemId,
      decision,
      reason,
      user_id: user.id,
    });

    const newStatus = decision === "approve" ? "approved" : decision === "reject" ? "rejected" : "redacted";
    await supabase.from("moderation_queue").update({ status: newStatus }).eq("id", itemId);

    setDecidingId(null);
    setReason("");
    fetchQueue();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("moderation_queue").delete().eq("id", id);
    fetchQueue();
  };

  const pendingCount = queue.filter(q => q.status === "pending").length;

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending", value: pendingCount, color: "text-amber-500" },
          { label: "Total Items", value: queue.length, color: "text-foreground" },
          { label: "Filter", value: statusFilter, color: "text-accent" },
        ].map(s => (
          <div key={s.label} className="skeuo-card p-3 rounded text-center">
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-1">
        {["pending", "approved", "rejected", "redacted", "all"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded text-xs font-semibold ${statusFilter === s ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Queue */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="animate-spin text-accent" /></div>
      ) : (
        <div className="space-y-2">
          {queue.map(item => {
            const sev = severityConfig[item.severity] || severityConfig.info;
            const SevIcon = sev.icon;
            return (
              <div key={item.id} className="skeuo-card p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded ${sev.color}`}>
                    <SevIcon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">{item.content_type}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${sev.color}`}>{item.severity}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.status === "pending" ? "bg-amber-500/10 text-amber-500" : item.status === "approved" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>{item.status}</span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{item.content_preview || "No preview"}</p>
                    {item.ai_explanation && (
                      <p className="text-xs text-muted-foreground mt-1 italic">AI: {item.ai_explanation}</p>
                    )}
                    <span className="text-[10px] text-muted-foreground">{new Date(item.created_at).toLocaleString()}</span>

                    {/* Decision Controls */}
                    {item.status === "pending" && (
                      <div className="mt-3">
                        {decidingId === item.id ? (
                          <div className="space-y-2">
                            <input value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason (optional)" className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
                            <div className="flex gap-2">
                              <button onClick={() => makeDecision(item.id, "approve")} className="flex-1 skeuo-btn px-3 py-1.5 text-xs justify-center text-emerald-500">
                                <CheckCircle2 size={12} className="mr-1" /> Approve
                              </button>
                              <button onClick={() => makeDecision(item.id, "reject")} className="flex-1 skeuo-btn px-3 py-1.5 text-xs justify-center text-red-500">
                                <XCircle size={12} className="mr-1" /> Reject
                              </button>
                              <button onClick={() => makeDecision(item.id, "redact")} className="flex-1 skeuo-btn px-3 py-1.5 text-xs justify-center text-amber-500">
                                <Shield size={12} className="mr-1" /> Redact
                              </button>
                              <button onClick={() => { setDecidingId(null); setReason(""); }} className="px-2 text-xs text-muted-foreground">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => setDecidingId(item.id)} className="skeuo-btn px-3 py-1.5 text-xs">Review</button>
                        )}
                      </div>
                    )}
                  </div>
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded hover:bg-red-500/10">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            );
          })}
          {queue.length === 0 && (
            <div className="skeuo-card p-8 rounded-lg text-center">
              <Shield size={32} className="mx-auto mb-3 text-emerald-500/30" />
              <p className="text-sm text-muted-foreground">No items in the moderation queue</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
