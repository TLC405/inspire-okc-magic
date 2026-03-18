import { cn } from "@/lib/utils";

type ChipVariant = "live" | "free" | "trending" | "near" | "energy" | "default";

const variantStyles: Record<ChipVariant, string> = {
  live: "border-signal-secondary text-signal-secondary",
  free: "border-signal-positive text-signal-positive",
  trending: "border-signal-highlight text-signal-highlight",
  near: "border-accent text-accent",
  energy: "border-signal-secondary text-signal-secondary",
  default: "border-muted-foreground/30 text-muted-foreground",
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
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] font-bold border",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="signal-pulse absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {label}
    </span>
  );
}
