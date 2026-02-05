import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Servicios.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import useSEO from '../hooks/useSEO';

const serviciosData = [
  { 
    id: 'botox', 
    icono: '/assets/icons/antiage_icon.svg', 
    categoria: 'Rejuvenecimiento Facial', 
    titulo: 'Botox (Toxina Botulínica)', 
    descripcionCorta: 'Suaviza arrugas y líneas de expresión para una apariencia más relajada y fresca.', 
    videoUrl: 'https://www.youtube.com/embed/l5VF1bZ9_B8', 
    posterUrl: '/assets/poster_antiage.jpg', 
    beneficios: ['Elimina patas de gallo y líneas de la frente.', 'Previene la formación de nuevas arrugas.', 'Resultados naturales que mantienen tu expresión.'], 
    faqs: [
      { pregunta: '¿Cuánto dura el efecto?', respuesta: 'Los resultados suelen durar entre 4 y 6 meses, dependiendo del metabolismo de cada paciente.' }, 
      { pregunta: '¿Es doloroso?', respuesta: 'El procedimiento es rápido y mínimamente invasivo. Se utiliza aguja muy fina, por lo que la molestia es mínima.' }, 
      { pregunta: '¿Se pierde la expresión facial?', respuesta: 'No. La Dra. Andrea busca resultados naturales, relajando el músculo sin "congelar" la expresión.' }
    ], 
    price: 900000, 
    imageUrl: '/assets/poster_antiage.jpg' 
  },
  { 
    id: 'rellenos-faciales', 
    icono: '/assets/icons/facial_icon.svg', 
    categoria: 'Rejuvenecimiento Facial', 
    titulo: 'Rellenos Faciales (Ácido Hialurónico)', 
    descripcionCorta: 'Restaura volumen perdido, perfila labios y suaviza surcos nasogenianos.', 
    videoUrl: 'https://www.youtube.com/embed/fi-S9f1k_l0', 
    posterUrl: '/assets/poster_facial.jpg', 
    beneficios: ['Resultados inmediatos y visibles.', 'Hidratación profunda de la zona tratada.', 'Armonización de rasgos faciales.'], 
    faqs: [
      { pregunta: '¿Cuánto duran los resultados?', respuesta: 'Dependiendo del tipo de relleno y la zona, pueden durar de 6 a 18 meses.' }, 
      { pregunta: '¿Es reversible?', respuesta: 'Sí, los rellenos de ácido hialurónico se pueden disolver con una enzima llamada hialuronidasa si fuera necesario.' }
    ], 
    price: 1200000, 
    imageUrl: '/assets/poster_facial.jpg' 
  },
  { 
    id: 'bioestimuladores', 
    icono: '/assets/icons/skin_icon.svg', 
    categoria: 'Rejuvenecimiento Facial', 
    titulo: 'Bioestimuladores de Colágeno', 
    descripcionCorta: 'Tratamientos como Radiesse o Sculptra que estimulan tu propia producción de colágeno.', 
    videoUrl: 'https://www.youtube.com/embed/l5VF1bZ9_B8', 
    posterUrl: '/assets/poster_piel.jpg', 
    beneficios: ['Mejora la flacidez y firmeza de la piel.', 'Efecto lifting progresivo y natural.', 'Mejora la calidad y textura de la piel a largo plazo.'], 
    faqs: [
      { pregunta: '¿Cuántas sesiones se necesitan?', respuesta: 'Generalmente se recomiendan de 1 a 3 sesiones, dependiendo del grado de flacidez.' }, 
      { pregunta: '¿Cuándo se ven los resultados?', respuesta: 'Los resultados comienzan a ser visibles a partir de las 4-6 semanas, mejorando hasta los 3 meses.' }
    ], 
    price: 1500000, 
    imageUrl: '/assets/poster_piel.jpg' 
  },
  { 
    id: 'rinomodelacion', 
    icono: '/assets/icons/facial_icon.svg', 
    categoria: 'Facial', 
    titulo: 'Rinomodelación sin Cirugía', 
    descripcionCorta: 'Corrección de imperfecciones nasales mediante la aplicación precisa de ácido hialurónico.', 
    videoUrl: 'https://www.youtube.com/embed/fi-S9f1k_l0', 
    posterUrl: '/assets/poster_facial.jpg', 
    beneficios: ['Perfilado nasal sin pasar por quirófano.', 'Resultados inmediatos.', 'Recuperación rápida sin tiempo de inactividad.'], 
    faqs: [
      { pregunta: '¿Es permanente?', respuesta: 'No, el ácido hialurónico se reabsorbe con el tiempo. Los resultados duran entre 12 y 18 meses.' }, 
      { pregunta: '¿Duele?', respuesta: 'Se aplica anestesia tópica o local para minimizar cualquier molestia.' }
    ], 
    price: 1100000, 
    imageUrl: '/assets/poster_facial.jpg' 
  },
  { 
    id: 'labios-rusos', 
    icono: '/assets/icons/facial_icon.svg', 
    categoria: 'Facial', 
    titulo: 'Aumento de Labios (Russian Lips)', 
    descripcionCorta: 'Técnica avanzada para lograr volumen y definición con un aspecto estético elevado.', 
    videoUrl: 'https://www.youtube.com/embed/fi-S9f1k_l0', 
    posterUrl: '/assets/poster_facial.jpg', 
    beneficios: ['Definición del arco de cupido.', 'Volumen plano que evita la proyección excesiva ("boca de pato").', 'Hidratación y perfilado.'], 
    faqs: [
      { pregunta: '¿Cuánto dura la inflamación?', respuesta: 'La inflamación suele bajar significativamente después de 2-3 días.' }, 
      { pregunta: '¿Cuánto dura el relleno?', respuesta: 'Aproximadamente 6 a 12 meses, dependiendo del metabolismo del paciente.' }
    ], 
    price: 950000, 
    imageUrl: '/assets/poster_facial.jpg' 
  },
  { 
    id: 'aumento-gluteos', 
    icono: '/assets/icons/body_icon.svg', 
    categoria: 'Corporal', 
    titulo: 'Aumento de Glúteos sin Cirugía', 
    descripcionCorta: 'Mejora la forma, proyección y volumen de los glúteos mediante bioestimuladores.', 
    videoUrl: 'https://www.youtube.com/embed/l5VF1bZ9_B8', 
    posterUrl: '/assets/poster_corporal.jpg', 
    beneficios: ['Aumento de volumen sin cirugía.', 'Mejora la celulitis y calidad de la piel.', 'Levantamiento sutil y natural.'], 
    faqs: [
      { pregunta: '¿Qué productos se utilizan?', respuesta: 'Utilizamos bioestimuladores seguros como Sculptra, Radiesse o Ácido Hialurónico corporal.' }, 
      { pregunta: '¿Es doloroso?', respuesta: 'El procedimiento se realiza con anestesia local, haciéndolo muy tolerable.' }
    ], 
    price: 2500000, 
    imageUrl: '/assets/poster_corporal.jpg' 
  }
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
  useSEO({
    title: 'Servicios - Dra. Andrea Diaz',
    description: 'Descubre nuestros tratamientos de medicina estética avanzada.',
    canonical: 'https://andreadiazmd.com/servicios'
  });
  const location = useLocation();
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [servicioActivo, setServicioActivo] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(false);

  const handleWhatsAppInquiry = (serviceTitle) => {
    const numeroWhatsApp = '573143712078';
    const mensaje = `Hola, estoy interesado/a en el servicio de ${serviceTitle}. ¿Podrían darme más información?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

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
        <p style={{ color: 'red', marginTop: '1rem' }}>
      Esta página está en construcción. La información y diseño pueden cambiar.
    </p>
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
                    <img src={servicio.icono} alt={`Icono de ${servicio.titulo}`} className="menu-item-icon" />
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

              <div className="compra-section">
                <span className="precio-servicio">${servicioActivo.price.toLocaleString('es-CO')}</span>
                <button className="btn-consultar-whatsapp" onClick={() => handleWhatsAppInquiry(servicioActivo.titulo)}>
                  <FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: '10px' }} />
                  Consultar por WhatsApp
                </button>
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
