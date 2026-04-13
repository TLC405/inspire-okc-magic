const MapLegend = () => (
  <div className="absolute bottom-3 right-3 bg-[hsl(38_32%_78%)]/90 border border-[hsl(30_25%_22%)]/15 rounded px-2.5 py-2 shadow-sm">
    <h4 className="font-[Cinzel,serif] text-[hsl(30_25%_22%)]/80 text-[8px] font-semibold mb-1.5 tracking-wider">QUEST TIERS</h4>
    <div className="space-y-1">
      {[
        { tier: 5, label: 'Legendary', color: 'from-amber-500 to-amber-700' },
        { tier: 4, label: 'Epic', color: 'from-purple-500 to-violet-700' },
        { tier: 3, label: 'Heroic', color: 'from-orange-500 to-amber-700' },
        { tier: 2, label: 'Valiant', color: 'from-slate-500 to-slate-600' },
        { tier: 1, label: 'Standard', color: 'from-stone-500 to-stone-600' },
      ].map(({ tier, label, color }) => (
        <div key={tier} className="flex items-center gap-1.5">
          <div className={`w-2 h-2 bg-gradient-to-br ${color}`} style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}/>
          <span className="text-[7px] text-[hsl(30_25%_22%)]/70">{label}</span>
        </div>
      ))}
    </div>
    <div className="mt-2 pt-1.5 border-t border-[hsl(30_25%_22%)]/10">
      <h4 className="font-[Cinzel,serif] text-[hsl(30_25%_22%)]/80 text-[8px] font-semibold mb-1 tracking-wider">SETTLEMENTS</h4>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(30_25%_22%)]/90 flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-[hsl(38_32%_78%)]" /></div>
          <span className="text-[7px] text-[hsl(30_25%_22%)]/70">Major City</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[hsl(30_25%_22%)]/80 flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-[hsl(38_32%_78%)]" /></div>
          <span className="text-[7px] text-[hsl(30_25%_22%)]/70">City</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(30_25%_22%)]/70" />
          <span className="text-[7px] text-[hsl(30_25%_22%)]/70">Town</span>
        </div>
      </div>
    </div>
  </div>
);

export default MapLegend;
