import { tickerItems } from "@/data/civicData";

export function WireTicker() {
  return (
    <div className="wire-ticker">
      <div className="flex items-stretch">
        <div className="wire-ticker-badge">
          <span
            className="w-1.5 h-1.5 rounded-full bg-white signal-pulse"
            style={{ boxShadow: '0 0 0 0 rgba(255,255,255,0.7)' }}
          />
          WIRE
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div className="wire-ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center font-mono text-[11px] tracking-wide py-[9px]"
                style={{ color: 'hsl(var(--background))' }}
              >
                <span
                  className="font-black mr-2 uppercase"
                  style={{ color: 'hsl(var(--destructive))' }}
                >
                  {item.tag}:
                </span>
                <span style={{ opacity: 0.88 }}>{item.headline}</span>
                <span className="mx-8 opacity-30">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
