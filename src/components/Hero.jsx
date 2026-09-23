import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
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

const Hero = ({ onLetsTalkClick, isReady = true }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Parallax scroll effects scoped to Hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Comprehensive Shadow DOM & Document Spline Watermark Purger
  useEffect(() => {
    const purgeAllWatermarks = () => {
      // 1. Traverse document elements and Shadow Roots
      const inspectAndPurge = (root) => {
        if (!root) return;
        const allEls = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];

        allEls.forEach((el) => {
          // Inspect Shadow Roots
          if (el.shadowRoot) {
            if (!el.shadowRoot.querySelector('#anti-watermark-style')) {
              const style = document.createElement('style');
              style.id = 'anti-watermark-style';
              style.textContent = `
                #spline-logo, .spline-watermark, a[href*="spline"], div[style*="fixed"], #logo, #watermark, [part="logo"] {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  width: 0 !important;
                  height: 0 !important;
                }
              `;
              try {
                el.shadowRoot.appendChild(style);
              } catch {
                // Ignore style append errors
              }
            }
            inspectAndPurge(el.shadowRoot);
          }

          // Check direct element attributes
          const tag = el.tagName ? el.tagName.toUpperCase() : '';
          const text = (el.innerText || el.textContent || '').trim();
          const href = el.getAttribute ? (el.getAttribute('href') || '') : '';
          const id = el.id || '';
          const className = typeof el.className === 'string' ? el.className : '';

          // Protect all our custom app elements
          if (
            el === canvasRef.current ||
            tag === 'BODY' ||
            tag === 'SECTION' ||
            tag === 'CANVAS' ||
            tag === 'NAV' ||
            tag === 'IFRAME' ||
            className.includes('hero-') ||
            className.includes('stage') ||
            className.includes('spline-canvas-box') ||
            className.includes('about') ||
            className.includes('services') ||
            className.includes('portfolio') ||
            className.includes('btn') ||
            id.includes('home') ||
            id.includes('about')
          ) {
            return;
          }

          if (
            text === 'Built with Spline' ||
            text.includes('Built with Spline') ||
            (tag === 'A' && (href.includes('spline.design') || href.includes('spline.com'))) ||
            id === 'spline-logo' ||
            className.includes('spline-watermark')
          ) {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('pointer-events', 'none', 'important');
            el.style.setProperty('width', '0px', 'important');
            el.style.setProperty('height', '0px', 'important');
          }
        });
      };

      inspectAndPurge(document);

      // 2. Scan fixed/absolute elements anchored near bottom right
      const candidates = document.querySelectorAll('div, a');
      candidates.forEach((el) => {
        if (
          el === canvasRef.current ||
          el.classList.contains('hero-content-overlay') ||
          el.classList.contains('hero-left-container') ||
          el.classList.contains('hero-text-card') ||
          el.classList.contains('hero-spline-section') ||
          el.classList.contains('hero-bottom-cover') ||
          el.classList.contains('hero-corner-mask') ||
          el.classList.contains('scroll-to-top')
        ) {
          return;
        }
        const style = window.getComputedStyle(el);
        if (
          (style.position === 'fixed' || style.position === 'absolute') &&
          (style.bottom === '16px' || style.bottom === '20px' || parseInt(style.bottom, 10) < 45) &&
          (style.right === '16px' || style.right === '20px' || parseInt(style.right, 10) < 45)
        ) {
          if (el.innerText?.includes('Spline') || el.innerHTML?.includes('spline') || el.querySelector?.('a[href*="spline"]')) {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('pointer-events', 'none', 'important');
          }
        }
      });
    };

    purgeAllWatermarks();
    const timer1 = setTimeout(purgeAllWatermarks, 500);
    const timer2 = setTimeout(purgeAllWatermarks, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    let appInstance = null;
    let isMounted = true;

    async function initSpline() {
      try {
        const { Application } = await import('@splinetool/runtime');
        if (!isMounted || !canvasRef.current) return;

        // Initialize Spline Application with htmlContentMode: 'inline'
        appInstance = new Application(canvasRef.current, { htmlContentMode: 'inline' });
        await appInstance.load(HERO_SPLINE_URL);

        if (isMounted) {
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: 'hero' } }));
        }

        // Handle responsive canvas resize across desktop and mobile orientation changes
        const handleResize = () => {
          if (appInstance && typeof appInstance.requestRender === 'function') {
            appInstance.requestRender();
          }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
      } catch (err) {
        console.warn('Spline Hero scene load issue:', err);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
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
      <motion.div className="hero-content-overlay" style={{ y: contentY }}>
        <motion.div
          className="hero-left-container"
          variants={containerVariants}
          initial="hidden"
          whileInView={isReady ? "visible" : "hidden"}
          viewport={{ once: false, amount: 0.15 }}
        >

          <motion.h1 variants={popUpItemVariants} className="hero-title">
            We're Building <br />
            <span className="gradient-text">Cool Experiences</span>
          </motion.h1>

          <motion.p variants={popUpItemVariants} className="hero-lead">
            Crafting Awesome Stories and Killer Designs to Make Brand Stand Out
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
