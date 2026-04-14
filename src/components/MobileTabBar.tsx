import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Dumbbell, HandHelping, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef, useEffect } from "react";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/singles", icon: Heart, label: "Singles" },
  { to: "/fitness", icon: Dumbbell, label: "Fitness" },
  { to: "/volunteering", icon: HandHelping, label: "Volunteer" },
];

const moreLinks = [
  { to: "/events", label: "Events" },
  { to: "/date-nights", label: "Date Nights" },
  { to: "/discover", label: "Discover" },
  { to: "/momento-mori", label: "Momento Mori" },
];

export function MobileTabBar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // Close on nav
  useEffect(() => setShowMore(false), [location.pathname]);

  if (!isMobile) return null;

  const isMoreActive = moreLinks.some(l => location.pathname === l.to);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-foreground/10" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <nav className="flex items-stretch h-14">
        {tabs.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[9px] font-mono tracking-wider uppercase">{label}</span>
            </Link>
          );
        })}

        {/* More tab */}
        <div ref={moreRef} className="flex-1 relative">
          <button
            onClick={() => setShowMore(p => !p)}
            className={cn(
              "w-full h-full flex flex-col items-center justify-center gap-0.5 transition-colors",
              isMoreActive || showMore ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <MoreHorizontal size={18} strokeWidth={isMoreActive ? 2.5 : 1.5} />
            <span className="text-[9px] font-mono tracking-wider uppercase">More</span>
          </button>

          {showMore && (
            <div className="absolute bottom-full right-0 mb-2 mr-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[160px]">
              {moreLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "block px-4 py-3 text-xs font-mono tracking-wider uppercase transition-colors border-b border-border/50 last:border-0",
                    location.pathname === to
                      ? "text-foreground bg-foreground/5 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
