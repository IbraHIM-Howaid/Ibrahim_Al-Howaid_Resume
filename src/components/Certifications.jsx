import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Magnetic from './Magnetic.jsx';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { certifications } from '../data.js';

function cardState(index, current, total) {
  if (index === current) return 'card-active';
  if (index === (current - 1 + total) % total) return 'card-prev';
  if (index === (current + 1) % total) return 'card-next';
  return 'card-hidden';
}

export default function Certifications() {
  const total = certifications.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // Auto-advance; the timer restarts whenever the card changes, so manual clicks reset it.
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, 3500);
    return () => clearTimeout(id);
  }, [current, paused]);

  return (
    <section id="certifications">
      <SectionLabel>Certifications</SectionLabel>
      <h2>Credentials &amp; Achievements</h2>

      <Reveal
        className="carousel-wrapper"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <button className="carousel-btn" onClick={prev} aria-label="Previous">
          ←
        </button>

        <motion.div
          className="carousel-viewport"
          onPanEnd={(_, info) => {
            if (info.offset.x < -40) next();
            else if (info.offset.x > 40) prev();
          }}
        >
          {certifications.map((cert, i) => {
            const state = cardState(i, current, total);
            return (
              <div
                key={cert.title}
                className={`carousel-card ${state}`}
                onClick={state === 'card-prev' ? prev : state === 'card-next' ? next : undefined}
              >
                <div className="card-logo">
                  {cert.logo.text ? (
                    <h3 className="card-logo-text">{cert.logo.text}</h3>
                  ) : (
                    <img src={cert.logo.src} alt={cert.logo.alt} height={cert.logo.height} loading="lazy" decoding="async" />
                  )}
                </div>
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <Magnetic href={cert.href} target="_blank" rel="noopener noreferrer" className="btn-ghost cert-btn">
                  Verify ↗
                </Magnetic>
              </div>
            );
          })}
        </motion.div>

        <button className="carousel-btn" onClick={next} aria-label="Next">
          →
        </button>
      </Reveal>
    </section>
  );
}
