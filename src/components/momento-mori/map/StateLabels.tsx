const StateLabels = () => (
  <g className="labels">
    <g className="state-names" fontFamily="'Cinzel', serif" fill="hsl(32 22% 38%)" letterSpacing="0.5">
      <text x="48" y="53" fontSize="2.4" textAnchor="middle" opacity="0.22" letterSpacing="0.6">OKLAHOMA</text>
      <text x="44" y="80" fontSize="2.8" textAnchor="middle" opacity="0.2" letterSpacing="0.7">TEXAS</text>
      <text x="20" y="28" fontSize="1.8" textAnchor="middle" opacity="0.2" letterSpacing="0.4">COLORADO</text>
      <text x="52" y="32" fontSize="1.6" textAnchor="middle" opacity="0.18" letterSpacing="0.35">KANSAS</text>
      <text x="76" y="56" fontSize="1.4" textAnchor="middle" opacity="0.18" letterSpacing="0.3">ARKANSAS</text>
      <text x="10" y="62" fontSize="1.2" textAnchor="middle" opacity="0.18" letterSpacing="0.25">
        <tspan x="10" dy="0">NEW</tspan>
        <tspan x="10" dy="1.5">MEXICO</tspan>
      </text>
      <text x="84" y="32" fontSize="1.2" textAnchor="middle" opacity="0.16" letterSpacing="0.2">MISSOURI</text>
    </g>
    <g className="region-names" fontFamily="'Roboto Condensed', sans-serif" fontStyle="italic" fill="hsl(32 18% 45%)" fontSize="0.85" opacity="0.28">
      <text x="18" y="34" textAnchor="middle">Rocky Mtns.</text>
      <text x="34" y="63" textAnchor="middle" fontSize="0.75">Wichita Mtns.</text>
      <text x="74" y="59" textAnchor="middle" fontSize="0.75">Ouachita Mtns.</text>
      <text x="78" y="44" textAnchor="middle" fontSize="0.75">Ozark Plateau</text>
      <text x="56" y="36" textAnchor="middle" fontSize="0.7" opacity="0.24">Flint Hills</text>
      <text x="40" y="78" textAnchor="middle" fontSize="0.7" opacity="0.24">Hill Country</text>
      <text x="26" y="60" textAnchor="middle" fontSize="0.65" opacity="0.2">Llano Estacado</text>
      <text x="68" y="84" textAnchor="middle" fontSize="0.65" opacity="0.2">Piney Woods</text>
    </g>
    <g className="river-names" fontFamily="'Roboto Condensed', sans-serif" fontStyle="italic" fill="hsl(205 18% 42%)" fontSize="0.6" opacity="0.3">
      <text x="64" y="47.5" textAnchor="middle" transform="rotate(-1 64 47.5)">Arkansas R.</text>
      <text x="58" y="66.5" textAnchor="middle" transform="rotate(0.5 58 66.5)">Red River</text>
      <text x="52" y="55" textAnchor="middle" transform="rotate(-1.5 52 55)">Canadian R.</text>
      <text x="4.5" y="60" textAnchor="start" transform="rotate(-85 4.5 60)" fontSize="0.55">Rio Grande</text>
    </g>
  </g>
);
export default StateLabels;
