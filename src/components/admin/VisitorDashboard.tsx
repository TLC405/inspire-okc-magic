import { useState, useMemo } from "react";
import { Globe, MapPin, Activity, Users, Shield, AlertTriangle, Eye, Fingerprint, RefreshCw, ChevronDown, ChevronUp, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VisitorLog {
  id: string;
  ip_address: string;
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  page_path: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

// Known bot/scanner user-agent patterns
const BOT_PATTERNS = [
  /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i, /baiduspider/i,
  /yandexbot/i, /sogou/i, /facebookexternalhit/i, /twitterbot/i,
  /rogerbot/i, /linkedinbot/i, /embedly/i, /shodan/i, /censys/i,
  /nmap/i, /masscan/i, /zgrab/i, /nikto/i, /sqlmap/i, /dirbuster/i,
  /gobuster/i, /wpscan/i, /nuclei/i, /httpx/i, /curl/i, /wget/i,
  /python-requests/i, /go-http-client/i, /java/i, /libwww/i,
  /scrapy/i, /phantomjs/i, /headlesschrome/i, /semrush/i, /ahrefs/i,
  /dotbot/i, /mj12bot/i, /petalbot/i,
];

const SCANNER_PATTERNS = [/nmap/i, /masscan/i, /zgrab/i, /nikto/i, /sqlmap/i, /dirbuster/i, /gobuster/i, /wpscan/i, /nuclei/i, /shodan/i, /censys/i];

function classifyUA(ua: string | null): { type: "human" | "bot" | "scanner" | "unknown"; label: string } {
  if (!ua) return { type: "unknown", label: "No UA" };
  for (const p of SCANNER_PATTERNS) if (p.test(ua)) return { type: "scanner", label: "Scanner" };
  for (const p of BOT_PATTERNS) if (p.test(ua)) return { type: "bot", label: "Bot" };
  return { type: "human", label: "Human" };
}

function parseUA(ua: string | null) {
  if (!ua) return { browser: "Unknown", os: "Unknown", device: "Unknown" };
  const browser = /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) && !/Chrome/.test(ua) ? "Safari" : /Edge\//.test(ua) ? "Edge" : "Other";
  const os = /Windows/.test(ua) ? "Windows" : /Mac OS/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : "Other";
  const device = /Mobile|Android/.test(ua) ? "Mobile" : /iPad|Tablet/.test(ua) ? "Tablet" : "Desktop";
  return { browser, os, device };
}

function threatScore(ip: string, visits: number, ua: string | null, referrer: string | null): { score: number; level: "low" | "medium" | "high" | "critical"; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const cls = classifyUA(ua);

  if (cls.type === "scanner") { score += 40; reasons.push("Known scanner UA"); }
  if (cls.type === "bot") { score += 10; reasons.push("Bot traffic"); }
  if (visits > 10) { score += 15; reasons.push(`High frequency (${visits} hits)`); }
  if (visits > 50) { score += 25; reasons.push("Excessive requests"); }
  if (!referrer) { score += 5; reasons.push("No referrer"); }
  if (!ua) { score += 20; reasons.push("Missing user agent"); }
  if (ua && ua.length < 20) { score += 10; reasons.push("Suspiciously short UA"); }

  const level = score >= 50 ? "critical" : score >= 30 ? "high" : score >= 15 ? "medium" : "low";
  return { score: Math.min(score, 100), level, reasons };
}

const threatColors = {
  low: "text-emerald-500 bg-emerald-500/10",
  medium: "text-amber-500 bg-amber-500/10",
  high: "text-orange-500 bg-orange-500/10",
  critical: "text-red-500 bg-red-500/10",
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  color?: string;
}

function StatCard({ icon: Icon, label, value, sub, color = "text-accent" }: StatCardProps) {
  return (
    <div className="skeuo-card p-4 rounded text-center">
      <Icon size={18} className={`mx-auto mb-1 ${color}`} />
      <p className="text-xl font-black text-foreground">{value}</p>
      <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">{label}</p>
      <p className="text-[9px] text-muted-foreground">{sub}</p>
    </div>
  );
}

export function VisitorDashboard() {
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedIp, setExpandedIp] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "human" | "bot" | "scanner">("all");
  const [sortBy, setSortBy] = useState<"recent" | "frequency" | "threat">("recent");

  const loadVisitors = async () => {
    setLoading(true);
    const { data } = await supabase.from("visitor_logs").select("*").order("created_at", { ascending: false }).limit(500);
    setVisitors((data as VisitorLog[]) || []);
    setLoading(false);
    setLoaded(true);
  };

  // Compute analytics
  const analytics = useMemo(() => {
    if (visitors.length === 0) return null;

    const ipCounts: Record<string, number> = {};
    const ipVisits: Record<string, VisitorLog[]> = {};
    const countryCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};
    const pageCounts: Record<string, number> = {};
    const hourCounts: number[] = new Array(24).fill(0);
    let bots = 0, scanners = 0, humans = 0, noUA = 0;

    visitors.forEach(v => {
      ipCounts[v.ip_address] = (ipCounts[v.ip_address] || 0) + 1;
      if (!ipVisits[v.ip_address]) ipVisits[v.ip_address] = [];
      ipVisits[v.ip_address].push(v);
      if (v.country) countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
      if (v.city) cityCounts[v.city] = (cityCounts[v.city] || 0) + 1;
      if (v.page_path) pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1;
      hourCounts[new Date(v.created_at).getHours()]++;
      const cls = classifyUA(v.user_agent);
      if (cls.type === "scanner") scanners++;
      else if (cls.type === "bot") bots++;
      else if (cls.type === "human") humans++;
      else noUA++;
    });

    const uniqueIps = Object.keys(ipCounts);
    const repeatIps = uniqueIps.filter(ip => ipCounts[ip] > 2);
    const todayStr = new Date().toDateString();
    const todayVisits = visitors.filter(v => new Date(v.created_at).toDateString() === todayStr).length;
    const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const peakHour = hourCounts.indexOf(Math.max(...hourCounts));

    // Build IP profiles
    const ipProfiles = uniqueIps.map(ip => {
      const visits = ipVisits[ip];
      const last = visits[0];
      const first = visits[visits.length - 1];
      const ua = last.user_agent;
      const threat = threatScore(ip, visits.length, ua, last.referrer);
      const parsed = parseUA(ua);
      const cls = classifyUA(ua);
      return {
        ip,
        count: visits.length,
        lastSeen: last.created_at,
        firstSeen: first.created_at,
        city: last.city,
        region: last.region,
        country: last.country,
        lat: last.latitude,
        lng: last.longitude,
        pages: [...new Set(visits.map(v => v.page_path).filter(Boolean))],
        referrer: last.referrer,
        ua,
        parsed,
        classification: cls,
        threat,
      };
    });

    return { ipCounts, uniqueIps, repeatIps, todayVisits, topCountries, topCities, topPages, peakHour, hourCounts, bots, scanners, humans, noUA, ipProfiles };
  }, [visitors]);

  // Filter + sort IP profiles
  const filteredProfiles = useMemo(() => {
    if (!analytics) return [];
    let profiles = analytics.ipProfiles;

    if (filterType !== "all") {
      profiles = profiles.filter(p => p.classification.type === filterType);
    }
    if (search) {
      const q = search.toLowerCase();
      profiles = profiles.filter(p =>
        p.ip.includes(q) || (p.city || "").toLowerCase().includes(q) ||
        (p.country || "").toLowerCase().includes(q) || (p.region || "").toLowerCase().includes(q)
      );
    }

    if (sortBy === "frequency") profiles.sort((a, b) => b.count - a.count);
    else if (sortBy === "threat") profiles.sort((a, b) => b.threat.score - a.threat.score);
    else profiles.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());

    return profiles;
  }, [analytics, filterType, search, sortBy]);

  if (!loaded) {
    return (
      <div className="text-center py-12">
        <Eye size={32} className="mx-auto mb-3 text-accent/40" />
        <p className="text-sm text-muted-foreground mb-3">Visitor Intelligence Dashboard</p>
        <button onClick={loadVisitors} className="skeuo-btn" disabled={loading}>
          {loading ? <><RefreshCw size={12} className="animate-spin" /> Loading…</> : <><Eye size={12} /> Load Visitor Data</>}
        </button>
      </div>
    );
  }

  if (!analytics) return <p className="text-sm text-muted-foreground text-center py-8">No visitor data</p>;

  return (
    <div className="space-y-6">
      {/* ═══ Stats Overview ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard icon={Users} label="Total Hits" value={String(visitors.length)} sub="Last 500 logged" color="text-accent" />
        <StatCard icon={Fingerprint} label="Unique IPs" value={String(analytics.uniqueIps.length)} sub="Distinct addresses" color="text-signal-positive" />
        <StatCard icon={Activity} label="Today" value={String(analytics.todayVisits)} sub="Visits today" color="text-signal-secondary" />
        <StatCard icon={MapPin} label="Countries" value={String(analytics.topCountries.length)} sub="Distinct origins" color="text-accent" />
        <StatCard icon={AlertTriangle} label="Repeat IPs" value={String(analytics.repeatIps.length)} sub=">2 visits each" color="text-signal-secondary" />
        <StatCard icon={Shield} label="Scanners" value={String(analytics.scanners)} sub={`${analytics.bots} bots detected`} color="text-red-500" />
      </div>

      {/* ═══ Traffic Breakdown Row ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Traffic Classification */}
        <div className="skeuo-card p-4 rounded">
          <h4 className="label-caps text-foreground text-[10px] mb-3">Traffic Classification</h4>
          <div className="space-y-2">
            {[
              { label: "Human", count: analytics.humans, color: "bg-emerald-500", pct: (analytics.humans / visitors.length * 100).toFixed(0) },
              { label: "Bot", count: analytics.bots, color: "bg-amber-500", pct: (analytics.bots / visitors.length * 100).toFixed(0) },
              { label: "Scanner", count: analytics.scanners, color: "bg-red-500", pct: (analytics.scanners / visitors.length * 100).toFixed(0) },
              { label: "Unknown", count: analytics.noUA, color: "bg-muted-foreground", pct: (analytics.noUA / visitors.length * 100).toFixed(0) },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${t.color}`} />
                <span className="text-xs text-foreground flex-1">{t.label}</span>
                <span className="font-mono text-xs text-foreground font-bold">{t.count}</span>
                <span className="font-mono text-[10px] text-muted-foreground w-8 text-right">{t.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="skeuo-card p-4 rounded">
          <h4 className="label-caps text-foreground text-[10px] mb-3">Top Countries</h4>
          <div className="space-y-2">
            {analytics.topCountries.map(([country, count]) => (
              <div key={country} className="flex items-center gap-2">
                <Globe size={12} className="text-accent/60" />
                <span className="text-xs text-foreground flex-1">{country}</span>
                <span className="font-mono text-xs text-foreground font-bold">{count}</span>
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${(count / visitors.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="skeuo-card p-4 rounded">
          <h4 className="label-caps text-foreground text-[10px] mb-3">Top Pages</h4>
          <div className="space-y-2">
            {analytics.topPages.map(([page, count]) => (
              <div key={page} className="flex items-center gap-2">
                <Eye size={12} className="text-accent/60" />
                <span className="text-xs text-accent font-mono flex-1 truncate">{page}</span>
                <span className="font-mono text-xs text-foreground font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Hourly Activity Heatmap ═══ */}
      <div className="skeuo-card p-4 rounded">
        <h4 className="label-caps text-foreground text-[10px] mb-3">24h Activity Heatmap</h4>
        <div className="flex items-end gap-[2px] h-16">
          {analytics.hourCounts.map((count, hour) => {
            const max = Math.max(...analytics.hourCounts, 1);
            const height = (count / max) * 100;
            return (
              <div key={hour} className="flex-1 flex flex-col items-center gap-0.5" title={`${hour}:00 — ${count} visits`}>
                <div className="w-full bg-accent/60 rounded-t-sm transition-all" style={{ height: `${Math.max(height, 2)}%` }} />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[8px] text-muted-foreground/50">0:00</span>
          <span className="font-mono text-[8px] text-muted-foreground/50">6:00</span>
          <span className="font-mono text-[8px] text-muted-foreground/50">12:00</span>
          <span className="font-mono text-[8px] text-muted-foreground/50">18:00</span>
          <span className="font-mono text-[8px] text-muted-foreground/50">23:00</span>
        </div>
        <p className="font-mono text-[9px] text-muted-foreground mt-1 text-center">Peak hour: {analytics.peakHour}:00</p>
      </div>

      {/* ═══ Controls ═══ */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search IP, city, country…"
            className="w-full pl-7 pr-3 py-1.5 text-xs bg-muted/30 border border-border/50 rounded text-foreground placeholder:text-muted-foreground/50"
          />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="text-xs bg-muted/30 border border-border/50 rounded px-2 py-1.5 text-foreground">
          <option value="all">All Traffic</option>
          <option value="human">Humans Only</option>
          <option value="bot">Bots Only</option>
          <option value="scanner">Scanners Only</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="text-xs bg-muted/30 border border-border/50 rounded px-2 py-1.5 text-foreground">
          <option value="recent">Most Recent</option>
          <option value="frequency">Most Frequent</option>
          <option value="threat">Highest Threat</option>
        </select>
        <button onClick={loadVisitors} className="skeuo-btn text-xs" disabled={loading}>
          <RefreshCw size={10} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* ═══ IP Profiles Table ═══ */}
      <div className="skeuo-card-inset p-4 rounded overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 pr-2 text-muted-foreground font-medium w-8" />
              <th className="text-left py-2 pr-3 text-muted-foreground font-medium">IP Address</th>
              <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Location</th>
              <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Type</th>
              <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Hits</th>
              <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Threat</th>
              <th className="text-left py-2 text-muted-foreground font-medium">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.slice(0, 100).map(profile => {
              const isExpanded = expandedIp === profile.ip;
              return (
                <tr key={profile.ip} className="group">
                  <td colSpan={7} className="p-0">
                    <div
                      className={`flex items-center cursor-pointer hover:bg-muted/20 transition-colors ${profile.threat.level === "critical" ? "bg-red-500/5" : profile.threat.level === "high" ? "bg-orange-500/5" : ""}`}
                      onClick={() => setExpandedIp(isExpanded ? null : profile.ip)}
                    >
                      <div className="w-8 py-2 flex justify-center">
                        {isExpanded ? <ChevronUp size={10} className="text-muted-foreground" /> : <ChevronDown size={10} className="text-muted-foreground" />}
                      </div>
                      <div className="py-2 pr-3 font-mono text-foreground flex-shrink-0" style={{ minWidth: "120px" }}>{profile.ip}</div>
                      <div className="py-2 pr-3 text-muted-foreground flex-1 truncate">{[profile.city, profile.region, profile.country].filter(Boolean).join(", ") || "—"}</div>
                      <div className="py-2 pr-3" style={{ minWidth: "70px" }}>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          profile.classification.type === "scanner" ? "bg-red-500/15 text-red-500" :
                          profile.classification.type === "bot" ? "bg-amber-500/15 text-amber-500" :
                          "bg-emerald-500/15 text-emerald-500"
                        }`}>{profile.classification.label}</span>
                      </div>
                      <div className="py-2 pr-3 font-mono font-bold text-foreground" style={{ minWidth: "40px" }}>{profile.count}</div>
                      <div className="py-2 pr-3" style={{ minWidth: "60px" }}>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${threatColors[profile.threat.level]}`}>
                          {profile.threat.score}/100
                        </span>
                      </div>
                      <div className="py-2 text-muted-foreground whitespace-nowrap text-[10px]">{new Date(profile.lastSeen).toLocaleString()}</div>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="bg-muted/10 border-t border-border/20 px-8 py-3 space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                          <div>
                            <span className="text-muted-foreground">Browser</span>
                            <p className="text-foreground font-semibold">{profile.parsed.browser}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">OS</span>
                            <p className="text-foreground font-semibold">{profile.parsed.os}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Device</span>
                            <p className="text-foreground font-semibold">{profile.parsed.device}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Coordinates</span>
                            <p className="text-foreground font-semibold">{profile.lat && profile.lng ? `${profile.lat.toFixed(3)}, ${profile.lng.toFixed(3)}` : "—"}</p>
                          </div>
                        </div>
                        <div className="text-[10px]">
                          <span className="text-muted-foreground">First seen:</span>{" "}
                          <span className="text-foreground">{new Date(profile.firstSeen).toLocaleString()}</span>
                        </div>
                        <div className="text-[10px]">
                          <span className="text-muted-foreground">Referrer:</span>{" "}
                          <span className="text-accent">{profile.referrer || "Direct"}</span>
                        </div>
                        <div className="text-[10px]">
                          <span className="text-muted-foreground">Pages visited:</span>{" "}
                          <span className="text-foreground">{profile.pages.join(", ") || "—"}</span>
                        </div>
                        {profile.ua && (
                          <div className="text-[10px]">
                            <span className="text-muted-foreground">User Agent:</span>{" "}
                            <span className="text-foreground/70 font-mono break-all">{profile.ua}</span>
                          </div>
                        )}
                        {profile.threat.reasons.length > 0 && (
                          <div className="text-[10px]">
                            <span className="text-muted-foreground">Threat indicators:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {profile.threat.reasons.map((r, i) => (
                                <span key={i} className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${threatColors[profile.threat.level]}`}>{r}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredProfiles.length > 100 && (
          <p className="text-center text-[10px] text-muted-foreground mt-2">Showing 100 of {filteredProfiles.length} IPs</p>
        )}
      </div>
    </div>
  );
}
