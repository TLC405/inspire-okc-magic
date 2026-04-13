const MapFrame = () => (
  <g className="map-frame">
    <rect x="1.5" y="1.5" width="97" height="97" fill="none" stroke="hsl(32 22% 42%)" strokeWidth="0.4" rx="0.3" opacity="0.45"/>
    <rect x="2.5" y="2.5" width="95" height="95" fill="none" stroke="hsl(32 20% 48%)" strokeWidth="0.15" rx="0.2" opacity="0.3"/>
    <g stroke="hsl(32 22% 45%)" strokeWidth="0.12" fill="none" opacity="0.4">
      <path d="M 4 5.5 Q 4 4 5.5 4"/><circle cx="4.2" cy="4.2" r="0.2" fill="hsl(32 22% 45%)"/>
      <path d="M 96 5.5 Q 96 4 94.5 4"/><circle cx="95.8" cy="4.2" r="0.2" fill="hsl(32 22% 45%)"/>
      <path d="M 4 94.5 Q 4 96 5.5 96"/><circle cx="4.2" cy="95.8" r="0.2" fill="hsl(32 22% 45%)"/>
      <path d="M 96 94.5 Q 96 96 94.5 96"/><circle cx="95.8" cy="95.8" r="0.2" fill="hsl(32 22% 45%)"/>
    </g>
  </g>
);
export default MapFrame;
