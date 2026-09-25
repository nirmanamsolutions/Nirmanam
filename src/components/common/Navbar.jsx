import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '../../data/siteContent';
import { useIsMobile } from '../../utils/useIsMobile';
import { BrandLogo } from './BrandLogo';

export function Navbar({ isLoaded = true }) {
  const isMobile = useIsMobile(840);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // IntersectionObserver to detect current visible section
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = siteContent.nav.links;

  return (
    <motion.header
      initial={{ opacity: 0, y: -35 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        y: isLoaded ? 0 : -35
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        pointerEvents: isLoaded ? 'all' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'clamp(16px, 3vw, 40px)',
        padding: isMobile
          ? '12px 20px'
          : scrolled
            ? '14px clamp(20px, 4vw, 48px)'
            : '20px clamp(20px, 4vw, 48px)',
        backgroundColor: scrolled
          ? 'rgba(242, 241, 240, 0.96)'
          : 'rgba(242, 241, 240, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(0, 0, 0, 0.06)'
          : '0 2px 10px rgba(0, 0, 0, 0.03)',
        transition: 'padding 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {/* Sleek Brand Logo Icon & Capital N */}
      <motion.a
        href="#home"
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          x: isLoaded ? 0 : -20
        }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ textDecoration: 'none' }}
      >
        <BrandLogo size={40} showText={true} textColor="#111111" text="Nirmanam Solutions" />
      </motion.a>

      {!isMobile ? (
        /* Desktop Navigation Links with Pure Text Glow Active Indicator (NO BOX) */
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 3.5vw, 44px)', marginLeft: 'auto' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 2.5vw, 34px)' }}>
            {navLinks.map((item, index) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{
                    opacity: isLoaded ? 1 : 0,
                    y: isLoaded ? 0 : -15
                  }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2, color: 'var(--accent-cyan)' }}
                  style={{
                    fontFamily: "var(--font-quantico)",
                    fontWeight: 700,
                    fontSize: 'clamp(13px, 1.8vw, 15px)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    position: 'relative',
                    color: isActive ? 'var(--accent-cyan)' : '#1a1c1e',
                    textShadow: isActive
                      ? '0 0 10px rgba(21, 188, 223, 0.9), 0 0 20px rgba(21, 188, 223, 0.5)'
                      : 'none',
                    transition: 'color 0.3s ease, text-shadow 0.3s ease'
                  }}
                >
                  {item.name}
                  {/* Subtle Glowing Dot Indicator underneath text */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: '50%',
                        x: '-50%',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-cyan)',
                        boxShadow: '0 0 8px var(--accent-cyan), 0 0 14px var(--accent-hover)'
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* High Contrast Contact CTA Button */}
          <motion.a
            href="#contact"
            className="chamfer-contact-btn"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 0.85
            }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              backgroundColor: 'var(--accent-cyan)',
              color: '#111111',
              scale: 1.04,
              boxShadow: '0 8px 25px -4px rgba(21, 188, 223, 0.6)'
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              backgroundColor: '#111111',
              color: 'var(--accent-cyan)',
              border: '1.5px solid var(--accent-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '12px 24px',
              fontFamily: "var(--font-quantico)",
              fontSize: 'clamp(12px, 1.6vw, 14px)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
            }}
          >
            <span>{siteContent.nav.cta}</span>
            <motion.svg
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              width="15"
              height="12"
              viewBox="0 0 17 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              style={{ flexShrink: 0 }}
            >
              <rect x="1" y="1" width="15" height="11" rx="1" />
              <path d="M1 2.5L8.5 7.5L16 2.5" />
            </motion.svg>
          </motion.a>
        </div>
      ) : (
        /* Mobile Hamburger & Glass Drawer */
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
            style={{
              background: '#111111',
              border: '1.5px solid var(--accent-cyan)',
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{ width: '22px', height: '2px', backgroundColor: 'var(--accent-cyan)', display: 'block' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ width: '22px', height: '2px', backgroundColor: 'var(--accent-cyan)', display: 'block' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{ width: '22px', height: '2px', backgroundColor: 'var(--accent-cyan)', display: 'block' }}
            />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'fixed',
                  top: '68px',
                  right: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0,0,0,0.12)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  zIndex: 200,
                  clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)'
                }}
              >
                {navLinks.map((item, idx) => {
                  const targetId = item.href.replace('#', '');
                  const isActive = activeSection === targetId;

                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      style={{
                        fontFamily: "var(--font-quantico)",
                        fontWeight: 700,
                        fontSize: '16px',
                        color: isActive ? 'var(--accent-cyan)' : '#111111',
                        textShadow: isActive ? '0 0 10px rgba(21, 188, 223, 0.8)' : 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        paddingBottom: '8px',
                        borderBottom: '1px solid var(--border-subtle)'
                      }}
                    >
                      {item.name} {isActive && '✦'}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    backgroundColor: '#111111',
                    color: 'var(--accent-cyan)',
                    border: '1px solid var(--accent-cyan)',
                    padding: '14px 20px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginTop: '6px',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                  }}
                >
                  {siteContent.nav.cta}
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.header>
  );
}
