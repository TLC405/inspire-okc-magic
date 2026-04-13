import { Quest, tierLabels, typeIcons } from '@/data/momento-mori/quests';
import { X, MapPin, Target, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuestPanelProps {
  quest: Quest;
  onClose: () => void;
}

const tierColors: Record<number, string> = {
  5: 'text-amber-400',
  4: 'text-purple-400',
  3: 'text-orange-400',
  2: 'text-blue-400',
  1: 'text-stone-400',
};

const tierBgColors: Record<number, string> = {
  5: 'bg-amber-500/20 border-amber-500/50',
  4: 'bg-purple-500/20 border-purple-500/50',
  3: 'bg-orange-500/20 border-orange-500/50',
  2: 'bg-blue-500/20 border-blue-500/50',
  1: 'bg-stone-500/20 border-stone-500/50',
};

const QuestPanel = ({ quest, onClose }: QuestPanelProps) => {
  return (
    <div className="h-full flex flex-col" style={{ background: 'hsl(222 28% 7%)', borderLeft: '1px solid hsl(222 18% 26%)' }}>
      <div className="relative h-48 flex-shrink-0">
        <img src={quest.image} alt={quest.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(222 28% 7%), hsl(222 28% 7% / 0.5), transparent)' }} />
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white">
          <X className="w-5 h-5" />
        </Button>
        <div className={`absolute top-3 left-3 px-3 py-1 rounded border ${tierBgColors[quest.tier]}`}>
          <span className={`font-[Orbitron,sans-serif] text-xs ${tierColors[quest.tier]}`}>{tierLabels[quest.tier]}</span>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{typeIcons[quest.type]}</span>
            <span className="font-[Orbitron,sans-serif] text-xs text-amber-400 uppercase tracking-wider">{quest.codename}</span>
          </div>
          <h2 className="font-[Cinzel,serif] text-2xl text-white leading-tight">{quest.name}</h2>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="flex items-center gap-2 text-stone-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{quest.state}</span>
          </div>
          <div>
            <h3 className="font-[Orbitron,sans-serif] text-xs text-amber-400 mb-2 tracking-wider">MISSION BRIEFING</h3>
            <p className="text-stone-200 leading-relaxed">{quest.briefing}</p>
          </div>
          <div>
            <h3 className="font-[Orbitron,sans-serif] text-xs text-amber-400 mb-3 tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" /> OBJECTIVES
            </h3>
            <ul className="space-y-2">
              {quest.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded border border-amber-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-amber-400">{i + 1}</span>
                  </div>
                  <span className="text-stone-200">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-[Orbitron,sans-serif] text-xs text-amber-400 mb-3 tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> INTEL
            </h3>
            <ul className="space-y-2">
              {quest.intel.map((info, i) => (
                <li key={i} className="text-sm text-stone-400 flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  {info}
                </li>
              ))}
            </ul>
          </div>
          <Button className="w-full font-[Orbitron,sans-serif] bg-amber-600 hover:bg-amber-700 text-black" size="lg">
            ACCEPT MISSION
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuestPanel;
