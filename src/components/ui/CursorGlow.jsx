import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom follower on desktop pointing devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.card-top-highlight') ||
        e.target.closest('input') ||
        e.target.closest('select') ||
        e.target.closest('textarea')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      animate={{
        x: position.x - (isHovered ? 24 : 12),
        y: position.y - (isHovered ? 24 : 12),
        scale: isHovered ? 1.6 : 1,
        opacity: isHovered ? 0.45 : 0.2
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 350,
        mass: 0.2
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-cyan)',
        boxShadow: '0 0 25px 8px var(--accent-cyan)',
        pointerEvents: 'none',
        zIndex: 9998,
        mixBlendMode: 'multiply'
      }}
    />
  );
}
