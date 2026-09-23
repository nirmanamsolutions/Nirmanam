import React from 'react';
import { ExternalLink } from 'lucide-react';
import AiButton from './ui/ai-button';
import './ProjectCard.css';

const ProjectCard = ({ title, desc, tech, image, imageFit = 'cover', link = '#contact' }) => {
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
      <div className={`pc-img-container ${imageFit === 'contain' ? 'fit-contain' : ''}`}>
        <img src={image} alt={title} className="portfolio-card-img" />
      </div>
      <section>
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="pc-card-row">
          <div className="pc-tag">
            {tech.split(', ')[0]}
          </div>
          <AiButton 
            onClick={handleClick}
            variant="ghost"
            className="pc-link-btn"
            aria-label={`View ${title} project`}
            icon={<ExternalLink size={13} className="link-icon" />}
          >
            {link && link !== '#contact' ? 'View Project' : 'Contact Us'}
          </AiButton>
        </div>
      </section>
    </div>
  );
};

export default ProjectCard;
