export default function ColorSwatches({ swatches }) {
  if (!swatches) return null;

  const colors = [
    { key: 'primary', label: 'Primary', color: swatches.primary, textColor: swatches.onPrimary },
    { key: 'secondary', label: 'Secondary', color: swatches.secondary, textColor: '#fff' },
    { key: 'tertiary', label: 'Tertiary', color: swatches.tertiary, textColor: '#fff' },
    { key: 'surface', label: 'Surface', color: swatches.surface, textColor: '#333' },
  ];

  return (
    <div className="color-swatches">
      {colors.map(({ key, label, color, textColor }) => (
        <div
          key={key}
          className="color-swatch"
          style={{ backgroundColor: color, color: textColor }}
        >
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
