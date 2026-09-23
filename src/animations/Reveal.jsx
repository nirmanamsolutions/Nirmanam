import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0, duration = 0.85, yOffset = 35, scaleOffset = 0.94, className = '', style = {} }) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset, scale: scaleOffset, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
