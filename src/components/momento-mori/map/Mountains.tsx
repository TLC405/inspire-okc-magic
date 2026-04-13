const Mountains = () => (
  <g className="mountains">
    <g className="rockies" opacity="0.45">
      <path d="M 6 30 L 9 22 L 12 27 L 15 19 L 18 25 L 21 17 L 24 24 L 27 21 L 29 28" fill="none" stroke="hsl(32 16% 52%)" strokeWidth="0.25" opacity="0.5"/>
      <path d="M 7 31 L 10 22 L 13 28 L 16 18 L 19 26 L 22 18 L 25 25 L 27 22 L 28 30 L 28 31 L 7 31 Z" fill="hsl(32 15% 48%)" opacity="0.4"/>
      <g stroke="hsl(32 18% 40%)" strokeWidth="0.1" opacity="0.5">
        <line x1="10" y1="23" x2="10.5" y2="28"/><line x1="13" y1="25" x2="13.3" y2="29"/><line x1="16" y1="19" x2="16.8" y2="27"/><line x1="19" y1="22" x2="19.4" y2="28"/><line x1="22" y1="20" x2="22.6" y2="27"/><line x1="25" y1="23" x2="25.3" y2="28"/>
      </g>
      <path d="M 16 18 L 17.2 21 L 14.8 21 Z" fill="hsl(0 0% 95%)" opacity="0.6"/>
      <path d="M 21 17 L 22 20 L 20 20 Z" fill="hsl(0 0% 95%)" opacity="0.55"/>
    </g>
    <g className="sangre-de-cristo" opacity="0.35">
      <path d="M 8 52 L 11 45 L 14 50 L 16 44 L 18 49 L 18 52 L 8 52 Z" fill="hsl(32 14% 50%)" opacity="0.45"/>
      <g stroke="hsl(32 16% 42%)" strokeWidth="0.08" opacity="0.4">
        <line x1="11" y1="46" x2="11.3" y2="50"/><line x1="14" y1="48" x2="14.2" y2="51"/><line x1="16" y1="45" x2="16.4" y2="50"/>
      </g>
    </g>
    <g className="wichita-mountains" opacity="0.35">
      <path d="M 31 64 Q 34 59 37 64" fill="none" stroke="hsl(32 18% 45%)" strokeWidth="0.3" opacity="0.5"/>
      <path d="M 32 64 Q 34 60 36 64 L 36 64 L 32 64 Z" fill="hsl(32 16% 52%)" opacity="0.35"/>
      <path d="M 33.5 62 L 34.5 60 L 35.5 62" fill="none" stroke="hsl(32 20% 42%)" strokeWidth="0.2" opacity="0.4"/>
    </g>
    <g className="ouachita-mountains" opacity="0.35">
      <path d="M 69 58 Q 72 54 75 57 Q 78 53 81 56" fill="none" stroke="hsl(32 15% 48%)" strokeWidth="0.25" opacity="0.5"/>
      <path d="M 70 59 L 72 55 L 74 58 L 76 54 L 78 57 L 80 55 L 80 59 L 70 59 Z" fill="hsl(32 14% 52%)" opacity="0.3"/>
    </g>
    <g className="ozark-plateau" opacity="0.28">
      <path d="M 72 45 Q 75 41 78 44 Q 81 40 84 43 Q 86 41 88 44" fill="none" stroke="hsl(32 12% 52%)" strokeWidth="0.2" opacity="0.45"/>
    </g>
    <g className="davis-mountains" opacity="0.3">
      <path d="M 19 80 L 22 74 L 25 78 L 27 73 L 29 77 L 29 80 L 19 80 Z" fill="hsl(32 14% 52%)" opacity="0.35"/>
      <g stroke="hsl(32 16% 44%)" strokeWidth="0.08" opacity="0.4">
        <line x1="22" y1="75" x2="22.3" y2="78"/><line x1="25" y1="76" x2="25.2" y2="79"/><line x1="27" y1="74" x2="27.3" y2="78"/>
      </g>
    </g>
    <g className="guadalupe-mountains" opacity="0.28">
      <path d="M 13 74 L 15 69 L 17 73 L 19 68 L 21 72 L 21 74 L 13 74 Z" fill="hsl(32 13% 54%)" opacity="0.35"/>
    </g>
    <g className="edwards-plateau" opacity="0.2">
      <path d="M 36 84 Q 42 82 48 85 Q 54 83 58 86" fill="none" stroke="hsl(32 12% 55%)" strokeWidth="0.15" opacity="0.4"/>
    </g>
  </g>
);
export default Mountains;
