import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ChamferCard({
  children,
  className = "",
  style = {},
  onClick,
  hoverable = true,
  chamferSize = 16
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!hoverable || window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotateX(-y / 25);
    setRotateY(x / 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-top-highlight ${className}`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={hoverable ? { y: -8, scale: 1.015 } : {}}
      animate={{ rotateX, rotateY }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        rotateX: { type: 'spring', stiffness: 300, damping: 20 },
        rotateY: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderTop: '1px solid var(--border-highlight)',
        padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 32px)',
        position: 'relative',
        transformStyle: 'preserve-3d',
        clipPath: `polygon(0 0, calc(100% - ${chamferSize}px) 0, 100% ${chamferSize}px, 100% 100%, ${chamferSize}px 100%, 0 calc(100% - ${chamferSize}px))`,
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}
