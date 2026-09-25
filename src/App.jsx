import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/common/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CursorGlow } from './components/ui/CursorGlow';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Loader } from './components/ui/Loader';
import { useTabTitle } from './utils/useTabTitle';

function App() {
  // Activate tab-away listener ("We miss you :(" title trigger)
  useTabTitle();

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Apple-style Smooth Entrance 3D Box Loading Animation */}
      <Loader onFinish={() => setIsLoaded(true)} />

      {/* Top Scroll Progress Line */}
      <ScrollProgress />

      {/* Ambient Cursor Follower Spotlight */}
      <CursorGlow />

      {/* Fixed Header Navbar – Stuck at top of viewport screen at all times */}
      <Navbar isLoaded={isLoaded} />

      <main
        style={{
          backgroundColor: 'var(--bg-base)',
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden',
          position: 'relative',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.7s ease-out'
        }}
      >
        {/* Studio Sections */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Fixed Scroll-To-Top Button – Stuck at bottom-right of viewport screen at all times */}
      <ScrollToTop />
    </>
  );
}

export default App;
