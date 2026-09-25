import React from 'react';
import { motion } from 'framer-motion';

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.12,
        backgroundColor: 'var(--accent-cyan)',
        color: '#111111',
        boxShadow: '0 0 24px var(--accent-glow), 0 8px 20px rgba(0,0,0,0.2)'
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 990,
        width: '48px',
        height: '48px',
        backgroundColor: '#111111',
        color: 'var(--accent-cyan)',
        border: '1.5px solid var(--accent-cyan)',
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(0,0,0,0.25), 0 0 12px var(--accent-glow)',
        outline: 'none'
      }}
    >
          {/* Custom Sleek Upward Arrow */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </motion.button>
  );
}
