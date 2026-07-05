import React, { useState } from 'react';
import { ShieldCheck, Award, Clock } from 'lucide-react';
import Reveal from '../animations/Reveal';

const About = () => {
  const [consoleTab, setConsoleTab] = useState('metrics');
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

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <Reveal delay={0.2} yOffset={35}>
              <div style={{
                width: '100%',
                maxWidth: '420px',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                overflow: 'hidden',
                boxShadow: 'var(--glass-shadow)',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                transition: 'transform 0.3s ease'
              }}
                className="about-dashboard"
              >
                <div style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid var(--glass-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.02)'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setConsoleTab('metrics')}
                      style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.7rem',
                        backgroundColor: consoleTab === 'metrics' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px',
                        color: consoleTab === 'metrics' ? 'var(--text-primary)' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      metrics
                    </button>
                    <button
                      onClick={() => setConsoleTab('uptime')}
                      style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.7rem',
                        backgroundColor: consoleTab === 'uptime' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px',
                        color: consoleTab === 'uptime' ? 'var(--text-primary)' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      uptime
                    </button>
                    <button
                      onClick={() => setConsoleTab('git')}
                      style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.7rem',
                        backgroundColor: consoleTab === 'git' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px',
                        color: consoleTab === 'git' ? 'var(--text-primary)' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      git
                    </button>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>system_monitor.sh</span>
                </div>
                <div style={{ padding: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '170px' }}>
                  {consoleTab === 'metrics' && (
                    <>
                      <p><span style={{ color: 'var(--accent-indigo)' }}>$</span> nirmanam --metrics</p>
                      <p style={{ color: '#22c55e' }}>✔ Test Coverage: 94.2%<br />✔ Build Status: Passing<br />✔ Page Speed Score: 98/100</p>
                    </>
                  )}
                  {consoleTab === 'uptime' && (
                    <>
                      <p><span style={{ color: 'var(--accent-indigo)' }}>$</span> uptime</p>
                      <p style={{ color: 'var(--text-primary)' }}>13:09 up 145 days, 4 users, load average: 0.12, 0.08, 0.02</p>
                    </>
                  )}
                  {consoleTab === 'git' && (
                    <>
                      <p><span style={{ color: 'var(--accent-indigo)' }}>$</span> git status</p>
                      <p style={{ color: 'var(--accent-cyan)' }}>On branch main<br />Your branch is up to date with 'origin/main'.<br />nothing to commit, working tree clean</p>
                    </>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Accent light source */}
            <div style={{
              position: 'absolute',
              width: '260px',
              height: '260px',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
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
