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
    <div className={cn("flex items-center gap-6 overflow-x-auto py-3", className)}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 flex-shrink-0">
          <span className="mono-data text-muted-foreground/50">{item.label}</span>
          <span className={cn("mono-data font-bold", item.accent ? "text-accent" : "text-foreground")}>{item.value}</span>
          {i < items.length - 1 && <span className="text-border ml-4">|</span>}
        </div>
      ))}
    </div>
  );
}
