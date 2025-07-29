import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Servicios.css';

// Importamos los componentes y módulos de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Importamos los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

const serviciosData = [
  { id: 'facial', icono: '/assets/icon_facial.png', categoria: 'Facial', titulo: 'Rejuvenecimiento Facial', descripcionCorta: 'Tratamientos avanzados para una piel joven y radiante.', videoUrl: 'https://www.youtube.com/watch?v=l5VF1bZ9\_B8', posterUrl: '/assets/poster_facial.jpg', beneficios: ['Reduce líneas finas.', 'Mejora la firmeza.', 'Aporta luminosidad.'], faqs: [{ pregunta: '¿Es doloroso?', respuesta: 'La mayoría son indoloros.' }] },
  { id: 'corporal', icono: '/assets/icon_corporal.png', categoria: 'Corporal', titulo: 'Contorno Corporal', descripcionCorta: 'Esculpe y define la silueta ideal para ti.', videoUrl: 'https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3Dl5VF1bZ9_B8', posterUrl: '/assets/poster_corporal.jpg', beneficios: ['Reduce grasa localizada.', 'Mejora la celulitis.'], faqs: [{ pregunta: '¿Resultados permanentes?', respuesta: 'Son duraderos con un estilo de vida saludable.' }] },
  { id: 'piel', icono: '/assets/icon_piel.png', categoria: 'Cuidado de la Piel', titulo: 'Cuidado de la Piel', descripcionCorta: 'Soluciones personalizadas para una piel sana.', videoUrl: 'https://www.youtube.com/watch?v=fi-S9f1k\_l0', posterUrl: '/assets/poster_piel.jpg', beneficios: ['Control de acné.', 'Atenuación de manchas.'], faqs: [{ pregunta: '¿Qué rutina me recomiendan?', respuesta: 'La Dra. Diaz diseñará una rutina específica.' }] },
  { id: 'anti-age', icono: '/assets/icon_antiage.png', categoria: 'Facial', titulo: 'Anti-Envejecimiento', descripcionCorta: 'Combate los signos del envejecimiento de forma efectiva.', videoUrl: 'https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3Dfi-S9f1k_l0', posterUrl: '/assets/poster_antiage.jpg', beneficios: ['Prevención de arrugas.', 'Piel más densa.'], faqs: [{ pregunta: '¿A qué edad debo empezar?', respuesta: 'Los tratamientos preventivos pueden empezar desde los 25-30 años.' }] },
  { id: 'capilar', icono: '/assets/icon_capilar.png', categoria: 'Capilar', titulo: 'Restauración Capilar', descripcionCorta: 'Restaura y mejora la salud de tu cabello.', videoUrl: 'https://www.youtube.com/watch?v=w\_tEWaT6O-c', posterUrl: '/assets/poster_capilar.jpg', beneficios: ['Aumenta la densidad.', 'Fortalece el folículo.'], faqs: [{ pregunta: '¿Cuántas sesiones necesito?', respuesta: 'Se recomiendan entre 3 y 5 sesiones.' }] },
  { id: 'bienestar', icono: '/assets/icon_bienestar.png', categoria: 'Bienestar', titulo: 'Bienestar', descripcionCorta: 'Enfoques holísticos para mejorar tu bienestar.', videoUrl: 'https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3Dw_tEWaT6O-c', posterUrl: '/assets/poster_bienestar.jpg', beneficios: ['Reduce el estrés.', 'Mejora la calidad del sueño.'], faqs: [{ pregunta: '¿Qué incluye?', respuesta: 'Incluye terapias de relajación y suplementación.' }] },
];
const generalFaqData = [
    { pregunta: '¿Necesito una consulta inicial antes de cualquier tratamiento?', respuesta: 'Sí, siempre recomendamos una consulta de valoración inicial para recomendar el plan de tratamiento más seguro y efectivo para ti.'},
    { pregunta: '¿Qué métodos de pago aceptan?', respuesta: 'Aceptamos pagos con tarjeta de crédito, débito, transferencia bancaria y efectivo. También puedes consultar nuestras opciones de financiación.'},
    { pregunta: '¿Cómo puedo agendar una cita?', respuesta: 'Puedes agendar tu cita fácilmente a través de nuestro botón de WhatsApp, llamando directamente o utilizando el formulario de contacto en la sección "Agendar".'}
];
const categorias = ['Todos', ...new Set(serviciosData.map(s => s.categoria))];

function FaqItem({ pregunta, respuesta }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="acordeon-item" onClick={() => setIsOpen(!isOpen)}>
            <div className="acordeon-pregunta">
                <h3>{pregunta}</h3>
                <div className={`faq-icono ${isOpen ? 'open' : ''}`}>+</div>
            </div>
            <div className={`acordeon-respuesta ${isOpen ? 'open' : ''}`}><p>{respuesta}</p></div>
        </div>
    );
}

export default function Servicios() {
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [servicioActivo, setServicioActivo] = useState(serviciosData[0]);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [openGeneralFaqIndex, setOpenGeneralFaqIndex] = useState(null);
  const serviciosFiltrados = serviciosData.filter(s => filtroActivo === 'Todos' ? true : s.categoria === filtroActivo);

  useEffect(() => {
    if (serviciosFiltrados.length > 0) {
      setServicioActivo(serviciosFiltrados[0]);
    } else {
      setServicioActivo(null);
    }
  }, [filtroActivo]);

  const handleSelectServicio = (servicio) => {
    setServicioActivo(servicio);
    setPlayingVideo(false);
  };

  return (
    <div className="servicios-page-container fade-in">
      <div className="servicios-titulo-container">
        <h1>Nuestros Servicios</h1>
        <p>Explora nuestra gama de tratamientos estéticos avanzados, diseñados para realzar tu belleza natural y bienestar.</p>
      </div>

      <div className="filtros-container">
        {categorias.map(cat => (
          <button key={cat} className={`filtro-btn ${filtroActivo === cat ? 'active' : ''}`} onClick={() => setFiltroActivo(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="servicios-layout">
        <aside className="servicios-menu-sidebar">
          <Swiper
            direction={'vertical'}
            slidesPerView={'auto'}
            spaceBetween={10}
            navigation={{ nextEl: '.menu-nav-next', prevEl: '.menu-nav-prev' }}
            modules={[Navigation]}
            className="servicios-menu-swiper"
          >
            {serviciosFiltrados.map((servicio) => (
              <SwiperSlide key={servicio.id}>
                <div className={`menu-item ${servicio.id === servicioActivo?.id ? 'active' : ''}`} onClick={() => handleSelectServicio(servicio)}>
                  <div className="menu-item-icon-wrapper">
                    <span className="menu-item-icon">{servicio.icon}</span>
                  </div>
                  <div className="menu-item-texto">
                    <h2>{servicio.titulo}</h2>
                    <p>{servicio.descripcionCorta}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="menu-nav-arrow menu-nav-prev"><FontAwesomeIcon icon={faChevronUp} /></div>
          <div className="menu-nav-arrow menu-nav-next"><FontAwesomeIcon icon={faChevronDown} /></div>
        </aside>

        <main className="servicio-detalle-main">
          {servicioActivo ? (
            <>
              <div className="video-player-wrapper">
                {playingVideo ? (
                  <div className="video-container"><iframe src={`${servicioActivo.videoUrl}?autoplay=1`} title={servicioActivo.titulo} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                ) : (
                  <div className="video-poster" onClick={() => setPlayingVideo(true)}><img src={servicioActivo.posterUrl || servicioActivo.imagen} alt={`Póster de ${servicioActivo.titulo}`} /><div className="play-button-overlay"><FontAwesomeIcon icon={faPlayCircle} /></div></div>
                )}
              </div>
              <div className="detalle-contenido-grid">
                <div className="beneficios-columna">
                  <h3>Beneficios Clave</h3>
                  <ul className="beneficios-lista">{servicioActivo.beneficios.map((b, i) => <li key={i}>{b}</li>)}</ul>
                </div>
                <div className="faq-columna">
                  <h3>Preguntas Frecuentes</h3>
                  <div className="faq-acordeon">{servicioActivo.faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}</div>
                </div>
              </div>
            </>
          ) : (
            <p>No hay servicios en esta categoría.</p>
          )}
        </main>
      </div>
      
     {/* ================================================== */}
      {/* === NUEVA SECCIÓN DE FAQ GENERAL AQUÍ === */}
      {/* ================================================== */}
      <div className="faq-servicios-container">
        <h2>Preguntas Frecuentes Generales</h2>
        <div className="faq-acordeon">
          {generalFaqData.map((faq, index) => (
            <FaqItem
              key={index}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              isOpen={openGeneralFaqIndex === index}
              onClick={() => setOpenGeneralFaqIndex(openGeneralFaqIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}