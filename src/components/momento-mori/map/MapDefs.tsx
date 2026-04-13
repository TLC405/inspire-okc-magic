const MapDefs = () => (
  <defs>
    <filter id="mm-parchmentNoise" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" seed="15"/>
      <feColorMatrix type="saturate" values="0" result="monoNoise"/>
      <feComponentTransfer result="adjustedNoise">
        <feFuncA type="linear" slope="0.08" intercept="0"/>
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="adjustedNoise" mode="multiply"/>
    </filter>
    <filter id="mm-handDrawn" x="-2%" y="-2%" width="104%" height="104%">
      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="turbulence"/>
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="0.4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="mm-inkBleed" x="-1%" y="-1%" width="102%" height="102%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="mm-textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0.05" dy="0.05" stdDeviation="0.08" floodColor="hsl(30 20% 75%)" floodOpacity="0.6"/>
    </filter>
    <radialGradient id="mm-vignette" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stopColor="transparent"/>
      <stop offset="70%" stopColor="transparent"/>
      <stop offset="100%" stopColor="hsl(30 25% 25%)" stopOpacity="0.25"/>
    </radialGradient>
    <linearGradient id="mm-parchmentBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(40 35% 84%)"/>
      <stop offset="25%" stopColor="hsl(38 33% 82%)"/>
      <stop offset="50%" stopColor="hsl(39 34% 80%)"/>
      <stop offset="75%" stopColor="hsl(37 32% 79%)"/>
      <stop offset="100%" stopColor="hsl(36 30% 77%)"/>
    </linearGradient>
    <linearGradient id="mm-riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="hsl(200 18% 42%)" stopOpacity="0.2"/>
      <stop offset="50%" stopColor="hsl(200 20% 40%)" stopOpacity="0.35"/>
      <stop offset="100%" stopColor="hsl(200 18% 42%)" stopOpacity="0.2"/>
    </linearGradient>
    <linearGradient id="mm-mountainShade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(32 18% 35%)"/>
      <stop offset="50%" stopColor="hsl(32 16% 42%)"/>
      <stop offset="100%" stopColor="hsl(32 14% 52%)" stopOpacity="0.3"/>
    </linearGradient>
    <pattern id="mm-ageSpots" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="12" r="1.2" fill="hsl(32 30% 60%)" opacity="0.04"/>
      <circle cx="20" cy="5" r="0.8" fill="hsl(30 28% 55%)" opacity="0.03"/>
    </pattern>
    <pattern id="mm-forestDots" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.2" fill="hsl(100 15% 45%)" opacity="0.15"/>
    </pattern>
  </defs>
);

export default MapDefs;
