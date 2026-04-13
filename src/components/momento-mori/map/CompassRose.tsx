const CompassRose = () => (
  <g className="compass-rose" transform="translate(90, 10)">
    <circle cx="0" cy="0" r="4.5" fill="none" stroke="hsl(32 22% 48%)" strokeWidth="0.12" opacity="0.4"/>
    <circle cx="0" cy="0" r="4" fill="none" stroke="hsl(32 25% 42%)" strokeWidth="0.18" opacity="0.5"/>
    <circle cx="0" cy="0" r="3" fill="none" stroke="hsl(32 20% 52%)" strokeWidth="0.08" opacity="0.35"/>
    <g fill="hsl(32 22% 32%)" stroke="hsl(32 18% 45%)" strokeWidth="0.08">
      <polygon points="0,-3.6 0.45,-1.2 0,-1.6 -0.45,-1.2" fill="hsl(32 20% 28%)"/>
      <polygon points="0,3.6 0.4,1.2 0,1.6 -0.4,1.2" opacity="0.75"/>
      <polygon points="3.6,0 1.2,-0.4 1.6,0 1.2,0.4" opacity="0.75"/>
      <polygon points="-3.6,0 -1.2,-0.4 -1.6,0 -1.2,0.4" opacity="0.75"/>
    </g>
    <g fill="hsl(32 18% 42%)" opacity="0.5">
      <polygon points="2.4,-2.4 0.8,-0.65 0.65,-0.8"/>
      <polygon points="2.4,2.4 0.8,0.65 0.65,0.8"/>
      <polygon points="-2.4,-2.4 -0.8,-0.65 -0.65,-0.8"/>
      <polygon points="-2.4,2.4 -0.8,0.65 -0.65,0.8"/>
    </g>
    <circle cx="0" cy="0" r="0.8" fill="hsl(40 30% 78%)" stroke="hsl(32 22% 45%)" strokeWidth="0.15"/>
    <circle cx="0" cy="0" r="0.35" fill="hsl(32 22% 38%)"/>
    <g fontFamily="'Cinzel', serif" fontSize="0.9" fill="hsl(32 22% 30%)" textAnchor="middle">
      <text x="0" y="-4.4" fontSize="1" fontWeight="600">N</text>
      <text x="0" y="5.2">S</text>
      <text x="4.8" y="0.35">E</text>
      <text x="-4.8" y="0.35">W</text>
    </g>
  </g>
);
export default CompassRose;
