import React, { useState } from 'react';
import { ShieldCheck, Award, Clock } from 'lucide-react';
import Reveal from '../animations/Reveal';

const About = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit rotation to 12 degrees
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const values = [
    {
      icon: <ShieldCheck size={20} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Client-Centered Partnership",
      desc: "We focus on long-term partnerships. We align closely with your development team to build tools that drive value."
    },
    {
      icon: <Award size={20} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Engineering Excellence",
      desc: "No quick shortcuts. We write modular, well-tested code that scales seamlessly under heavy business loads."
    },
    {
      icon: <Clock size={20} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Punctuality & Transparency",
      desc: "Clear timelines, daily communication, and transparent Git logs. We treat your launch deadlines as our own."
    }
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="hero-grid" style={{ gap: '6rem' }}>
          <Reveal yOffset={30}>
            <div>
              <div className="section-tag">Our Philosophy</div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                We help Indian startups <span className="gradient-text">build quality products</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                At Nirmanam Solutions, we understand the challenges Indian founders face. We provide affordable, transparent, and quality software development so you can focus on growing your business.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {values.map((val, idx) => (
                  <Reveal key={idx} delay={idx * 0.15} yOffset={15}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(99, 102, 241, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {val.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{val.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>{val.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              perspective: '1000px'
            }}
          >
            <Reveal delay={0.2} yOffset={35}>
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  aspectRatio: '1 / 1',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '24px',
                  backgroundColor: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  overflow: 'hidden',
                  boxShadow: 'var(--glass-shadow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  transformStyle: 'preserve-3d'
                }}
                className="hologram-visualizer"
              >
                {/* SVG Blueprint Tech Hologram */}
                <svg width="100%" height="100%" viewBox="0 0 460 460" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                  <defs>
                    {/* Glowing Grid Background Pattern */}
                    <pattern id="hologram-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="24" y2="0" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="0.5" />
                      <line x1="0" y1="0" x2="0" y2="24" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="0.5" />
                      <circle cx="0" cy="0" r="1" fill="rgba(6, 182, 212, 0.15)" />
                    </pattern>

                    {/* Core Glow Filter */}
                    <filter id="glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="15" result="blur1" />
                      <feGaussianBlur stdDeviation="30" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="glow-light" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Gradient Definitions */}
                    <radialGradient id="core-gradient" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="60%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>

                    <linearGradient id="ring-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="transparent" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                    </linearGradient>

                    <linearGradient id="ring-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Grid overlay */}
                  <rect width="100%" height="100%" fill="url(#hologram-grid)" />

                  {/* Tech radar rings */}
                  <circle cx="230" cy="230" r="190" fill="none" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="230" cy="230" r="160" fill="none" stroke="rgba(6, 182, 212, 0.06)" strokeWidth="1.5" />
                  <circle cx="230" cy="230" r="120" fill="none" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1" strokeDasharray="20 10 5 10" style={{ transformOrigin: '230px 230px', animation: 'spin-clockwise 30s linear infinite' }} />

                  {/* Rotating Ellipses (Constellation Orbits) */}
                  <ellipse cx="230" cy="230" rx="145" ry="60" fill="none" stroke="url(#ring-gradient-1)" strokeWidth="1.5" strokeDasharray="30 10 10 10" style={{ transformOrigin: '230px 230px', animation: 'spin-clockwise 16s linear infinite' }} />
                  <ellipse cx="230" cy="230" rx="130" ry="110" fill="none" stroke="url(#ring-gradient-2)" strokeWidth="1" style={{ transformOrigin: '230px 230px', animation: 'spin-counter 20s linear infinite' }} />

                  {/* Crosshair markers */}
                  <line x1="230" y1="20" x2="230" y2="40" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                  <line x1="230" y1="420" x2="230" y2="440" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                  <line x1="20" y1="230" x2="40" y2="230" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                  <line x1="420" y1="230" x2="440" y2="230" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />

                  {/* Connecting Node Constellation Network */}
                  <g opacity="0.6">
                    <line x1="140" y1="140" x2="230" y2="230" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" />
                    <line x1="320" y1="140" x2="230" y2="230" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                    <line x1="290" y1="310" x2="230" y2="230" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" />
                    <line x1="130" y1="280" x2="230" y2="230" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />

                    <circle cx="140" cy="140" r="4" fill="#6366f1" filter="url(#glow-light)" />
                    <circle cx="320" cy="140" r="5" fill="#06b6d4" filter="url(#glow-light)" />
                    <circle cx="290" cy="310" r="3" fill="#6366f1" />
                    <circle cx="130" cy="280" r="4.5" fill="#06b6d4" filter="url(#glow-light)" />
                  </g>

                  {/* Core Sphere */}
                  <circle cx="230" cy="230" r="46" fill="url(#core-gradient)" filter="url(#glow-heavy)" style={{ animation: 'float-y 6s ease-in-out infinite' }} />

                  {/* Floating Orbiting Data Particles */}
                  <circle cx="230" cy="230" r="8" fill="#ffffff" filter="url(#glow-light)" style={{ transformOrigin: '230px 230px', animation: 'spin-counter 6s linear infinite' }} />
                  <circle cx="230" cy="230" r="5" fill="#22d3ee" filter="url(#glow-light)" style={{ transformOrigin: '230px 230px', animation: 'spin-clockwise 10s linear infinite' }} />
                </svg>

                {/* Glass reflection layer */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }} />
              </div>
            </Reveal>

            {/* Accent light source */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              filter: 'blur(45px)',
              bottom: '-10%',
              right: '-10%',
              zIndex: -1,
              pointerEvents: 'none'
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


