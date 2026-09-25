import React from 'react';
import { motion } from 'framer-motion';

export function Button({
  children = "GET STARTED",
  onClick,
  href,
  variant = "primary", // primary | secondary | outline
  className = "",
  style = {},
  type = "button"
}) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  const baseStyle = {
    fontFamily: "var(--font-quantico)",
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    padding: '16px 32px',
    fontSize: 'clamp(13px, 2.2vw, 15px)',
    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
    border: isPrimary ? '1px solid var(--accent-border)' : '1px solid var(--border-subtle)',
    backgroundColor: isPrimary ? 'var(--accent-cyan)' : isSecondary ? 'var(--bg-raised)' : 'transparent',
    color: isPrimary ? '#111111' : 'var(--text-heading)',
    boxShadow: isPrimary
      ? '0 0 0 1px rgba(21, 188, 223, 0.35), 0 10px 30px -12px rgba(15, 163, 194, 0.6)'
      : 'var(--shadow-surface)',
    position: 'relative',
    zIndex: 5,
    transition: 'background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease',
    ...style
  };

  const content = (
    <>
      <span>{children}</span>
      <motion.span
        initial={{ width: '20px' }}
        whileHover={{ width: '30px' }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          height: '1px',
          backgroundColor: isPrimary ? '#111111' : 'var(--text-heading)',
          marginLeft: '12px',
          display: 'inline-block',
          flexShrink: 0
        }}
      />
    </>
  );

  const handleClick = (e) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onClick) onClick(e);
  };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        className={`chamfer-btn ${className}`}
        whileHover={{
          scale: 1.03,
          backgroundColor: isPrimary ? 'var(--accent-hover)' : 'var(--bg-raised)',
          boxShadow: isPrimary
            ? '0 0 0 1px rgba(63, 208, 239, 0.6), 0 12px 35px -8px rgba(21, 188, 223, 0.85)'
            : 'var(--shadow-raised)'
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        style={baseStyle}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={`chamfer-btn ${className}`}
      whileHover={{
        scale: 1.03,
        backgroundColor: isPrimary ? 'var(--accent-hover)' : 'var(--bg-raised)',
        boxShadow: isPrimary
          ? '0 0 0 1px rgba(63, 208, 239, 0.6), 0 12px 35px -8px rgba(21, 188, 223, 0.85)'
          : 'var(--shadow-raised)'
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      style={baseStyle}
    >
      {content}
    </motion.button>
  );
}
