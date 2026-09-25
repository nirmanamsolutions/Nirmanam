import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { ChamferCard } from '../common/ChamferCard';
import { Button } from '../common/Button';
import { siteContent } from '../../data/siteContent';
import { useIsMobile } from '../../utils/useIsMobile';

export function PortfolioSection() {
  const isMobile = useIsMobile(700);
  const { staircaseHeading, description, categories, projects } = siteContent.portfolio;
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      style={{
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 8vw, 100px) clamp(20px, 9vw, 118px)'
      }}
    >
      <SectionHeader
        staircaseLines={staircaseHeading}
        description={description}
      />

      {/* Category Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          margin: '28px 0 36px 0'
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                backgroundColor: isActive ? 'var(--accent-cyan)' : 'var(--bg-raised)',
                color: isActive ? '#111111' : 'var(--text-heading)',
                border: isActive ? '1px solid var(--accent-border)' : '1px solid var(--border-subtle)',
                fontFamily: "var(--font-quantico)",
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '10px 20px',
                cursor: 'pointer',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                boxShadow: isActive ? '0 0 14px var(--accent-glow)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '32px'
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChamferCard
                style={{
                  height: '100%',
                  padding: '24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Premium Interactive Project Preview Mockup */}
                  {project.image && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        marginBottom: '24px',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 0 16px rgba(21, 188, 223, 0.08)',
                        backgroundColor: '#0d1117'
                      }}
                    >
                      {/* Top Device Bar */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 14px',
                          backgroundColor: '#161b22',
                          borderBottom: '1px solid #21262d',
                          fontSize: '11px',
                          fontFamily: "var(--font-quantico)",
                          fontWeight: 700,
                          color: '#8b949e',
                          letterSpacing: '0.08em'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                        </div>
                        <span style={{ color: 'var(--accent-cyan)' }}>
                          {project.category === 'mobile' ? 'MOBILE APPLICATION' : 'WEB PLATFORM'}
                        </span>
                      </div>

                      {/* Image Viewport */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '240px',
                          backgroundColor: project.id === 'project-1' ? '#090d14' : '#0d111c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: project.id === 'project-1' ? '16px' : '0px',
                          overflow: 'hidden'
                        }}
                      >
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: project.id === 'project-1' ? 'auto' : '100%',
                            height: project.id === 'project-1' ? 'auto' : '100%',
                            objectFit: project.id === 'project-1' ? 'contain' : 'cover',
                            objectPosition: 'top center',
                            display: 'block',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
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
                      {project.subtitle}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        backgroundColor: 'hsla(190, 83%, 48%, 0.15)',
                        color: 'var(--accent-cyan)',
                        borderRadius: '2px',
                        fontFamily: "var(--font-quantico)"
                      }}
                    >
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(20px, 2.6vw, 26px)',
                      fontWeight: 700,
                      color: 'var(--text-heading)',
                      marginBottom: '12px'
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'var(--text-body)',
                      marginBottom: '20px'
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    {project.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          fontFamily: "var(--font-quantico)",
                          color: 'var(--text-heading)',
                          backgroundColor: 'var(--bg-raised)',
                          border: '1px solid var(--border-subtle)',
                          padding: '4px 10px',
                          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <Button href={project.link} variant="primary" style={{ width: '100%', padding: '14px 22px' }}>
                    {project.linkText}
                  </Button>
                </div>
              </ChamferCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
