import { Star } from "lucide-react";

interface Game {
  day: number;
  opponent: string;
  home: boolean;
  time?: string;
}

// April 2026 Comets NWSL home schedule (fictional but realistic)
const aprilGames: Game[] = [
  { day: 5, opponent: "POR", home: true, time: "7:00" },
  { day: 12, opponent: "HOU", home: false, time: "7:30" },
  { day: 16, opponent: "KC", home: true, time: "7:00" },
  { day: 19, opponent: "CHI", home: false, time: "6:00" },
  { day: 23, opponent: "SD", home: true, time: "7:00" },
  { day: 26, opponent: "LAF", home: false, time: "9:00" },
  { day: 30, opponent: "UTA", home: true, time: "7:00" },
];

const month = "April";
const year = 2026;

// April 2026 starts on Wednesday (day index 3)
const firstDayOfWeek = 3; // 0=Sun
const daysInMonth = 30;

export function CometsSchedule() {
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const cells: (number | null)[] = [];

  // Pad beginning
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Pad end to complete last week
  while (cells.length % 7 !== 0) cells.push(null);

  const gameMap = new Map<number, Game>();
  aprilGames.forEach(g => gameMap.set(g.day, g));

  const todayDate = new Date();
  const isApril = todayDate.getMonth() === 3 && todayDate.getFullYear() === year;
  const todayDay = isApril ? todayDate.getDate() : -1;

  return (
    <div className="skeuo-card p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Star size={14} className="text-[hsl(48,100%,50%)]" />
        <span className="label-caps text-[hsl(0,85%,45%)] text-[10px] font-bold tracking-widest">
          OKC Comets — {month} {year}
        </span>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {dayLabels.map((l, i) => (
          <div key={i} className="text-center font-mono text-[8px] text-muted-foreground/60 font-bold uppercase py-0.5">
            {l}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {cells.map((day, i) => {
          const game = day ? gameMap.get(day) : undefined;
          const isToday = day === todayDay;

          return (
            <div
              key={i}
              className={`relative text-center py-1.5 text-[11px] border border-foreground/[0.04] min-h-[32px] flex flex-col items-center justify-start
                ${day ? "text-foreground" : "text-transparent"}
                ${isToday ? "bg-accent/10 font-bold" : ""}
                ${game ? "bg-muted/30" : ""}
              `}
            >
              <span className={`leading-none ${game ? "font-bold" : "text-muted-foreground/70"}`}>{day || "."}</span>
              {game && (
                <div className="mt-0.5">
                  <span className={`font-mono text-[7px] font-bold leading-none ${game.home ? "text-[hsl(0,85%,45%)]" : "text-muted-foreground"}`}>
                    {game.home ? "vs" : "@"} {game.opponent}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 pt-2 border-t border-foreground/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono text-[8px] text-muted-foreground">
            <span className="w-2 h-2 rounded-sm bg-[hsl(0,85%,45%)]" /> Home
          </span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-muted-foreground">
            <span className="w-2 h-2 rounded-sm bg-muted" /> Away
          </span>
        </div>
        <span className="font-mono text-[8px] text-muted-foreground/50 tracking-wider uppercase">
          NWSL 2026
        </span>
      </div>
    </div>
  );
}
