import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Servicios.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const serviciosData = [
  { id: 'rejuvenecimiento-facial', icono: '/assets/icon_facial.png', categoria: 'Facial', titulo: 'Rejuvenecimiento Facial', descripcionCorta: 'Tratamientos avanzados para una piel joven y radiante.', videoUrl: 'https://www.youtube.com/embed/l5VF1bZ9_B8', posterUrl: '/assets/poster_facial.jpg', beneficios: ['Reduce líneas finas.', 'Mejora la firmeza.', 'Aporta luminosidad.'], faqs: [{ pregunta: '¿Es doloroso?', respuesta: 'La mayoría de los tratamientos son indoloros o se utiliza anestesia tópica para minimizar cualquier molestia.' }, { pregunta: '¿Cuánto tiempo dura la recuperación?', respuesta: 'La recuperación varía según el tratamiento, pero muchos no requieren tiempo de inactividad.' }, { pregunta: '¿Cuándo veré los resultados?', respuesta: 'Algunos resultados son inmediatos, mientras que otros mejoran progresivamente en las semanas siguientes.' }] },
  { id: 'contorno-corporal', icono: '/assets/icon_corporal.png', categoria: 'Corporal', titulo: 'Contorno Corporal', descripcionCorta: 'Esculpe y define la silueta ideal para ti.', videoUrl: 'https://www.youtube.com/embed/l5VF1bZ9_B8', posterUrl: '/assets/poster_corporal.jpg', beneficios: ['Reduce grasa localizada.', 'Mejora la celulitis.'], faqs: [{ pregunta: '¿Los resultados son permanentes?', respuesta: 'Los resultados son duraderos, pero se recomienda un estilo de vida saludable para mantenerlos.' }, { pregunta: '¿Es una alternativa a la liposucción?', respuesta: 'Ofrecemos alternativas no invasivas a la liposucción con excelentes resultados.' }, { pregunta: '¿Cuántas sesiones se necesitan?', respuesta: 'El número de sesiones varía según el paciente y el área a tratar, pero generalmente se recomiendan de 4 a 6 sesiones.' }] },
  { id: 'cuidado-de-la-piel', icono: '/assets/icon_piel.png', categoria: 'Cuidado de la Piel', titulo: 'Cuidado de la Piel', descripcionCorta: 'Soluciones personalizadas para una piel sana.', videoUrl: 'https://www.youtube.com/embed/fi-S9f1k_l0', posterUrl: '/assets/poster_piel.jpg', beneficios: ['Control de acné.', 'Atenuación de manchas.'], faqs: [{ pregunta: '¿Qué rutina me recomiendan?', respuesta: 'La Dra. Diaz diseñará una rutina de cuidado de la piel personalizada para tus necesidades específicas.' }, { pregunta: '¿Los productos son para todo tipo de piel?', respuesta: 'Sí, ofrecemos productos y tratamientos para todo tipo de piel, incluyendo piel sensible.' }, { pregunta: '¿Puedo combinarlo con otros tratamientos?', respuesta: 'Sí, se pueden combinar con otros tratamientos para potenciar los resultados.' }] },
  { id: 'anti-envejecimiento', icono: '/assets/icon_antiage.png', categoria: 'Facial', titulo: 'Anti-Envejecimiento', descripcionCorta: 'Combate los signos del envejecimiento de forma efectiva.', videoUrl: 'https://www.youtube.com/embed/fi-S9f1k_l0', posterUrl: '/assets/poster_antiage.jpg', beneficios: ['Prevención de arrugas.', 'Piel más densa.'], faqs: [{ pregunta: '¿A qué edad debo empezar?', respuesta: 'Los tratamientos preventivos pueden empezar desde los 25-30 años, pero nunca es tarde para empezar a cuidarse.' }, { pregunta: '¿Son seguros los inyectables?', respuesta: 'Sí, utilizamos productos de la más alta calidad y técnicas seguras para garantizar resultados naturales.' }, { pregunta: '¿Qué es el \'Botox preventivo\'?', respuesta: 'Es el uso de toxina botulínica en dosis bajas para prevenir la formación de arrugas de expresión.' }] },
  { id: 'restauracion-capilar', icono: '/assets/icon_capilar.png', categoria: 'Capilar', titulo: 'Restauración Capilar', descripcionCorta: 'Restaura y mejora la salud de tu cabello.', videoUrl: 'https://www.youtube.com/embed/w_tEWaT6O-c', posterUrl: '/assets/poster_capilar.jpg', beneficios: ['Aumenta la densidad.', 'Fortalece el folículo.'], faqs: [{ pregunta: '¿Cuántas sesiones necesito?', respuesta: 'Se recomiendan entre 3 y 5 sesiones, dependiendo del caso de cada paciente.' }, { pregunta: '¿Es un tratamiento doloroso?', respuesta: 'Se aplica anestesia local para minimizar cualquier molestia durante el procedimiento.' }, { pregunta: '¿Cuándo veré los resultados?', respuesta: 'Los resultados son progresivos y se empiezan a notar a partir del tercer mes.' }] },
  { id: 'bienestar', icono: '/assets/icon_bienestar.png', categoria: 'Bienestar', titulo: 'Bienestar', descripcionCorta: 'Enfoques holísticos para mejorar tu bienestar.', videoUrl: 'https://www.youtube.com/embed/w_tEWaT6O-c', posterUrl: '/assets/poster_bienestar.jpg', beneficios: ['Reduce el estrés.', 'Mejora la calidad del sueño.'], faqs: [{ pregunta: '¿Qué incluye?', respuesta: 'Incluye terapias de relajación, suplementación y recomendaciones de estilo de vida.' }, { pregunta: '¿Es para hombres y mujeres?', respuesta: 'Sí, nuestros tratamientos de bienestar son para todos.' }, { pregunta: '¿Puedo combinarlo con otros tratamientos estéticos?', respuesta: 'Sí, de hecho, se recomienda para potenciar los resultados de otros tratamientos.' }] }
]

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
  const location = useLocation();
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [servicioActivo, setServicioActivo] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(false);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const servicioDesdeUrl = serviciosData.find(s => s.id === hash);
    if (servicioDesdeUrl) {
      setServicioActivo(servicioDesdeUrl);
      setFiltroActivo(servicioDesdeUrl.categoria);
    } else if (serviciosData.length > 0) {
      setServicioActivo(serviciosData[0]);
      setFiltroActivo('Todos');
    }
  }, [location]);

  const serviciosFiltrados = serviciosData.filter(s => filtroActivo === 'Todos' ? true : s.categoria === filtroActivo);

  const handleFiltroClick = (cat) => {
    setFiltroActivo(cat);
    const filteredServices = serviciosData.filter(s => cat === 'Todos' ? true : s.categoria === cat);
    if (filteredServices.length > 0) {
      setServicioActivo(filteredServices[0]);
    } else {
      setServicioActivo(null);
    }
    setPlayingVideo(false);
  };

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
          <button key={cat} className={`filtro-btn ${filtroActivo === cat ? 'active' : ''}`} onClick={() => handleFiltroClick(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="servicios-layout">
        <aside className="servicios-menu-sidebar">
          <Swiper
            key={filtroActivo}
            direction={'vertical'}
            slidesPerView={'auto'}
            spaceBetween={10}
            navigation={{ nextEl: '.menu-nav-next', prevEl: '.menu-nav-prev' }}
            modules={[Navigation]}
            className="servicios-menu-swiper"
          >
            {serviciosFiltrados.map((servicio) => (
              <SwiperSlide key={servicio.id}>
                <div id={servicio.id} className={`menu-item ${servicio.id === servicioActivo?.id ? 'active' : ''}`} onClick={() => handleSelectServicio(servicio)}>
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
            <p>No hay servicios para mostrar.</p>
          )}
        </main>
      </div>
      
      <div className="faq-servicios-container">
        <h2>Preguntas Frecuentes Generales</h2>
        <div className="faq-acordeon">
          {generalFaqData.map((faq, index) => (
            <FaqItem
              key={index}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
