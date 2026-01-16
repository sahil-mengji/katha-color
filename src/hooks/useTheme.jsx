import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function ThemeProvider({ children }) {
  const [currentSwatches, setCurrentSwatches] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  const updateTheme = (swatches, imageUrl = null) => {
    setCurrentSwatches(swatches);
    setCurrentImageUrl(imageUrl);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentSwatches,
        currentImageUrl,
        updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
