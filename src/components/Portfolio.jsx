import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../animations/Reveal';
import ProjectCard from './ProjectCard';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const sliderRef = useRef(null);

  const projects = [
    {
      title: "MY SARVASVAA - Dairy Management System",
      category: "mobile",
      desc: "A full-stack dairy management platform for farmers, collection centers, and administrators featuring real-time milk collection, automated FAT/SNF-based payment calculation, analytics, and secure role-based dashboards.",
      tech: "React Native, Node.js, Express.js, MongoDB Atlas, Firebase Cloud Messaging",
      image: "https://play-lh.googleusercontent.com/iKVCcQQajRQLc6jLRcp3mn5oYOUF5nqpXxh6raSHrBa0XZqD7qawR1xOwEsPvM1pfB12ZGFT1L7S0nnPBQ0o=w480-h960-rw",
      link: "https://play.google.com/store/apps/details?id=com.sarvasvaa.dairy" // Replace with your actual Play Store URL or GitHub repo
    },
    {
      title: "E-Commerce Platform MVP",
      category: "web",
      desc: "Full-stack storefront with Stripe integration, inventory management, and admin dashboard.",
      tech: "React, Node.js, PostgreSQL",
      image: "https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://github.com/yourusername/ecommerce-project" // Update with real link
    },
    {
      title: "Health Tracker Mobile App",
      category: "mobile",
      desc: "Cross-platform health metrics application with real-time sync and data visualization.",
      tech: "React Native, Firebase",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60",
      link: "https://github.com/yourusername/health-tracker" // Update with real link
    },
    {
      title: "Design System Library",
      category: "design",
      desc: "Comprehensive component library with Storybook documentation and theme tokens.",
      tech: "Figma, React, Storybook",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60",
      link: "https://github.com/yourusername/design-system" // Update with real link
    },
    {
      title: "Analytics Dashboard",
      category: "web",
      desc: "Real-time data visualization dashboard with charts, filters, and export functionality.",
      tech: "Next.js, Tailwind, D3.js",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
      link: "https://github.com/yourusername/analytics-dashboard" // Update with real link
    },
    {
      title: "Budget Tracking App",
      category: "mobile",
      desc: "Personal finance app with expense tracking, budget goals, and spending insights.",
      tech: "Flutter, SQLite",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=60",
      link: "https://github.com/yourusername/budget-app" // Update with real link
    },
    {
      title: "SaaS Landing Page",
      category: "design",
      desc: "Modern landing page with animations, responsive design, and conversion optimization.",
      tech: "React, Framer Motion",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
      link: "https://your-landing-page.vercel.app" // Update with real link
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
              {filteredProjects.map((p, idx) => (
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
