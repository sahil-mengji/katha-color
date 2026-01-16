import { useState, useCallback, useEffect } from "react";
import ControlsPanel from "../components/ControlsPanel";
import BookPage from "../components/BookFrame";
import { useMaterialTheme } from "../hooks/useMaterialTheme";
import { useTheme } from "../hooks/useTheme";
import { applyMoodToDocument } from "../utils/moodPresets";

export default function HomePage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [selectedFont, setSelectedFont] = useState("georgia");
  const [selectedMood, setSelectedMood] = useState("default");
  const [selectedBorder, setSelectedBorder] = useState("classic");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { extractThemeFromImage, isLoading, getSwatches } = useMaterialTheme();
  const { updateTheme } = useTheme();

  // Apply mood filter when mood changes
  useEffect(() => {
    applyMoodToDocument(selectedMood);
  }, [selectedMood]);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleImageSelect = useCallback(
    async (file) => {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // Create image element and extract theme
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = async () => {
        await extractThemeFromImage(img);
        // Update theme context with new swatches
        const swatches = getSwatches();
        updateTheme(swatches, url);
      };
    },
    [extractThemeFromImage, getSwatches, updateTheme]
  );

  const swatches = getSwatches();

  return (
    <div className="page-bg min-h-screen h-screen overflow-hidden">
      {/* Full width layout - 1/4 panel, 3/4 book */}
      <div className="flex h-screen w-full">
        {/* Controls Panel - Left 1/4 with padding */}
        <div className="w-1/4 min-w-[280px] max-w-[340px] h-screen py-6 pl-6 pr-4 overflow-hidden flex flex-col">
          <ControlsPanel
            imageUrl={imageUrl}
            onImageSelect={handleImageSelect}
            isLoading={isLoading}
            swatches={swatches}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            selectedFont={selectedFont}
            onFontChange={setSelectedFont}
            selectedMood={selectedMood}
            onMoodChange={setSelectedMood}
            selectedBorder={selectedBorder}
            onBorderChange={setSelectedBorder}
            isDarkMode={isDarkMode}
            onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
          />
        </div>

        {/* Book Page - Right 3/4 with gaps */}
        <div className="flex-1 h-screen flex items-center justify-center py-8 px-12 overflow-hidden">
          <BookPage
            fontSize={fontSize}
            selectedFont={selectedFont}
            selectedBorder={selectedBorder}
            swatches={swatches}
          />
        </div>
      </div>
    </div>
  );
}
