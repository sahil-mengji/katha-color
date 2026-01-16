import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Save, Eye } from "lucide-react";
import { MOOD_PRESETS, getMoodFilters } from "../utils/moodPresets";
import { useTheme } from "../hooks/useTheme";

const STORAGE_KEY = "katha-custom-moods";

export default function ConfigurationPage() {
  // Load custom moods from localStorage
  const getInitialCustomMoods = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse saved moods:", error);
        return {};
      }
    }
    return {};
  };

  const [customMoods, setCustomMoods] = useState(getInitialCustomMoods);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewMood, setPreviewMood] = useState("default");

  const { currentSwatches, currentImageUrl } = useTheme();

  // Get mood data (custom or default)
  const getMoodData = (moodId) => {
    return customMoods[moodId] || MOOD_PRESETS[moodId];
  };

  // Update a mood parameter
  const updateMoodParameter = (moodId, parameter, value) => {
    const currentMood = getMoodData(moodId);
    const updatedMood = { ...currentMood };

    if (parameter.startsWith("filters.")) {
      const filterKey = parameter.split(".")[1];
      updatedMood.filters = {
        ...updatedMood.filters,
        [filterKey]: parseFloat(value),
      };
    } else {
      updatedMood[parameter] = parseFloat(value);
    }

    setCustomMoods((prev) => ({
      ...prev,
      [moodId]: updatedMood,
    }));
    setHasUnsavedChanges(true);
  };

  // Save changes to localStorage
  const saveChanges = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customMoods));
    setHasUnsavedChanges(false);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setCustomMoods({});
    localStorage.removeItem(STORAGE_KEY);
    setHasUnsavedChanges(false);
  };

  const moods = Object.values(MOOD_PRESETS);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Mood Configuration
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </button>
            <button
              onClick={saveChanges}
              disabled={!hasUnsavedChanges}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                hasUnsavedChanges
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            How to Configure Moods
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • <strong>Brightness:</strong> Values &gt; 1.0 make colors
              brighter, &lt; 1.0 make them darker
            </li>
            <li>
              • <strong>Contrast:</strong> Values &gt; 1.0 increase contrast,
              &lt; 1.0 decrease it
            </li>
            <li>
              • <strong>Saturation:</strong> Values &gt; 1.0 make colors more
              vivid, &lt; 1.0 make them more muted
            </li>
            <li>
              • <strong>Tone Shift:</strong> Adjusts the overall lightness of
              the color palette
            </li>
            <li>
              • <strong>Hue Rotate:</strong> Shifts colors around the color
              wheel (in degrees)
            </li>
          </ul>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="xl:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Edit Mood Parameters
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moods.map((mood) => {
                const moodData = getMoodData(mood.id);
                const isCustom = customMoods[mood.id];
                const isPreviewing = previewMood === mood.id;

                return (
                  <div
                    key={mood.id}
                    className={`bg-white rounded-lg border p-6 cursor-pointer transition-all ${
                      isPreviewing
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPreviewMood(mood.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {mood.label}
                      </h3>
                      <div className="flex items-center gap-2">
                        {isCustom && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Custom
                          </span>
                        )}
                        {isPreviewing && (
                          <Eye className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {mood.description}
                    </p>

                    <div className="space-y-4">
                      {/* Filters */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Filters
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">
                              Brightness: {moodData.filters.brightness}
                            </label>
                            <input
                              type="range"
                              min="0.1"
                              max="2.0"
                              step="0.05"
                              value={moodData.filters.brightness}
                              onChange={(e) =>
                                updateMoodParameter(
                                  mood.id,
                                  "filters.brightness",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-600 mb-1">
                              Contrast: {moodData.filters.contrast}
                            </label>
                            <input
                              type="range"
                              min="0.1"
                              max="2.0"
                              step="0.05"
                              value={moodData.filters.contrast}
                              onChange={(e) =>
                                updateMoodParameter(
                                  mood.id,
                                  "filters.contrast",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-600 mb-1">
                              Saturation: {moodData.filters.saturate}
                            </label>
                            <input
                              type="range"
                              min="0.1"
                              max="2.0"
                              step="0.05"
                              value={moodData.filters.saturate}
                              onChange={(e) =>
                                updateMoodParameter(
                                  mood.id,
                                  "filters.saturate",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tone Shift */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tone Shift: {moodData.toneShift || 0}
                        </label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          step="1"
                          value={moodData.toneShift || 0}
                          onChange={(e) =>
                            updateMoodParameter(
                              mood.id,
                              "toneShift",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Hue Rotate */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hue Rotate: {moodData.hueRotate || 0}°
                        </label>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          step="5"
                          value={moodData.hueRotate || 0}
                          onChange={(e) =>
                            updateMoodParameter(
                              mood.id,
                              "hueRotate",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Theme Preview
              </h2>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {/* Current Image Preview */}
                {currentImageUrl && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 text-sm mb-2">
                      Current Theme Source
                    </h4>
                    <img
                      src={currentImageUrl}
                      alt="Theme source"
                      className="w-full h-20 object-cover rounded border"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-medium text-gray-900">
                    {MOOD_PRESETS[previewMood]?.label || "Default"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {MOOD_PRESETS[previewMood]?.description ||
                      "Pure extracted colors"}
                  </p>
                </div>

                {/* Comprehensive Theme Preview */}
                <div
                  className="border-2 rounded-lg overflow-hidden"
                  style={{
                    filter: getMoodFilters(previewMood),
                    backgroundColor: currentSwatches?.surface || "#ffffff",
                    borderColor: currentSwatches?.outline || "#e5e7eb",
                  }}
                >
                  {/* Header/Navigation */}
                  <div
                    className="px-4 py-3 border-b"
                    style={{
                      backgroundColor:
                        currentSwatches?.primaryContainer || "#f3f4f6",
                      borderColor: currentSwatches?.outlineVariant || "#d1d5db",
                      color: currentSwatches?.onPrimaryContainer || "#1f2937",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">Story Editor</h4>
                      <div className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded"
                          style={{
                            backgroundColor:
                              currentSwatches?.secondary || "#6b7280",
                          }}
                        ></div>
                        <div
                          className="w-6 h-6 rounded"
                          style={{
                            backgroundColor:
                              currentSwatches?.tertiary || "#7c3aed",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4">
                    {/* Title */}
                    <h1
                      className="text-lg font-bold mb-2"
                      style={{ color: currentSwatches?.onSurface || "#111827" }}
                    >
                      The Peace Pond
                    </h1>

                    {/* Chapter */}
                    <h2
                      className="text-sm font-semibold mb-3 uppercase tracking-wide"
                      style={{ color: currentSwatches?.primary || "#3b82f6" }}
                    >
                      Chapter 01
                    </h2>

                    {/* Sample Text */}
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{
                        color: currentSwatches?.onSurfaceVariant || "#6b7280",
                      }}
                    >
                      The lake was still, like a glass mirror laid upon the
                      earth, reflecting the pale blush of dawn. Mist rose from
                      the surface in soft ribbons, drifting lazily as if unsure
                      whether to rise or rest.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-4">
                      <button
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor:
                            currentSwatches?.primary || "#3b82f6",
                          color: currentSwatches?.onPrimary || "#ffffff",
                        }}
                      >
                        Continue Reading
                      </button>
                      <button
                        className="px-3 py-1 rounded text-xs font-medium border"
                        style={{
                          backgroundColor:
                            currentSwatches?.surface || "#ffffff",
                          borderColor: currentSwatches?.outline || "#d1d5db",
                          color: currentSwatches?.primary || "#3b82f6",
                        }}
                      >
                        Save Progress
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: "65%",
                          backgroundColor:
                            currentSwatches?.secondary || "#6b7280",
                        }}
                      ></div>
                    </div>

                    {/* Cards/Sections */}
                    <div className="space-y-3">
                      <div
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor:
                            currentSwatches?.surfaceVariant || "#f9fafb",
                          borderColor:
                            currentSwatches?.outlineVariant || "#e5e7eb",
                        }}
                      >
                        <h3
                          className="font-medium text-sm mb-1"
                          style={{
                            color:
                              currentSwatches?.onSurfaceVariant || "#374151",
                          }}
                        >
                          Story Notes
                        </h3>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              currentSwatches?.onSurfaceVariant || "#6b7280",
                          }}
                        >
                          Peaceful atmosphere with natural elements...
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor:
                            currentSwatches?.tertiaryContainer || "#f3e8ff",
                          borderColor:
                            currentSwatches?.outlineVariant || "#e5e7eb",
                        }}
                      >
                        <h3
                          className="font-medium text-sm mb-1"
                          style={{
                            color:
                              currentSwatches?.onTertiaryContainer || "#581c87",
                          }}
                        >
                          Character Focus
                        </h3>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              currentSwatches?.onTertiaryContainer || "#7c3aed",
                          }}
                        >
                          Swan as a symbol of tranquility and grace...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Parameters */}
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-2">
                      Mood Parameters:
                    </h4>
                    {(() => {
                      const moodData = getMoodData(previewMood);
                      return (
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>Brightness: {moodData.filters.brightness}</div>
                          <div>Contrast: {moodData.filters.contrast}</div>
                          <div>Saturation: {moodData.filters.saturate}</div>
                          <div>Tone Shift: {moodData.toneShift || 0}</div>
                          <div>Hue Rotate: {moodData.hueRotate || 0}°</div>
                        </div>
                      );
                    })()}
                  </div>

                  {currentSwatches && (
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm mb-2">
                        Material Design Colors Used:
                      </h4>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {/* Core Colors */}
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{ backgroundColor: currentSwatches.primary }}
                          ></div>
                          <span>Primary</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.onPrimary,
                            }}
                          ></div>
                          <span>On Primary</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.primaryContainer,
                            }}
                          ></div>
                          <span>Primary Container</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor:
                                currentSwatches.onPrimaryContainer,
                            }}
                          ></div>
                          <span>On Primary Container</span>
                        </div>

                        {/* Secondary Colors */}
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.secondary,
                            }}
                          ></div>
                          <span>Secondary</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.tertiary,
                            }}
                          ></div>
                          <span>Tertiary</span>
                        </div>

                        {/* Surface Colors */}
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{ backgroundColor: currentSwatches.surface }}
                          ></div>
                          <span>Surface</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.surfaceVariant,
                            }}
                          ></div>
                          <span>Surface Variant</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.onSurface,
                            }}
                          ></div>
                          <span>On Surface</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.onSurfaceVariant,
                            }}
                          ></div>
                          <span>On Surface Variant</span>
                        </div>

                        {/* Container Colors */}
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor:
                                currentSwatches.secondaryContainer,
                            }}
                          ></div>
                          <span>Secondary Container</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor:
                                currentSwatches.tertiaryContainer,
                            }}
                          ></div>
                          <span>Tertiary Container</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor:
                                currentSwatches.onTertiaryContainer,
                            }}
                          ></div>
                          <span>On Tertiary Container</span>
                        </div>

                        {/* Outline Colors */}
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{ backgroundColor: currentSwatches.outline }}
                          ></div>
                          <span>Outline</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded border"
                            style={{
                              backgroundColor: currentSwatches.outlineVariant,
                            }}
                          ></div>
                          <span>Outline Variant</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
