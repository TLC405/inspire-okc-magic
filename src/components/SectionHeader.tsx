import { type LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
}

interface SectionHeaderProps {
  section: string;
  deskName: string;
  stats?: Stat[];
  icon?: LucideIcon;
}

export function SectionHeader({ section, deskName, stats, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="border-b border-foreground/10 bg-muted/20">
      <div className="container py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {Icon && <Icon size={14} className="text-accent flex-shrink-0" />}
          <span className="folder-tab px-2 py-0.5 text-[9px] font-black uppercase tracking-wider flex-shrink-0">
            {section}
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted-foreground font-bold truncate">
            {deskName}
          </span>
        </div>
        {stats && stats.length > 0 && (
          <div className="hidden sm:flex items-center gap-3">
            {stats.map((s, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-foreground/15 text-[6px]">·</span>}
                <span className="font-mono text-[9px] tracking-wider text-foreground font-bold tabular-nums">
                  {s.value}
                </span>
                <span className="font-mono text-[8px] tracking-wider uppercase text-muted-foreground/60">
                  {s.label}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
