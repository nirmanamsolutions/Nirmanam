import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Award, Clock, Target, Layers } from 'lucide-react';
import Reveal from '../animations/Reveal';
import FlipFadeText from './ui/flip-fade-text';


const About = () => {
  const sectionRef = useRef(null);

  // Scoped Parallax for About section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const textX = useTransform(scrollYProgress, [0.1, 0.45], [-40, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const stageX = useTransform(scrollYProgress, [0.1, 0.45], [40, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const values = [
    {
      icon: <ShieldCheck size={18} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Client Partnership",
      desc: "We focus on long-term partnerships, aligning closely with your product vision."
    },
    {
      icon: <Award size={18} style={{ color: 'var(--accent-cyan)' }} />,
      title: "Engineering Quality",
      desc: "Modular, well-tested code crafted to scale seamlessly under heavy load."
    },
    {
      icon: <Clock size={18} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Timely Execution",
      desc: "Clear milestones, transparent Git logs, and on-time launch delivery."
    },
    {
      icon: <Target size={18} style={{ color: 'var(--accent-cyan)' }} />,
      title: "Product Ownership",
      desc: "We take direct accountability for your tech stack and business objectives."
    },
    {
      icon: <Layers size={18} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Scalable Architecture",
      desc: "Future-proof cloud infrastructure & scalable frontend engineering."
    }
  ];

  return (
    <section className="about" id="about" ref={sectionRef} style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div className="about-grid-container">
          {/* Left Side: Content & 5 Feature Cards */}

          <motion.div style={{ x: textX, y: textY, opacity: textOpacity }}>
            <div className="section-tag" style={{ marginBottom: '0.4rem' }}>Our Philosophy</div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', lineHeight: '1.15' }}>
              We help Indian startups <br />
              <span className="gradient-text">build quality products</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.925rem', lineHeight: '1.5' }}>
              At Nirmanam Solutions, we understand the challenges Indian founders face. We provide affordable, transparent, and quality software development so you can focus on growing your business.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxWidth: '480px' }}>
              {values.map((val, idx) => (
                <Reveal key={idx} delay={idx * 0.08} yOffset={10}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.45rem 0.85rem',
                      backgroundColor: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}
                    className="about-value-card"
                  >
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(99, 102, 241, 0.08)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {val.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.875rem', marginBottom: '0.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {val.title}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: '1.28', margin: 0 }}>
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Clean FlipFadeText Animated Stage centered vertically & horizontally */}
          <motion.div
            style={{
              x: stageX,
              y: stageY,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: '100%'
            }}
            className="about-stage-column"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100%' }}>
              <FlipFadeText
                words={["QUALITY", "PRECISION", "EXCELLENCE", "TRUST"]}
                interval={2500}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
