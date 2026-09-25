import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FlipFadeText({ words = ["QUALITY", "PRECISION", "EXCELLENCE", "TRUST"], interval = 2500 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 20px',
        backgroundColor: 'var(--bg-raised)',
        border: '1px solid var(--accent-cyan)',
        color: 'var(--accent-cyan)',
        fontFamily: "var(--font-quantico)",
        fontWeight: 700,
        fontSize: 'clamp(14px, 2vw, 18px)',
        letterSpacing: '0.15em',
        minWidth: '160px',
        height: '42px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 15px var(--accent-glow)',
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 18, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -18, rotateX: 90 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', transformOrigin: 'center center' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
