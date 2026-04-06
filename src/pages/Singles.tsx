import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { singlesEvents, singlesCategories, singlesTimeFilters, type SinglesEvent, type VerificationStatus } from "@/data/singlesEvents";
import { searchAndRank } from "@/lib/singlesSearch";
import {
  ExternalLink, Search, SlidersHorizontal, X, ShieldCheck, ShieldAlert, AlertTriangle,
  ChevronDown, ChevronUp, Clock, Link2, Award, Filter, MapPin, Heart
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImg from "@/assets/hero-singles.jpg";
import { ListingImage } from "@/components/ListingImage";

const neighborhoods = ["All Areas", ...Array.from(new Set(singlesEvents.map((e) => e.neighborhood)))];

const statusConfig: Record<VerificationStatus, { icon: typeof ShieldCheck; label: string; cls: string }> = {
  verified: { icon: ShieldCheck, label: "Verified", cls: "text-emerald-600 dark:text-emerald-400" },
  stale: { icon: AlertTriangle, label: "Stale", cls: "text-amber-600 dark:text-amber-400" },
  broken: { icon: ShieldAlert, label: "Broken", cls: "text-red-600 dark:text-red-400" },
  conflict: { icon: AlertTriangle, label: "Conflict", cls: "text-orange-600 dark:text-orange-400" },
  unverified: { icon: Clock, label: "Unverified", cls: "text-muted-foreground" },
};

const ConfidenceMeter = ({ score }: { score: number }) => {
  const color = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className="mono-data text-muted-foreground">{score}%</span>
    </div>
  );
};

const VerificationBadge = ({ status }: { status: VerificationStatus }) => {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 mono-data font-bold ${cfg.cls}`}>
      <Icon size={12} /> {cfg.label}
    </span>
  );
};

const EvidenceDrawer = ({ event }: { event: SinglesEvent }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-1 mono-data text-accent hover:underline cursor-pointer">
        <Link2 size={10} />
        {event.sources.length} source{event.sources.length !== 1 ? "s" : ""} · Evidence
        {open ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
      </button>
      {open && (
        <div className="mt-2 p-3 rounded skeuo-card-inset space-y-2">
          {event.sources.map((src, i) => (
            <div key={i} className="flex items-start gap-2">
              <VerificationBadge status={src.status} />
              <div className="min-w-0 flex-1">
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="body-text text-accent hover:underline truncate block text-sm">
                  {src.title || src.url}
                </a>
                <p className="mono-data text-muted-foreground/60">{src.provider} · checked {src.checkedAt}</p>
              </div>
            </div>
          ))}
          {event.evidenceNotes && (
            <div className="pt-2 border-t border-border/30">
              <p className="mono-data text-muted-foreground/80 leading-relaxed">{event.evidenceNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Singles = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("All");
  const [time, setTime] = useState("All Events");
  const [hood, setHood] = useState("All Areas");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sortBy, setSortBy] = useState<"relevance" | "confidence" | "newest">("relevance");

  // Only show singles-relevant categories: Speed Dating, Mixer
  const singlesOnly = useMemo(
    () => singlesEvents.filter((e) => ["Speed Dating", "Mixer"].includes(e.category)),
    []
  );

  const results = useMemo(
    () => searchAndRank(singlesOnly, search, { category, time, hood, verifiedOnly, sortBy }),
    [singlesOnly, search, category, time, hood, verifiedOnly, sortBy]
  );

  const verifiedCount = singlesOnly.filter((e) => e.verificationStatus === "verified").length;
  const staleCount = singlesOnly.filter((e) => e.verificationStatus === "stale").length;

  const activeFilters = [
    ...(category !== "All" ? [{ label: category, clear: () => setCategory("All") }] : []),
    ...(time !== "All Events" ? [{ label: time, clear: () => setTime("All Events") }] : []),
    ...(hood !== "All Areas" ? [{ label: hood, clear: () => setHood("All Areas") }] : []),
    ...(verifiedOnly ? [{ label: "Verified Only", clear: () => setVerifiedOnly(false) }] : []),
  ];

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Trust Level</p>
        <button onClick={() => setVerifiedOnly(!verifiedOnly)} className={`w-full text-left flex items-center gap-2 ${verifiedOnly ? "skeuo-chip-active" : "skeuo-chip"}`}>
          <ShieldCheck size={12} /> Verified Only
        </button>
        <div className="mt-2 mono-data text-muted-foreground/60">{verifiedCount} verified · {staleCount} stale</div>
      </div>
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Sort By</p>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-full bg-transparent border-border text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="confidence">Confidence Score</SelectItem>
            <SelectItem value="newest">Recently Verified</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Category</p>
        <div className="flex flex-col gap-1">
          {singlesCategories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`text-left ${c === category ? "skeuo-chip-active" : "skeuo-chip"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Frequency</p>
        <div className="flex flex-col gap-1">
          {singlesTimeFilters.map((t) => (
            <button key={t} onClick={() => setTime(t)} className={`text-left ${t === time ? "skeuo-chip-active" : "skeuo-chip"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="dateline text-foreground/60 font-bold mb-2">Neighborhood</p>
        <Select value={hood} onValueChange={setHood}>
          <SelectTrigger className="w-full bg-transparent border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            {neighborhoods.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
          <img src={heroImg} alt="Singles mixer event at a craft brewery" className="w-full h-full object-cover" width={1920} height={512} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container pb-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="section-head text-foreground text-3xl md:text-5xl drop-shadow-sm">Singles Events</h1>
                <p className="dateline text-foreground/70 mt-1 drop-shadow-sm">
                  Oklahoma City · {singlesEvents.length} Total · {verifiedCount} Verified · AI-Audited
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 skeuo-card px-3 py-2 rounded">
                <Award size={14} className="text-emerald-500" />
                <span className="mono-data text-emerald-600 dark:text-emerald-400 font-bold">Triple-Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="container pt-4 md:pt-6">
          <div className="relative mb-4">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events, venues, organizers, neighborhoods..." className="skeuo-search pl-11" />
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger className="skeuo-btn"><SlidersHorizontal size={14} /> Filters</SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background overflow-y-auto">
                  <SheetHeader><SheetTitle className="section-head text-lg">Filters</SheetTitle></SheetHeader>
                  <div className="mt-6"><FilterPanel /></div>
                </SheetContent>
              </Sheet>
            </div>
            {activeFilters.map((f) => (
              <button key={f.label} onClick={f.clear} className="inline-flex items-center gap-1.5 skeuo-chip-active">{f.label} <X size={10} /></button>
            ))}
            <span className="dateline text-foreground font-bold ml-auto">{results.length} Results</span>
          </div>
          <div className="skeuo-divider mb-4" />
        </div>

        <div className="container pb-12">
          <div className="flex gap-8">
            <aside className="hidden md:block w-72 flex-shrink-0">
              <div className="sticky top-4 skeuo-card-inset p-5 rounded overflow-y-auto max-h-[calc(100vh-2rem)]">
                <FilterPanel />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {results.map(({ event: evt, matchReasons }) => {
                  const borderColor = evt.verificationStatus === "verified"
                    ? "border-l-emerald-500" : evt.verificationStatus === "stale"
                    ? "border-l-amber-500" : "border-l-red-400";

                  return (
                    <article key={evt.id} className={`skeuo-card rounded overflow-hidden border-l-4 ${borderColor}`}>
                      <ListingImage
                        listingType="singles"
                        listingId={evt.id}
                        name={`${evt.name} ${evt.organizer}`}
                        category={evt.category}
                        websiteUrl={evt.sources[0]?.status === "verified" ? evt.sources[0].url : undefined}
                        className="w-full h-32 lg:h-36"
                      />
                      <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h2 className="headline text-foreground">{evt.name}</h2>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <VerificationBadge status={evt.verificationStatus} />
                          {evt.sources[0]?.status === "verified" && (
                            <a href={evt.sources[0].url} target="_blank" rel="noopener noreferrer" className="skeuo-btn !px-2 !py-1.5">
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="subheadline mt-0.5">{evt.organizer} · {evt.venue}</p>
                      <p className="flex items-center gap-1 dateline text-muted-foreground/60 mt-1">
                        <MapPin size={10} /> {evt.neighborhood} · {evt.frequency} · {evt.price}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <ConfidenceMeter score={evt.confidenceScore} />
                        <span className="mono-data text-muted-foreground/50">verified {evt.lastVerifiedAt}</span>
                      </div>
                      <p className="body-text mt-2 line-clamp-2">{evt.description}</p>
                      {matchReasons.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {matchReasons.slice(0, 3).map((r) => (
                            <span key={r} className="inline-block text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-accent/10 text-accent">{r}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span className="skeuo-badge-accent">{evt.category}</span>
                        {evt.ageRange && <span className="skeuo-badge">{evt.ageRange}</span>}
                        {evt.tags.slice(0, 3).map((t) => (<span key={t} className="skeuo-badge">{t}</span>))}
                      </div>
                      <EvidenceDrawer event={evt} />
                      </div>
                    </article>
                  );
                })}
              </div>

              {results.length === 0 && (
                <div className="py-16 text-center skeuo-card-inset p-8 rounded">
                  <Heart size={32} className="mx-auto mb-3 text-muted-foreground/40" />
                  <p className="headline text-foreground mb-2">No verified events match your filters</p>
                  <p className="body-text text-muted-foreground/60 mb-4">
                    {verifiedOnly ? "Try disabling 'Verified Only' to see stale or unverified listings." : "Try adjusting your search or clearing some filters."}
                  </p>
                  {verifiedOnly && (
                    <button onClick={() => setVerifiedOnly(false)} className="skeuo-btn"><Filter size={12} /> Show All Events</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Singles;
