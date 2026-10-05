import { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// Reveals `text` left to right, with the unrevealed part shown as random letters.
export default function ScrambleText({ text, duration = 1.2, delay = 0 }) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let lastTick = 0;
    const controls = animate(0, 1, {
      duration,
      delay,
      ease: 'linear',
      onUpdate: (p) => {
        const now = performance.now();
        if (p < 1 && now - lastTick < 50) return;
        lastTick = now;
        const revealed = Math.floor(p * text.length);
        let next = text.slice(0, revealed);
        for (let i = revealed; i < text.length; i++) {
          next += text[i] === '-' ? '-' : randomChar();
        }
        setOutput(next);
      },
      onComplete: () => setOutput(text),
    });
    return () => controls.stop();
  }, [text, duration, delay, reduce]);

  return <>{output}</>;
}
