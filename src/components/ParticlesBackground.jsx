import { lazy, Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

// tsParticles is the largest dependency on the page. It's decoration, so it loads in its own chunk once
// the browser is idle, after the content is already on screen and interactive.
const ParticlesCanvas = lazy(() => import('./ParticlesCanvas.jsx'));

export default function ParticlesBackground() {
  const [load, setLoad] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const start = () => setLoad(true);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(start, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
  }, []);

  if (!load) return null;
  return (
    <Suspense fallback={null}>
      {/* With reduced motion the constellation still shows, but holds still. */}
      <ParticlesCanvas still={!!reduceMotion} />
    </Suspense>
  );
}
