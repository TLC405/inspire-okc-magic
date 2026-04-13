import { useState } from 'react';
import { cities, City } from '@/data/momento-mori/cities';
import { quests, Quest } from '@/data/momento-mori/quests';
import MapDefs from './map/MapDefs';
import MapBackground from './map/MapBackground';
import Mountains from './map/Mountains';
import Rivers from './map/Rivers';
import StateBorders from './map/StateBorders';
import Roads from './map/Roads';
import Forests from './map/Forests';
import StateLabels from './map/StateLabels';
import CompassRose from './map/CompassRose';
import TitleCartouche from './map/TitleCartouche';
import ScaleBar from './map/ScaleBar';
import MapFrame from './map/MapFrame';
import CityMarkers from './map/CityMarkers';
import QuestMarkers from './map/QuestMarkers';
import MapLegend from './map/MapLegend';

interface RegionalMapProps {
  onSelectCity: (city: City) => void;
  onSelectQuest: (quest: Quest) => void;
  selectedCity: City | null;
}

const RegionalMap = ({ onSelectCity, onSelectQuest, selectedCity }: RegionalMapProps) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [hoveredQuest, setHoveredQuest] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: 'hsl(34 28% 72%)' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <MapDefs />
        <MapBackground />
        <StateBorders />
        <Rivers />
        <Mountains />
        <Forests />
        <Roads />
        <StateLabels />
        <CompassRose />
        <TitleCartouche />
        <ScaleBar />
        <MapFrame />
      </svg>
      <CityMarkers cities={cities} selectedCity={selectedCity} hoveredCity={hoveredCity} onSelectCity={onSelectCity} onHoverCity={setHoveredCity} />
      <QuestMarkers quests={quests} cities={cities} hoveredQuest={hoveredQuest} onSelectQuest={onSelectQuest} onHoverQuest={setHoveredQuest} />
      <MapLegend />
    </div>
  );
};

export default RegionalMap;
