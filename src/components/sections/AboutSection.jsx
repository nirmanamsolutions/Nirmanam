import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { ChamferCard } from '../common/ChamferCard';
import { FlipFadeText } from '../ui/FlipFadeText';
import { VideoPlayer } from '../ui/VideoPlayer';
import { siteContent } from '../../data/siteContent';
import { useIsMobile } from '../../utils/useIsMobile';

export function AboutSection() {
  const isMobile = useIsMobile(700);
  const { staircaseHeading, description, highlights, values, videoUrl } = siteContent.about;

  return (
    <section
      id="about"
      style={{
        background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-surface) 18%, var(--bg-surface) 100%)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 8vw, 100px) clamp(20px, 9vw, 118px)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'clamp(32px, 5vw, 70px)'
        }}
      >
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '1 1 420px', minWidth: '280px' }}
        >
          <SectionHeader
            staircaseLines={staircaseHeading}
            description={description}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              margin: isMobile ? '24px 0 0 0' : '24px 0 0 min(160px, 18vw)',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-quantico)",
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.1em'
              }}
            >
              FOCUS:
            </span>
            <FlipFadeText words={highlights} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ margin: isMobile ? '32px 0 0 0' : '32px 0 0 min(160px, 18vw)' }}
          >
            <Button href="#services" variant="primary">
              OUR SERVICES
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column Video */}
        <div style={{ flex: '1 1 360px', minWidth: '280px', display: 'flex', justifyContent: 'flex-end' }}>
          <VideoPlayer src={videoUrl} hasHueOverlay={true} maxWidth="560px" />
        </div>
      </div>

      {/* 5 Core Values Grid */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          marginTop: 'clamp(48px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        {values.map((item) => (
          <ChamferCard
            key={item.id}
            style={{
              height: '100%',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                fontFamily: "var(--font-quantico)",
                marginBottom: '8px',
                letterSpacing: '0.08em'
              }}
            >
              // {item.id}
            </div>
            <h3
              style={{
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                fontWeight: 700,
                color: 'var(--text-heading)',
                marginBottom: '8px'
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: 'var(--text-body)',
                margin: 0
              }}
            >
              {item.description}
            </p>
          </ChamferCard>
        ))}
      </motion.div>
    </section>
  );
}
