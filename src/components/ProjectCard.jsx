import React from 'react';
import { ExternalLink } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ title, desc, tech, image, link = '#contact' }) => {
  const handleClick = () => {
    if (link && link !== '#contact') {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      // Scroll to contact if no real link
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="portfolio-card">
      <img src={image} alt={title} />
      <section>
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="pc-card-row">
          <div className="pc-tag">
            {tech.split(', ')[0]}
          </div>
          <button 
            onClick={handleClick}
            className="pc-link-btn"
            aria-label={`View ${title} project`}
          >
            {link && link !== '#contact' ? 'View Project' : 'Contact Us'} 
            <ExternalLink size={13} className="link-icon" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectCard;
