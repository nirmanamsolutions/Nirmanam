import React from 'react';
import { MessageSquare, FileText, Code, TestTube, Rocket, HeartHandshake } from 'lucide-react';
import Reveal from '../animations/Reveal';

const HowWeWork = () => {
  const timeline = [
    {
      phase: "Week 1",
      title: "Discovery & Planning",
      icon: <MessageSquare size={24} />,
      tasks: [
        "Requirements gathering & analysis",
        "Technical architecture design",
        "Project timeline & milestones",
        "Technology stack finalization"
      ],
      color: "rgba(99, 102, 241, 0.1)"
    },
    {
      phase: "Week 2-X",
      title: "Development Sprint",
      icon: <Code size={24} />,
      tasks: [
        "Agile development cycles",
        "Weekly progress demos",
        "GitHub repository access",
        "Regular communication & updates"
      ],
      color: "rgba(6, 182, 212, 0.1)"
    },
    {
      phase: "Testing Phase",
      title: "Quality Assurance",
      icon: <TestTube size={24} />,
      tasks: [
        "Comprehensive testing & QA",
        "Bug fixes & optimization",
        "Performance tuning",
        "Security audit"
      ],
      color: "rgba(251, 191, 36, 0.1)"
    },
    {
      phase: "Final Week",
      title: "Launch & Delivery",
      icon: <Rocket size={24} />,
      tasks: [
        "Production deployment",
        "Complete documentation",
        "Training & handover",
        "Post-launch monitoring"
      ],
      color: "rgba(16, 185, 129, 0.1)"
    },
    {
      phase: "Ongoing",
      title: "Support & Maintenance",
      icon: <HeartHandshake size={24} />,
      tasks: [
        "Free bug fixes period",
        "Technical support",
        "Feature enhancements (paid)",
        "Long-term partnership"
      ],
      color: "rgba(139, 92, 246, 0.1)"
    }
  ];

  return (
    <section className="how-we-work" id="process" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem', maxWidth: '700px' }}>
            <div className="section-tag">Our Process</div>
            <h2>How we <span className="gradient-text">approach projects</span></h2>
            <p>A transparent, collaborative workflow from discovery to deployment. You're involved at every step.</p>
          </div>
        </Reveal>

        <div className="timeline-container">
          {timeline.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.1} yOffset={30}>
              <div className="timeline-step">
                <div className="timeline-connector" style={{ 
                  display: idx === timeline.length - 1 ? 'none' : 'block' 
                }} />
                
                <div className="timeline-content">
                  <div className="timeline-icon" style={{ background: step.color }}>
                    {step.icon}
                  </div>
                  
                  <div className="timeline-card">
                    <div className="timeline-header">
                      <span className="timeline-phase">{step.phase}</span>
                      <h3>{step.title}</h3>
                    </div>
                    
                    <ul className="timeline-tasks">
                      {step.tasks.map((task, taskIdx) => (
                        <li key={taskIdx}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="var(--accent-cyan)" strokeWidth="2" opacity="0.3"/>
                            <circle cx="8" cy="8" r="3" fill="var(--accent-cyan)"/>
                          </svg>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <div className="process-cta" style={{ 
            textAlign: 'center', 
            marginTop: '5rem',
            padding: '3rem 2rem',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            boxShadow: 'var(--glass-shadow)'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)'
            }}>
              Ready to start your project?
            </h3>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Let's discuss your requirements and create a custom timeline for your needs.
            </p>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
            >
              Schedule Free Consultation
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HowWeWork;
