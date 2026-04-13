import { useTheme } from "next-themes";
import { Sun, Moon, Zap, Star, Building2, Heart } from "lucide-react";

const themes = [
  { key: "light", label: "Light", icon: Sun, desc: "Warm parchment broadsheet", colors: ["hsl(40,28%,93%)", "hsl(210,85%,28%)", "hsl(0,0%,6%)"] },
  { key: "dark", label: "Dark", icon: Moon, desc: "OLED night desk", colors: ["hsl(220,20%,3%)", "hsl(205,100%,50%)", "hsl(40,20%,92%)"] },
  { key: "thunder", label: "Thunder", icon: Zap, desc: "Game day electric", colors: ["hsl(214,100%,8%)", "hsl(16,100%,50%)", "hsl(200,100%,50%)"] },
  { key: "comets", label: "Comets", icon: Star, desc: "Athletic red & blue", colors: ["hsl(220,50%,6%)", "hsl(0,85%,45%)", "hsl(220,100%,35%)"] },
  { key: "bricktown", label: "Bricktown", icon: Building2, desc: "Industrial warehouse", colors: ["hsl(15,25%,8%)", "hsl(18,75%,48%)", "hsl(30,25%,90%)"] },
  { key: "tlc", label: "TLC", icon: Heart, desc: "Soft rose & sage", colors: ["hsl(345,25%,94%)", "hsl(340,35%,40%)", "hsl(160,25%,45%)"] },
];

export function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-3">
      <div>
        <h3 className="label-caps text-foreground">Appearance</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Each theme has its own typography, palette, and personality.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {themes.map(({ key, label, icon: Icon, desc, colors }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`skeuo-card-inset p-3 rounded text-center transition-all ${
              theme === key ? "ring-2 ring-accent" : "hover:bg-muted/20"
            }`}
          >
            <Icon size={18} className={`mx-auto mb-2 ${theme === key ? "text-accent" : "text-muted-foreground"}`} />
            <p className={`text-xs font-semibold ${theme === key ? "text-foreground" : "text-muted-foreground"}`}>{label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{desc}</p>
            <div className="flex justify-center gap-1 mt-2">
              {colors.map((c, i) => (
                <span key={i} className="w-3 h-3 rounded-full border border-border/30" style={{ backgroundColor: c }} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
