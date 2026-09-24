import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AiButton from './ui/ai-button';
import './Hero.css';

const HERO_SPLINE_URL = 'https://prod.spline.design/tNNdMb63ZeOr0Wz8/scene.splinecode';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const popUpItemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.94,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Hero = ({ isReady = true }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Clean CSS-driven watermark purger (avoids heavy DOM tree scans)
  useEffect(() => {
    const purgeStyle = document.createElement('style');
    purgeStyle.id = 'hero-watermark-purge';
    purgeStyle.textContent = `
      #spline-logo, .spline-watermark, a[href*="spline.design"], a[href*="spline.com"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(purgeStyle);

    return () => {
      const el = document.getElementById('hero-watermark-purge');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    let appInstance = null;
    let isMounted = true;

    async function initSpline() {
      try {
        const { Application } = await import('@splinetool/runtime');
        if (!isMounted || !canvasRef.current) return;

        appInstance = new Application(canvasRef.current);
        await appInstance.load(HERO_SPLINE_URL);

        if (isMounted) {
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: 'hero' } }));
        }

        const handleResize = () => {
          if (appInstance && typeof appInstance.requestRender === 'function') {
            appInstance.requestRender();
          }
        };

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (appInstance) {
              if (entry.isIntersecting) {
                if (typeof appInstance.play === 'function') appInstance.play();
              } else {
                if (typeof appInstance.stop === 'function') appInstance.stop();
              }
            }
          },
          { threshold: 0.05 }
        );

        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('orientationchange', handleResize, { passive: true });
      } catch (err) {
        console.warn('Spline Hero scene load issue:', err);
        if (isMounted) {
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: 'hero' } }));
        }
      }
    }

    initSpline();

    return () => {
      isMounted = false;
      try {
        if (appInstance && typeof appInstance.stop === 'function') {
          appInstance.stop();
        }
        if (appInstance && typeof appInstance.dispose === 'function') {
          appInstance.dispose();
        }
      } catch {
        // Cleanup ignore
      }
    };
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-spline-section" id="home" ref={sectionRef}>
      {/* Background Ambient Radial Glow */}
      <div className="hero-ambient-glow" />

      {/* Responsive Full-Bleed 3D Canvas */}
      <canvas
        id="canvas3d"
        ref={canvasRef}
        className={`hero-spline-canvas ${isLoading ? 'is-loading' : 'is-ready'}`}
      />

      {/* Solid Watermark Masking Cover */}
      <div className="hero-bottom-cover" />

      {/* Hero Content Overlay with Apple-style Staggered Pop-Up Entrance Animation */}
      <motion.div className="hero-content-overlay">
        <motion.div
          className="hero-left-container"
          variants={containerVariants}
          initial="hidden"
          whileInView={isReady ? "visible" : "hidden"}
          viewport={{ once: false, amount: 0.15 }}
        >

          {/* Primary Semantic H1 Tag for search engine indexing */}
          <motion.h1 variants={popUpItemVariants} className="hero-title">
            We're Building <br />
            <span className="gradient-text">Cool Experiences</span>
          </motion.h1>

          <motion.p variants={popUpItemVariants} className="hero-lead">
            Crafting Awesome Stories and Killer Designs to Make Brands Stand Out
          </motion.p>

          <motion.div variants={popUpItemVariants} className="hero-actions-group">
            <AiButton onClick={() => handleScrollTo('portfolio')} variant="primary" icon={<ArrowRight size={16} />}>
              Explore Our Work
            </AiButton>
            <AiButton onClick={() => handleScrollTo('process')} variant="ghost">
              View Our Process
            </AiButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

