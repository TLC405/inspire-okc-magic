/** SVG filters for tactile newspaper effects — stamp roughen, paper grain, paper press */
export const SvgFilters = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
    <defs>
      <filter id="stamp-roughen" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" seed="5" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend mode="overlay" in="SourceGraphic" />
      </filter>
      <filter id="paper-press">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="ink-bleed">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);
