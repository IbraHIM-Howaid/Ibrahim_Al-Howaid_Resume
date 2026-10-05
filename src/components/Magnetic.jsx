import { motion, useMotionValue, useSpring } from 'motion/react';

const spring = { stiffness: 250, damping: 14, mass: 0.6 };

// Element (link/button) that leans toward the cursor, with its label moving a bit further.
export default function Magnetic({ as = 'a', className, children, ...props }) {
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  const innerX = useSpring(useMotionValue(0), spring);
  const innerY = useSpring(useMotionValue(0), spring);
  const Tag = motion[as];

  const onMove = (e) => {
    // Mouse only: on touch screens a tap would leave the element stuck off-center.
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.35);
    y.set(dy * 0.35);
    innerX.set(dx * 0.55);
    innerY.set(dy * 0.55);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  return (
    <Tag className={className} style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave} {...props}>
      <motion.span className="mag-inner" style={{ x: innerX, y: innerY }}>
        {children}
      </motion.span>
    </Tag>
  );
}
