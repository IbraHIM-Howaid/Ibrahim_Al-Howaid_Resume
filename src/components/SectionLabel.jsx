import Reveal from './Reveal.jsx';

export default function SectionLabel({ children, ...props }) {
  return (
    <Reveal as="p" className="section-label" x={-20} y={0} duration={0.6} margin="0px 0px -8% 0px" {...props}>
      {children}
    </Reveal>
  );
}
