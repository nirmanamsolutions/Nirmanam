import React from 'react';
import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: 'var(--accent-cyan)',
        boxShadow: '0 0 10px var(--accent-cyan), 0 0 20px var(--accent-hover)',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
}
