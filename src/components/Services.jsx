import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../animations/Reveal';
import { Laptop, Phone, Compass, ShieldAlert, Database, Cloud, CheckCircle2 } from 'lucide-react';
import './Services.css';

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const ServiceCard = ({ srv, index, isHero = false }) => {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = `${((clientX - rect.left) / rect.width) * 100}%`;
      const y = `${((clientY - rect.top) / rect.height) * 100}%`;
      cardRef.current.style.setProperty('--mouse-x', x);
      cardRef.current.style.setProperty('--mouse-y', y);
    });
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.12 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`service-card-wrapper ${isHero ? 'bento-hero' : ''}`}
    >
      <div className="service-spotlight-glow" />

      <div>
        <div className="service-card-header">
          <div className="service-icon-box">
            {srv.icon}
          </div>
          <span className="service-badge-number">0{index + 1}</span>
        </div>

        <h3 className="service-card-title">{srv.title}</h3>
        <p className="service-card-desc">{srv.desc}</p>

        {/* Feature Checkpoints */}
        <div className="service-features-list">
          {srv.features.map((feat, i) => (
            <div key={i} className="service-feature-item">
              <CheckCircle2 size={16} className="service-feature-icon" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="service-card-tags">
        {srv.tags.map((tag, i) => (
          <span key={i} className="service-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
};

const Services = () => {
  const servicesList = [
    {
      icon: <Laptop size={24} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Web Platforms",
      desc: "Architecting high-performance web applications, server-rendered React frontends, and enterprise WebGL web ecosystems.",
      features: [
        "Server-Side Rendering (SSR) & Static Generation",
        "Sub-second First Contentful Paint Optimization",
        "Custom State & Micro-Frontend Architecture"
      ],
      tags: ["React", "Next.js", "TypeScript", "Vite"]
    },
    {
      icon: <Phone size={24} style={{ color: 'var(--accent-cyan)' }} />,
      title: "Mobile Architecture",
      desc: "Cross-platform iOS & Android apps engineered for 60 FPS native performance, offline persistence, and fluid gesture UX.",
      features: [
        "Native Hardware Acceleration & GPU Animations",
        "Offline Data Sync & Encrypted Local Storage",
        "Seamless App Store & Google Play Deployment"
      ],
      tags: ["React Native", "Flutter", "iOS & Android", "Expo"]
    },
    {
      icon: <Compass size={24} style={{ color: 'var(--accent-gold)' }} />,
      title: "Product Design & UX",
      desc: "Human-centered UI/UX research, component design systems, motion design prototypes, and interactive user interface models.",
      features: [
        "Tailored High-Fidelity Figma Design Systems",
        "Interactive Prototype Animations & Micro-Interactions",
        "Usability Testing & Conversion Optimization"
      ],
      tags: ["Figma", "Design Systems", "Prototyping", "UI/UX"]
    },
    {
      icon: <Database size={24} style={{ color: 'var(--accent-indigo)' }} />,
      title: "Custom Systems & APIs",
      desc: "Designing resilient backend architectures, GraphQL & RESTful APIs, microservices, and high-concurrency database schemas.",
      features: [
        "Distributed Event-Driven Microservices Architecture",
        "High-Throughput PostgreSQL & Redis Cache Clustering",
        "Enterprise OAuth2 & Zero-Trust API Security"
      ],
      tags: ["Node.js", "PostgreSQL", "GraphQL", "Redis"]
    },
    {
      icon: <Cloud size={24} style={{ color: 'var(--accent-cyan)' }} />,
      title: "Cloud & DevOps",
      desc: "Automated multi-cloud infrastructure provision, CI/CD deployment pipelines, container orchestration, and serverless scaling.",
      features: [
        "Automated GitHub Actions CI/CD Deployment",
        "Docker Containerization & Kubernetes Clusters",
        "Global CDN & Multi-Region Cloud Redundancy"
      ],
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD"]
    },
    {
      icon: <ShieldAlert size={24} style={{ color: 'var(--accent-gold)' }} />,
      title: "Performance & Security",
      desc: "In-depth code reviews, Web Vitals performance optimization, memory leak eradication, and automated security vulnerability hardening.",
      features: [
        "Full Lighthouse 100/100 Core Web Vitals Audit",
        "Memory Leak Profiling & JS Runtime Tracing",
        "OWASP Security Audit & Vulnerability Remediation"
      ],
      tags: ["SEO", "Web Vitals", "Security", "Audits"]
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <div className="section-tag">Core Competencies</div>
            <h2>Our engineering <span className="gradient-text">solutions</span></h2>
            <p>We combine deep technical expertise with careful product engineering to build web and mobile products that scale seamlessly.</p>
          </div>
        </Reveal>

        <div className="services-bento-grid">
          {servicesList.map((srv, idx) => (
            <ServiceCard key={idx} srv={srv} index={idx} isHero={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
