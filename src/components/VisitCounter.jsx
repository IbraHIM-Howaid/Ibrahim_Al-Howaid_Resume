import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { fetchTotalVisits, MIN_VISITS_TO_SHOW } from '../analytics.js';

const MIN_DIGITS = 5; // pad like a mechanical counter: 128 → 00128
const CYCLES = 8; // each column stacks 0–9 this many times so it can keep rolling forward
const SPINS = 2; // full turns each column makes on the first reveal
const POLL_MS = 60_000;

// One odometer column. `position` only ever increases, so the digit always rolls forward
// (9 → 0 keeps going down the strip instead of rewinding through 8, 7, 6...).
function DigitColumn({ digit, revealed, index, dim }) {
  const position = useRef(0);
  const last = useRef(null);

  if (revealed && last.current !== digit) {
    position.current =
      last.current === null ? SPINS * 10 + digit : position.current + ((digit - last.current + 10) % 10);
    // Near the end of the strip, jump back a few cycles (same digit, so it's invisible).
    if (position.current >= (CYCLES - 1) * 10) position.current = SPINS * 10 + digit;
    last.current = digit;
  }

  const first = last.current !== null && position.current === SPINS * 10 + digit;
  return (
    <span className={`odometer-digit ${dim ? 'dim' : ''}`}>
      <motion.span
        className="odometer-strip"
        initial={false}
        animate={{ y: `-${position.current}em` }}
        // First reveal: columns land one after another, left to right. Later updates: a quick roll.
        transition={first ? { duration: 1.4 + index * 0.22, ease: [0.16, 1, 0.3, 1] } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {Array.from({ length: CYCLES * 10 }, (_, i) => (
          <span key={i}>{i % 10}</span>
        ))}
      </motion.span>
    </span>
  );
}

// Live visit counter badge for the footer: glass pill, odometer digits, and a shine once they land.
export default function VisitCounter() {
  const [total, setTotal] = useState(null);
  const [shine, setShine] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const load = () => fetchTotalVisits().then((t) => t !== null && setTotal(t));
    load();
    const id = setInterval(() => document.visibilityState === 'visible' && load(), POLL_MS);
    return () => clearInterval(id);
  }, []);

  const show = total !== null && total >= MIN_VISITS_TO_SHOW;
  const digits = show ? String(total).padStart(MIN_DIGITS, '0').split('') : [];
  const firstSignificant = Math.min(digits.findIndex((d) => d !== '0'), digits.length - 1);
  const revealed = inView && show;

  // Sweep the shine once the last column has landed.
  useEffect(() => {
    if (!revealed) return;
    const id = setTimeout(() => setShine((s) => s + 1), (1.4 + (digits.length - 1) * 0.22) * 1000 - 300);
    return () => clearTimeout(id);
  }, [revealed]); // eslint-disable-line react-hooks/exhaustive-deps

  // The wrapper always renders so useInView has an element to watch from the first render.
  return (
    <span ref={ref} className="visit-counter-slot">
      {show && (
        <motion.span
          className="visit-counter glass"
          aria-label={`${total.toLocaleString('en-US')} visits`}
          role="status"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          whileHover={{ y: -2 }}
          onHoverStart={() => setShine((s) => s + 1)}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="status-dot" aria-hidden="true" />
          <span className="odometer" aria-hidden="true">
            {digits.map((d, i) => (
              <DigitColumn
                // Key from the right, so the ones column stays the ones column if the number grows a digit.
                key={digits.length - i}
                digit={Number(d)}
                revealed={revealed}
                index={i}
                dim={i < firstSignificant}
              />
            ))}
          </span>
          <span className="visit-counter-label" aria-hidden="true">
            visits
          </span>
          {shine > 0 && <span key={shine} className="visit-counter-shine" aria-hidden="true" />}
        </motion.span>
      )}
    </span>
  );
}
