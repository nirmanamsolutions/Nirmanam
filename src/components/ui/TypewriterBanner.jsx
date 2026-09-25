import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TypewriterBanner({
  text = "Nirmanam Solutions. High-performance web applications & modern digital software architecture. Built with precision and speed.",
  speed = 40
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        backgroundColor: 'var(--dark-accent)',
        color: '#15BCDF',
        padding: '24px 30px',
        borderLeft: '4px solid var(--accent-cyan)',
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 'clamp(14px, 1.8vw, 17px)',
        lineHeight: 1.6,
        boxShadow: 'var(--shadow-surface)',
        marginBottom: '36px',
        position: 'relative',
        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span style={{ fontSize: '12px', color: '#6b6f72', marginLeft: '12px', fontFamily: "var(--font-quantico)" }}>
          STUDIO TERMINAL — RUNTIME ACTIVE
        </span>
      </div>
      <p style={{ margin: 0 }}>
        <span style={{ color: '#ffffff', opacity: 0.7 }}>$&nbsp;</span>
        {displayedText}
        <span
          style={{
            opacity: cursorVisible ? 1 : 0,
            display: 'inline-block',
            width: '8px',
            height: '16px',
            backgroundColor: 'var(--accent-cyan)',
            marginLeft: '4px',
            verticalAlign: 'middle'
          }}
        />
      </p>
    </motion.div>
  );
}
