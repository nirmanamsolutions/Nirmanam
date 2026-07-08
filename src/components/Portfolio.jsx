import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../animations/Reveal';
import ProjectCard from './ProjectCard';
import sravaseImg from '../assets/sravase.png';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const sliderRef = useRef(null);

  const projects = [
    {
      title: "Sravase Dairy Management System",
      category: "mobile",
      desc: "A full-stack dairy management platform for farmers, collection centers, and administrators featuring real-time milk collection, automated FAT/SNF-based payment calculation, analytics, and secure role-based dashboards.",
      tech: "React Native, Node.js, Express.js, MongoDB Atlas, Firebase Cloud Messaging",
      image: sravaseImg,
      link: "https://play.google.com/store/apps/details?id=com.sarvasvaa.dairy"
    },
    {
      title: "SkillSutra - E-Learning Platform",
      category: "web",
      desc: "A comprehensive e-learning platform featuring secure Stripe payment gateway integration, structured course paths, interactive video modules, and specialized DRM/video download restrictions preventing unauthorized saving of content.",
      tech: "React, Node.js, Express.js, MongoDB, HLS Encrypted Streaming, Stripe API",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60",
      link: "https://skillsutra.netlify.app/"
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const scroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;
    const cardWidth = 320; // 20rem card width in pixels (roughly 320px)
    const gap = 40; // 2.5rem gap in pixels (roughly 40px)
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <h2>Projects we are <span className="gradient-text">proud of</span></h2>
            <p>A look into digital systems we've engineered to solve real, scalable business challenges.</p>
          </div>
        </Reveal>

        {/* Filters and Slider Navigation aligned side-by-side */}
        <Reveal delay={0.1}>
          <div className="portfolio-filters-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="portfolio-filters" style={{ marginBottom: 0 }}>
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Systems
              </button>
              <button
                className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
                onClick={() => setActiveFilter('web')}
              >
                Web Platforms
              </button>
              <button
                className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
                onClick={() => setActiveFilter('mobile')}
              >
                Mobile Systems
              </button>
              <button
                className={`filter-btn ${activeFilter === 'design' ? 'active' : ''}`}
                onClick={() => setActiveFilter('design')}
              >
                System Design
              </button>
            </div>

            {/* Slider Navigation Buttons on the top-right */}
            <div className="portfolio-slider-nav">
              <button onClick={() => scroll('left')} className="slider-nav-btn prev-btn" aria-label="Previous Project">
                <ArrowLeft size={20} className="arrow-icon" />
              </button>
              <button onClick={() => scroll('right')} className="slider-nav-btn next-btn" aria-label="Next Project">
                <ArrowRight size={20} className="arrow-icon" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Horizontal Slider track */}
        <div className="portfolio-slider-container">
          <div className="portfolio-slider-track" ref={sliderRef}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div
                  className="portfolio-slide"
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard {...p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
