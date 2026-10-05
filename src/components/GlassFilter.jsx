import { useEffect, useState } from 'react';

// Liquid-glass refraction: an SVG displacement filter whose map bends the backdrop inward along the
// element's rounded edges, like light through the rim of a lens. Applied with
// `backdrop-filter: url(#id)`, which only Chromium supports, so callers should gate it (see supportsRefraction).

export const supportsRefraction = () =>
  typeof navigator !== 'undefined' && !!navigator.userAgentData?.brands?.some((b) => b.brand === 'Chromium');

// Signed distance from (x, y) to a rounded rect of size w×h and corner radius r (negative inside),
// plus the outward normal at that point.
function roundedRectField(x, y, w, h, r) {
  const px = x - w / 2;
  const py = y - h / 2;
  const qx = Math.abs(px) - (w / 2 - r);
  const qy = Math.abs(py) - (h / 2 - r);
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const outside = Math.hypot(ox, oy);
  const dist = outside + Math.min(Math.max(qx, qy), 0) - r;

  let nx, ny;
  if (qx > 0 && qy > 0) {
    nx = ox / outside;
    ny = oy / outside;
  } else if (qx > qy) {
    nx = 1;
    ny = 0;
  } else {
    nx = 0;
    ny = 1;
  }
  return { dist, nx: nx * Math.sign(px || 1), ny: ny * Math.sign(py || 1) };
}

function buildMap(w, h, radius, bezel) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(w, h);
  const r = Math.min(radius, w / 2, h / 2);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const { dist, nx, ny } = roundedRectField(x + 0.5, y + 0.5, w, h, r);
      const depth = -dist; // how far inside the edge
      // Strongest at the rim, easing to zero across the bezel (a squared falloff reads as a curved lens).
      const t = depth < bezel ? (1 - Math.max(depth, 0) / bezel) ** 2 : 0;
      const i = (y * w + x) * 4;
      // Sample from further inside: shift against the outward normal. 128 = no displacement.
      img.data[i] = 128 - nx * t * 127;
      img.data[i + 1] = 128 - ny * t * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

export default function GlassFilter({ id, target, radius, bezel = 16, scale = 36 }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!target || !supportsRefraction()) return;
    let frame;
    const observer = new ResizeObserver(([entry]) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const w = Math.round(entry.borderBoxSize[0].inlineSize);
        const h = Math.round(entry.borderBoxSize[0].blockSize);
        if (w && h) setMap({ w, h, href: buildMap(w, h, radius ?? h / 2, bezel) });
      });
    });
    observer.observe(target);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, radius, bezel]);

  if (!map) return null;
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter
        id={id}
        x="0"
        y="0"
        width={map.w}
        height={map.h}
        filterUnits="userSpaceOnUse"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feImage href={map.href} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
