import { motion } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1];

// Fades/slides an element in once it scrolls into view.
// `margin` mirrors the old ScrollTrigger "top 90%" start (element enters the bottom 10% of the viewport).
export default function Reveal({
  as = 'div',
  x = 0,
  y = 40,
  duration = 0.8,
  delay = 0,
  margin = '0px 0px -10% 0px',
  children,
  ...props
}) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Tag>
  );
}
