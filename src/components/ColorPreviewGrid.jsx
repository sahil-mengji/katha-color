import { MOOD_PRESETS } from "../utils/moodPresets";

// Simulated color palettes for each mood
const getMoodColors = (moodId) => {
  const baseColors = {
    default: {
      bg: "#f0f6fa",
      title: "#5b8fb9",
      primary: "#5b8fb9",
      secondary: "#7aa3c4",
      accent: "#a8c8e0",
    },
    calm: {
      bg: "#f5f8fa",
      title: "#6a9ab8",
      primary: "#6a9ab8",
      secondary: "#8ab8d4",
      accent: "#b8d4e8",
    },
    warm: {
      bg: "#faf6f0",
      title: "#b89a6a",
      primary: "#c8a878",
      secondary: "#d4b88a",
      accent: "#e8d4b8",
    },
    mysterious: {
      bg: "#e8e4f0",
      title: "#6a5a8a",
      primary: "#7a6a9a",
      secondary: "#8a7aaa",
      accent: "#a898c8",
    },
    joyful: {
      bg: "#fff8f0",
      title: "#e89a5a",
      primary: "#f0a868",
      secondary: "#f8b878",
      accent: "#ffd4a8",
    },
    melancholic: {
      bg: "#e8eef4",
      title: "#5a7a9a",
      primary: "#6a8aaa",
      secondary: "#7a9aba",
      accent: "#a8c8e0",
    },
    haunted: {
      bg: "#2a2a2e",
      title: "#8a7a6a",
      primary: "#5a5a5e",
      secondary: "#4a4a4e",
      accent: "#3a3a3e",
    },
    romance: {
      bg: "#faf0f4",
      title: "#c87a9a",
      primary: "#d88aaa",
      secondary: "#e8a8c8",
      accent: "#f8c8d8",
    },
    adventure: {
      bg: "#f0f4e8",
      title: "#7a9a5a",
      primary: "#8aaa6a",
      secondary: "#a8c888",
      accent: "#c8e8a8",
    },
    fantasy: {
      bg: "#f0e8f8",
      title: "#9a6ab8",
      primary: "#aa7ac8",
      secondary: "#ba98d8",
      accent: "#d8b8e8",
    },
    noir: {
      bg: "#1a1a1e",
      title: "#8a8a8e",
      primary: "#4a4a4e",
      secondary: "#3a3a3e",
      accent: "#2a2a2e",
    },
  };
  return baseColors[moodId] || baseColors.default;
};

export default function ColorPreviewGrid({ onMoodSelect, currentMood }) {
  const moods = Object.values(MOOD_PRESETS);

  return (
    <div className="color-preview-grid">
      {moods.map((mood) => {
        const colors = getMoodColors(mood.id);
        const isActive = currentMood === mood.id;

        return (
          <div
            key={mood.id}
            className={`color-preview-card ${
              isActive ? "ring-2 ring-offset-2" : ""
            }`}
            style={{
              backgroundColor: colors.bg,
              ringColor: colors.primary,
            }}
            onClick={() => onMoodSelect(mood.id)}
          >
            {/* Mini book preview */}
            <div
              className="color-preview-header"
              style={{ color: colors.title }}
            >
              Chapter 01
            </div>
            <div
              style={{
                padding: "0 12px 8px",
                color: colors.primary,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Title
            </div>
            <div
              style={{
                padding: "0 12px 12px",
                color: colors.secondary,
                fontSize: "10px",
                lineHeight: 1.4,
              }}
            >
              lorem ipsum dolor sit amet...
            </div>
            {/* Color swatches */}
            <div className="color-preview-swatches">
              <div style={{ backgroundColor: colors.bg }} />
              <div style={{ backgroundColor: colors.primary }} />
              <div style={{ backgroundColor: colors.secondary }} />
              <div style={{ backgroundColor: colors.accent }} />
            </div>
            {/* Mood label */}
            <div
              className="color-preview-text"
              style={{
                backgroundColor: colors.primary,
                color: colors.bg,
              }}
            >
              {mood.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
