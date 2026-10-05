import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react';

// Desktop page scrollbar: a gold thumb that glows while scrolling and slowly fades back when idle.
// Native scrollbars can't animate, so the page's own is hidden (see style.css) and this replaces it.
// Touch devices keep their native scrollbar, which already hides itself.

const MIN_THUMB = 48;
const IDLE_MS = 900; // how long after the last scroll before the glow starts fading
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

function usePageMetrics() {
  const [metrics, setMetrics] = useState({ viewport: 0, page: 0 });
  useEffect(() => {
    const update = () =>
      setMetrics({ viewport: window.innerHeight, page: document.documentElement.scrollHeight });
    update();
    // The page grows as images load and sections animate in, so watch the body too.
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
  return metrics;
}

function Scrollbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const { viewport, page } = usePageMetrics();
  const glow = useMotionValue(0);
  const fadeTimer = useRef();
  const held = useRef({ hover: false, drag: null });

  const thumb = Math.max(MIN_THUMB, viewport * (viewport / Math.max(page, 1)));
  const travel = Math.max(viewport - thumb, 0);
  const y = useTransform(scrollYProgress, (p) => p * travel);
  const opacity = useTransform(glow, [0, 1], [0.3, 1]);
  const boxShadow = useTransform(
    glow,
    (g) => `0 0 ${3 + 11 * g}px rgba(200, 169, 110, ${0.15 + 0.6 * g}), 0 0 ${2 * g}px rgba(255, 236, 200, ${0.5 * g})`
  );

  const lightUp = () => {
    clearTimeout(fadeTimer.current);
    animate(glow, 1, { duration: 0.15 });
  };
  const fadeLater = () => {
    clearTimeout(fadeTimer.current);
    if (held.current.hover || held.current.drag) return;
    fadeTimer.current = setTimeout(() => animate(glow, 0, { duration: 1.8, ease: 'easeOut' }), IDLE_MS);
  };

  useMotionValueEvent(scrollY, 'change', () => {
    lightUp();
    fadeLater();
  });
  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  const maxScroll = Math.max(page - viewport, 0);

  const onThumbDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    held.current.drag = { startY: e.clientY, startScroll: window.scrollY };
    lightUp();
  };
  const onThumbMove = (e) => {
    const drag = held.current.drag;
    if (!drag || !travel) return;
    const delta = ((e.clientY - drag.startY) / travel) * maxScroll;
    window.scrollTo({ top: drag.startScroll + delta, behavior: 'instant' });
  };
  const onThumbUp = () => {
    held.current.drag = null;
    fadeLater();
  };
  // Clicking the track jumps there, centering the thumb on the click.
  const onTrackDown = (e) => {
    if (!travel) return;
    const target = ((e.clientY - thumb / 2) / travel) * maxScroll;
    window.scrollTo({ top: Math.min(Math.max(target, 0), maxScroll), behavior: 'smooth' });
  };

  if (!viewport || page <= viewport) return null;
  return (
    <div
      className="glow-scrollbar"
      aria-hidden="true"
      onPointerDown={onTrackDown}
      onPointerEnter={() => {
        held.current.hover = true;
        lightUp();
      }}
      onPointerLeave={() => {
        held.current.hover = false;
        fadeLater();
      }}
    >
      <motion.div
        className="glow-scrollbar-thumb"
        style={{ y, height: thumb, opacity, boxShadow }}
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
      />
    </div>
  );
}

export default function GlowScrollbar() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return enabled ? <Scrollbar /> : null;
}
