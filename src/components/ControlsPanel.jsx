import { useState } from "react";
import { Moon, Sun, Palette as PaletteIcon, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import ColorSwatches from "./ColorSwatches";
import ColorPreviewGrid from "./ColorPreviewGrid";
import { MOOD_PRESETS } from "../utils/moodPresets";

const FONTS = [
  { id: "georgia", name: "Georgia", family: "'Georgia', serif" },
  { id: "times", name: "Times", family: "'Times New Roman', serif" },
  { id: "lora", name: "Lora", family: "'Lora', serif" },
  { id: "merriweather", name: "Merriweather", family: "'Merriweather', serif" },
  { id: "garamond", name: "Garamond", family: "'EB Garamond', serif" },
  { id: "playfair", name: "Playfair", family: "'Playfair Display', serif" },
  { id: "crimson", name: "Crimson", family: "'Crimson Text', serif" },
  { id: "libre", name: "Libre", family: "'Libre Baskerville', serif" },
  { id: "roboto", name: "Roboto", family: "'Roboto', sans-serif" },
  { id: "open-sans", name: "Open Sans", family: "'Open Sans', sans-serif" },
  { id: "lato", name: "Lato", family: "'Lato', sans-serif" },
  { id: "montserrat", name: "Montserrat", family: "'Montserrat', sans-serif" },
  {
    id: "source-sans",
    name: "Source Sans",
    family: "'Source Sans Pro', sans-serif",
  },
];

const BORDERS = [
  { id: "none", name: "None", icon: "○" },
  { id: "classic", name: "Classic", icon: "▣" },
  { id: "ornate", name: "Ornate", icon: "❧" },
  { id: "minimal", name: "Minimal", icon: "□" },
  { id: "rounded", name: "Rounded", icon: "◯" },
  { id: "ancient", name: "Ancient", icon: "⌘" },
  { id: "gradient", name: "Gradient", icon: "◈" },
  { id: "bevel", name: "Bevel", icon: "◆" },
  { id: "double", name: "Double", icon: "▤" },
];

// All moods for display
const MOODS = Object.values(MOOD_PRESETS);

export default function ControlsPanel({
  imageUrl,
  onImageSelect,
  isLoading,
  swatches,
  fontSize,
  onFontSizeChange,
  selectedFont,
  onFontChange,
  selectedMood,
  onMoodChange,
  selectedBorder,
  onBorderChange,
  isDarkMode,
  onDarkModeToggle,
}) {
  const [showColorPreview, setShowColorPreview] = useState(false);

  return (
    <div className="controls-panel h-full overflow-y-auto">
      {/* Dark Mode Toggle */}
      <div className="control-section flex items-center justify-between">
        <label className="control-label mb-0">Theme</label>
        <button
          onClick={onDarkModeToggle}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all"
          style={{
            backgroundColor: isDarkMode ? "var(--theme-bg-book)" : "white",
            borderColor: "var(--md-sys-color-outline-variant)",
            color: "var(--theme-content)",
          }}
        >
          {isDarkMode ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
          <span className="text-sm">{isDarkMode ? "Dark" : "Light"}</span>
        </button>
      </div>

      {/* Settings Link */}
      <div className="control-section">
        <Link
          to="/config"
          className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all w-full text-left"
          style={{
            backgroundColor: "white",
            borderColor: "var(--md-sys-color-outline-variant)",
            color: "var(--theme-content)",
          }}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Mood Configuration</span>
        </Link>
      </div>

      {/* Image Upload */}
      <div className="control-section">
        <label className="control-label">Cover Image</label>
        <ImageUpload
          imageUrl={imageUrl}
          onImageSelect={onImageSelect}
          isLoading={isLoading}
        />
      </div>

      {/* Extracted Colors */}
      {swatches && (
        <div className="control-section">
          <label className="control-label">Extracted Colors</label>
          <ColorSwatches swatches={swatches} />
        </div>
      )}

      {/* Mood/Genre Selection */}
      <div className="control-section">
        <div className="flex items-center justify-between mb-2">
          <label className="control-label mb-0">Story Mood</label>
          <button
            onClick={() => setShowColorPreview(!showColorPreview)}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all"
            style={{
              backgroundColor: showColorPreview
                ? "var(--theme-border)"
                : "transparent",
              color: showColorPreview
                ? "var(--md-sys-color-on-primary)"
                : "var(--theme-content)",
              border: "1px solid var(--md-sys-color-outline-variant)",
            }}
          >
            <PaletteIcon className="w-3 h-3" />
            {showColorPreview ? "Hide" : "Preview"}
          </button>
        </div>

        {showColorPreview ? (
          <ColorPreviewGrid
            onMoodSelect={(mood) => {
              onMoodChange(mood);
              setShowColorPreview(false);
            }}
            currentMood={selectedMood}
          />
        ) : (
          <div className="mood-presets">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                className={`mood-chip ${
                  selectedMood === mood.id ? "active" : ""
                }`}
                onClick={() => onMoodChange(mood.id)}
                title={mood.description}
              >
                {mood.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Border Style Selection */}
      <div className="control-section">
        <label className="control-label">Border Style</label>
        <div
          className="border-select"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {BORDERS.map((border) => (
            <button
              key={border.id}
              className={`font-option ${
                selectedBorder === border.id ? "active" : ""
              }`}
              onClick={() => onBorderChange(border.id)}
            >
              <span className="text-lg block mb-1">{border.icon}</span>
              <span className="text-xs">{border.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div className="control-section">
        <label className="control-label">Font Style</label>
        <div className="font-select">
          {FONTS.map((font) => (
            <button
              key={font.id}
              className={`font-option ${
                selectedFont === font.id ? "active" : ""
              }`}
              onClick={() => onFontChange(font.id)}
              style={{ fontFamily: font.family }}
            >
              <span>{font.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Slider */}
      <div className="control-section">
        <label className="control-label">Font Size</label>
        <div className="slider-container">
          <input
            type="range"
            className="slider"
            min="14"
            max="22"
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
          />
          <div className="slider-value">{fontSize}px</div>
        </div>
      </div>
    </div>
  );
}
