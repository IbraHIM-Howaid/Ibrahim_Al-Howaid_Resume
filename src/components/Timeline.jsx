import { Fragment } from 'react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';

// Renders **phrase** as a gold highlight; everything else stays plain text.
function highlight(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="hl">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function TimelineItem({ item }) {
  const lines = item.bullets;
  return (
    <Reveal className="connected-timeline-item" x={-30} y={0} duration={0.7} margin="0px 0px -15% 0px">
      <div className="timeline-dot"></div>
      <div className="connected-timeline-content">
        <div className="timeline-header">
          {item.logo ? (
            <img className="timeline-logo" src={item.logo} alt={item.logoAlt} />
          ) : (
            <div className="timeline-logo timeline-logo-text" aria-hidden="true">
              {item.logoText}
            </div>
          )}
          <div className="timeline-meta">
            <p className="timeline-date">{item.date}</p>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-issuer">{item.issuer}</p>
          </div>
        </div>
        <p className="timeline-desc">
          {lines
            ? lines.map((line, i) => (
                <Fragment key={i}>
                  •{highlight(line)}
                  {i < lines.length - 1 && <br />}
                </Fragment>
              ))
            : highlight(item.text)}
        </p>
      </div>
    </Reveal>
  );
}

export default function Timeline({ id, label, heading, items }) {
  return (
    <section id={id}>
      <SectionLabel>{label}</SectionLabel>
      <h2>{heading}</h2>
      <div className="connected-timeline">
        {items.map((item) => (
          <TimelineItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
