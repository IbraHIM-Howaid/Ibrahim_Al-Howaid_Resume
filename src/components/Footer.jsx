import Reveal from './Reveal.jsx';
import VisitCounter from './VisitCounter.jsx';

export default function Footer() {
  return (
    <Reveal as="footer" y={0} duration={0.6} margin="0px 0px -2% 0px">
      <span>
        © 2026 Ibrahim Al-Howaid <VisitCounter />
      </span>

      <a href="https://websitelaunches.com/site/al-howaid.me" target="_blank" rel="noopener noreferrer">
        <img
          src="https://websitelaunches.com/badge/al-howaid.me.svg?theme=dark"
          alt="Established online - Public launch record"
          width="255"
          height="55"
        />
      </a>

      <span>Built w/ React, Motion &amp; tsParticles</span>
    </Reveal>
  );
}
