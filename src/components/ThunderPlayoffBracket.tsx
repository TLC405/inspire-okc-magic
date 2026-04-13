import { Zap } from "lucide-react";

interface Matchup {
  seed1: number;
  team1: string;
  seed2: number;
  team2: string;
  series: string; // e.g. "—" for not started, "2-1" for in progress
  winner?: 1 | 2;
}

const wcFirstRound: Matchup[] = [
  { seed1: 1, team1: "Thunder", seed2: 8, team2: "Timberwolves", series: "—" },
  { seed1: 4, team1: "Rockets", seed2: 5, team2: "Lakers", series: "—" },
  { seed1: 3, team1: "Nuggets", seed2: 6, team2: "Clippers", series: "—" },
  { seed1: 2, team1: "Grizzlies", seed2: 7, team2: "Warriors", series: "—" },
];

const playoffStart = "April 19";

export function ThunderPlayoffBracket() {
  return (
    <div className="skeuo-card p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={14} className="text-[hsl(8,87%,54%)]" />
        <span className="label-caps text-[hsl(200,100%,50%)] text-[10px] font-bold tracking-widest">
          2026 NBA Playoffs — Western Conference
        </span>
      </div>
      <p className="font-mono text-[8px] text-muted-foreground mb-3 tracking-wider uppercase">
        First Round · Best of 7 · Begins {playoffStart}
      </p>

      <div className="space-y-1.5">
        {wcFirstRound.map((m, i) => (
          <div key={i} className="border border-foreground/10 rounded overflow-hidden">
            <div className="grid grid-cols-[1fr_auto] text-[11px]">
              {/* Team 1 */}
              <div className={`flex items-center gap-1.5 px-2 py-1.5 ${m.winner === 1 ? "bg-accent/10 font-bold" : ""}`}>
                <span className="font-mono text-[9px] text-muted-foreground/50 w-3 text-right">{m.seed1}</span>
                <span className={`text-foreground ${m.team1 === "Thunder" ? "font-bold text-[hsl(200,100%,50%)]" : ""}`}>
                  {m.team1}
                </span>
              </div>
              <div className="flex items-center px-2 font-mono text-[9px] text-muted-foreground/60 border-l border-foreground/10 bg-muted/20 row-span-2 justify-center w-10">
                {m.series}
              </div>
              {/* Team 2 */}
              <div className={`flex items-center gap-1.5 px-2 py-1.5 border-t border-foreground/10 ${m.winner === 2 ? "bg-accent/10 font-bold" : ""}`}>
                <span className="font-mono text-[9px] text-muted-foreground/50 w-3 text-right">{m.seed2}</span>
                <span className="text-foreground">{m.team2}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-foreground/10">
        <p className="font-mono text-[8px] text-muted-foreground/50 tracking-wider text-center uppercase">
          Thunder Up · No. 1 Seed · Home Court Advantage
        </p>
      </div>
    </div>
  );
}

/** Compact header teaser for the Navbar */
export function ThunderPlayoffTeaser() {
  return (
    <span className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-wider uppercase font-bold text-[hsl(200,100%,65%)]">
      <Zap size={8} className="text-[hsl(8,87%,54%)]" />
      <span className="hidden sm:inline">Playoffs R1:</span>
      <span>Thunder vs MIN</span>
      <span className="text-[hsl(8,87%,54%)] hidden md:inline">· {playoffStart}</span>
    </span>
  );
}
