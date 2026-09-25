import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../common/Button';
import { siteContent } from '../../data/siteContent';
import { useVideoAutoplay } from '../../utils/useVideoAutoplay';
import { useIsMobile } from '../../utils/useIsMobile';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.25
    }
  }
};

const lineVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  useVideoAutoplay(videoRef);
  const isMobile = useIsMobile(768);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const { staircaseHeading, subheading, ctaPrimary, ctaSecondary, videoUrl } = siteContent.hero;

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#F2F1F0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: isMobile ? '100px' : '120px',
        paddingBottom: '60px'
      }}
    >
      {/* Seamless Globe Video with Multiply Mix-Blend Mode */}
      <motion.div
        style={{
          y: videoY,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            objectFit: 'contain',
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            opacity: 0.9,
            ...(isMobile
              ? {
                  right: '-10%',
                  width: '120%',
                  maxHeight: '60%'
                }
              : {
                  right: '-5%',
                  width: '65%',
                  maxHeight: '90%'
                })
          }}
        />
      </motion.div>

      {/* Scrim Gradient Overlay for Sharp Text Legibility */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isMobile ? '100%' : '65%',
          height: '100%',
          background: isMobile
            ? 'linear-gradient(180deg, #F2F1F0 0%, #F2F1F0 70%, rgba(242,241,240,0.85) 85%, rgba(242,241,240,0) 100%)'
            : 'linear-gradient(90deg, #F2F1F0 0%, #F2F1F0 60%, rgba(242,241,240,0.85) 80%, rgba(242,241,240,0) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Content Area */}
      <motion.div
        style={{
          y: textY,
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-quantico)",
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            lineHeight: 0.98,
            color: '#1a1c1e',
            ...(isMobile
              ? {
                  padding: '0 20px 20px 20px',
                  fontSize: 'clamp(28px, 8.5vw, 44px)'
                }
              : {
                  padding: '0 20px 24px clamp(20px, 8vw, 118px)',
                  fontSize: 'min(clamp(34px, 6.8vw, 72px), 8.5vh)'
                })
          }}
        >
          {staircaseHeading.map((line, index) => (
            <motion.div
              key={index}
              variants={lineVariants}
              style={{
                paddingLeft: (line.indent && !isMobile) ? 'min(220px, 26vw)' : '0px',
                color: line.accent ? 'var(--accent-cyan)' : '#1a1c1e'
              }}
            >
              {line.text}
            </motion.div>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-quantico)",
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            lineHeight: 1.6,
            color: 'var(--text-body)',
            maxWidth: '520px',
            marginBottom: '28px',
            ...(isMobile
              ? { paddingLeft: '20px', paddingRight: '20px' }
              : { paddingLeft: 'calc(clamp(20px, 8vw, 118px) + min(220px, 26vw))' })
          }}
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            ...(isMobile
              ? { paddingLeft: '20px', paddingRight: '20px' }
              : { paddingLeft: 'calc(clamp(20px, 8vw, 118px) + min(220px, 26vw))' })
          }}
        >
          <Button href={ctaPrimary.href} variant="primary">
            {ctaPrimary.text}
          </Button>
          <Button href={ctaSecondary.href} variant="secondary">
            {ctaSecondary.text}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
