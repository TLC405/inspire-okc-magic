import { mayorData, thunderData, cometSchedule } from "@/data/civicData";
import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";

const totalListings = singlesEvents.length + fitnessSpots.length + volunteerOrgs.length;

/** "At a Glance" stats panel for home page */
export function AtAGlance() {
  const stats = [
    { label: "Total Listings", value: totalListings.toString() },
    { label: "Singles Events", value: singlesEvents.length.toString() },
    { label: "Fitness Spots", value: `${fitnessSpots.length}+` },
    { label: "Volunteer Orgs", value: volunteerOrgs.length.toString() },
    { label: "Population", value: "700K+" },
    { label: "Area Code", value: "405" },
  ];

  return (
    <div className="paper-card p-6 relative">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-1 font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
        TODAY'S FIGURES
      </div>
      <h3 className="text-center mt-2 mb-4 pb-3 relative">
        <span className="font-black text-lg uppercase tracking-[0.15em] text-foreground text-ink-press" style={{ fontFamily: "'Playfair Display', serif" }}>
          At a Glance
        </span>
        <div className="ink-rule absolute bottom-0 left-1/4 w-1/2" />
      </h3>
      <ul className="space-y-3">
        {stats.map((s, i) => (
          <li
            key={s.label}
            className="flex justify-between items-center pb-2"
            style={i < stats.length - 1 ? { borderBottom: '1px dotted hsl(var(--border) / 0.4)' } : undefined}
          >
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground text-letterpress">{s.label}</span>
            <span className="italic font-medium text-foreground/80" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mayor's Desk panel for home page */
export function MayorsDesk() {
  return (
    <div className="paper-card p-5 relative">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-1 font-mono text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
        MAYOR'S DESK
      </div>
      <div className="mt-3 pb-3 mb-4 text-center relative">
        <div className="ink-rule absolute bottom-0 left-0 w-full" />
        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-bold">
          {mayorData.title} · {mayorData.term}
        </p>
        <p className="font-bold text-base mt-1 text-foreground text-ink-press" style={{ fontFamily: "'Playfair Display', serif" }}>
          {mayorData.name}
        </p>
      </div>
      <ul className="space-y-3">
        {mayorData.initiatives.map((item, i) => (
          <li
            key={i}
            className="pb-3"
            style={i < mayorData.initiatives.length - 1 ? { borderBottom: '1px dotted hsl(var(--border) / 0.4)' } : undefined}
          >
            <div className="flex justify-between items-start gap-2 mb-1">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider leading-tight text-foreground">
                {item.name}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-destructive font-bold shrink-0 border border-destructive/50 px-1.5 py-0.5">
                {item.status}
              </span>
            </div>
            <p className="text-xs text-foreground/75 leading-relaxed">{item.description}</p>
            <p className="italic text-[10px] text-muted-foreground mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.date}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-3 relative">
        <div className="ink-rule absolute top-0 left-0 w-full" />
        <p className="italic text-sm text-foreground/80 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
          "{mayorData.quote}"
        </p>
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground mt-2">
          — {mayorData.name}
        </p>
      </div>
    </div>
  );
}

/** Thunder + Comets sports sidebar */
export function SportsSidebar() {
  return (
    <div className="paper-card p-5 relative">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-1 font-mono text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
        SPORTS WIRE
      </div>
      <div className="mt-3">
        {/* Thunder */}
        <div className="pb-3 mb-3" style={{ borderBottom: '1px dotted hsl(var(--border) / 0.4)' }}>
          <h4 className="font-black text-sm uppercase tracking-wider text-foreground text-ink-press mb-2">
            ⚡ OKC Thunder
          </h4>
          <div className="space-y-1 font-mono text-[10px] tracking-wide">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Record</span>
              <span className="font-bold text-foreground">{thunderData.record}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Standing</span>
              <span className="font-bold text-foreground">{thunderData.playoffSeed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MVP</span>
              <span className="font-bold text-foreground">{thunderData.mvpCandidate}</span>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground font-mono">
            Next: {thunderData.nextGame}
          </p>
        </div>

        {/* Comets */}
        <h4 className="font-black text-sm uppercase tracking-wider text-foreground text-ink-press mb-2">
          ⚽ OKC Comets
        </h4>
        <div className="space-y-2">
          {cometSchedule.slice(0, 3).map((game, i) => (
            <div key={i} className="font-mono text-[10px] tracking-wide flex justify-between">
              <span className="text-muted-foreground">{game.date}</span>
              <span className="font-bold text-foreground truncate ml-2">{game.opponent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
