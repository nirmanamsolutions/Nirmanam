import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ParticleCanvas from './animations/ParticleCanvas';
import { Component as AiLoader } from './components/ui/ai-loader';
import { ArrowUp } from 'lucide-react';

// Lazy-loaded heavy below-the-fold sections for instant initial bundle boot
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const HowWeWork = lazy(() => import('./components/HowWeWork'));
const Contact = lazy(() => import('./components/Contact'));

// Zero-CLS Skeleton Section Placeholder
const SectionSkeleton = ({ height = '600px', id }) => (
  <section id={id} style={{ minHeight: height, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
    <div style={{ opacity: 0.12, width: '90%', maxWidth: '1200px', height: '70%', borderRadius: '24px', background: 'var(--border-color, rgba(255,255,255,0.05))', animation: 'pulse 1.8s ease-in-out infinite' }} />
  </section>
);

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadedModelsCount, setLoadedModelsCount] = useState(0);

  // Total required live 3D models (Hero = 1)
  const requiredModelsCount = 1;

  // 3D Model Loading Coordinator Gate: Loading screen does NOT end until all 3D models are rendered
  useEffect(() => {
    const handleModelReady = () => {
      setLoadedModelsCount((prev) => prev + 1);
    };

    window.addEventListener('spline-model-ready', handleModelReady);

    // Safety fallback timer (max 10s window so network delay never permanently freezes)
    const safetyTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 10000);

    return () => {
      window.removeEventListener('spline-model-ready', handleModelReady);
      clearTimeout(safetyTimer);
    };
  }, []);

  // When all required 3D models report ready, trigger smooth 60fps fade out
  useEffect(() => {
    if (loadedModelsCount >= requiredModelsCount) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loadedModelsCount, requiredModelsCount]);

  const loadingProgress = Math.min(
    100,
    Math.round((loadedModelsCount / requiredModelsCount) * 100)
  );

  // Read initial theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('Nirmanam Solutions-theme');
    if (saved) return saved;
    const preference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    return preference;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('Nirmanam Solutions-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Initial Liquid Glass Preloader - Holds until 100% 3D Models Rendered */}
      <AnimatePresence mode="wait">
        {isInitialLoading && (
          <motion.div
            key="initial-app-loader"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'var(--bg-primary)',
              zIndex: 9999999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              backdropFilter: 'blur(32px) saturate(190%)',
              WebkitBackdropFilter: 'blur(32px) saturate(190%)',
              willChange: 'transform, opacity, filter',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <AiLoader text="Nirmanam Solutions" progress={loadingProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Interactive Network Mesh */}
      <div className="particle-container">
        <ParticleCanvas theme={theme} />
      </div>

      {/* Main Page Layout */}
      {!isInitialLoading && (
        <Navbar theme={theme} toggleTheme={toggleTheme} onLetsTalkClick={scrollToContact} isReady={!isInitialLoading} />
      )}
      <main>
        <Hero onLetsTalkClick={scrollToContact} isReady={!isInitialLoading} />

        <Suspense fallback={<SectionSkeleton id="about" height="650px" />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionSkeleton id="services" height="750px" />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionSkeleton id="portfolio" height="680px" />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SectionSkeleton id="process" height="750px" />}>
          <HowWeWork />
        </Suspense>

        <Suspense fallback={<SectionSkeleton id="contact" height="650px" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}

export default App;
