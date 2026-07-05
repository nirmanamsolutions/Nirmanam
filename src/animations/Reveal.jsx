import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0, duration = 0.5, yOffset = 25, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
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
