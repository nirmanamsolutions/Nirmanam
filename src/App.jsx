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

function App() {
  // Read initial theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('nirmanam-theme');
    if (saved) return saved;
    const preference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    return preference;
  });

  useEffect(() => {
    // Set attribute on HTML root element
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nirmanam-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    </>
  );
}

export default App;
