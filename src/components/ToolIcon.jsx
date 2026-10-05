// Line icons for tools that have no brand logo in simple-icons.
const glyphs = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  wireless: (
    <>
      <path d="M1.5 9a15 15 0 0 1 21 0" />
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" />
    </>
  ),
};

export default function ToolIcon({ tool }) {
  if (tool.icon) {
    return (
      <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={tool.icon.path} fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      className="tool-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyphs[tool.glyph]}
    </svg>
  );
}

// Brand color shown on hover. Near-black brands (GitHub, Autodesk) would vanish on the dark
// background, so those fall back to the site's text color.
export function brandColor(tool) {
  if (!tool.icon) return 'var(--accent)';
  const hex = tool.icon.hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.25 ? 'var(--text)' : `#${hex}`;
}
