import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import Typed from 'typed.js';
import Magnetic from './Magnetic.jsx';
import ScrambleText from './ScrambleText.jsx';
import { EASE } from './Reveal.jsx';
import { currently, typedStrings } from '../data.js';

// Entrance choreography, in seconds from page load.
const enter = (delay, duration, ease = EASE) => ({ delay, duration, ease });

function launchConfetti(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  confetti({
    particleCount: 80,
    spread: 60,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
    colors: ['#c8a96e', '#7b9e87', '#ffffff'],
  });
}

export default function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: typedStrings,
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 1000,
      loop: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, []);

  return (
    <section id="hero">
      <div className="hero-text">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={enter(0.4, 0.8)}
        >
          Available for work
        </motion.p>
        <h1>
          <span className="first-name">
            <ScrambleText text="Ibrahim" duration={1.2} delay={0.2} />
          </span>
          <br />
          <em className="last-name">
            <ScrambleText text="Al-Howaid" duration={1.5} delay={0.4} />
          </em>
        </h1>
        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(1.3, 0.7)}
        >
          I'm a <span id="typed-text" ref={typedRef}></span>
        </motion.p>
        <div className="hero-cta">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(1.7, 0.6)}
          >
            <Magnetic href="#work" className="btn-primary">
              View Work
            </Magnetic>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(1.85, 0.6)}
          >
            <Magnetic href="#contact" className="btn-primary" onClick={launchConfetti}>
              Get in Touch
            </Magnetic>
          </motion.div>
        </div>
        <motion.p
          className="hero-currently"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(2.1, 0.6)}
        >
          <span className="status-dot" aria-hidden="true" />
          <span className="hero-currently-label">Currently</span>
          {currently}
        </motion.p>
      </div>
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={enter(1.95, 0.8)}
      >
        <div className="avatar-frame">
          <img src="/assets/Ibrahim Photo.jpeg" alt="Ibrahim Al-Howaid" className="profile-img" />
        </div>
        <motion.div
          className="deco-line"
          style={{ originY: 0 }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={enter(2.15, 1.2, [0.65, 0, 0.35, 1])}
        />
      </motion.div>
    </section>
  );
}
