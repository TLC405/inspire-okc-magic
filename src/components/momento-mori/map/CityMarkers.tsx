import { City } from '@/data/momento-mori/cities';

interface CityMarkersProps {
  cities: City[];
  selectedCity: City | null;
  hoveredCity: string | null;
  onSelectCity: (city: City) => void;
  onHoverCity: (cityId: string | null) => void;
}

const CityMarkers = ({ cities, selectedCity, hoveredCity, onSelectCity, onHoverCity }: CityMarkersProps) => {
  const getMarkerStyles = (size: City['size']) => {
    switch (size) {
      case 'major': return { outer: 'w-4 h-4', inner: 'w-1.5 h-1.5', label: 'text-[10px] font-semibold tracking-wide', ring: 'ring-1' };
      case 'city': return { outer: 'w-3 h-3', inner: 'w-1 h-1', label: 'text-[8px] font-medium', ring: 'ring-1' };
      case 'town': return { outer: 'w-2 h-2', inner: 'w-0.5 h-0.5', label: 'text-[7px] font-normal italic', ring: '' };
    }
  };

  return (
    <>
      {cities.map((city) => {
        const styles = getMarkerStyles(city.size);
        const isSelected = selectedCity?.id === city.id;
        const isHovered = hoveredCity === city.id;
        return (
          <button
            key={city.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            style={{ left: `${city.mapPosition.x}%`, top: `${city.mapPosition.y}%` }}
            onClick={() => onSelectCity(city)}
            onMouseEnter={() => onHoverCity(city.id)}
            onMouseLeave={() => onHoverCity(null)}
          >
            <div className={`relative flex items-center justify-center ${styles.outer} transition-transform duration-150 ${isSelected ? 'scale-110' : ''}`}>
              <div className={`absolute inset-0 rounded-full bg-[hsl(30_25%_22%)]/90 transition-all duration-150 ${isHovered || isSelected ? `${styles.ring} ring-[hsl(26_70%_50%)]/40 shadow-sm` : ''}`}/>
              <div className={`absolute ${styles.inner} rounded-full bg-[hsl(38_32%_78%)]`} />
            </div>
            <div className={`absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap font-[Cinzel,serif] text-[hsl(30_25%_22%)]/85 px-0.5 transition-opacity duration-150 ${styles.label} ${isHovered || isSelected ? 'opacity-100' : 'opacity-65'}`}>
              {city.name}
            </div>
          </button>
        );
      })}
    </>
  );
};

export default CityMarkers;
