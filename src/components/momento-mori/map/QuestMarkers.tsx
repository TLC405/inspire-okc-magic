import { Quest } from '@/data/momento-mori/quests';
import { City } from '@/data/momento-mori/cities';

interface QuestMarkersProps {
  quests: Quest[];
  cities: City[];
  hoveredQuest: string | null;
  onSelectQuest: (quest: Quest) => void;
  onHoverQuest: (questId: string | null) => void;
}

const tierConfig = {
  5: { size: 'w-3 h-3', bg: 'bg-gradient-to-br from-amber-500 to-amber-700', border: 'border-amber-800/60', label: 'LEGENDARY' },
  4: { size: 'w-2.5 h-2.5', bg: 'bg-gradient-to-br from-purple-500 to-violet-700', border: 'border-purple-800/60', label: 'EPIC' },
  3: { size: 'w-2 h-2', bg: 'bg-gradient-to-br from-orange-500 to-amber-700', border: 'border-orange-800/60', label: 'HEROIC' },
  2: { size: 'w-2 h-2', bg: 'bg-gradient-to-br from-slate-500 to-slate-600', border: 'border-slate-700/60', label: 'VALIANT' },
  1: { size: 'w-1.5 h-1.5', bg: 'bg-gradient-to-br from-stone-500 to-stone-600', border: 'border-stone-700/60', label: 'STANDARD' },
} as const;

const QuestMarkers = ({ quests, cities, hoveredQuest, onSelectQuest, onHoverQuest }: QuestMarkersProps) => {
  const visibleQuests = quests.slice(0, 12);

  return (
    <>
      {visibleQuests.map((quest) => {
        const city = cities.find(c => c.id === quest.cityId);
        if (!city) return null;
        const hash = quest.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const offsetX = ((hash % 6) - 3) * 0.5;
        const offsetY = (((hash * 7) % 6) - 3) * 0.5 - 2;
        const config = tierConfig[quest.tier as keyof typeof tierConfig];
        const isHovered = hoveredQuest === quest.id;
        return (
          <button
            key={quest.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
            style={{ left: `${city.mapPosition.x + offsetX}%`, top: `${city.mapPosition.y + offsetY}%` }}
            onClick={() => onSelectQuest(quest)}
            onMouseEnter={() => onHoverQuest(quest.id)}
            onMouseLeave={() => onHoverQuest(null)}
          >
            <div
              className={`${config.size} ${config.bg} border ${config.border} transition-transform duration-150 ${isHovered ? 'scale-125' : ''} ${quest.tier === 5 ? 'animate-pulse' : ''}`}
              style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
            />
            {isHovered && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[hsl(30_25%_22%)]/95 text-[hsl(38_32%_78%)] px-2 py-1 rounded shadow-md whitespace-nowrap z-30 pointer-events-none">
                <div className="text-[8px] font-[Orbitron,sans-serif] text-amber-400/90 tracking-wider">{config.label}</div>
                <div className="text-[10px] font-[Cinzel,serif] font-semibold">{quest.name}</div>
                <div className="text-[8px] opacity-60">{quest.type.toUpperCase()}</div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="border-4 border-transparent border-t-[hsl(30_25%_22%)]/95" />
                </div>
              </div>
            )}
          </button>
        );
      })}
    </>
  );
};

export default QuestMarkers;
