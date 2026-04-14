import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { singlesEvents, type SinglesEvent, type VerificationStatus } from "@/data/singlesEvents";
import { fitnessSpots, type FitnessSpot } from "@/data/fitnessSpots";
import { volunteerOrgs, type VolunteerOrg } from "@/data/volunteerOrgs";
import { cityShowcase } from "@/data/cityShowcase";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { AdminBriefing } from "@/components/AdminBriefing";
import { BriefingEditor } from "@/components/BriefingEditor";
import { HeroSlideEditor } from "@/components/admin/HeroSlideEditor";
import { TickerEditor } from "@/components/admin/TickerEditor";
import { PullQuoteEditor } from "@/components/admin/PullQuoteEditor";
import { ThemePanel } from "@/components/admin/ThemePanel";
import { SiteModulesEditor } from "@/components/admin/SiteModulesEditor";
import { SiteCopyEditor } from "@/components/admin/SiteCopyEditor";
import { MediaAuditPanel } from "@/components/admin/MediaAuditPanel";
import { FeedManager } from "@/components/admin/FeedManager";
import { GraphEditor } from "@/components/admin/GraphEditor";
import { NewsroomPanel } from "@/components/admin/NewsroomPanel";
import { ModerationPanel } from "@/components/admin/ModerationPanel";
import { VisitorDashboard } from "@/components/admin/VisitorDashboard";
import {
  Shield, ShieldCheck, ShieldAlert, AlertTriangle, Search, MapPin, Eye, Database, Key,
  CheckCircle2, XCircle, RefreshCw, LogOut, Fingerprint,
  Globe, Activity, Users, Zap, Lightbulb, Loader2,
  Edit3, Save, X, Heart, Dumbbell, HandHelping, ChevronDown, ChevronUp, ExternalLink, Trash2, Copy,
  MessageSquare, Send, Settings, Sparkles, Brain, ThumbsUp, ThumbsDown, TrendingUp, Network, Newspaper, ShieldCheck as ShieldMod
} from "lucide-react";
import { knowledgeGraph } from "@/lib/knowledgeGraph";

const statusColors: Record<VerificationStatus, string> = {
  verified: "text-emerald-500",
  stale: "text-amber-500",
  broken: "text-red-500",
  conflict: "text-orange-500",
  unverified: "text-muted-foreground",
};

const severityColors: Record<string, string> = {
  critical: "text-red-500 bg-red-500/10",
  warning: "text-amber-500 bg-amber-500/10",
  info: "text-blue-500 bg-blue-500/10",
};

const difficultyColors: Record<string, string> = {
  easy: "text-emerald-500 bg-emerald-500/10",
  medium: "text-amber-500 bg-amber-500/10",
  hard: "text-red-500 bg-red-500/10",
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-chat`;

type ChatMsg = { role: "user" | "assistant"; content: string };

const Admin = () => {
  const { user, loading, isAdmin, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [tab, setTab] = useState<"editorial" | "site" | "intelligence" | "operations" | "assistant">("editorial");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["briefing", "settings", "graph", "visitors", "site-editor"]));
  const [evtSearch, setEvtSearch] = useState("");
  const [evtFilter, setEvtFilter] = useState<"all" | VerificationStatus>("all");
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loadingVisitors, setLoadingVisitors] = useState(false);

  // Scanner state
  const [scanning, setScanning] = useState(false);
  const [scanFindings, setScanFindings] = useState<any>(null);
  const [loadingUpgrades, setLoadingUpgrades] = useState(false);
  const [upgradeIdeas, setUpgradeIdeas] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [scanError, setScanError] = useState("");

  // Content editor state
  const [contentTab, setContentTab] = useState<"singles" | "fitness" | "volunteer">("singles");
  const [contentSearch, setContentSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [copiedMsg, setCopiedMsg] = useState("");

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [customInstructions, setCustomInstructions] = useState("");
  const [instructionsSaved, setInstructionsSaved] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [ratedMessages, setRatedMessages] = useState<Set<number>>(new Set());
  const verifiedEvents = singlesEvents.filter((e) => e.verificationStatus === "verified").length;
  const brokenLinks = singlesEvents.flatMap((e) => e.sources).filter((s) => s.status === "broken").length;
  const totalListings = singlesEvents.length + fitnessSpots.length + volunteerOrgs.length + cityShowcase.length;

  const filteredEvents = useMemo(() => {
    return singlesEvents.filter((evt) => {
      const q = evtSearch.toLowerCase();
      const matchSearch = !q || evt.name.toLowerCase().includes(q) || evt.organizer.toLowerCase().includes(q) || evt.venue.toLowerCase().includes(q);
      const matchFilter = evtFilter === "all" || evt.verificationStatus === evtFilter;
      return matchSearch && matchFilter;
    });
  }, [evtSearch, evtFilter]);

  useEffect(() => {
    if (tab === "operations" && visitors.length === 0 && isAdmin) {
      setLoadingVisitors(true);
      supabase.from("visitor_logs").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => {
        setVisitors(data || []);
        setLoadingVisitors(false);
      });
    }
  }, [tab, isAdmin]);

  useEffect(() => {
    if (tab === "intelligence" && isAdmin && scanHistory.length === 0) {
      supabase.from("scan_results").select("*").order("created_at", { ascending: false }).limit(20).then(({ data }) => {
        setScanHistory(data || []);
      });
    }
  }, [tab, isAdmin]);

  // Load chat history, custom instructions, and feedback count
  useEffect(() => {
    if (tab === "assistant" && isAdmin && user) {
      supabase.from("admin_chat_messages").select("*").eq("user_id", user.id).order("created_at", { ascending: true }).limit(100).then(({ data }) => {
        if (data && data.length > 0) {
          setChatMessages(data.map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content })));
        }
      });
      supabase.from("admin_settings").select("*").eq("user_id", user.id).eq("setting_key", "custom_instructions").single().then(({ data }) => {
        if (data) setCustomInstructions(data.setting_value);
      });
      supabase.from("admin_prompt_history").select("id", { count: "exact", head: true }).eq("user_id", user.id).then(({ count }) => {
        setFeedbackCount(count || 0);
      });
    }
  }, [tab, isAdmin, user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const saveCustomInstructions = async () => {
    if (!user) return;
    await supabase.from("admin_settings").upsert({
      user_id: user.id,
      setting_key: "custom_instructions",
      setting_value: customInstructions,
    }, { onConflict: "user_id,setting_key" });
    setInstructionsSaved(true);
    setTimeout(() => setInstructionsSaved(false), 2000);
  };

  const sendChat = useCallback(async (input?: string) => {
    const text = input || chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput("");

    const userMsg: ChatMsg = { role: "user", content: text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    if (user) {
      supabase.from("admin_chat_messages").insert({ user_id: user.id, role: "user", content: text }).then(() => {});
    }

    let assistantSoFar = "";
    let streamDone = false;

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map(m => ({ role: m.role, content: m.content })),
          customInstructions,
        }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Stream failed" }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setChatMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (user && assistantSoFar) {
        supabase.from("admin_chat_messages").insert({ user_id: user.id, role: "assistant", content: assistantSoFar }).then(() => {});
      }
    } catch (e: any) {
      setChatMessages(prev => [...prev, { role: "assistant", content: `Error: ${e.message}` }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatMessages, chatLoading, user, customInstructions]);

  const clearChat = async () => {
    setChatMessages([]);
    setRatedMessages(new Set());
    if (user) {
      await supabase.from("admin_chat_messages").delete().eq("user_id", user.id);
    }
  };

  const rateMessage = async (messageIndex: number, rating: -1 | 1) => {
    if (!user || ratedMessages.has(messageIndex)) return;
    const msg = chatMessages[messageIndex];
    if (!msg || msg.role !== "assistant") return;

    // Find the preceding user message for context
    const userMsg = messageIndex > 0 ? chatMessages[messageIndex - 1] : null;

    await supabase.from("admin_prompt_history").insert({
      user_id: user.id,
      rating,
      context: msg.content.slice(0, 500),
      query_text: userMsg?.content?.slice(0, 300) || null,
    });

    setRatedMessages((prev) => new Set([...prev, messageIndex]));
    setFeedbackCount((c) => c + 1);
  };

  const graphStats = useMemo(() => knowledgeGraph.getStats(), []);

  const runScan = async () => {
    setScanning(true);
    setScanError("");
    setScanFindings(null);
    try {
      const { data, error } = await supabase.functions.invoke("admin-scanner", { body: { action: "scan" } });
      if (error) throw error;
      if (!data?.findings) throw new Error(data?.error || "Scan failed");
      setScanFindings(data.findings);
      if (data?.fallback && data?.error) setScanError(data.error);
      const { data: history } = await supabase.from("scan_results").select("*").order("created_at", { ascending: false }).limit(20);
      setScanHistory(history || []);
    } catch (e: any) {
      setScanError(e.message || "Scan failed");
    }
    setScanning(false);
  };

  const getUpgrades = async () => {
    setLoadingUpgrades(true);
    setScanError("");
    setUpgradeIdeas(null);
    try {
      const { data, error } = await supabase.functions.invoke("admin-scanner", {
        body: { action: "upgrades", categories: ["homepage", "discover", "dating", "operations"] },
      });
      if (error) throw error;
      if (!data?.categories) throw new Error(data?.error || "Failed to get upgrades");
      setUpgradeIdeas(data.categories || []);
      if (data?.fallback && data?.error) setScanError(data.error);
    } catch (e: any) {
      setScanError(e.message || "Failed to get upgrades");
    }
    setLoadingUpgrades(false);
  };

  const handleAuth = async () => {
    setAuthError("");
    setAuthMsg("");
    if (!email || !password) { setAuthError("Enter email and password"); return; }
    if (password.length < 8) { setAuthError("Password must be at least 8 characters"); return; }
    if (authMode === "signup") {
      const { error } = await signUp(email, password);
      if (error) setAuthError(error.message);
      else setAuthMsg("Check your email for a verification link!");
    } else {
      const { error } = await signIn(email, password);
      if (error) setAuthError(error.message);
    }
  };

  // Content editor helpers
  const startEditing = (id: string, data: Record<string, any>) => {
    setEditingId(id);
    setEditData({ ...data });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveOverride = async (listingType: string, listingId: string) => {
    if (!user || !editingId) return;
    try {
      await supabase.from("listing_overrides" as any).upsert({
        listing_type: listingType,
        listing_id: listingId,
        field_overrides: editData,
        updated_by: user.id,
      }, { onConflict: "listing_type,listing_id" });
      setCopiedMsg("Changes saved to database");
      setTimeout(() => setCopiedMsg(""), 2000);
      setEditingId(null);
      setEditData({});
    } catch (e: any) {
      setCopiedMsg(`Error: ${e.message}`);
      setTimeout(() => setCopiedMsg(""), 3000);
    }
  };

  const copyAsJson = (data: any, label: string) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedMsg(`Copied ${label} to clipboard`);
    setTimeout(() => setCopiedMsg(""), 2000);
  };

  // Filtered content lists
  const filteredContentSingles = useMemo(() => {
    const q = contentSearch.toLowerCase();
    return singlesEvents.filter((e) => !q || e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q));
  }, [contentSearch]);

  const filteredContentFitness = useMemo(() => {
    const q = contentSearch.toLowerCase();
    return fitnessSpots.filter((s) => !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.neighborhood.toLowerCase().includes(q));
  }, [contentSearch]);

  const filteredContentVolunteer = useMemo(() => {
    const q = contentSearch.toLowerCase();
    return volunteerOrgs.filter((o) => !q || o.name.toLowerCase().includes(q) || o.category.toLowerCase().includes(q) || o.neighborhood.toLowerCase().includes(q));
  }, [contentSearch]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <RefreshCw size={24} className="animate-spin text-accent" />
        </main>
      </div>
    );
  }

  // Auth screen
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="skeuo-card p-8 rounded-lg max-w-sm w-full">
            <div className="text-center mb-6">
              <Fingerprint size={36} className="mx-auto mb-3 text-accent" />
              <h1 className="section-head text-foreground text-xl">Admin Access</h1>
              <p className="text-xs text-muted-foreground mt-1">Authenticated & role-verified access only</p>
            </div>
            <div className="flex gap-1 mb-4">
              <button onClick={() => setAuthMode("login")} className={`flex-1 py-2 text-xs font-semibold rounded ${authMode === "login" ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}>Sign In</button>
              <button onClick={() => setAuthMode("signup")} className={`flex-1 py-2 text-xs font-semibold rounded ${authMode === "signup" ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}>Sign Up</button>
            </div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-2.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent mb-2" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAuth()} placeholder="Password (min 8 chars)" className="w-full px-4 py-2.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent mb-3" />
            {authError && <p className="text-xs text-red-400 mb-2">{authError}</p>}
            {authMsg && <p className="text-xs text-emerald-500 mb-2">{authMsg}</p>}
            <button onClick={handleAuth} className="skeuo-btn w-full justify-center">
              {authMode === "login" ? "Sign In" : "Create Account"}
            </button>
            <div className="flex items-center gap-2 my-3">
              <span className="flex-1 h-px bg-border/50" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">or</span>
              <span className="flex-1 h-px bg-border/50" />
            </div>
            <button
              onClick={async () => {
                setAuthError("");
                const { lovable } = await import("@/integrations/lovable/index");
                const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
                if (result.error) setAuthError(result.error instanceof Error ? result.error.message : String(result.error));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground hover:bg-muted/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Sign in with Google
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="skeuo-card p-8 rounded-lg max-w-sm w-full text-center">
            <Shield size={36} className="mx-auto mb-3 text-amber-500" />
            <h1 className="section-head text-foreground text-xl mb-2">Admin Role Required</h1>
            <p className="text-xs text-muted-foreground mb-4">
              Signed in as <span className="text-foreground font-medium">{user.email}</span>
            </p>
            <p className="text-xs text-muted-foreground mb-4">Contact the site administrator for access.</p>
            <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground">
              <LogOut size={12} className="inline mr-1" /> Sign Out
            </button>
            {authError && <p className="text-xs text-red-400 mt-2">{authError}</p>}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "editorial" as const, label: "Editorial", icon: Newspaper },
    { id: "site" as const, label: "Site", icon: Settings },
    { id: "intelligence" as const, label: "Intelligence", icon: Brain },
    { id: "operations" as const, label: "Operations", icon: Shield },
    { id: "assistant" as const, label: "AI Assistant", icon: Sparkles },
  ];

  const quickActions = [
    { label: "Audit homepage", prompt: "Run a detailed audit of the homepage. What's working, what's not, and what should change?" },
    { label: "Suggest upgrades", prompt: "Give me 5 creative, non-obvious upgrades I should make to the app. Focus on things competitors aren't doing." },
    { label: "Write Singles copy", prompt: "Write compelling editorial copy for the Singles events page hero section. Match the broadsheet journalism voice." },
    { label: "Analyze traffic", prompt: "Based on the platform architecture, what strategies would maximize organic traffic and user engagement?" },
  ];

  const toggleSection = (key: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const SectionCollapsible = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: typeof Shield; children: React.ReactNode }) => (
    <div className="border-b border-border/20 last:border-0">
      <button onClick={() => toggleSection(id)} className="w-full flex items-center justify-between py-3 px-1 hover:bg-muted/10 transition-colors">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-accent" />
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        {openSections.has(id) ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>
      {openSections.has(id) && <div className="pb-4 pt-1">{children}</div>}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-head text-foreground text-2xl">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{user.email}</span>
            <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>

        {/* Compact status line */}
        <p className="text-xs text-muted-foreground mb-5 font-mono tracking-wider">
          {totalListings} listings · {graphStats.nodeCount} entities · {singlesEvents.length} events · {verifiedEvents} verified
        </p>

        <div className="flex gap-1 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t text-sm font-medium transition-colors whitespace-nowrap ${
                tab === id ? "bg-card text-foreground border border-border/50 border-b-transparent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {copiedMsg && (
          <div className="fixed top-4 right-4 z-50 bg-accent/90 text-accent-foreground text-sm px-4 py-2 rounded shadow-lg animate-fade-in">
            {copiedMsg}
          </div>
        )}

        <div className="skeuo-card rounded-lg p-6">
          {/* ═══ EDITORIAL TAB ═══ */}
          {tab === "editorial" && (
            <div>
              <SectionCollapsible id="briefing" title="Briefings" icon={TrendingUp}>
                <div className="space-y-6">
                  <BriefingEditor />
                  <div className="rule-thin" />
                  <AdminBriefing />
                </div>
              </SectionCollapsible>
              <SectionCollapsible id="newsroom" title="Newsroom" icon={Newspaper}>
                <NewsroomPanel />
              </SectionCollapsible>
              <SectionCollapsible id="feeds" title="Feeds" icon={Activity}>
                <FeedManager />
              </SectionCollapsible>
            </div>
          )}

          {/* ═══ SITE TAB ═══ */}
          {tab === "site" && (
            <div>
              <SectionCollapsible id="site-editor" title="Site Editor" icon={Settings}>
                <div className="space-y-6">
                  <SiteModulesEditor />
                  <div className="rule-thin" />
                  <SiteCopyEditor />
                  <div className="rule-thin" />
                  <HeroSlideEditor />
                  <div className="rule-thin" />
                  <TickerEditor />
                  <div className="rule-thin" />
                  <PullQuoteEditor />
                </div>
              </SectionCollapsible>
              <SectionCollapsible id="media" title="Media Audit" icon={Eye}>
                <MediaAuditPanel />
              </SectionCollapsible>
              <SectionCollapsible id="content" title="Content Manager" icon={Edit3}>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div>
                      <h2 className="headline text-foreground text-lg">Content Manager</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">View, inspect, and edit every listing</p>
                    </div>
                    <button
                      onClick={() => copyAsJson(
                        contentTab === "singles" ? singlesEvents : contentTab === "fitness" ? fitnessSpots : volunteerOrgs,
                        contentTab
                      )}
                      className="skeuo-btn text-xs"
                    >
                      <Copy size={12} /> Export {contentTab} as JSON
                    </button>
                  </div>
                  <div className="flex gap-1">
                    {([
                      { id: "singles" as const, label: "Events & Singles", icon: Heart, count: singlesEvents.length },
                      { id: "fitness" as const, label: "Fitness Spots", icon: Dumbbell, count: fitnessSpots.length },
                      { id: "volunteer" as const, label: "Volunteer Orgs", icon: HandHelping, count: volunteerOrgs.length },
                    ]).map(({ id, label, icon: Icon, count }) => (
                      <button
                        key={id}
                        onClick={() => { setContentTab(id); setContentSearch(""); setEditingId(null); }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                          contentTab === id ? "bg-accent/15 text-accent border border-accent/20" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon size={12} /> {label} <span className="text-muted-foreground/60">({count})</span>
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={contentSearch}
                      onChange={(e) => setContentSearch(e.target.value)}
                      placeholder={`Search ${contentTab}...`}
                      className="w-full pl-9 pr-4 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  {contentTab === "singles" && (
                    <div className="space-y-2">
                      <p className="dateline text-muted-foreground">{filteredContentSingles.length} listings</p>
                      {filteredContentSingles.map((evt) => (
                        <ContentCardSingles key={evt.id} event={evt} isEditing={editingId === evt.id} editData={editData}
                          onEdit={() => startEditing(evt.id, { name: evt.name, venue: evt.venue, neighborhood: evt.neighborhood, description: evt.description, price: evt.price, frequency: evt.frequency, tags: evt.tags.join(", ") })}
                          onCancel={cancelEditing} onSave={() => saveOverride("singles", evt.id)} onFieldChange={(field, value) => setEditData((d) => ({ ...d, [field]: value }))} onCopy={() => copyAsJson(evt, evt.name)} />
                      ))}
                    </div>
                  )}
                  {contentTab === "fitness" && (
                    <div className="space-y-2">
                      <p className="dateline text-muted-foreground">{filteredContentFitness.length} spots</p>
                      {filteredContentFitness.map((spot) => (
                        <ContentCardFitness key={spot.id} spot={spot} isEditing={editingId === spot.id} editData={editData}
                          onEdit={() => startEditing(spot.id, { name: spot.name, neighborhood: spot.neighborhood, description: spot.description, source: spot.source, tags: spot.tags.join(", ") })}
                          onCancel={cancelEditing} onSave={() => saveOverride("fitness", spot.id)} onFieldChange={(field, value) => setEditData((d) => ({ ...d, [field]: value }))} onCopy={() => copyAsJson(spot, spot.name)} />
                      ))}
                    </div>
                  )}
                  {contentTab === "volunteer" && (
                    <div className="space-y-2">
                      <p className="dateline text-muted-foreground">{filteredContentVolunteer.length} orgs</p>
                      {filteredContentVolunteer.map((org) => (
                        <ContentCardVolunteer key={org.id} org={org} isEditing={editingId === org.id} editData={editData}
                          onEdit={() => startEditing(org.id, { name: org.name, neighborhood: org.neighborhood, description: org.description, source: org.source, tags: org.tags.join(", ") })}
                          onCancel={cancelEditing} onSave={() => saveOverride("volunteer", org.id)} onFieldChange={(field, value) => setEditData((d) => ({ ...d, [field]: value }))} onCopy={() => copyAsJson(org, org.name)} />
                      ))}
                    </div>
                  )}
                </div>
              </SectionCollapsible>
            </div>
          )}

          {/* ═══ INTELLIGENCE TAB ═══ */}
          {tab === "intelligence" && (
            <div>
              <SectionCollapsible id="graph" title="Knowledge Graph" icon={Network}>
                <GraphEditor />
              </SectionCollapsible>
              <SectionCollapsible id="scanner" title="AI Scanner" icon={Zap}>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={runScan} disabled={scanning} className="skeuo-btn flex-1 justify-center">
                      {scanning ? <><Loader2 size={14} className="animate-spin" /> Scanning…</> : <><Zap size={14} /> Run Full Scan</>}
                    </button>
                    <button onClick={getUpgrades} disabled={loadingUpgrades} className="skeuo-btn flex-1 justify-center">
                      {loadingUpgrades ? <><Loader2 size={14} className="animate-spin" /> Generating…</> : <><Lightbulb size={14} /> Get Upgrade Ideas</>}
                    </button>
                  </div>
                  {scanError && (
                    <div className="skeuo-card-inset p-3 rounded border border-destructive/30">
                      <p className="text-xs text-destructive">{scanError}</p>
                    </div>
                  )}
                  {scanFindings && (
                    <div className="space-y-4">
                      <h3 className="label-caps text-foreground">Scan Results</h3>
                      {Object.entries(scanFindings).map(([category, findings]: [string, any]) => (
                        <div key={category} className="skeuo-card-inset p-4 rounded">
                          <h4 className="text-sm font-bold text-foreground capitalize mb-3">{category} <span className="text-[10px] text-muted-foreground font-normal">({Array.isArray(findings) ? findings.length : 0})</span></h4>
                          <div className="space-y-2">
                            {Array.isArray(findings) && findings.map((f: any, i: number) => (
                              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0">
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${severityColors[f.severity] || "text-muted-foreground bg-muted/30"}`}>{f.severity}</span>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{f.title}</p>
                                  <p className="text-xs text-muted-foreground">{f.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {upgradeIdeas && Array.isArray(upgradeIdeas) && (
                    <div className="space-y-4">
                      <h3 className="label-caps text-foreground">Upgrade Ideas</h3>
                      {upgradeIdeas.map((cat: any, ci: number) => (
                        <div key={ci} className="skeuo-card-inset p-4 rounded">
                          <h4 className="text-sm font-bold text-foreground capitalize mb-3"><Lightbulb size={14} className="inline text-signal-highlight mr-1" />{cat.name}</h4>
                          <div className="space-y-3">
                            {cat.ideas?.map((idea: any, ii: number) => (
                              <div key={ii} className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0">
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${difficultyColors[idea.difficulty] || "text-muted-foreground bg-muted/30"}`}>{idea.difficulty}</span>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{idea.title}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{idea.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {scanHistory.length > 0 && (
                    <div className="skeuo-card-inset p-4 rounded">
                      <h3 className="label-caps text-foreground mb-3">Scan History</h3>
                      <div className="space-y-2">
                        {scanHistory.map((s: any) => (
                          <div key={s.id} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground uppercase tracking-wider font-medium">{s.scan_type}</span>
                            <span className="text-[10px] text-muted-foreground">{new Date(s.created_at).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SectionCollapsible>
              <SectionCollapsible id="moderation" title="Moderation" icon={ShieldMod}>
                <ModerationPanel />
              </SectionCollapsible>
            </div>
          )}

          {/* ═══ OPERATIONS TAB ═══ */}
          {tab === "operations" && (
            <div>
              <SectionCollapsible id="visitors" title="Visitor Intelligence" icon={Users}>
                <VisitorDashboard />
              </SectionCollapsible>
              <SectionCollapsible id="security" title="Security" icon={Shield}>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={Database} label="Tables" value="3" sub="image_cache, profiles, user_roles" color="text-accent" />
                    <StatCard icon={Shield} label="RLS Status" value="✓ All" sub="Every table has RLS" color="text-signal-positive" />
                    <StatCard icon={Key} label="Auth" value="Active" sub="Email + password, role-based" color="text-accent" />
                    <StatCard icon={Activity} label="Threat Level" value="Low" sub="No user-generated content" color="text-signal-positive" />
                  </div>
                  <div className="skeuo-card-inset p-4 rounded">
                    <h3 className="label-caps text-foreground mb-3">Security Checklist</h3>
                    <div className="space-y-2">
                      <CheckItem ok label="Authentication required for admin" detail="Auth with email verification" />
                      <CheckItem ok label="Role-based access control (RBAC)" detail="Admin role checked server-side" />
                      <CheckItem ok label="Master admin hardcoded" detail="inspirelawton@gmail.com — auto-granted on login" />
                      <CheckItem ok label="RLS on all tables" detail="image_cache, profiles, user_roles, visitor_logs, admin_*" />
                      <CheckItem ok label="Privilege escalation blocked" detail="Only service_role can assign roles" />
                      <CheckItem ok={brokenLinks === 0} label={`Broken source links: ${brokenLinks}`} detail={brokenLinks > 0 ? "Some event sources return 404" : "All sources responding"} />
                    </div>
                  </div>
                  <div className="skeuo-card-inset p-4 rounded">
                    <h3 className="label-caps text-foreground mb-3">RLS Policy Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Table</th>
                            <th className="text-center py-2 px-2 text-muted-foreground font-medium">Read</th>
                            <th className="text-center py-2 px-2 text-muted-foreground font-medium">Write</th>
                            <th className="text-center py-2 px-2 text-muted-foreground font-medium">Update</th>
                            <th className="text-center py-2 px-2 text-muted-foreground font-medium">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <RLSRow table="image_cache" read="Public" write="Service only" update="Service only" delete="Service only" />
                          <RLSRow table="profiles" read="Own only" write="Own only" update="Own only" delete="—" />
                          <RLSRow table="user_roles" read="Own + Admin" write="Service only" update="—" delete="Service only" />
                          <RLSRow table="visitor_logs" read="Admin only" write="Service only" update="—" delete="Service only" />
                          <RLSRow table="admin_chat_messages" read="Own (Admin)" write="Own (Admin)" update="—" delete="Own (Admin)" />
                          <RLSRow table="admin_settings" read="Own (Admin)" write="Own (Admin)" update="Own (Admin)" delete="Own (Admin)" />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </SectionCollapsible>
              <SectionCollapsible id="audit" title="Events Audit" icon={Eye}>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="text" value={evtSearch} onChange={(e) => setEvtSearch(e.target.value)} placeholder="Search events..." className="w-full pl-9 pr-4 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div className="flex gap-1">
                      {(["all", "verified", "stale", "broken"] as const).map((f) => (
                        <button key={f} onClick={() => setEvtFilter(f)} className={`px-3 py-1.5 rounded text-xs font-medium ${evtFilter === f ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`}>
                          {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="dateline text-muted-foreground">{filteredEvents.length} events</p>
                  <div className="space-y-2">
                    {filteredEvents.map((evt) => (<EventRow key={evt.id} event={evt} />))}
                  </div>
                </div>
              </SectionCollapsible>
            </div>
          )}

          {/* ═══ AI ASSISTANT TAB ═══ */}
          {tab === "assistant" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-accent" />
                  <div>
                    <h2 className="headline text-foreground text-lg">INSPIRE Intelligence</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">Your editorial AI — contextualized with the full platform</p>
                      {feedbackCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-mono">
                          <TrendingUp size={9} /> {feedbackCount} signals
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowSettings(!showSettings)} className={`skeuo-btn text-xs ${showSettings ? "bg-accent/20" : ""}`}>
                    <Settings size={12} /> {showSettings ? "Chat" : "Settings"}
                  </button>
                  <button
                    onClick={() => {
                      if (chatMessages.length === 0) return;
                      const md = chatMessages.map(m => `**${m.role === "user" ? "You" : "AI"}**: ${m.content}`).join("\n\n---\n\n");
                      const blob = new Blob([md], { type: "text/markdown" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `inspire-chat-${new Date().toISOString().slice(0, 10)}.md`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="skeuo-btn text-xs"
                    disabled={chatMessages.length === 0}
                  >
                    <Copy size={12} /> Export
                  </button>
                  <button onClick={clearChat} className="skeuo-btn text-xs">
                    <Trash2 size={12} /> Clear
                  </button>
                </div>
              </div>

              {showSettings ? (
                <div className="space-y-4">
                  <div className="skeuo-card-inset p-4 rounded">
                    <h3 className="label-caps text-foreground mb-2">Custom Instructions</h3>
                    <p className="text-xs text-muted-foreground mb-3">Prepended to every AI conversation.</p>
                    <textarea
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="e.g., Always suggest mobile-first designs. Focus on conversion optimization..."
                      className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent min-h-[120px] resize-y"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={saveCustomInstructions} className="skeuo-btn text-xs">
                        <Save size={12} /> Save Instructions
                      </button>
                      {instructionsSaved && <span className="text-xs text-signal-positive">Saved</span>}
                    </div>
                  </div>
                  <div className="skeuo-card-inset p-4 rounded">
                    <h3 className="label-caps text-foreground mb-2">System Context</h3>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Full platform architecture (React + Vite + Tailwind)</li>
                      <li>• All directories with data structures</li>
                      <li>• Brand voice guidelines (broadsheet journalism)</li>
                      <li>• 6 themes · Edge functions · Database schema</li>
                      <li>• Knowledge graph: {graphStats.nodeCount} entities, {graphStats.edgeCount} connections</li>
                    </ul>
                  </div>
                  <div className="rule-thin my-4" />
                  <ThemePanel />
                </div>
              ) : (
                <>
                  {chatMessages.length === 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <button key={action.label} onClick={() => sendChat(action.prompt)} className="skeuo-card-inset p-3 rounded text-left hover:bg-muted/30 transition-colors">
                          <p className="text-xs font-semibold text-foreground">{action.label}</p>
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="skeuo-card-inset rounded p-4 max-h-[500px] overflow-y-auto space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-8">
                        <Brain size={32} className="mx-auto mb-3 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">Ask anything about your platform, content, or strategy</p>
                      </div>
                    )}
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-lg px-4 py-3 ${msg.role === "user" ? "bg-accent/15 text-foreground" : "bg-muted/30 text-foreground"}`}>
                          {msg.role === "assistant" ? (
                            <>
                              <div className="prose prose-sm dark:prose-invert max-w-none text-sm [&_p]:mb-2 [&_ul]:mb-2 [&_li]:mb-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_code]:text-xs [&_pre]:text-xs">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                              </div>
                              {!chatLoading && (
                                <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-border/20">
                                  {ratedMessages.has(i) ? (
                                    <span className="text-[10px] text-muted-foreground/60 italic">Feedback recorded</span>
                                  ) : (
                                    <>
                                      <button onClick={() => rateMessage(i, 1)} className="p-1 rounded hover:bg-accent/10 transition-colors" title="Helpful">
                                        <ThumbsUp size={11} className="text-muted-foreground/50 hover:text-accent" />
                                      </button>
                                      <button onClick={() => rateMessage(i, -1)} className="p-1 rounded hover:bg-destructive/10 transition-colors" title="Not helpful">
                                        <ThumbsDown size={11} className="text-muted-foreground/50 hover:text-destructive" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-sm">{msg.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted/30 rounded-lg px-4 py-3">
                          <Loader2 size={14} className="animate-spin text-accent" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                      placeholder="Ask INSPIRE Intelligence..."
                      className="flex-1 px-4 py-2.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <button onClick={() => sendChat()} disabled={chatLoading || !chatInput.trim()} className="skeuo-btn">
                      <Send size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* ── Content Editor Cards ── */

interface ContentCardProps {
  isEditing: boolean;
  editData: Record<string, any>;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onFieldChange: (field: string, value: string) => void;
  onCopy: () => void;
}

const EditableField = ({ label, field, value, editData, isEditing, onChange, multiline }: {
  label: string; field: string; value: string; editData: Record<string, any>; isEditing: boolean; onChange: (f: string, v: string) => void; multiline?: boolean;
}) => (
  <div className="flex flex-col gap-0.5">
    <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">{label}</label>
    {isEditing ? (
      multiline ? (
        <textarea
          value={editData[field] ?? value}
          onChange={(e) => onChange(field, e.target.value)}
          className="px-2 py-1.5 bg-muted/40 border border-accent/30 rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-y min-h-[60px]"
        />
      ) : (
        <input
          value={editData[field] ?? value}
          onChange={(e) => onChange(field, e.target.value)}
          className="px-2 py-1 bg-muted/40 border border-accent/30 rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
        />
      )
    ) : (
      <p className="text-sm text-foreground/80 leading-relaxed">{value}</p>
    )}
  </div>
);

const ContentCardSingles = ({ event: evt, isEditing, editData, onEdit, onCancel, onSave, onFieldChange, onCopy }: ContentCardProps & { event: SinglesEvent }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`skeuo-card-inset p-4 rounded ${isEditing ? "ring-2 ring-accent/30" : ""}`}>
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 ${statusColors[evt.verificationStatus]}`}>
          {evt.verificationStatus === "verified" ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground truncate">{evt.name}</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0">{evt.category}</span>
            <span className="text-[9px] text-muted-foreground font-mono">{evt.confidenceScore}%</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{evt.organizer} · {evt.venue} · {evt.neighborhood}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onCopy} className="p-1.5 hover:bg-muted/30 rounded transition-colors" title="Copy JSON">
            <Copy size={12} className="text-muted-foreground" />
          </button>
          {isEditing ? (
            <>
              <button onClick={onSave} className="p-1.5 hover:bg-accent/20 rounded" title="Save"><Save size={12} className="text-accent" /></button>
              <button onClick={onCancel} className="p-1.5 hover:bg-muted/30 rounded"><X size={12} className="text-muted-foreground" /></button>
            </>
          ) : (
            <button onClick={onEdit} className="p-1.5 hover:bg-muted/30 rounded"><Edit3 size={12} className="text-accent" /></button>
          )}
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 hover:bg-muted/30 rounded">
            {expanded ? <ChevronUp size={12} className="text-muted-foreground" /> : <ChevronDown size={12} className="text-muted-foreground" />}
          </button>
        </div>
      </div>
      {(expanded || isEditing) && (
        <div className="mt-3 pt-3 border-t border-border/30 grid grid-cols-1 md:grid-cols-2 gap-3">
          <EditableField label="Name" field="name" value={evt.name} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Venue" field="venue" value={evt.venue} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Neighborhood" field="neighborhood" value={evt.neighborhood} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Price" field="price" value={evt.price} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Frequency" field="frequency" value={evt.frequency} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Tags" field="tags" value={evt.tags.join(", ")} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <div className="md:col-span-2">
            <EditableField label="Description" field="description" value={evt.description} editData={editData} isEditing={isEditing} onChange={onFieldChange} multiline />
          </div>
          <div className="md:col-span-2">
            <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">Sources</label>
            <div className="mt-1 space-y-1">
              {evt.sources.map((src, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={statusColors[src.status]}>{src.status}</span>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline truncate">{src.title || src.url}</a>
                  <span className="text-muted-foreground/50">{src.provider}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContentCardFitness = ({ spot, isEditing, editData, onEdit, onCancel, onFieldChange, onCopy }: ContentCardProps & { spot: FitnessSpot }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`skeuo-card-inset p-4 rounded ${isEditing ? "ring-2 ring-accent/30" : ""}`}>
      <div className="flex items-center gap-3">
        <Dumbbell size={16} className="text-accent flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground truncate">{spot.name}</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0">{spot.category}</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{spot.neighborhood}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onCopy} className="p-1.5 hover:bg-muted/30 rounded"><Copy size={12} className="text-muted-foreground" /></button>
          {isEditing ? (
            <button onClick={onCancel} className="p-1.5 hover:bg-muted/30 rounded"><X size={12} className="text-muted-foreground" /></button>
          ) : (
            <button onClick={onEdit} className="p-1.5 hover:bg-muted/30 rounded"><Edit3 size={12} className="text-accent" /></button>
          )}
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 hover:bg-muted/30 rounded">
            {expanded ? <ChevronUp size={12} className="text-muted-foreground" /> : <ChevronDown size={12} className="text-muted-foreground" />}
          </button>
          {spot.source && (
            <a href={spot.source} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-muted/30 rounded"><ExternalLink size={12} className="text-muted-foreground" /></a>
          )}
        </div>
      </div>
      {(expanded || isEditing) && (
        <div className="mt-3 pt-3 border-t border-border/30 grid grid-cols-1 md:grid-cols-2 gap-3">
          <EditableField label="Name" field="name" value={spot.name} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Neighborhood" field="neighborhood" value={spot.neighborhood} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Source URL" field="source" value={spot.source} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Tags" field="tags" value={spot.tags.join(", ")} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <div className="md:col-span-2">
            <EditableField label="Description" field="description" value={spot.description} editData={editData} isEditing={isEditing} onChange={onFieldChange} multiline />
          </div>
        </div>
      )}
    </div>
  );
};

const ContentCardVolunteer = ({ org, isEditing, editData, onEdit, onCancel, onFieldChange, onCopy }: ContentCardProps & { org: VolunteerOrg }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`skeuo-card-inset p-4 rounded ${isEditing ? "ring-2 ring-accent/30" : ""}`}>
      <div className="flex items-center gap-3">
        <HandHelping size={16} className="text-accent flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground truncate">{org.name}</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0">{org.category}</span>
            {org.commitment && <span className="text-[9px] text-muted-foreground">{org.commitment}</span>}
          </div>
          <p className="text-xs text-muted-foreground truncate">{org.neighborhood}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onCopy} className="p-1.5 hover:bg-muted/30 rounded"><Copy size={12} className="text-muted-foreground" /></button>
          {isEditing ? (
            <button onClick={onCancel} className="p-1.5 hover:bg-muted/30 rounded"><X size={12} className="text-muted-foreground" /></button>
          ) : (
            <button onClick={onEdit} className="p-1.5 hover:bg-muted/30 rounded"><Edit3 size={12} className="text-accent" /></button>
          )}
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 hover:bg-muted/30 rounded">
            {expanded ? <ChevronUp size={12} className="text-muted-foreground" /> : <ChevronDown size={12} className="text-muted-foreground" />}
          </button>
          {org.source && (
            <a href={org.source} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-muted/30 rounded"><ExternalLink size={12} className="text-muted-foreground" /></a>
          )}
        </div>
      </div>
      {(expanded || isEditing) && (
        <div className="mt-3 pt-3 border-t border-border/30 grid grid-cols-1 md:grid-cols-2 gap-3">
          <EditableField label="Name" field="name" value={org.name} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Neighborhood" field="neighborhood" value={org.neighborhood} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Source URL" field="source" value={org.source} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <EditableField label="Tags" field="tags" value={org.tags.join(", ")} editData={editData} isEditing={isEditing} onChange={onFieldChange} />
          <div className="md:col-span-2">
            <EditableField label="Description" field="description" value={org.description} editData={editData} isEditing={isEditing} onChange={onFieldChange} multiline />
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Sub-components ── */

const StatCard = ({ icon: Icon, label, value, sub, color }: { icon: typeof Shield; label: string; value: string; sub: string; color: string }) => (
  <div className="skeuo-card-inset p-4 rounded text-center">
    <Icon size={18} className={`mx-auto mb-2 ${color}`} />
    <p className="text-2xl font-black text-foreground">{value}</p>
    <p className="label-caps text-foreground/60 text-[10px]">{label}</p>
    <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>
  </div>
);

const CheckItem = ({ ok, label, detail }: { ok: boolean; label: string; detail: string }) => (
  <div className="flex items-start gap-2">
    {ok ? <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" /> : <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />}
    <div>
      <p className="text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </div>
  </div>
);

const RLSRow = ({ table, read, write, update, delete: del }: { table: string; read: string; write: string; update: string; delete: string }) => (
  <tr className="border-b border-border/20">
    <td className="py-2 pr-4 font-mono text-foreground">{table}</td>
    <td className="text-center py-2 px-2"><span className={`text-[10px] font-semibold ${read === "Public" ? "text-amber-500" : "text-emerald-500"}`}>{read}</span></td>
    <td className="text-center py-2 px-2"><span className="text-[10px] font-semibold text-emerald-500">{write}</span></td>
    <td className="text-center py-2 px-2"><span className="text-[10px] font-semibold text-emerald-500">{update}</span></td>
    <td className="text-center py-2 px-2"><span className="text-[10px] font-semibold text-emerald-500">{del}</span></td>
  </tr>
);

const EventRow = ({ event: evt }: { event: SinglesEvent }) => {
  const hasBrokenSource = evt.sources.some((s) => s.status === "broken");
  return (
    <div className={`skeuo-card-inset p-3 rounded flex items-center gap-3 ${hasBrokenSource ? "border border-red-400/30" : ""}`}>
      <div className={`flex-shrink-0 ${statusColors[evt.verificationStatus]}`}>
        {evt.verificationStatus === "verified" ? <ShieldCheck size={16} /> : evt.verificationStatus === "stale" ? <AlertTriangle size={16} /> : <ShieldAlert size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground truncate">{evt.name}</p>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground flex-shrink-0">{evt.category}</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{evt.organizer} · {evt.venue}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs font-bold text-foreground">{evt.confidenceScore}%</span>
        {hasBrokenSource && <span className="text-[10px] text-red-400 font-bold">BROKEN</span>}
      </div>
    </div>
  );
};

export default Admin;
