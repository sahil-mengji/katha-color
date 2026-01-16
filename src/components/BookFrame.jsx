const FONTS = {
  georgia: "'Georgia', serif",
  times: "'Times New Roman', serif",
  lora: "'Lora', serif",
  merriweather: "'Merriweather', serif",
  garamond: "'EB Garamond', 'Garamond', serif",
  playfair: "'Playfair Display', serif",
  crimson: "'Crimson Text', serif",
  libre: "'Libre Baskerville', serif",
  roboto: "'Roboto', sans-serif",
  "open-sans": "'Open Sans', sans-serif",
  lato: "'Lato', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  "source-sans": "'Source Sans Pro', sans-serif",
};

export default function BookPage({
  fontSize,
  selectedFont,
  selectedBorder = "classic",
  swatches,
}) {
  const fontFamily = FONTS[selectedFont] || FONTS.georgia;
  const borderClass = `border-${selectedBorder}`;

  return (
    <div
      className={`book-page h-full ${borderClass}`}
      style={{
        "--font-size-base": `${fontSize}px`,
        fontFamily: fontFamily,
        backgroundColor: swatches?.surface || "var(--theme-bg-book)",
        borderColor: swatches?.outline || "var(--theme-border)",
        color: swatches?.onSurface || "var(--theme-content)",
      }}
    >
      {/* Header with theme colors */}
      <div
        className="px-6 py-4 border-b mb-6"
        style={{
          backgroundColor: swatches?.primaryContainer || "var(--theme-bg-main)",
          borderColor: swatches?.outlineVariant || "var(--theme-border-light)",
          color: swatches?.onPrimaryContainer || "var(--theme-content)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold opacity-75">Story Editor</h2>
            <p className="text-xs opacity-60">Theme Preview</p>
          </div>
          <div className="flex gap-2">
            <div
              className="w-4 h-4 rounded-full border"
              style={{
                backgroundColor: swatches?.secondary || "var(--theme-border)",
              }}
            ></div>
            <div
              className="w-4 h-4 rounded-full border"
              style={{
                backgroundColor:
                  swatches?.tertiary || "var(--theme-border-light)",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Book Content */}
      <div className="px-8 pb-8">
        <p
          className="book-chapter"
          style={{ color: swatches?.primary || "var(--theme-chapter)" }}
        >
          Chapter 01
        </p>
        <h1
          className="book-title"
          style={{ color: swatches?.onSurface || "var(--theme-title)" }}
        >
          The Peace Pond
        </h1>

        <div className="book-content">
          <p>
            The lake was still, like a glass mirror laid upon the earth,
            reflecting the pale blush of dawn. Mist rose from the surface in
            soft ribbons, drifting lazily as if unsure whether to rise or rest.
            The silence was thick, the kind that makes you aware of your own
            breathing — deep, quiet, rhythmic. Then, from the far side of the
            lake, came a gentle rustle — the faintest ripple breaking the
            perfect stillness.
          </p>

          <p>
            A swan emerged from the morning fog. At first, it was only a shape —
            a blur of white moving slowly through the gray veil of mist. Then,
            as the sunlight broke through the clouds and spilled across the
            water, its feathers caught the light like silk brushed with gold.
            Every movement seemed deliberate, like time itself had slowed down
            to watch. Its long, arched neck curved gracefully, the head gliding
            forward with a subtle majesty that demanded quiet admiration.
          </p>

          {/* Interactive Elements Preview */}
          <div
            className="my-6 p-4 rounded-lg border"
            style={{
              backgroundColor:
                swatches?.surfaceVariant || "var(--theme-bg-book)",
              borderColor:
                swatches?.outlineVariant || "var(--theme-border-light)",
            }}
          >
            <h3
              className="text-sm font-semibold mb-2"
              style={{
                color: swatches?.onSurfaceVariant || "var(--theme-content)",
              }}
            >
              Reading Progress
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: "65%",
                  backgroundColor: swatches?.secondary || "var(--theme-border)",
                }}
              ></div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded text-xs font-medium transition-colors"
                style={{
                  backgroundColor: swatches?.primary || "var(--theme-border)",
                  color: swatches?.onPrimary || "white",
                }}
              >
                Continue Reading
              </button>
              <button
                className="px-3 py-1 rounded text-xs font-medium border transition-colors"
                style={{
                  backgroundColor: swatches?.surface || "transparent",
                  borderColor: swatches?.outline || "var(--theme-border)",
                  color: swatches?.primary || "var(--theme-border)",
                }}
              >
                Add Bookmark
              </button>
            </div>
          </div>

          <p>
            The air was cool, scented faintly with wet reeds and the metallic
            tang of early dew. Somewhere behind the trees, a woodpecker tapped
            softly — a dull, rhythmic tok- tok-tok echoing across the still
            morning. From the water's edge came the chirr of crickets waking to
            daylight, and a faint plop as a fish broke the surface for an
            instant. But the swan moved without sound, except for the delicate
            whisper of water parting around its body.
          </p>

          {/* Theme Color Showcase */}
          {swatches && (
            <div
              className="my-6 p-4 rounded-lg"
              style={{
                backgroundColor:
                  swatches.tertiaryContainer || "var(--theme-bg-main)",
                border: `1px solid ${
                  swatches.outlineVariant || "var(--theme-border-light)"
                }`,
              }}
            >
              <h3
                className="text-sm font-semibold mb-3"
                style={{
                  color: swatches.onTertiaryContainer || "var(--theme-content)",
                }}
              >
                Theme Colors in Use
              </h3>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="text-center">
                  <div
                    className="w-6 h-6 rounded mx-auto mb-1 border"
                    style={{ backgroundColor: swatches.primary }}
                  ></div>
                  Primary
                </div>
                <div className="text-center">
                  <div
                    className="w-6 h-6 rounded mx-auto mb-1 border"
                    style={{ backgroundColor: swatches.secondary }}
                  ></div>
                  Secondary
                </div>
                <div className="text-center">
                  <div
                    className="w-6 h-6 rounded mx-auto mb-1 border"
                    style={{ backgroundColor: swatches.surface }}
                  ></div>
                  Surface
                </div>
                <div className="text-center">
                  <div
                    className="w-6 h-6 rounded mx-auto mb-1 border"
                    style={{ backgroundColor: swatches.onSurface }}
                  ></div>
                  On Surface
                </div>
              </div>
            </div>
          )}

          <p>
            It was strange how something so large could move with such perfect
            silence. The ripples spread outward from its chest in smooth,
            widening rings that shimmered briefly, then vanished. The sound — if
            it could even be called that — was the soft sigh of motion, a hush
            like the turning of a silk page in a silent room. Even the wind
            seemed to hold its breath when the swan passed. A pair of ducks
            fluttered nearby, their wings breaking the calm with a sudden flurry
            — a sharp flap-flap-flap, and then a splash as they landed again.
            The swan turned its head slightly, unbothered, its black eyes
            gleaming with calm intelligence. It had that look — the kind that
            knows peace is its birthright. A soft whoosh rose as it lifted its
            wings slightly, shaking droplets of dew that caught the morning
            light like scattered diamonds.
          </p>
        </div>
      </div>
    </div>
  );
}
