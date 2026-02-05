import React from 'react';
import { Link } from 'react-router-dom';
import './DrDiazSection.css';

const DrDiazSection = ({ imageSrc, mainTitle, mainSubtitle, descriptionText }) => {
  return (
    <section className="dr-diaz-section">
      <div className="dr-diaz-container">
        <div className="dr-diaz-image-wrapper">
          <img src={imageSrc} alt={mainTitle} className="dr-diaz-image" />
        </div>
        <div className="dr-diaz-info">
          <h2 className="dr-diaz-title">{mainTitle}</h2>
          <h3 className="dr-diaz-subtitle">{mainSubtitle}</h3>
          <p className="dr-diaz-description">{descriptionText}</p>
          <Link to="/agenda" className="dr-diaz-button">Agendar Cita</Link>
        </div>
      </div>
    </section>
  );
};

export default DrDiazSection;