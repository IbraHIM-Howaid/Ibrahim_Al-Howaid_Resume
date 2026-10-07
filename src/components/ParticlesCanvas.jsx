import { useCallback, useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { perfTier } from '../perf.js';

// The constellation's cost grows with the square of the particle count (every pair is checked for a
// link), so the count is a fixed budget per device tier instead of scaling with screen area.
// (Area scaling gave ~200 particles on a 1440x900 desktop.)
function deviceProfile() {
  const small = window.matchMedia('(max-width: 768px)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const counts = { high: [140, 65], mid: [100, 50], low: [65, 35] }[perfTier];
  return {
    count: small ? counts[1] : counts[0],
    finePointer,
    fps: perfTier === 'low' ? 24 : 30, // slow drift reads the same at 24-30fps, at a fraction of the work
  };
}

// The constellation always drifts, including while scrolling. It only stops when the tab is hidden, or
// for good under reduced motion (drawn once, then the render loop stops; the canvas keeps the frame).
function usePlayback(container, still) {
  useEffect(() => {
    if (!container) return;
    if (still) {
      const id = setTimeout(() => container.pause(), 250);
      return () => clearTimeout(id);
    }
    const sync = () => (document.hidden ? container.pause() : container.play());
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [container, still]);
}

export default function ParticlesCanvas({ still }) {
  const [ready, setReady] = useState(false);
  const [container, setContainer] = useState(null);
  const [device] = useState(deviceProfile);
  const onLoaded = useCallback(async (c) => setContainer(c), []);
  usePlayback(container, still);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(() => {
    return {
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: device.fps,
      detectRetina: false, // 1px dots and lines don't need a 2-3x canvas; this was 7x the pixels on phones
      // Its own pause-on-blur/offscreen watchers call play() again and fight usePlayback, so they're off;
      // usePlayback handles hidden tabs itself.
      pauseOnBlur: false,
      pauseOnOutsideViewport: false,
      particles: {
        number: { value: device.count, density: { enable: false } },
        color: { value: ['#c8a96e', '#ffffff'] },
        links: { enable: true, distance: 160, color: '#c8a96e', opacity: 0.3, width: 1 },
        opacity: { value: { min: 0.1, max: 0.5 } },
        size: { value: { min: 1, max: 2 } },
        move: { enable: !still, speed: 0.5, direction: 'none', random: true, straight: false, outModes: 'out' },
      },
      interactivity: {
        events: {
          // Hover effects only for a real mouse; touch screens never hover.
          onHover: { enable: !still && device.finePointer, mode: ['grab', 'repulse'] },
          resize: { enable: true, delay: 0.5 },
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.6, color: '#c8a96e' } },
          repulse: { distance: 120, duration: 0.8, factor: 0.5, speed: 0.5, easing: 'ease-out-quad' },
        },
      },
    };
  }, [still, device]);

  // @tsparticles/react 3.0.0 lists its whole props object as an effect dependency, so ANY re-render of
  // <Particles> destroys and rebuilds the engine (and storing the container in state re-renders us).
  // Handing React the same memoized element makes it skip <Particles> unless the options really change.
  const particles = useMemo(
    () => <Particles id="tsparticles" className="particles-bg" options={options} particlesLoaded={onLoaded} />,
    [options, onLoaded]
  );

  if (!ready) return null;
  return particles;
}
