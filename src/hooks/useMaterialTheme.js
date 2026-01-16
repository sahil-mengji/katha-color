import { useState, useCallback } from 'react';
import { 
  sourceColorFromImage, 
  themeFromSourceColor, 
  hexFromArgb 
} from "@material/material-color-utilities";

export function useMaterialTheme() {
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const extractThemeFromImage = useCallback(async (imageElement) => {
    setIsLoading(true);
    try {
     
      const seedColor = await sourceColorFromImage(imageElement);
      
    
      const m3Theme = themeFromSourceColor(seedColor);
      
      setTheme(m3Theme);
      applyThemeToCSS(m3Theme);
      
      return m3Theme;
    } catch (error) {
      console.error('Error extracting theme:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyThemeToCSS = (theme) => {
    const light = theme.schemes.light;
    const palettes = theme.palettes;
 
    const colorMap = {
      'primary': light.primary,
      'on-primary': light.onPrimary,
      'primary-container': light.primaryContainer,
      'on-primary-container': light.onPrimaryContainer,
      'secondary': light.secondary,
      'on-secondary': light.onSecondary,
      'secondary-container': light.secondaryContainer,
      'on-secondary-container': light.onSecondaryContainer,
      'tertiary': light.tertiary,
      'on-tertiary': light.onTertiary,
      'tertiary-container': light.tertiaryContainer,
      'on-tertiary-container': light.onTertiaryContainer,
      'surface': light.surface,
      'on-surface': light.onSurface,
      'surface-variant': light.surfaceVariant,
      'on-surface-variant': light.onSurfaceVariant,
      'outline': light.outline,
      'outline-variant': light.outlineVariant,
      'background': light.background,
      'on-background': light.onBackground,
    };


    for (const [key, value] of Object.entries(colorMap)) {
      document.documentElement.style.setProperty(
        `--md-sys-color-${key}`, 
        hexFromArgb(value)
      );
    }
    
    // Apply mapped theme colors for extensive theming
    // Main BG: Lightest - use tertiary container (very light tint)
    document.documentElement.style.setProperty(
      '--theme-bg-main',
      hexFromArgb(palettes.primary.tone(95)) // Very light primary tint
    );
    
    // Book BG: Slightly darker than main - use surface
    document.documentElement.style.setProperty(
      '--theme-bg-book',
      hexFromArgb(palettes.primary.tone(98)) // Very light, almost white
    );
    
    // Border: Primary color
    document.documentElement.style.setProperty(
      '--theme-border',
      hexFromArgb(light.primary)
    );
    
    // Border light: Primary container
    document.documentElement.style.setProperty(
      '--theme-border-light',
      hexFromArgb(light.primaryContainer)
    );
    
    // Title: Primary color
    document.documentElement.style.setProperty(
      '--theme-title',
      hexFromArgb(light.primary)
    );
    
    // Chapter: Primary color
    document.documentElement.style.setProperty(
      '--theme-chapter',
      hexFromArgb(light.primary)
    );
    
    // Content text: Dark tone from primary palette for readability
    document.documentElement.style.setProperty(
      '--theme-content',
      hexFromArgb(palettes.primary.tone(25)) // Dark but tinted with primary hue
    );
  };

  const getSwatches = () => {
    if (!theme) return null;
    
    const scheme = theme.schemes.light;
    return {
      primary: hexFromArgb(scheme.primary),
      secondary: hexFromArgb(scheme.secondary),
      tertiary: hexFromArgb(scheme.tertiary),
      surface: hexFromArgb(scheme.surface),
      primaryContainer: hexFromArgb(scheme.primaryContainer),
      secondaryContainer: hexFromArgb(scheme.secondaryContainer),
      tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
      onPrimary: hexFromArgb(scheme.onPrimary),
    };
  };

  return {
    theme,
    isLoading,
    extractThemeFromImage,
    getSwatches,
  };
}
