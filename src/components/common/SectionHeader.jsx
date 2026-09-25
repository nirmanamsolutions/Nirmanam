import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../utils/useIsMobile';

export function SectionHeader({
  staircaseLines = [],
  description,
  className = ""
}) {
  const isMobile = useIsMobile(700);

  return (
    <div className={`section-header-wrapper ${className}`} style={{ marginBottom: '28px' }}>
      {/* Staircase H2 */}
      {staircaseLines.length > 0 && (
        <h2
          style={{
            fontFamily: "var(--font-quantico)",
            fontSize: 'clamp(28px, 5.5vw, 68px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            lineHeight: 0.98,
            color: 'var(--text-heading)'
          }}
        >
          {staircaseLines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                paddingLeft: (line.indent && !isMobile) ? 'min(160px, 18vw)' : '0px',
                color: line.accent ? 'var(--accent-cyan)' : 'var(--text-heading)'
              }}
            >
              {line.text}
            </motion.div>
          ))}
        </h2>
      )}

      {/* Description Copy */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            maxWidth: '560px',
            margin: '20px 0 0 0',
            paddingLeft: (staircaseLines.some(l => l.indent) && !isMobile) ? 'min(160px, 18vw)' : '0px',
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            lineHeight: 1.7,
            color: 'var(--text-body)',
            fontFamily: "var(--font-quantico)"
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
