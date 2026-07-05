import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../animations/SplitText';
import { ArrowRight } from 'lucide-react';
import HoloCard from './HoloCard';

const Hero = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [activeTab, setActiveTab] = useState('manifest');

  useEffect(() => {
    const animateValue = (start, end, duration, setValue) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setValue(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 5, 1500, setProjectsCount);
    animateValue(0, 3, 1500, setClientsCount);
    animateValue(0, 5, 1500, setTeamCount);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Build Your Startup's<br />
              <span className="gradient-text">
                <SplitText
                  words={[
                    'MVP in 6 Weeks.',
                    'Dream Product.',
                    'Next Big Idea.',
                    'Digital Platform.',
                    'Tech Foundation.'
                  ]}
                />
              </span>
            </motion.h1>

            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Affordable software development for Indian startups. We build quality web and mobile applications with modern tech, transparent pricing, and honest timelines.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <button onClick={() => handleScrollTo('portfolio')} className="btn btn-primary">
                Explore Work <ArrowRight size={16} />
              </button>
              <button onClick={() => handleScrollTo('process')} className="btn btn-ghost">
                View Our Process
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="stat">
                <h3>{projectsCount}+</h3>
                <p>Projects Delivered</p>
              </div>
              <div className="stat">
                <h3>{clientsCount}+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat">
                <h3>{teamCount}+</h3>
                <p>Person Team</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2.5rem', perspective: '1000px' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <HoloCard />

            {/* Background Blur Orb */}
            <div style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, var(--accent-indigo) 0%, transparent 70%)',
              filter: 'blur(60px)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              opacity: 0.2,
              pointerEvents: 'none'
            }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
