import { useTheme } from "next-themes";
import { Activity, BookOpen, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  { key: "dark", label: "Signal", icon: Activity },
  { key: "editorial", label: "Editorial", icon: BookOpen },
  { key: "raw", label: "Raw", icon: Terminal },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const idx = modes.findIndex((m) => m.key === theme);
    const next = modes[(idx + 1) % modes.length];
    setTheme(next.key);
  };

  const current = modes.find((m) => m.key === theme) || modes[0];
  const Icon = current.icon;

  return (
    <button
      onClick={cycle}
      className={cn("p-2 transition-colors duration-150", className)}
      aria-label={`Theme: ${current.label}`}
      title={current.label}
    >
      <Icon size={16} />
    </button>
  );
}
