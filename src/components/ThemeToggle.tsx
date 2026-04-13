import { useTheme } from "next-themes";
import { Sun, Moon, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "thunder", label: "Thunder", icon: Zap },
  { key: "comets", label: "Comets", icon: Star },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const idx = modes.findIndex((m) => m.key === theme);
    const next = modes[(idx + 1) % modes.length];
    setTheme(next.key);
  };

  const current = modes.find((m) => m.key === theme) || modes[1];
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
