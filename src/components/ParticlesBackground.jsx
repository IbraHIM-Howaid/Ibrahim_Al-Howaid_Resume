import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      particles: {
        number: { value: 100, density: { enable: true, width: 800, height: 800 } },
        color: { value: ['#c8a96e', '#ffffff'] },
        links: { enable: true, distance: 150, color: '#c8a96e', opacity: 0.3, width: 1 },
        opacity: { value: { min: 0.1, max: 0.5 } },
        size: { value: { min: 1, max: 2 } },
        move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false, outModes: 'out' },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: ['grab', 'repulse'] } },
        modes: {
          grab: { distance: 150, links: { opacity: 0.6, color: '#c8a96e' } },
          repulse: { distance: 120, duration: 0.8, factor: 0.5, speed: 0.5, easing: 'ease-out-quad' },
        },
      },
    }),
    []
  );

  if (!ready) return null;
  return <Particles id="tsparticles" className="particles-bg" options={options} />;
}
