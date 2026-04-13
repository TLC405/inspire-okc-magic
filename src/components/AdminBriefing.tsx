import { useMemo } from "react";
import {
  TrendingUp, MapPin, Users, Zap, Trophy, Calendar, Building2,
  Landmark, Leaf, Palette, BarChart3, Star, Clock, DollarSign,
  ChevronRight, ExternalLink
} from "lucide-react";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";
import { thunderData, cometSchedule, mayorData, discoverCategories, tickerItems } from "@/data/civicData";
import { knowledgeGraph } from "@/lib/knowledgeGraph";
import { calculateConfidence, needsReverification } from "@/lib/confidenceModel";
import { ListingImage } from "@/components/ListingImage";

const categoryIcons: Record<string, typeof Building2> = {
  Architecture: Building2,
  Policy: Landmark,
  Sustainability: Leaf,
  Culture: Palette,
  Growth: BarChart3,
};

export function AdminBriefing() {
  const graphStats = useMemo(() => knowledgeGraph.getStats(), []);

  const confidenceStats = useMemo(() => {
    const events = singlesEvents.map((e) => calculateConfidence(e.confidenceScore, e.lastVerifiedAt));
    const fresh = events.filter((e) => e.freshness === "fresh").length;
    const aging = events.filter((e) => e.freshness === "aging").length;
    const stale = events.filter((e) => e.freshness === "stale").length;
    const needsReview = singlesEvents.filter((e) => needsReverification(e.confidenceScore, e.lastVerifiedAt)).length;
    const avgScore = Math.round(events.reduce((s, e) => s + e.adjustedScore, 0) / events.length);
    return { fresh, aging, stale, needsReview, avgScore };
  }, []);

  const neighborhoodCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    singlesEvents.forEach((e) => { counts[e.neighborhood] = (counts[e.neighborhood] || 0) + 1; });
    fitnessSpots.forEach((s) => { counts[s.neighborhood] = (counts[s.neighborhood] || 0) + 1; });
    volunteerOrgs.forEach((o) => { counts[o.neighborhood] = (counts[o.neighborhood] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    fitnessSpots.forEach((s) => { counts[s.category] = (counts[s.category] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <BarChart3 size={20} className="text-accent" />
        <div>
          <h2 className="headline text-foreground text-lg">City Intelligence Briefing</h2>
          <p className="text-xs text-muted-foreground">Your personal OKC growth dashboard — how the city is moving</p>
        </div>
      </div>

      {/* ── Key Metrics ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricCard label="Total Listings" value={String(singlesEvents.length + fitnessSpots.length + volunteerOrgs.length)} sub="Across all directories" icon={BarChart3} />
        <MetricCard label="Graph Nodes" value={String(graphStats.nodeCount)} sub={`${graphStats.edgeCount} connections`} icon={Zap} />
        <MetricCard label="Avg Confidence" value={`${confidenceStats.avgScore}%`} sub={`${confidenceStats.needsReview} need review`} icon={Star} />
        <MetricCard label="Neighborhoods" value={String(neighborhoodCounts.length + "+")} sub="Active coverage" icon={MapPin} />
        <MetricCard label="Fitness Categories" value={String(categoryCounts.length + "+")} sub="Tracked disciplines" icon={Trophy} />
      </div>

      {/* ── Thunder + Comets Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Thunder */}
        <div className="skeuo-card-inset p-4 rounded">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-accent" />
            <h3 className="label-caps text-foreground">OKC Thunder</h3>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-bold">{thunderData.playoffSeed}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-muted/20 rounded p-2 text-center">
              <p className="text-lg font-black text-foreground">{thunderData.record}</p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Record</p>
            </div>
            <div className="bg-muted/20 rounded p-2 text-center">
              <p className="text-sm font-bold text-foreground">{thunderData.mvpCandidate}</p>
              <p className="text-[9px] text-muted-foreground">{thunderData.mvpStats}</p>
            </div>
          </div>
          <div className="space-y-1.5 mb-3">
            <p className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Recent</p>
            {thunderData.recentResults.map((g, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className={`font-bold ${g.result === "W" ? "text-emerald-500" : "text-red-400"}`}>{g.result}</span>
                <span className="text-foreground">{g.opponent}</span>
                <span className="text-muted-foreground ml-auto font-mono">{g.score}</span>
                <span className="text-muted-foreground/60 text-[10px]">{g.date}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <p className="text-[9px] uppercase tracking-wider font-bold text-accent">Upcoming Playoffs</p>
            {thunderData.upcoming.map((g, i) => (
              <div key={i} className="flex items-center gap-2 text-xs py-1 border-b border-border/20 last:border-0">
                <span className="text-foreground font-medium">{g.label}</span>
                <span className="ml-auto text-muted-foreground text-[10px]">{g.date} · {g.time}</span>
                {g.price && <span className="text-accent text-[10px] font-mono">{g.price}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Comets */}
        <div className="skeuo-card-inset p-4 rounded">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-accent" />
            <h3 className="label-caps text-foreground">OKC Comets (NWSL)</h3>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-bold">2026 Season</span>
          </div>
          <div className="space-y-2">
            {cometSchedule.map((g, i) => (
              <div key={i} className={`flex items-center gap-2 text-xs py-2 border-b border-border/20 last:border-0 ${g.home ? "" : "opacity-60"}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${g.home ? "bg-accent" : "bg-muted-foreground/30"}`} />
                <span className="text-foreground font-medium flex-1">{g.opponent}</span>
                <span className="text-muted-foreground text-[10px]">{g.date}</span>
                <span className="text-muted-foreground text-[10px]">{g.time}</span>
                {g.price && <span className="text-accent text-[10px] font-mono">{g.price}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mayor's Desk ── */}
      <div className="skeuo-card-inset p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <Landmark size={16} className="text-accent" />
          <h3 className="label-caps text-foreground">Mayor's Desk</h3>
          <span className="ml-auto text-[10px] text-muted-foreground">{mayorData.term}</span>
        </div>
        <blockquote className="text-sm italic text-foreground/70 border-l-2 border-accent/30 pl-3 mb-4">
          "{mayorData.quote}"
          <cite className="block text-[10px] text-muted-foreground mt-1 not-italic">— {mayorData.name}, {mayorData.title}</cite>
        </blockquote>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mayorData.initiatives.map((init, i) => (
            <div key={i} className="bg-muted/20 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                  init.status.includes("Signed") ? "bg-emerald-500/10 text-emerald-500" :
                  init.status.includes("Progress") ? "bg-amber-500/10 text-amber-500" :
                  "bg-accent/10 text-accent"
                }`}>{init.status}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{init.date}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{init.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{init.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Confidence Health ── */}
      <div className="skeuo-card-inset p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-accent" />
          <h3 className="label-caps text-foreground">Listing Confidence Health</h3>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="bg-muted/20 rounded p-2 text-center">
            <p className="text-lg font-black text-emerald-500">{confidenceStats.fresh}</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Fresh</p>
          </div>
          <div className="bg-muted/20 rounded p-2 text-center">
            <p className="text-lg font-black text-amber-500">{confidenceStats.aging}</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Aging</p>
          </div>
          <div className="bg-muted/20 rounded p-2 text-center">
            <p className="text-lg font-black text-red-400">{confidenceStats.stale}</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Stale</p>
          </div>
          <div className="bg-muted/20 rounded p-2 text-center">
            <p className="text-lg font-black text-foreground">{confidenceStats.avgScore}%</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Avg Score</p>
          </div>
        </div>
        {confidenceStats.needsReview > 0 && (
          <p className="text-xs text-amber-500">
            {confidenceStats.needsReview} listing{confidenceStats.needsReview > 1 ? "s" : ""} below 60% confidence — reverification recommended
          </p>
        )}
      </div>

      {/* ── Neighborhood Coverage ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="skeuo-card-inset p-4 rounded">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-accent" />
            <h3 className="label-caps text-foreground">Top Neighborhoods</h3>
          </div>
          <div className="space-y-1.5">
            {neighborhoodCounts.map(([hood, count], i) => (
              <div key={hood} className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground/40 font-mono w-4 text-right">{i + 1}</span>
                <span className="text-foreground flex-1">{hood}</span>
                <div className="w-24 bg-muted/30 rounded-full h-1.5">
                  <div className="bg-accent/60 h-1.5 rounded-full" style={{ width: `${(count / neighborhoodCounts[0][1]) * 100}%` }} />
                </div>
                <span className="text-muted-foreground font-mono w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skeuo-card-inset p-4 rounded">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-accent" />
            <h3 className="label-caps text-foreground">Fitness Categories</h3>
          </div>
          <div className="space-y-1.5">
            {categoryCounts.map(([cat, count], i) => (
              <div key={cat} className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground/40 font-mono w-4 text-right">{i + 1}</span>
                <span className="text-foreground flex-1">{cat}</span>
                <div className="w-24 bg-muted/30 rounded-full h-1.5">
                  <div className="bg-accent/60 h-1.5 rounded-full" style={{ width: `${(count / categoryCounts[0][1]) * 100}%` }} />
                </div>
                <span className="text-muted-foreground font-mono w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Discover OKC ── */}
      <div className="skeuo-card-inset p-4 rounded">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={16} className="text-accent" />
          <h3 className="label-caps text-foreground">Discover OKC — Growth Pulse</h3>
        </div>
        <div className="space-y-4">
          {discoverCategories.map((cat) => {
            const Icon = categoryIcons[cat.name] || BarChart3;
            return (
              <div key={cat.name}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={12} className="text-accent" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">{cat.name}</span>
                  <span className="text-[9px] text-muted-foreground">({cat.items.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {cat.items.map((item, i) => (
                    <div key={i} className="bg-muted/20 rounded p-2.5">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[8px] uppercase tracking-wider font-bold px-1 py-0.5 rounded bg-accent/10 text-accent">{item.tag}</span>
                          </div>
                          <p className="text-xs font-semibold text-foreground">{item.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Wire Feed ── */}
      <div className="skeuo-card-inset p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-accent" />
          <h3 className="label-caps text-foreground">Wire Feed</h3>
        </div>
        <div className="space-y-2">
          {tickerItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0">
              <span className="text-[8px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0 mt-0.5 whitespace-nowrap">{item.tag}</span>
              <p className="text-xs text-foreground/80">{item.headline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Metric Card ── */
function MetricCard({ label, value, sub, icon: Icon }: { label: string; value: string; sub: string; icon: typeof TrendingUp }) {
  return (
    <div className="skeuo-card-inset p-3 rounded text-center">
      <Icon size={14} className="mx-auto mb-1 text-accent" />
      <p className="text-xl font-black text-foreground">{value}</p>
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">{label}</p>
      <p className="text-[9px] text-muted-foreground/60 mt-0.5">{sub}</p>
    </div>
  );
}
