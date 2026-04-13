import { useTheme } from "next-themes";
import { Sun, Moon, Zap, Star, Building2, Heart } from "lucide-react";

const themes = [
  { key: "light", label: "Light", icon: Sun, desc: "Elegant broadsheet", colors: ["hsl(42,25%,94%)", "hsl(210,85%,30%)", "hsl(0,0%,8%)"] },
  { key: "dark", label: "Dark", icon: Moon, desc: "Deep ink contrast", colors: ["hsl(220,15%,5%)", "hsl(205,100%,42%)", "hsl(40,20%,92%)"] },
  { key: "thunder", label: "Thunder", icon: Zap, desc: "NBA game day", colors: ["hsl(214,100%,12%)", "hsl(8,87%,54%)", "hsl(200,100%,45%)"] },
  { key: "comets", label: "Comets", icon: Star, desc: "Red, white & blue", colors: ["hsl(220,50%,8%)", "hsl(353,85%,43%)", "hsl(218,100%,40%)"] },
  { key: "bricktown", label: "Bricktown", icon: Building2, desc: "Warm urban brick", colors: ["hsl(15,25%,10%)", "hsl(24,85%,55%)", "hsl(30,25%,90%)"] },
  { key: "tlc", label: "TLC", icon: Heart, desc: "Tender & warm", colors: ["hsl(340,15%,95%)", "hsl(340,45%,45%)", "hsl(340,20%,15%)"] },
];

export function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-3">
      <div>
        <h3 className="label-caps text-foreground">Appearance</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Switch the site theme. Each has its own personality and typography.</p>
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
            <p className="text-[9px] text-muted-foreground/60 mt-0.5">{desc}</p>
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
