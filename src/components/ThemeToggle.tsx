import { useTheme } from "next-themes";
import { Sun, Moon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("thunder");
    else setTheme("light");
  };

  const Icon = theme === "thunder" ? Zap : theme === "dark" ? Moon : Sun;

  return (
    <button
      onClick={cycle}
      className={cn(
        "p-2 transition-colors duration-150",
        className
      )}
      aria-label="Toggle theme"
    >
      <Icon size={16} />
    </button>
  );
}
