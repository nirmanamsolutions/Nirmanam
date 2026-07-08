import React, { useState } from 'react';
import { Send, Heart } from 'lucide-react';
import Reveal from '../animations/Reveal';
import logo from '../assets/logo.png';

// Brand SVGs to replace missing exports in lucide-react 1.23.0
// const Github = ({ size = 18, ...props }) => (
//   <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
//   </svg>
// );

// const Linkedin = ({ size = 18, ...props }) => (
//   <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//     <rect x="2" y="9" width="4" height="12" />
//     <circle cx="4" cy="4" r="2" />
//   </svg>
// );

// const Twitter = ({ size = 18, ...props }) => (
//   <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
//   </svg>
// );

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Blur Background Orb */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        bottom: '-150px',
        left: '5%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.8
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="footer-grid">
          <Reveal delay={0.0} yOffset={10}>
            <div className="footer-brand">
              <a href="#home" className="navbar-brand" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                <div className="logo-icon">
                  <img src={logo} alt="Nirmanam Solutions Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="brand-text">Nirmanam Solutions</span>
              </a>
              <p style={{ marginTop: '0.5rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                Premium engineering studio. We build top-tier software systems, reliable web infrastructure, and high-performance digital platforms tailored to complex business challenges.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} yOffset={10}>
            <div className="footer-column">
              <h4>Capabilities</h4>
              <ul>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}>Web Solutions</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}>Mobile Systems</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}>UI/UX Design</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}>Cloud & DevOps</a></li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16} yOffset={10}>
            <div className="footer-column">
              <h4>Explore</h4>
              <ul>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>About Studio</a></li>
                <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleLinkClick('portfolio'); }}>Case Studies</a></li>
                <li><a href="#process" onClick={(e) => { e.preventDefault(); handleLinkClick('process'); }}>Our Process</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}>Contact Us</a></li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.24} yOffset={10}>
            <div className="footer-column footer-newsletter">
              <h4>Stay Connected</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                Subscribe to receive engineering insights, project case studies, and updates from our studio.
              </p>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'transform 0.3s ease, background-color 0.3s ease'
                  }}
                  className="newsletter-submit-btn"
                >
                  <Send size={16} />
                </button>
              </form>
              {subscribed && (
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.5rem' }}>
                  Subscription successful! Thank you.
                </p>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} yOffset={8}>
          <div className="footer-bottom">
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
              © {new Date().getFullYear()} Nirmanam Solutions.
            </p>
            <p style={{ margin: 0 }}>Engineered with precision for clients globally.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
