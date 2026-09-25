import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const { brandStatement, capabilities, explore, newsletterHeader, newsletterDescription, copyright } = siteContent.footer;
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubSuccess(true);
      setTimeout(() => {
        setSubSuccess(false);
        setSubscribedEmail('');
      }, 4000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--dark-accent)',
        color: '#ffffff',
        padding: 'clamp(50px, 6vw, 80px) clamp(20px, 5vw, 60px) 36px clamp(20px, 9vw, 118px)',
        borderTop: '2px solid var(--accent-cyan)'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}
      >
        {/* Column 1: Studio Brand Statement */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <BrandLogo size={38} showText={true} textColor="#ffffff" text="Nirmanam Solutions" />
          </div>

          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-body)', margin: 0 }}>
            {brandStatement}
          </p>
        </div>

        {/* Column 2: Capabilities */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-quantico)",
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            CAPABILITIES
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {capabilities.map((cap, idx) => (
              <li key={idx}>
                <a
                  href="#services"
                  style={{
                    color: '#a0a5aa',
                    fontSize: '14px',
                    fontFamily: "var(--font-quantico)",
                    transition: 'color 0.2s ease'
                  }}
                >
                  {cap}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Explore */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-quantico)",
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            EXPLORE
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {explore.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  style={{
                    color: '#a0a5aa',
                    fontSize: '14px',
                    fontFamily: "var(--font-quantico)",
                    transition: 'color 0.2s ease'
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter Subscription */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-quantico)",
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            {newsletterHeader}
          </h4>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-body)', marginBottom: '16px' }}>
            {newsletterDescription}
          </p>

          {subSuccess ? (
            <div style={{ color: 'var(--accent-cyan)', fontSize: '13px', fontWeight: 700 }}>
              ✓ SUBSCRIBED TO STUDIO INSIGHTS
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="enter email..."
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  backgroundColor: '#1d2126',
                  border: '1px solid #333942',
                  color: '#ffffff',
                  fontFamily: "var(--font-quantico)",
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-hover)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: 'var(--accent-cyan)',
                  color: '#111111',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '12px',
                  fontFamily: "var(--font-quantico)",
                  padding: '10px 16px',
                  cursor: 'pointer',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                }}
              >
                JOIN
              </motion.button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div
        style={{
          paddingTop: '24px',
          borderTop: '1px solid #262b32',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '13px',
          color: '#6b6f72',
          fontFamily: "var(--font-quantico)"
        }}
      >
        <div>{copyright}</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href={siteContent.branding.github} target="_blank" rel="noreferrer" style={{ color: '#a0a5aa' }}>
            GitHub
          </a>
          <a href={siteContent.branding.linkedin} target="_blank" rel="noreferrer" style={{ color: '#a0a5aa' }}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
