import { cn } from "@/lib/utils";

type ChipVariant = "live" | "free" | "trending" | "near" | "energy" | "default";

const variantStyles: Record<ChipVariant, string> = {
  live: "border-signal-secondary text-signal-secondary bg-signal-secondary/10",
  free: "border-signal-positive text-signal-positive bg-signal-positive/10",
  trending: "border-signal-highlight text-signal-highlight bg-signal-highlight/10",
  near: "border-accent text-accent bg-accent/10",
  energy: "border-signal-secondary text-signal-secondary bg-signal-secondary/10",
  default: "border-muted-foreground/40 text-muted-foreground bg-muted/30",
};

interface SignalChipProps {
  label: string;
  variant?: ChipVariant;
  pulse?: boolean;
  className?: string;
}

export function SignalChip({ label, variant = "default", pulse = false, className }: SignalChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] font-black border-2",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="signal-pulse absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {label}
    </span>
  );
}
