import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Magnetic from './Magnetic.jsx';
import { EASE } from './Reveal.jsx';
import GlassFilter, { supportsRefraction } from './GlassFilter.jsx';

const links = [
  ['#about', 'About'],
  ['#work', 'Projects'],
  ['#experience', 'Experience'],
  ['#certifications', 'Certifications'],
  ['#contact', 'Contact'],
];

// The nav section whose top has passed 45% of the way down the viewport (null while on the hero).
// Education isn't in the nav, so Experience stays lit while scrolling through it.
function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const sections = links.map(([href]) => document.querySelector(href)).filter(Boolean);
    const update = () => {
      const { scrollY, innerHeight } = window;
      // On tall screens Contact can't scroll up to the line, so the bottom of the page counts as Contact.
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) return setActive('#contact');
      const passed = sections.filter((s) => s.getBoundingClientRect().top <= innerHeight * 0.45);
      setActive(passed.length ? `#${passed[passed.length - 1].id}` : null);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return active;
}

// Matches the CSS breakpoint where the links collapse into the menu button.
const WIDE = '(min-width: 961px)';
const refract = supportsRefraction();

export default function Nav() {
  const active = useActiveSection();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navEl, setNavEl] = useState(null);
  const [menuEl, setMenuEl] = useState(null);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  // Close the mobile menu with Escape, or when the window grows past the menu breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const wide = window.matchMedia(WIDE);
    const onResize = () => wide.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const glass = (id) => `glass ${refract ? `refract refract-${id}` : ''}`;

  return (
    <>
      <nav id="navbar" ref={setNavEl} className={`${glass('nav')} ${scrolled || menuOpen ? 'scrolled' : ''}`}>
        <a className="nav-logo" href="#">
          &lt;/Ibrahim Al-Howaid&gt;
        </a>
        <ul className="nav-links">
          {links.map(([href, label]) => (
            <li key={href}>
              <Magnetic
                href={href}
                className={active === href ? 'active' : ''}
                aria-current={active === href ? 'true' : undefined}
              >
                {label}
              </Magnetic>
              {active === href && (
                <motion.span
                  className="nav-underline"
                  layoutId="nav-underline"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Outside <nav>: a backdrop-filter nested in another one would only blur the nav, not the page. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-menu"
            ref={setMenuEl}
            className={`mobile-menu ${glass('menu')}`}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {links.map(([href, label], i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04, ease: EASE }}
              >
                <a
                  href={href}
                  className={active === href ? 'active' : ''}
                  aria-current={active === href ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {refract && <GlassFilter id="glass-nav" target={navEl} />}
      {refract && menuOpen && <GlassFilter id="glass-menu" target={menuEl} radius={24} bezel={14} scale={30} />}
    </>
  );
}
