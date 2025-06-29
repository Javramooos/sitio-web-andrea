// src/components/TestimoniosCarrusel.jsx (Versión con clic en tarjetas corregido)

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './TestimoniosCarrusel.css';

const testimonios = [
    { 
        nombre: 'María P.', 
        texto: 'Me siento renovada después de cada sesión...', 
        foto_antes: '/assets/testimonio1_antes.jpg',
        foto_despues: '/assets/testimonio1_despues.jpg'
    },
    { 
        nombre: 'Laura G.', 
        texto: 'El mejor lugar para tratamientos faciales...', 
        foto_antes: '/assets/testimonio2_antes.jpg',
        foto_despues: '/assets/testimonio2_despues.jpg'
    },
    { 
        nombre: 'Carolina R.', 
        texto: 'Excelente atención, profesionales de alto nivel...', 
        foto_antes: '/assets/1.jpg',
        foto_despues: '/assets/2.jpg'
    },
    { 
        nombre: 'Gabriela M.', 
        texto: 'Me devolvieron la confianza en mí misma.', 
        foto_antes: '/assets/testimonio4_antes.jpg',
        foto_despues: '/assets/testimonio4_despues.jpg'
    },
    { 
        nombre: 'Diana S.', 
        texto: 'Sin duda el mejor lugar, muy profesional todo el equipo.', 
        foto_antes: '/assets/testimonio5_antes.jpg',
        foto_despues: '/assets/testimonio5_despues.jpg'
    },
];

export default function TestimoniosCarrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const totalTestimonios = testimonios.length;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? totalTestimonios - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === totalTestimonios - 1 ? 0 : prev + 1));
  };

  // === ESTA ES LA FUNCIÓN QUE FALTABA ===
  const handleCardClick = (index) => {
    const prevIndex = (currentIndex - 1 + totalTestimonios) % totalTestimonios;
    const nextIndex = (currentIndex + 1) % totalTestimonios;

    if (index === prevIndex) {
      handlePrev();
    }
    if (index === nextIndex) {
      handleNext();
    }
  };

  useEffect(() => {
    if (trackRef.current) {
      const cardElement = trackRef.current.children[currentIndex];
      if (cardElement) {
        const scrollPosition = cardElement.offsetLeft - (trackRef.current.offsetWidth / 2) + (cardElement.offsetWidth / 2);
        trackRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  const getPositionClass = (index) => {
    const prevIndex = (currentIndex - 1 + totalTestimonios) % totalTestimonios;
    const nextIndex = (currentIndex + 1) % totalTestimonios;
    if (index === currentIndex) return 'current';
    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';
    return 'hidden';
  };

  return (
    <div className="carrusel-wrapper">
      <div className="carrusel-viewport">
        <div className="carrusel-track" ref={trackRef}>
          {testimonios.map((item, i) => (
            <div 
              key={item.nombre} 
              className={`carrusel-card ${getPositionClass(i)}`}
              // === Y ESTE ES EL EVENTO ONCLICK QUE FALTABA ===
              onClick={() => handleCardClick(i)}
            >
              <div className="card-image-container">
                <img src={item.foto_antes} alt={`Antes - ${item.nombre}`} className="card-image image-antes" />
                <img src={item.foto_despues} alt={`Después - ${item.nombre}`} className="card-image image-despues" />
              </div>
              <p>"{item.texto}"</p>
              <h4>- {item.nombre}</h4>
            </div>
          ))}
        </div>
      </div>
      
      <button className="carrusel-arrow left" onClick={handlePrev} aria-label="Anterior testimonio">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="carrusel-arrow right" onClick={handleNext} aria-label="Siguiente testimonio">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}