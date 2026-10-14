import React, { useState, useEffect } from 'react';
import { Navbar }          from './components/common/Navbar';
import { HeroSection }     from './components/sections/HeroSection';
import { AboutSection }    from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { ProcessSection }  from './components/sections/ProcessSection';
import { ContactSection }  from './components/sections/ContactSection';
import { Footer }          from './components/common/Footer';
import { ScrollProgress }  from './components/ui/ScrollProgress';
import { CursorGlow }      from './components/ui/CursorGlow';
import { ScrollToTop }     from './components/ui/ScrollToTop';
import { Loader }          from './components/ui/Loader';
import { useTabTitle }     from './utils/useTabTitle';
import { siteContent }     from './data/siteContent';

// ── Asset readiness check ────────────────────────────────────────────────────
// Waits for the critical assets that visually define the first paint:
//   • Hero video (can play)
//   • About video (can play)
//   • Portfolio images
//   • Favicon / brand image
// We also enforce a minimum display time so the animation doesn't flash.

const MIN_DISPLAY_MS = 2200; // minimum loader visible time

/** Returns a promise that resolves when a <video> src is ready to play */
function waitForVideo(src) {
  return new Promise(resolve => {
    const v = document.createElement('video');
    v.preload = 'auto';
    v.muted   = true;

    const done = () => resolve();
    v.addEventListener('canplay',     done, { once: true });
    v.addEventListener('canplaythrough', done, { once: true });
    // If video errors (e.g. CloudFront 403 in dev), still resolve so
    // the loader doesn't hang forever.
    v.addEventListener('error',       done, { once: true });

    // Timeout safety — resolve after 8 s regardless
    const t = setTimeout(done, 8000);
    v.addEventListener('canplay', () => clearTimeout(t), { once: true });

    v.src = src;
    v.load();
  });
}

/** Returns a promise that resolves when an image has loaded */
function waitForImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = resolve;
    img.onerror = resolve;   // still resolve on error
    // Timeout safety
    const t = setTimeout(resolve, 6000);
    img.onload = () => { clearTimeout(t); resolve(); };
    img.src = src;
  });
}

function useAssetsReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const criticalAssets = [
      // Videos — the heaviest assets on the page
      waitForVideo(siteContent.hero.videoUrl),
      waitForVideo(siteContent.about.videoUrl),
      // Portfolio images
      ...siteContent.portfolio.projects.map(p => waitForImage(p.image)),
    ];

    Promise.all(criticalAssets).then(() => {
      const elapsed  = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => setReady(true), remaining);
    });
  }, []);

  return ready;
}

// ────────────────────────────────────────────────────────────────────────────

function App() {
  useTabTitle();

  const assetsReady        = useAssetsReady();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Asset-aware Loading Screen */}
      <Loader
        assetsReady={assetsReady}
        onFinish={() => setIsLoaded(true)}
      />

      {/* Top Scroll Progress Line */}
      <ScrollProgress />

      {/* Ambient Cursor Follower Spotlight */}
      <CursorGlow />

      {/* Fixed Header Navbar */}
      <Navbar isLoaded={isLoaded} />

      <main
        style={{
          backgroundColor: 'var(--bg-base)',
          minHeight:       '100vh',
          width:           '100%',
          overflowX:       'hidden',
          position:        'relative',
          opacity:          isLoaded ? 1 : 0,
          transition:      'opacity 0.7s ease-out'
        }}
      >
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Fixed Scroll-To-Top Button */}
      <ScrollToTop />
    </>
  );
}

export default App;
