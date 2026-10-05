import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react';
import { fetchTotalVisits, MIN_VISITS_TO_SHOW } from '../analytics.js';

// "1,284 visits", counting up from zero when it scrolls into view. Renders nothing until the
// site has enough visits to be worth showing.
export default function VisitCounter() {
  const [total, setTotal] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => Math.round(v).toLocaleString('en-US'));

  useEffect(() => {
    fetchTotalVisits().then(setTotal);
  }, []);

  useEffect(() => {
    if (!inView || total === null) return;
    const controls = animate(count, total, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, total, count]);

  // The wrapper always renders so useInView has an element to watch from the first render.
  const show = total !== null && total >= MIN_VISITS_TO_SHOW;
  return (
    <span ref={ref} className="visit-counter">
      {show && (
        <>
          · <motion.span>{label}</motion.span> visits
        </>
      )}
    </span>
  );
}
