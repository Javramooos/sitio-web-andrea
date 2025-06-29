import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './UtilityButtons.css';

export default function UtilityButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const footer = document.querySelector('footer');
    if (footer) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowWhatsApp(!entry.isIntersecting);
        },
        { rootMargin: '0px', threshold: 0.1 }
      );
      observer.observe(footer);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <a 
        href="https://wa.me/573001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`whatsapp-button ${showWhatsApp ? 'visible' : ''}`}
        aria-label="Contactar por WhatsApp"
      >
        <img src="/assets/whatsapp.png" alt="WhatsApp" />
      </a>

      <button
        onClick={scrollToTop}
        className={`scroll-to-top-button ${showScrollTop ? 'visible' : ''}`}
        aria-label="Volver al inicio de la página"
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </>
  );
}