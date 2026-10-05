import Magnetic from './Magnetic.jsx';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';

const socials = [
  ['LinkedIn', 'https://www.linkedin.com/in/ibrahim-al-howaid-35203a378/'],
  ['GitHub', 'https://github.com/IbraHIM-Howaid'],
  ['Resume', '/assets/Ibrahim Al-Howaid Resume 2026.pdf'],
];

export default function Contact() {
  const margin = '0px 0px -20% 0px';
  return (
    <section id="contact">
      <SectionLabel style={{ justifyContent: 'center' }}>Contact</SectionLabel>
      <Reveal as="h2" y={30} margin={margin}>
        Let's work together
      </Reveal>
      <Reveal as="p" y={30} delay={0.2} margin={margin}>
        Have a project in mind? I'd love to hear about it.
      </Reveal>
      <Reveal y={30} delay={0.4} margin={margin}>
        <Magnetic href="mailto:ialhowaid@gmail.com" className="contact-email">
          ialhowaid@gmail.com
        </Magnetic>
      </Reveal>
      <div className="social-row">
        {socials.map(([label, href], i) => (
          <Reveal key={label} y={10} duration={0.5} delay={i * 0.1} margin="0px 0px -8% 0px">
            <a href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
