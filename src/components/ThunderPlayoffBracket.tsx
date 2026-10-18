import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface GameInfo {
  name: string;
  date: string;
  state: "pre" | "in" | "post";
  detail: string;
  home: { abbr: string; score?: string };
  away: { abbr: string; score?: string };
  broadcast?: string;
}

const ESPN = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/okc";

function parseEvent(ev: any): GameInfo | null {
  const comp = ev?.competitions?.[0];
  if (!comp) return null;
  const home = comp.competitors?.find((c: any) => c.homeAway === "home");
  const away = comp.competitors?.find((c: any) => c.homeAway === "away");
  const score = (c: any) => (typeof c?.score === "object" ? c?.score?.displayValue : c?.score);
  return {
    name: ev.shortName ?? ev.name,
    date: ev.date,
    state: comp.status?.type?.state ?? "pre",
    detail: comp.status?.type?.shortDetail ?? "",
    home: { abbr: home?.team?.abbreviation ?? "", score: score(home) },
    away: { abbr: away?.team?.abbreviation ?? "", score: score(away) },
    broadcast: comp.broadcasts?.[0]?.media?.shortName,
  };
}

/** Live Thunder Game Center — pulls current record and next/live game from ESPN. */
export function ThunderPlayoffBracket() {
  const [record, setRecord] = useState<string>("");
  const [standing, setStanding] = useState<string>("");
  const [game, setGame] = useState<GameInfo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 10000);
        const res = await fetch(ESPN, { signal: ctrl.signal });
        clearTimeout(t);
        const json = await res.json();
        const team = json?.team;
        if (!alive) return;
        setRecord(team?.record?.items?.[0]?.summary ?? "");
        setStanding(team?.standingSummary ?? "");
        const next = parseEvent(team?.nextEvent?.[0]);
        setGame(next);
        setFailed(false);
      } catch {
        if (alive) setFailed(true);
      }
    };
    load();
    const id = setInterval(load, game?.state === "in" ? 30000 : 300000);
    return () => { alive = false; clearInterval(id); };
  }, [game?.state]);

  const when = game
    ? new Date(game.date).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" })
    : "";

  return (
    <div className="skeuo-card p-4 rounded-lg">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-primary" />
          <span className="label-caps text-primary text-[10px] font-bold tracking-widest">Thunder Game Center</span>
        </div>
        {game?.state === "in" && (
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-destructive border border-destructive/50 px-1.5 py-0.5">Live</span>
        )}
      </div>

      {failed && !game ? (
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Scoreboard temporarily unavailable</p>
      ) : !game ? (
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Loading scoreboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center text-center gap-2 py-2 border-y border-foreground/10">
            <div>
              <p className="font-black text-lg text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{game.away.abbr}</p>
              {game.state !== "pre" && <p className="font-mono text-xl font-bold text-foreground">{game.away.score}</p>}
            </div>
            <span className="font-mono text-[9px] text-muted-foreground uppercase">at</span>
            <div>
              <p className="font-black text-lg text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{game.home.abbr}</p>
              {game.state !== "pre" && <p className="font-mono text-xl font-bold text-foreground">{game.home.score}</p>}
            </div>
          </div>
          <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider text-center mt-2">
            {game.state === "pre" ? `${when} CT` : game.detail}
            {game.broadcast ? ` · ${game.broadcast}` : ""}
          </p>
        </>
      )}

      {(record || standing) && (
        <div className="mt-3 pt-2 border-t border-foreground/10 text-center">
          <p className="font-mono text-[8px] text-muted-foreground tracking-wider uppercase">
            {record && `Record ${record}`}{record && standing ? " · " : ""}{standing}
          </p>
        </div>
      )}
    </div>
  );
}
