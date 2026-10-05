import { motion } from 'motion/react';
import Magnetic from './Magnetic.jsx';
import { EASE } from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { hackathons } from '../data.js';

export default function Hackathons() {
  return (
    <section id="hackathons">
      <SectionLabel>Hackathons</SectionLabel>
      <h2>Built against the clock</h2>
      <div className="hackathon-grid">
        {hackathons.map((h, i) => (
          <motion.article
            key={h.event}
            className="hackathon-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: EASE }}
          >
            <header className="hackathon-head">
              <p className="hackathon-host">
                {h.host}
                {h.date && <span className="hackathon-date"> · {h.date}</span>}
              </p>
              <h3 className="hackathon-event">{h.event}</h3>
            </header>
            <p className="hackathon-project">
              {h.project} <span className="tag">{h.role}</span>
            </p>
            <p className="hackathon-text">{h.text}</p>
            {h.links && (
              <div className="hackathon-links">
                {h.links.map((l) => (
                  <Magnetic key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    {l.label} ↗
                  </Magnetic>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
