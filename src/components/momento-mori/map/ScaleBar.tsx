const ScaleBar = () => (
  <g className="scale-bar" transform="translate(10, 93)">
    <rect x="-0.5" y="-0.5" width="15" height="4" fill="hsl(40 30% 82%)" opacity="0.85" rx="0.2"/>
    <rect x="0" y="0.4" width="3.5" height="0.8" fill="hsl(32 22% 35%)"/>
    <rect x="3.5" y="0.4" width="3.5" height="0.8" fill="hsl(40 28% 78%)"/>
    <rect x="7" y="0.4" width="3.5" height="0.8" fill="hsl(32 22% 35%)"/>
    <rect x="10.5" y="0.4" width="3.5" height="0.8" fill="hsl(40 28% 78%)"/>
    <rect x="0" y="0.4" width="14" height="0.8" fill="none" stroke="hsl(32 18% 45%)" strokeWidth="0.08"/>
    <g fontFamily="'Roboto Condensed', sans-serif" fontSize="0.55" fill="hsl(32 22% 35%)" textAnchor="middle">
      <text x="0" y="2.4">0</text>
      <text x="7" y="2.4">100</text>
      <text x="14" y="2.4">200 mi</text>
    </g>
    <g stroke="hsl(32 18% 45%)" strokeWidth="0.06">
      <line x1="0" y1="0.4" x2="0" y2="1.6"/><line x1="3.5" y1="0.4" x2="3.5" y2="1.4"/><line x1="7" y1="0.4" x2="7" y2="1.6"/><line x1="10.5" y1="0.4" x2="10.5" y2="1.4"/><line x1="14" y1="0.4" x2="14" y2="1.6"/>
    </g>
  </g>
);
export default ScaleBar;
