import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Skull, Map, List, Menu, Github } from 'lucide-react';
import { City } from '@/data/momento-mori/cities';
import { Quest, quests, tierLabels, typeIcons } from '@/data/momento-mori/quests';
import RegionalMap from '@/components/momento-mori/RegionalMap';
import QuestPanel from '@/components/momento-mori/QuestPanel';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

const tierColors: Record<number, string> = {
  5: 'text-amber-400',
  4: 'text-purple-400',
  3: 'text-orange-400',
  2: 'text-blue-400',
  1: 'text-stone-400',
};

const GITHUB_URL = "https://github.com/TLC405/momentomori/";

export default function MomentoMori() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [showQuestList, setShowQuestList] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sortedQuests = [...quests].sort((a, b) => b.tier - a.tier);

  return (
    <div className="h-screen flex flex-col" style={{ background: 'hsl(222 28% 7%)', color: 'hsl(210 25% 96%)' }}>
      {/* Header */}
      <header className="flex-shrink-0 border-b" style={{ background: 'hsl(222 28% 7% / 0.95)', backdropFilter: 'blur(8px)', borderColor: 'hsl(222 18% 26%)' }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <ArrowLeft size={12} />
                <span className="hidden sm:inline">Inspire OKC</span>
              </Link>
              <div className="w-px h-6 opacity-20" style={{ background: 'hsl(222 18% 26%)' }} />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'hsl(26 82% 58% / 0.1)', border: '1px solid hsl(26 82% 58% / 0.3)' }}>
                  <Skull className="w-5 h-5" style={{ color: 'hsl(26 82% 58%)' }} />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>MEMENTO MORI</h1>
                  <p className="text-[9px] tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif', color: 'hsl(26 82% 58%)' }}>THE LEGENDARY JOURNEY</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1 text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <Github size={12} />
                Source
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuestList(!showQuestList)}
                className="hidden md:flex border-amber-600/30 text-stone-200 hover:bg-amber-600/10"
              >
                {showQuestList ? <Map className="w-4 h-4 mr-2" /> : <List className="w-4 h-4 mr-2" />}
                {showQuestList ? 'Map' : 'Quests'}
              </Button>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden border-amber-600/30">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0" style={{ background: 'hsl(222 24% 11%)', borderColor: 'hsl(222 18% 26%)' }}>
                  <div className="p-4 border-b" style={{ borderColor: 'hsl(222 18% 26%)' }}>
                    <h2 className="text-sm tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', color: 'hsl(26 82% 58%)' }}>LEGENDARY QUESTS</h2>
                  </div>
                  <ScrollArea className="h-[calc(100vh-60px)]">
                    <div className="p-2 space-y-1">
                      {sortedQuests.map((quest) => (
                        <button
                          key={quest.id}
                          onClick={() => { setSelectedQuest(quest); setMobileMenuOpen(false); }}
                          className="w-full p-3 rounded text-left transition-colors hover:bg-white/5"
                          style={{ background: 'hsl(222 18% 20% / 0.5)' }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] ${tierColors[quest.tier]}`} style={{ fontFamily: 'Orbitron, sans-serif' }}>{tierLabels[quest.tier]}</span>
                            <span>{typeIcons[quest.type]}</span>
                          </div>
                          <div className="text-sm text-stone-200" style={{ fontFamily: 'Cinzel, serif' }}>{quest.name}</div>
                          <div className="text-xs text-stone-500">{quest.state}</div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Desktop Quest List */}
        {showQuestList && (
          <aside className="hidden md:block w-80 flex-shrink-0 border-r" style={{ background: 'hsl(222 24% 11%)', borderColor: 'hsl(222 18% 26%)' }}>
            <div className="p-4 border-b" style={{ borderColor: 'hsl(222 18% 26%)' }}>
              <h2 className="text-sm tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', color: 'hsl(26 82% 58%)' }}>LEGENDARY QUESTS</h2>
              <p className="text-xs text-stone-500 mt-1">{quests.length} missions available</p>
            </div>
            <ScrollArea className="h-[calc(100%-80px)]">
              <div className="p-2 space-y-1">
                {sortedQuests.map((quest) => (
                  <button
                    key={quest.id}
                    onClick={() => setSelectedQuest(quest)}
                    className={`w-full p-3 rounded text-left transition-colors ${selectedQuest?.id === quest.id ? 'ring-1 ring-amber-500/50' : 'hover:bg-white/5'}`}
                    style={{ background: selectedQuest?.id === quest.id ? 'hsl(26 82% 58% / 0.15)' : 'hsl(222 18% 20% / 0.3)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] ${tierColors[quest.tier]}`} style={{ fontFamily: 'Orbitron, sans-serif' }}>{tierLabels[quest.tier]}</span>
                      <span>{typeIcons[quest.type]}</span>
                    </div>
                    <div className="text-sm text-stone-200" style={{ fontFamily: 'Cinzel, serif' }}>{quest.name}</div>
                    <div className="text-xs text-stone-500">{quest.state}</div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </aside>
        )}

        {/* Map Area */}
        <div className={`flex-1 relative ${selectedQuest ? 'hidden lg:block' : ''}`}>
          <RegionalMap onSelectCity={setSelectedCity} onSelectQuest={setSelectedQuest} selectedCity={selectedCity} />
        </div>

        {/* Quest Panel */}
        {selectedQuest && (
          <aside className="w-full lg:w-[450px] flex-shrink-0">
            <QuestPanel quest={selectedQuest} onClose={() => setSelectedQuest(null)} />
          </aside>
        )}
      </main>

      {/* Footer Motto */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="px-4 py-2 rounded" style={{ background: 'hsl(222 24% 11% / 0.9)', backdropFilter: 'blur(8px)', border: '1px solid hsl(222 18% 26%)' }}>
          <p className="text-[10px] text-center tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', color: 'hsl(214 18% 65%)' }}>
            💀 <span style={{ color: 'hsl(26 82% 58%)' }}>MEMENTO MORI</span> • REMEMBER YOU MUST DIE • LIVE LEGENDARY
          </p>
        </div>
      </div>
    </div>
  );
}
