import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { Component as AiLoader } from './components/ui/ai-loader';
import { ArrowUp } from 'lucide-react';
import NotFound from './components/NotFound';
import FpsDiagnostics from './components/FpsDiagnostics';
import ParticleCanvas from './animations/ParticleCanvas';

import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import HowWeWork from './components/HowWeWork';
import Contact from './components/Contact';

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [is404, setIs404] = useState(() => typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '');

  // Complete Asset & 3D Model Readiness Gate Coordinator
  useEffect(() => {
    let isMounted = true;
    let splineReady = false;
    let fontsReady = false;
    let windowLoaded = false;

    const checkAllReady = () => {
      if (splineReady && fontsReady && (windowLoaded || document.readyState === 'complete')) {
        setTimeout(() => {
          if (isMounted) setIsInitialLoading(false);
        }, 400);
      }
    };

    const handleModelReady = () => {
      splineReady = true;
      checkAllReady();
    };

    window.addEventListener('spline-model-ready', handleModelReady);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsReady = true;
        checkAllReady();
      }).catch(() => {
        fontsReady = true;
        checkAllReady();
      });
    } else {
      fontsReady = true;
    }

    if (document.readyState === 'complete') {
      windowLoaded = true;
      checkAllReady();
    } else {
      const handleLoad = () => {
        windowLoaded = true;
        checkAllReady();
      };
      window.addEventListener('load', handleLoad);
    }

    // Safety fallback (9s) to prevent frozen UI on degraded network
    const safetyTimer = setTimeout(() => {
      if (isMounted) setIsInitialLoading(false);
    }, 9000);

    return () => {
      isMounted = false;
      window.removeEventListener('spline-model-ready', handleModelReady);
      clearTimeout(safetyTimer);
    };
  }, []);

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Tab Visibility Title Manager (Changes title only when user switches away from tab)
  useEffect(() => {
    const mainTitle = 'Nirmanam Solutions – Premium Software Engineering & Design Studio';
    const awayTitle = 'We miss you :( | Nirmanam Solutions';

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = mainTitle;
      }
    };

    let scrollTimer = null;
    const body = document.body;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      if (!body.classList.contains('is-scrolling')) {
        body.classList.add('is-scrolling');
      }

      if (scrollTimer) clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        body.classList.remove('is-scrolling');
      }, 150);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

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

  if (is404) {
    return <NotFound onBackHome={() => { window.history.pushState({}, '', '/'); setIs404(false); }} />;
  }

  return (
    <>
      {/* Initial Preloader */}
      <AnimatePresence mode="wait">
        {isInitialLoading && (
          <motion.div
            key="initial-app-loader"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
              WebkitBackdropFilter: 'blur(32px) saturate(190%)'
            }}
          >
            <AiLoader text="Nirmanam Solutions" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Interactive Network Mesh */}
      <div className="particle-container">
        <ParticleCanvas />
      </div>

      {/* Main Page Layout */}
      <Navbar onLetsTalkClick={scrollToContact} isReady={!isInitialLoading} />

      <main>
        <Hero onLetsTalkClick={scrollToContact} isReady={!isInitialLoading} />
        <About />
        <Services />
        <Portfolio />
        <HowWeWork />
        <Contact />
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

      {/* FPS Diagnostic HUD & Performance Monitor */}
      <FpsDiagnostics />
    </>
  );
}

export default App;

