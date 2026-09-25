import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { ChamferCard } from '../common/ChamferCard';
import { siteContent } from '../../data/siteContent';
import { useIsMobile } from '../../utils/useIsMobile';

export function ProcessSection() {
  const isMobile = useIsMobile(700);
  const { staircaseHeading, description, phases } = siteContent.process;
  const [expandedPhase, setExpandedPhase] = useState(0);

  return (
    <section
      id="process"
      style={{
        backgroundColor: 'var(--bg-base)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 8vw, 100px) clamp(20px, 9vw, 118px)'
      }}
    >
      <SectionHeader
        staircaseLines={staircaseHeading}
        description={description}
      />

      {/* Timeline Layout */}
      <div style={{ marginTop: 'clamp(32px, 4vw, 48px)', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {phases.map((item, idx) => {
            const isExpanded = expandedPhase === idx;

            return (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <ChamferCard
                  onClick={() => setExpandedPhase(isExpanded ? null : idx)}
                  hoverable={true}
                  style={{
                    padding: '20px 24px',
                    borderColor: isExpanded ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: isExpanded ? 'var(--accent-cyan)' : 'var(--bg-raised)',
                          color: isExpanded ? '#111111' : 'var(--accent-cyan)',
                          border: '1.5px solid var(--accent-cyan)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                          fontFamily: "var(--font-quantico)",
                          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--accent-cyan)',
                            fontFamily: "var(--font-quantico)",
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {item.phase}
                        </span>
                        <h3
                          style={{
                            fontSize: 'clamp(18px, 2.2vw, 22px)',
                            fontWeight: 700,
                            color: 'var(--text-heading)',
                            margin: '3px 0 0 0'
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '13.5px', color: 'var(--text-body)', display: isMobile ? 'none' : 'block' }}>
                        {item.summary}
                      </span>
                      <button
                        aria-label="Toggle details"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--accent-cyan)',
                          fontSize: '20px',
                          cursor: 'pointer',
                          fontWeight: 700
                        }}
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}
                      >
                        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-body)', marginBottom: '14px' }}>
                          {item.details}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                          {item.checkpoints.map((cp, cIdx) => (
                            <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-body)' }}>
                              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>◆</span>
                              <span>{cp}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ChamferCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
