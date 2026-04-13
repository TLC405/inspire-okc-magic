const MapBackground = () => (
  <g className="map-background">
    <defs>
      <linearGradient id="mm-bg-parchment" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e6d6b4" />
        <stop offset="55%" stopColor="#dccaa4" />
        <stop offset="100%" stopColor="#d2bf97" />
      </linearGradient>
      <radialGradient id="mm-spotA">
        <stop offset="0%" stopColor="#7b5a2b" stopOpacity="0.10" />
        <stop offset="100%" stopColor="#7b5a2b" stopOpacity="0" />
      </radialGradient>
      <pattern id="mm-bgAgeSpots" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="8" r="3.8" fill="url(#mm-spotA)" />
        <circle cx="16" cy="15" r="5.2" fill="url(#mm-spotA)" />
        <circle cx="18" cy="5" r="2.4" fill="url(#mm-spotA)" />
      </pattern>
      <pattern id="mm-paperNoise" width="3" height="3" patternUnits="userSpaceOnUse">
        <circle cx="0.8" cy="1.1" r="0.22" fill="#000" opacity="0.08" />
        <circle cx="2.2" cy="0.6" r="0.18" fill="#000" opacity="0.06" />
        <circle cx="1.7" cy="2.4" r="0.20" fill="#000" opacity="0.05" />
      </pattern>
      <radialGradient id="mm-bgVignette" cx="50%" cy="50%" r="65%">
        <stop offset="60%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="100" height="100" fill="url(#mm-bg-parchment)" />
    <rect x="0" y="0" width="100" height="100" fill="url(#mm-bgAgeSpots)" opacity="0.35" />
    <rect x="0" y="0" width="100" height="100" fill="url(#mm-paperNoise)" opacity="0.22" />
    <rect x="0" y="0" width="100" height="100" fill="url(#mm-bgVignette)" />
    <line x1="0" y1="50" x2="100" y2="50" stroke="#7a633e" strokeWidth="0.35" opacity="0.10" />
  </g>
);

export default MapBackground;
