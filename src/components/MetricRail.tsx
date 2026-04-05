import { cn } from "@/lib/utils";

interface MetricItem {
  label: string;
  value: string;
  accent?: boolean;
}

interface MetricRailProps {
  items: MetricItem[];
  className?: string;
}

export function MetricRail({ items, className }: MetricRailProps) {
  return (
    <div className={cn("flex items-center gap-0 overflow-x-auto", className)}>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center justify-center flex-shrink-0 px-6 py-5 border-r border-border last:border-r-0">
          <span className={cn("text-xl md:text-2xl font-black tracking-tight", item.accent ? "text-accent" : "text-foreground")}>{item.value}</span>
          <span className="mono-data text-muted-foreground/60 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
