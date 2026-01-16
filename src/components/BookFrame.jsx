const FONTS = {
  georgia: "'Georgia', serif",
  times: "'Times New Roman', serif",
  lora: "'Lora', serif",
  merriweather: "'Merriweather', serif",
  garamond: "'EB Garamond', 'Garamond', serif",
  playfair: "'Playfair Display', serif",
  crimson: "'Crimson Text', serif",
  libre: "'Libre Baskerville', serif",
};

export default function BookPage({ fontSize, selectedFont, selectedBorder = 'classic' }) {
  const fontFamily = FONTS[selectedFont] || FONTS.georgia;
  const borderClass = `border-${selectedBorder}`;

  return (
    <div 
      className={`book-page h-full ${borderClass}`} 
      style={{ 
        '--font-size-base': `${fontSize}px`,
        fontFamily: fontFamily,
      }}
    >
      <p className="book-chapter">Chapter 01</p>
      <h1 className="book-title">The Peace Pond</h1>
      
      <div className="book-content">
        <p>
          The lake was still, like a glass mirror laid upon the earth, reflecting the pale blush of
          dawn. Mist rose from the surface in soft ribbons, drifting lazily as if unsure whether
          to rise or rest. The silence was thick, the kind that makes you aware of your own
          breathing — deep, quiet, rhythmic. Then, from the far side of the lake, came a gentle
          rustle — the faintest ripple breaking the perfect stillness.
        </p>
        
        <p>
          A swan emerged from the morning fog. At first, it was only a shape — a blur of white
          moving slowly through the gray veil of mist. Then, as the sunlight broke through the
          clouds and spilled across the water, its feathers caught the light like silk brushed
          with gold. Every movement seemed deliberate, like time itself had slowed down to
          watch. Its long, arched neck curved gracefully, the head gliding forward with a
          subtle majesty that demanded quiet admiration.
        </p>
        
        <p>
          The air was cool, scented faintly with wet reeds and the metallic tang of early dew.
          Somewhere behind the trees, a woodpecker tapped softly — a dull, rhythmic tok-
          tok-tok echoing across the still morning. From the water's edge came the chirr of
          crickets waking to daylight, and a faint plop as a fish broke the surface for an
          instant. But the swan moved without sound, except for the delicate whisper of water
          parting around its body.
        </p>
        
        <p>
          It was strange how something so large could move with such perfect silence. The
          ripples spread outward from its chest in smooth, widening rings that shimmered
          briefly, then vanished. The sound — if it could even be called that — was the soft
          sigh of motion, a hush like the turning of a silk page in a silent room. Even the wind
          seemed to hold its breath when the swan passed. A pair of ducks fluttered nearby,
          their wings breaking the calm with a sudden flurry — a sharp flap-flap-flap, and then
          a splash as they landed again. The swan turned its head slightly, unbothered, its
          black eyes gleaming with calm intelligence. It had that look — the kind that knows
          peace is its birthright. A soft whoosh rose as it lifted its wings slightly, shaking
          droplets of dew that caught the morning light like scattered diamonds.
        </p>
      </div>
    </div>
  );
}
