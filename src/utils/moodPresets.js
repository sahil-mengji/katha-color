// Genre/Emotion presets with color tone modifiers
// These affect brightness, contrast, saturation of the extracted theme

export const MOOD_PRESETS = {
  default: {
    id: 'default',
    label: 'Default',
    description: 'Pure extracted colors',
    filters: { brightness: 1, contrast: 1, saturate: 1 },
    toneShift: 0,
  },
  calm: {
    id: 'calm',
    label: 'Calm',
    description: 'Soft, peaceful tones',
    filters: { brightness: 1.05, contrast: 0.95, saturate: 0.85 },
    toneShift: 5,
  },
  warm: {
    id: 'warm',
    label: 'Warm',
    description: 'Golden, inviting atmosphere',
    filters: { brightness: 1.02, contrast: 1.05, saturate: 1.15 },
    toneShift: 0,
    hueRotate: 10,
  },
  mysterious: {
    id: 'mysterious',
    label: 'Mysterious',
    description: 'Dark, intriguing ambiance',
    filters: { brightness: 0.9, contrast: 1.1, saturate: 0.9 },
    toneShift: -10,
  },
  joyful: {
    id: 'joyful',
    label: 'Joyful',
    description: 'Bright, cheerful vibes',
    filters: { brightness: 1.1, contrast: 1.05, saturate: 1.2 },
    toneShift: 8,
  },
  melancholic: {
    id: 'melancholic',
    label: 'Melancholic',
    description: 'Muted, contemplative mood',
    filters: { brightness: 0.95, contrast: 0.9, saturate: 0.7 },
    toneShift: -5,
    hueRotate: -10,
  },
  haunted: {
    id: 'haunted',
    label: 'Haunted',
    description: 'Dark, eerie atmosphere',
    filters: { brightness: 0.75, contrast: 1.25, saturate: 0.5 },
    toneShift: -20,
  },
  romance: {
    id: 'romance',
    label: 'Romance',
    description: 'Soft, romantic ambiance',
    filters: { brightness: 1.05, contrast: 0.95, saturate: 1.1 },
    toneShift: 5,
    hueRotate: -15,
  },
  adventure: {
    id: 'adventure',
    label: 'Adventure',
    description: 'Bold, adventurous spirit',
    filters: { brightness: 1.0, contrast: 1.15, saturate: 1.25 },
    toneShift: 0,
  },
  fantasy: {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Magical, ethereal quality',
    filters: { brightness: 1.08, contrast: 1.0, saturate: 1.1 },
    toneShift: 10,
    hueRotate: 20,
  },
  noir: {
    id: 'noir',
    label: 'Noir',
    description: 'Classic film noir style',
    filters: { brightness: 0.85, contrast: 1.3, saturate: 0.3 },
    toneShift: -15,
  },
  thriller: {
    id: 'thriller',
    label: 'Thriller',
    description: 'Tense, suspenseful atmosphere',
    filters: { brightness: 0.88, contrast: 1.2, saturate: 0.6 },
    toneShift: -12,
  },
  scifi: {
    id: 'scifi',
    label: 'Sci-Fi',
    description: 'Futuristic, tech-inspired',
    filters: { brightness: 1.0, contrast: 1.1, saturate: 0.9 },
    toneShift: 0,
    hueRotate: 180,
  },
  western: {
    id: 'western',
    label: 'Western',
    description: 'Dusty, sepia tones',
    filters: { brightness: 1.0, contrast: 1.05, saturate: 0.8 },
    toneShift: -5,
    hueRotate: 25,
  },
  historical: {
    id: 'historical',
    label: 'Historical',
    description: 'Aged, timeless quality',
    filters: { brightness: 0.95, contrast: 0.95, saturate: 0.75 },
    toneShift: -8,
    hueRotate: 15,
  },
  comedy: {
    id: 'comedy',
    label: 'Comedy',
    description: 'Light, playful vibes',
    filters: { brightness: 1.15, contrast: 1.0, saturate: 1.3 },
    toneShift: 12,
  },
  drama: {
    id: 'drama',
    label: 'Drama',
    description: 'Emotional, intense atmosphere',
    filters: { brightness: 0.92, contrast: 1.15, saturate: 0.85 },
    toneShift: -8,
  },
  nature: {
    id: 'nature',
    label: 'Nature',
    description: 'Fresh, organic greens',
    filters: { brightness: 1.05, contrast: 1.0, saturate: 1.2 },
    toneShift: 5,
    hueRotate: 60,
  },
  ocean: {
    id: 'ocean',
    label: 'Ocean',
    description: 'Deep blue aquatic tones',
    filters: { brightness: 0.98, contrast: 1.05, saturate: 1.1 },
    toneShift: 0,
    hueRotate: 200,
  },
  sunset: {
    id: 'sunset',
    label: 'Sunset',
    description: 'Warm orange-pink glow',
    filters: { brightness: 1.02, contrast: 1.1, saturate: 1.3 },
    toneShift: 5,
    hueRotate: -20,
  },
  winter: {
    id: 'winter',
    label: 'Winter',
    description: 'Cool, crisp frost tones',
    filters: { brightness: 1.1, contrast: 0.9, saturate: 0.6 },
    toneShift: 10,
    hueRotate: 190,
  },
  autumn: {
    id: 'autumn',
    label: 'Autumn',
    description: 'Rich fall foliage colors',
    filters: { brightness: 0.98, contrast: 1.1, saturate: 1.2 },
    toneShift: 0,
    hueRotate: 30,
  },
  vintage: {
    id: 'vintage',
    label: 'Vintage',
    description: 'Retro, nostalgic feel',
    filters: { brightness: 0.95, contrast: 1.05, saturate: 0.65 },
    toneShift: -5,
    hueRotate: 20,
  },
  dreamy: {
    id: 'dreamy',
    label: 'Dreamy',
    description: 'Soft, ethereal haze',
    filters: { brightness: 1.12, contrast: 0.85, saturate: 0.9 },
    toneShift: 15,
  },
  gothic: {
    id: 'gothic',
    label: 'Gothic',
    description: 'Dark, dramatic mood',
    filters: { brightness: 0.7, contrast: 1.35, saturate: 0.4 },
    toneShift: -25,
  },
};

// Get CSS filter string from mood preset
export function getMoodFilters(moodId) {
  const preset = MOOD_PRESETS[moodId] || MOOD_PRESETS.default;
  const { brightness, contrast, saturate } = preset.filters;
  const hueRotate = preset.hueRotate || 0;
  
  let filterStr = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
  if (hueRotate !== 0) {
    filterStr += ` hue-rotate(${hueRotate}deg)`;
  }
  
  return filterStr;
}

// Get tone shift for adjusting palette tones
export function getToneShift(moodId) {
  const preset = MOOD_PRESETS[moodId] || MOOD_PRESETS.default;
  return preset.toneShift || 0;
}

// Apply mood to document
export function applyMoodToDocument(moodId) {
  const filterStr = getMoodFilters(moodId);
  document.documentElement.style.setProperty('--mood-filter', filterStr);
  
  const preset = MOOD_PRESETS[moodId] || MOOD_PRESETS.default;
  document.documentElement.style.setProperty('--mood-brightness', preset.filters.brightness);
  document.documentElement.style.setProperty('--mood-contrast', preset.filters.contrast);
  document.documentElement.style.setProperty('--mood-saturate', preset.filters.saturate);
}
