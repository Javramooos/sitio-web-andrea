import React from 'react';
import './AboutSection.css';

const AboutSection = ({ image, title, children }) => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image-wrapper">
          <img src={image} alt={title} className="about-image" />
        </div>
        <div className="about-text-wrapper">
          <h2 className="about-title">{title}</h2>
          <div className="about-content">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
