import { motion } from 'motion/react';
import Magnetic from './Magnetic.jsx';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import ToolIcon, { brandColor } from './ToolIcon.jsx';
import { toolGroups } from '../data.js';

export default function About() {
  return (
    <section id="about">
      <SectionLabel>About</SectionLabel>
      <div className="about-grid">
        <Reveal>
          <h2>A bit about me</h2>
          <p>
            I'm a student developer from Ottawa heading into Honours Computer Science (Co-op) at the University of
            Ottawa. I'm happiest when I'm figuring out how something works and then making it work better, I'm most
            drawn to projects that let me work a problem from end to end, from the first rough prototype to a version
            that's polished and holds up in the real world.
          </p>
          <p>
            In my spare time, you can find me building side projects, competing at various different hackathons (like
            Hack Club!), and staying active with sports and the gym. I'm fluent in English, French, and Arabic, and I'm
            always looking for the next thing to learn!
          </p>
          <br />
          <Magnetic href="#contact" className="btn-primary">
            Say Hello
          </Magnetic>
        </Reveal>
        <Reveal>
          <p className="tools-heading">Tech I work with</p>
          <motion.div
            className="tool-groups"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ staggerChildren: 0.03, delayChildren: 0.2 }}
          >
            {toolGroups.map((group) => (
              <div className="tool-group" key={group.label}>
                <p className="tool-group-label">{group.label}</p>
                <ul className="tool-list">
                  {group.tools.map((tool) => (
                    <motion.li
                      key={tool.name}
                      className="tool-chip"
                      style={{ '--brand': brandColor(tool) }}
                      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                      whileHover={{ y: -3 }}
                    >
                      <ToolIcon tool={tool} />
                      {tool.name}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
