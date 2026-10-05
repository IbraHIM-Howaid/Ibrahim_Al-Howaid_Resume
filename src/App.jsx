import { MotionConfig } from 'motion/react';
import About from './components/About.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import GlowScrollbar from './components/GlowScrollbar.jsx';
import Hackathons from './components/Hackathons.jsx';
import Hero from './components/Hero.jsx';
import Nav from './components/Nav.jsx';
import ParticlesBackground from './components/ParticlesBackground.jsx';
import Projects from './components/Projects.jsx';
import Timeline from './components/Timeline.jsx';
import { education, experience } from './data.js';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ParticlesBackground />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Hackathons />
      <Timeline id="experience" label="Experience" heading="Where I've worked" items={experience} />
      <Timeline id="education" label="Education" heading="What I've studied" items={education} />
      <Certifications />
      <Contact />
      <Footer />
      <GlowScrollbar />
    </MotionConfig>
  );
}
