import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import Magnetic from './Magnetic.jsx';
import { EASE } from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { projects } from '../data.js';

const MAX_TILT = 10;
const tiltSpring = { stiffness: 220, damping: 22 };

function ProjectCard({ project, index, onOpen }) {
  const rotateX = useSpring(useMotionValue(0), tiltSpring);
  const rotateY = useSpring(useMotionValue(0), tiltSpring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 60%)`;

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * MAX_TILT);
    rotateX.set(-(py - 0.5) * 2 * MAX_TILT);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      className="project-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project);
        }
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: EASE }}
    >
      <motion.div className="card-glare" style={{ background: glare, opacity: glareOpacity }} />
      {project.cover && (
        <div className="project-media">
          <img src={project.cover.src} alt={project.cover.alt} loading="lazy" />
        </div>
      )}
      <p className="project-num">{String(index + 1).padStart(2, '0')}</p>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.summary}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <span className="project-arrow">→</span>
    </motion.div>
  );
}

function Gallery({ media }) {
  const [index, setIndex] = useState(0);
  const item = media[index];

  return (
    <div className="gallery">
      <div className="gallery-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={item.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.type === 'video' ? (
              <video src={item.src} poster={item.poster} controls playsInline preload="metadata" />
            ) : (
              <img src={item.src} alt={item.alt} />
            )}
          </motion.figure>
        </AnimatePresence>
      </div>
      <p className="gallery-caption">{item.caption}</p>
      {media.length > 1 && (
        <div className="gallery-thumbs">
          {media.map((m, i) => (
            <button
              key={m.src}
              className={`gallery-thumb ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show ${m.caption}`}
              aria-current={i === index}
            >
              <img src={m.type === 'video' ? m.poster : m.src} alt="" loading="lazy" />
              {m.type === 'video' && <span className="gallery-play">▶</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  // Escape closes the modal, and the page behind it shouldn't scroll while it's open.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 id="modal-title">{project.title}</h2>
        {project.media && <Gallery media={project.media} />}
        <p>{project.details}</p>
        <div className="modal-buttons">
          {project.github && (
            <Magnetic href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              View GitHub
            </Magnetic>
          )}
          {project.devpost && (
            <Magnetic href={project.devpost} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Devpost
            </Magnetic>
          )}
          {project.demo && (
            <Magnetic href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Live Demo
            </Magnetic>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="work">
      <SectionLabel>Selected Work</SectionLabel>
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} onOpen={setSelected} />
        ))}
      </div>
      <AnimatePresence>
        {selected && <ProjectModal key={selected.title} project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
