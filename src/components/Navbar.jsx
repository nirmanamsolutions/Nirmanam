import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import logo from '../assets/logo.webp';
import AiButton from './ui/ai-button';

const Navbar = ({ theme, toggleTheme, onLetsTalkClick, isReady = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ['home', 'about', 'services', 'portfolio', 'process', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setActiveLink(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={`navbar-container ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -40, opacity: 0, scale: 0.96 }}
        animate={isReady ? { y: 0, opacity: 1, scale: 1 } : { y: -40, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="navbar">
          {/* Brand/Logo */}
          <a href="#home" className="navbar-brand" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
            <div className="logo-icon">
              <img src={logo} alt="Nirmanam Solutions Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span className="brand-text">Nirmanam Solutions</span>
          </a>

          {/* Navigation Links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                href="#home"
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about"
                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>About</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#services"
                className={`nav-link ${activeLink === 'services' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span>Services</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#portfolio"
                className={`nav-link ${activeLink === 'portfolio' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('portfolio'); }}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 3h6v4"></path>
                  <path d="m22 7-10-4-10 4"></path>
                </svg>
                <span>Work</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#process"
                className={`nav-link ${activeLink === 'process' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('process'); }}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Process</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Contact</span>
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn desktop-only-theme"
                aria-label="Toggle theme"
                style={{ width: '34px', height: '34px', border: 'none', background: 'rgba(255,255,255,0.05)' }}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </li>
            <li className="nav-item">
              <AiButton variant="primary" onClick={(e) => { e.preventDefault(); onLetsTalkClick(); }}>
                Let's Talk
              </AiButton>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <div className="mobile-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn mobile-only-theme"
              aria-label="Toggle theme"
              style={{ width: '38px', height: '38px', border: 'none', background: 'rgba(255,255,255,0.05)' }}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
            >
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <a href="#home" className="mobile-menu-brand" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
            <div className="logo-icon">
              <img src={logo} alt="Nirmanam Solutions Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span className="brand-text">Nirmanam Solutions</span>
          </a>
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
            <span>&times;</span>
          </button>
        </div>

        <ul className="mobile-menu-nav">
          <li className="mobile-menu-item">
            <a
              href="#home"
              className={`mobile-menu-link ${activeLink === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li className="mobile-menu-item">
            <a
              href="#about"
              className={`mobile-menu-link ${activeLink === 'about' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>About</span>
            </a>
          </li>
          <li className="mobile-menu-item">
            <a
              href="#services"
              className={`mobile-menu-link ${activeLink === 'services' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>Services</span>
            </a>
          </li>
          <li className="mobile-menu-item">
            <a
              href="#portfolio"
              className={`mobile-menu-link ${activeLink === 'portfolio' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick('portfolio'); }}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 3h6v4"></path>
                <path d="m22 7-10-4-10 4"></path>
              </svg>
              <span>Work</span>
            </a>
          </li>
          <li className="mobile-menu-item">
            <a
              href="#process"
              className={`mobile-menu-link ${activeLink === 'process' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick('process'); }}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Process</span>
            </a>
          </li>
          <li className="mobile-menu-item">
            <a
              href="#contact"
              className={`mobile-menu-link ${activeLink === 'contact' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}
            >
              <svg className="mobile-menu-icon" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Contact</span>
            </a>
          </li>
        </ul>

        <div className="mobile-cta">
          <AiButton variant="primary" className="btn-full" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onLetsTalkClick(); }}>
            Let's Talk
          </AiButton>
        </div>
      </div>
    </>
  );
};

export default Navbar;
