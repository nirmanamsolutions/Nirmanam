import React from 'react';
import SpotlightCard from '../animations/SpotlightCard';
import Reveal from '../animations/Reveal';
import { Laptop, Phone, Compass, ShieldAlert, Database, Cloud } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      icon: <Laptop size={20} />,
      title: "Web Platforms",
      desc: "Architecting scalable web applications, React frontends, and reliable web ecosystems that perform at scale.",
      tags: ["React", "Next.js", "Vite"]
    },
    {
      icon: <Phone size={20} />,
      title: "Mobile Architecture",
      desc: "Cross-platform mobile apps built for native-level performance and elegant, fluid user interfaces.",
      tags: ["React Native", "Flutter", "iOS & Android"]
    },
    {
      icon: <Compass size={20} />,
      title: "Product Design (UI/UX)",
      desc: "User research, custom design systems, and interaction models that match functionality with beauty.",
      tags: ["Figma", "Design Systems", "Prototyping"]
    },
    {
      icon: <Database size={20} />,
      title: "Custom Systems",
      desc: "Custom backend architecture, API design, database schemas, and integration solutions for business logic.",
      tags: ["Node.js", "PostgreSQL", "APIs"]
    },
    {
      icon: <Cloud size={20} />,
      title: "Cloud & DevOps",
      desc: "Infrastructure scaling, automated CI/CD pipelines, container orchestration, and cloud configurations.",
      tags: ["AWS", "Docker", "CI/CD"]
    },
    {
      icon: <ShieldAlert size={20} />,
      title: "Performance Audits",
      desc: "Deep analysis of existing apps to optimize load speeds, fix memory leaks, and upgrade styling architectures.",
      tags: ["SEO", "Web Vitals", "Security"]
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div className="section-tag">Core Competencies</div>
            <h2>Our engineering <span className="gradient-text">solutions</span></h2>
            <p>We combine deep technical expertise with careful product engineering to build web and mobile products that stand out.</p>
          </div>
        </Reveal>

        <div className="services-grid">
          {servicesList.map((srv, idx) => (
            <Reveal key={idx} delay={idx * 0.05} yOffset={20}>
              <SpotlightCard>
                <div className="sc-header">
                  <div className="sc-icon">{srv.icon}</div>
                  <h3>{srv.title}</h3>
                </div>
                <div className="sc-content">
                  <p>{srv.desc}</p>
                  <div className="sc-tags">
                    {srv.tags.map((t, i) => <span key={i}>{t}</span>)}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
