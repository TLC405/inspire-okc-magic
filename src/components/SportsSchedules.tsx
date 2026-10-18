import { useEffect, useState } from "react";

interface Row { id: string; date: string; opp: string; home: boolean; result?: string; live?: boolean }

const fmt = (d: string) =>
  new Date(d).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" });

async function timed(url: string) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 10000);
  try { return await (await fetch(url, { signal: c.signal })).json(); } finally { clearTimeout(t); }
}

async function loadThunder(): Promise<Row[]> {
  const j = await timed("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/okc/schedule");
  const now = Date.now();
  return (j?.events ?? [])
    .map((e: any) => {
      const c = e.competitions?.[0];
      const me = c?.competitors?.find((x: any) => x.team?.abbreviation === "OKC");
      const op = c?.competitors?.find((x: any) => x.team?.abbreviation !== "OKC");
      const state = c?.status?.type?.state;
      return {
        id: e.id, date: e.date, opp: op?.team?.abbreviation ?? "TBD", home: me?.homeAway === "home",
        live: state === "in",
        result: state === "post" ? `${me?.winner ? "W" : "L"} ${me?.score?.displayValue ?? ""}-${op?.score?.displayValue ?? ""}` : undefined,
      } as Row;
    })
    .filter((r: Row) => r.live || new Date(r.date).getTime() > now - 36e5 * 4)
    .slice(0, 6);
}

async function loadComets(): Promise<Row[]> {
  const today = new Date().toISOString().slice(0, 10);
  const end = new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 10);
  const j = await timed(`https://statsapi.mlb.com/api/v1/schedule?sportId=11&teamId=238&startDate=${today}&endDate=${end}`);
  const rows: Row[] = [];
  for (const d of j?.dates ?? []) for (const g of d.games ?? []) {
    const home = g.teams?.home?.team?.id === 238;
    const op = home ? g.teams?.away?.team?.name : g.teams?.home?.team?.name;
    rows.push({ id: String(g.gamePk), date: g.gameDate, opp: op ?? "TBD", home, live: g.status?.abstractGameState === "Live" });
  }
  return rows.slice(0, 6);
}

function useSchedule(loader: () => Promise<Row[]>) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let alive = true;
    const run = () => loader().then(r => { if (alive) { setRows(r); setErr(false); } }).catch(() => alive && setErr(true));
    run();
    const id = setInterval(run, 10 * 60000);
    return () => { alive = false; clearInterval(id); };
  }, [loader]);
  return { rows, err };
}

function Card({ title, sub, rows, err, link, empty }: { title: string; sub: string; rows: Row[] | null; err: boolean; link: string; empty: string }) {
  return (
    <div className="skeuo-card p-4 rounded-lg">
      <div className="flex items-baseline justify-between mb-2">
        <span className="label-caps text-primary text-[10px] font-bold tracking-widest">{title}</span>
        <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{sub}</span>
      </div>
      {err && !rows ? (
        <p className="font-mono text-[10px] text-muted-foreground uppercase">Schedule temporarily unavailable</p>
      ) : !rows ? (
        <p className="font-mono text-[10px] text-muted-foreground uppercase">Loading schedule...</p>
      ) : rows.length === 0 ? (
        <p className="font-mono text-[10px] text-muted-foreground uppercase">{empty}</p>
      ) : (
        <ul className="divide-y divide-foreground/10">
          {rows.map(r => (
            <li key={r.id} className="flex justify-between gap-2 py-1.5 font-mono text-[10px]">
              <span className="text-muted-foreground shrink-0">{fmt(r.date)}</span>
              <span className="text-foreground font-bold truncate text-right">
                {r.home ? "vs" : "@"} {r.opp}
                {r.live && <span className="ml-1 text-destructive">LIVE</span>}
                {r.result && <span className="ml-1 text-muted-foreground">{r.result}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
      <a href={link} target="_blank" rel="noopener noreferrer" className="block mt-2 font-mono text-[8px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
        Full schedule
      </a>
    </div>
  );
}

/** Always-current OKC team schedules: Thunder (NBA), Comets (Triple-A baseball), Warriors (hockey). */
export function SportsSchedules() {
  const thunder = useSchedule(loadThunder);
  const comets = useSchedule(loadComets);
  return (
    <>
      <Card title="Thunder Schedule" sub="NBA" {...thunder} link="https://www.nba.com/thunder/schedule" empty="No upcoming games listed" />
      <Card title="Comets Schedule" sub="Triple-A Baseball" {...comets} link="https://www.milb.com/oklahoma-city/schedule" empty="Offseason — schedule not yet posted" />
      <div className="skeuo-card p-4 rounded-lg">
        <div className="flex items-baseline justify-between mb-2">
          <span className="label-caps text-primary text-[10px] font-bold tracking-widest">Oklahoma Warriors</span>
          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">NAHL Hockey</span>
        </div>
        <p className="text-xs text-foreground/75">Junior hockey at Blazers Ice Centre, South OKC.</p>
        <a href="https://www.okwarriors.com/" target="_blank" rel="noopener noreferrer" className="block mt-2 font-mono text-[8px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
          Schedule and tickets
        </a>
      </div>
    </>
  );
}
