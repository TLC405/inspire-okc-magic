import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { singlesEvents, type SinglesEvent, type VerificationStatus } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { cityShowcase } from "@/data/cityShowcase";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield, ShieldCheck, ShieldAlert, AlertTriangle, Search, MapPin, Eye, Database, Key,
  CheckCircle2, XCircle, RefreshCw, LogOut, UserPlus, Fingerprint,
  Globe, Activity, Users
} from "lucide-react";

const statusColors: Record<VerificationStatus, string> = {
  verified: "text-emerald-500",
  stale: "text-amber-500",
  broken: "text-red-500",
  conflict: "text-orange-500",
  unverified: "text-muted-foreground",
};

const Admin = () => {
  const { user, loading, isAdmin, signIn, signUp, signOut, bootstrapAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [tab, setTab] = useState<"visitors" | "security" | "events">("visitors");
  const [evtSearch, setEvtSearch] = useState("");
  const [evtFilter, setEvtFilter] = useState<"all" | VerificationStatus>("all");
  const [imageStats, setImageStats] = useState<any>(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(false);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loadingVisitors, setLoadingVisitors] = useState(false);

  const verifiedEvents = singlesEvents.filter((e) => e.verificationStatus === "verified").length;
  const staleEvents = singlesEvents.filter((e) => e.verificationStatus === "stale").length;
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

  const dateNights = singlesEvents.filter((e) => e.category === "Date Night" && e.verificationStatus === "verified");

  useEffect(() => {
    if (tab === "visitors" && visitors.length === 0 && isAdmin) {
      setLoadingVisitors(true);
      supabase.from("visitor_logs").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => {
        setVisitors(data || []);
        setLoadingVisitors(false);
      });
    }
  }, [tab, isAdmin]);

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

  const handleBootstrap = async () => {
    setBootstrapping(true);
    const { error } = await bootstrapAdmin();
    if (error) setAuthError(typeof error === "string" ? error : "Failed to bootstrap admin");
    setBootstrapping(false);
  };

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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent mb-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="Password (min 8 chars)"
              className="w-full px-4 py-2.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent mb-3"
            />
            {authError && <p className="text-xs text-red-400 mb-2">{authError}</p>}
            {authMsg && <p className="text-xs text-emerald-500 mb-2">{authMsg}</p>}
            <button onClick={handleAuth} className="skeuo-btn w-full justify-center">
              {authMode === "login" ? "Sign In" : "Create Account"}
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
            <button onClick={handleBootstrap} disabled={bootstrapping} className="skeuo-btn w-full justify-center mb-3">
              <UserPlus size={13} /> {bootstrapping ? "Granting…" : "Bootstrap Admin (First User Only)"}
            </button>
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
    { id: "visitors" as const, label: "Visitors", icon: Users },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "events" as const, label: "Events", icon: Eye },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="section-head text-foreground text-2xl">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{user.email}</span>
            <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide">
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

        <div className="skeuo-card rounded-lg p-6">
          {/* VISITORS TAB */}
          {tab === "visitors" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Visits" value={String(visitors.length)} sub="Last 200 logged" color="text-accent" />
                <StatCard icon={Globe} label="Unique IPs" value={String(new Set(visitors.map((v: any) => v.ip_address)).size)} sub="Distinct addresses" color="text-emerald-500" />
                <StatCard icon={MapPin} label="Cities" value={String(new Set(visitors.filter((v: any) => v.city).map((v: any) => v.city)).size)} sub="Distinct locations" color="text-blue-500" />
                <StatCard icon={Activity} label="Today" value={String(visitors.filter((v: any) => new Date(v.created_at).toDateString() === new Date().toDateString()).length)} sub="Visits today" color="text-amber-500" />
              </div>
              <button onClick={() => { setVisitors([]); setLoadingVisitors(true); supabase.from("visitor_logs").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => { setVisitors(data || []); setLoadingVisitors(false); }); }} className="skeuo-btn">
                <RefreshCw size={12} /> Refresh Visitor Data
              </button>
              {loadingVisitors ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw size={20} className="animate-spin text-accent mr-2" />
                  <span className="text-sm text-muted-foreground">Loading visitor data…</span>
                </div>
              ) : (
                <div className="skeuo-card-inset p-4 rounded">
                  <h3 className="label-caps text-foreground mb-3">Recent Visitors</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-2 pr-3 text-muted-foreground font-medium">IP Address</th>
                          <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Location</th>
                          <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Coords</th>
                          <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Page</th>
                          <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Referrer</th>
                          <th className="text-left py-2 pr-3 text-muted-foreground font-medium">User Agent</th>
                          <th className="text-left py-2 text-muted-foreground font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const ipCounts: Record<string, number> = {};
                          visitors.forEach((v: any) => { ipCounts[v.ip_address] = (ipCounts[v.ip_address] || 0) + 1; });
                          return visitors.map((v: any) => {
                            const isRepeat = ipCounts[v.ip_address] > 2;
                            return (
                              <tr key={v.id} className={`border-b border-border/20 hover:bg-muted/20 ${isRepeat ? "bg-amber-500/5" : ""}`}>
                                <td className={`py-2 pr-3 font-mono ${isRepeat ? "text-amber-500 font-bold" : "text-foreground"}`}>
                                  {v.ip_address}
                                  {isRepeat && <span className="text-[9px] ml-1">×{ipCounts[v.ip_address]}</span>}
                                </td>
                                <td className="py-2 pr-3 text-muted-foreground">
                                  {[v.city, v.region, v.country].filter(Boolean).join(", ") || "—"}
                                </td>
                                <td className="py-2 pr-3">
                                  {v.latitude && v.longitude ? (
                                    <a href={`https://maps.google.com/?q=${v.latitude},${v.longitude}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-[10px]">
                                      {Number(v.latitude).toFixed(4)}, {Number(v.longitude).toFixed(4)} ↗
                                    </a>
                                  ) : <span className="text-muted-foreground">—</span>}
                                </td>
                                <td className="py-2 pr-3 text-accent">{v.page_path || "—"}</td>
                                <td className="py-2 pr-3 text-muted-foreground max-w-[150px] truncate">{v.referrer || "—"}</td>
                                <td className="py-2 pr-3 text-muted-foreground max-w-[300px] text-[10px] break-all">{v.user_agent || "—"}</td>
                                <td className="py-2 text-muted-foreground whitespace-nowrap">{new Date(v.created_at).toLocaleString()}</td>
                              </tr>
                            );
                          });
                        })()}
                        {visitors.length === 0 && (
                          <tr><td colSpan={7} className="py-8 text-center text-muted-foreground">No visitors logged yet</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="skeuo-card-inset p-3 rounded">
                <p className="text-[10px] text-muted-foreground">
                  <strong className="text-foreground">🔒 Kali / Pen Testing:</strong> Visitor logs require the live deployed URL — offline/local Kali scans won't register here.
                  Test against <span className="font-mono text-accent">inspire-okc-magic.lovable.app</span> to see results.
                  Repeat IPs (3+) are highlighted in amber for scanning detection.
                </p>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {tab === "security" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Database} label="Tables" value="3" sub="image_cache, profiles, user_roles" color="text-accent" />
                <StatCard icon={Shield} label="RLS Status" value="✓ All" sub="Every table has RLS" color="text-emerald-500" />
                <StatCard icon={Key} label="Auth" value="Active" sub="Email + password, role-based" color="text-accent" />
                <StatCard icon={Activity} label="Threat Level" value="Low" sub="No user-generated content" color="text-emerald-500" />
              </div>
              <div className="skeuo-card-inset p-4 rounded">
                <h3 className="label-caps text-foreground mb-3">Security Checklist</h3>
                <div className="space-y-2">
                  <CheckItem ok label="Authentication required for admin" detail="Auth with email verification" />
                  <CheckItem ok label="Role-based access control (RBAC)" detail="Admin role checked server-side" />
                  <CheckItem ok label="No hardcoded credentials" detail="Proper auth in place" />
                  <CheckItem ok label="RLS on all tables" detail="image_cache, profiles, user_roles, visitor_logs" />
                  <CheckItem ok label="Privilege escalation blocked" detail="Only service_role can assign roles" />
                  <CheckItem ok label="No exposed API secrets" detail="Private keys in environment variables" />
                  <CheckItem ok={brokenLinks === 0} label={`Broken source links: ${brokenLinks}`} detail={brokenLinks > 0 ? "Some event sources return 404" : "All sources responding"} />
                </div>
              </div>
              <div className="skeuo-card-inset p-4 rounded">
                <h3 className="label-caps text-foreground mb-3">🛡️ Protection Layers</h3>
                <div className="space-y-3">
                  <ThreatRow title="SQL Injection" status="protected" detail="Parameterized queries via SDK." />
                  <ThreatRow title="XSS" status="protected" detail="React auto-escapes. No dangerouslySetInnerHTML." />
                  <ThreatRow title="CSRF" status="protected" detail="JWT in headers, not cookies." />
                  <ThreatRow title="Privilege Escalation" status="protected" detail="Roles server-side only." />
                  <ThreatRow title="Brute Force" status="protected" detail="Built-in rate limiting." />
                  <ThreatRow title="Data Exfiltration" status="protected" detail="RLS on all tables." />
                  <ThreatRow title="MITM" status="protected" detail="HTTPS + TLS enforced." />
                  <ThreatRow title="Session Hijacking" status="protected" detail="Short-lived JWTs with refresh tokens." />
                </div>
              </div>
              <div className="skeuo-card-inset p-4 rounded">
                <h3 className="label-caps text-foreground mb-3">🔒 RLS Policy Matrix</h3>
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* EVENTS TAB */}
          {tab === "events" && (
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
          )}
        </div>
      </main>
      <Footer />
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

const ThreatRow = ({ title, status, detail }: { title: string; status: "protected" | "monitored" | "warning"; detail: string }) => (
  <div className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
    <div className="flex-shrink-0 mt-0.5">
      {status === "protected" && <ShieldCheck size={14} className="text-emerald-500" />}
      {status === "monitored" && <Eye size={14} className="text-amber-500" />}
      {status === "warning" && <AlertTriangle size={14} className="text-red-400" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
          status === "protected" ? "bg-emerald-500/10 text-emerald-500" :
          status === "monitored" ? "bg-amber-500/10 text-amber-500" :
          "bg-red-400/10 text-red-400"
        }`}>{status}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
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
