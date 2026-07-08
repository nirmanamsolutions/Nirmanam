import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import HowWeWork from './components/HowWeWork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './animations/ParticleCanvas';
import { ArrowUp } from 'lucide-react';

function App() {
  // Read initial theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('Nirmanam Solutions-theme');
    if (saved) return saved;
    const preference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    return preference;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Set attribute on HTML root element
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('Nirmanam Solutions-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
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
      {/* Background Interactive Network Mesh */}
      <div className="particle-container">
        <ParticleCanvas theme={theme} />
      </div>

      {/* Main Page Layout */}
      <Navbar theme={theme} toggleTheme={toggleTheme} onLetsTalkClick={scrollToContact} />
      <main>
        <Hero onLetsTalkClick={scrollToContact} />
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
    </>
  );
}

export default App;
