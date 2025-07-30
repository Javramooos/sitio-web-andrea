import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import './Inicio.css';
import DrDiazSection from '../components/DrDiazSection';
import InfoSection from '../components/InfoSection';
import { articles } from '../articuloData'; // Importamos los datos del blog
import ImageModal from '../components/ImageModal';
import useSEO from '../hooks/useSEO';

// --- Datos para las secciones ---
const testimonials = [
  {
    name: 'Sophia Clark',
    time: 'Hace 2 meses',
    image: 'https://i0.wp.com/www.venezuelaennotas.com/wp-content/uploads/La-Gaita-Zuliana-1.jpg?resize=800%2C520&ssl=1',
    text: '¡La Dra. Díaz es increíble! Se tomó el tiempo para entender mis objetivos y me recomendó el plan de tratamiento perfecto. Los resultados son naturales y me siento más segura que nunca.',
    beforeImage: '/assets/1.jpg',
    afterImage: '/assets/2.jpg',
  },
  {
    name: 'Olivia Bennett',
    time: 'Hace 3 meses',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: "He estado viendo a la Dra. Díaz durante años y siempre ofrece resultados excepcionales. Su experiencia y atención al detalle son inigualables.",
    beforeImage: '/assets/3.jpg',
    afterImage: '/assets/4.jpg',
  },
  {
    name: 'Emma Carter',
    time: 'Hace 5 meses',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: "Recomiendo encarecidamente a la Dra. Díaz. Es profesional, atenta y realmente apasionada por su trabajo. Estoy encantada con el resultado de mi procedimiento.",
    beforeImage: '/assets/1.jpg',
    afterImage: '/assets/3.jpg',
  },
];

const services = [
  { name: 'Rejuvenecimiento Facial', image: '/assets/poster_facial.jpg' },
  { name: 'Contorno Corporal', image: '/assets/poster_corporal.jpg' },
  { name: 'Cuidado de la Piel', image: '/assets/poster_piel.jpg' },
  { name: 'Anti-Envejecimiento', image: '/assets/poster_antiage.jpg' },
  { name: 'Restauración Capilar', image: '/assets/poster_capilar.jpg' },
  { name: 'Bienestar', image: '/assets/poster_bienestar.jpg' },
];

export default function Inicio() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  useSEO({
    title: 'Dra. Andrea Diaz - Medicina Estética Avanzada',
    description: 'Medicina estética avanzada en Bogotá por la Dra. Andrea Diaz. Tratamientos de rejuvenecimiento facial, contorno corporal y más para realzar tu belleza.',
    canonical: 'https://andreadiaz.com'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl('');
  };
  // Seleccionamos los artículos directamente de los datos estáticos
  const articuloSalud = articles.find(p => p.category === 'Salud');
  const articuloProducto = articles.find(p => p.category === 'Productos');
  const featuredArticles = [articuloSalud, articuloProducto].filter(Boolean); // Filtramos por si alguna categoría no tiene artículos

  const toSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  return (
    <div className="inicio-page-container">
      <main className="inicio-main-content">
        <div className="inicio-content-wrapper">

          {/* --- Hero Section --- */}
          <div className="hero-section">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="hero-video"
              src="/assets/andrea.mp4"
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <h1 className="hero-title">
                Medicina Estética Avanzada para tu Belleza Natural
              </h1>
              <p className="hero-subtitle">
                La Dra. Andrea Diaz es experta en tratamientos estéticos avanzados diseñados para tus necesidades únicas.
              </p>
              <a href="servicios">
                <button className="hero-button">
                  <span className="hero-button-text">Agendar una Consulta</span>
                </button>
              </a>
            </div>
          </div>

          {/* --- New Info Section --- */}
          <InfoSection />

          {/* --- Meet Dr. Andrea Diaz Section --- */}
          <DrDiazSection
            imageSrc="/assets/principal.jpg"
            mainTitle="Conoce a la Dra. Andrea Diaz"
            mainSubtitle="Experta en Medicina Estética Avanzada"
            descriptionText="Con 10 años de trayectoria desde su graduación en 2015, la Dra. Andrea Diaz es una experta líder que fusiona la ciencia médica con el arte de la estética para lograr resultados reales y naturales. Su pasión no es solo transformar la piel, sino construir la confianza que viene con ella. Antes de dedicarse por completo a la estética, forjó su carácter y precisión en los entornos más exigentes, desde salas de emergencia hasta Unidades de Cuidados Intensivos (UCI), lo que le da una perspectiva única y un compromiso absoluto con la seguridad del paciente.



Su sólida base como Médica Cirujana, graduada de la prestigiosa Universidad del Zulia y con título convalidado en Colombia , se eleva con una formación de élite: no uno, sino dos Másteres Internacionales en 




Medicina Estética y en Tratamientos Faciales. Con la Dra. Andrea, no solo encuentras a una experta en belleza, sino a una médica integral que pone su vasta experiencia y conocimiento a tu servicio."
          />

          {/* --- Trusted by Patients Section --- */}
          <section className="trusted-patients-section">
            <h2 className="trusted-patients-title">Confiado por Pacientes</h2>
            <p className="trusted-patients-subtitle">Nos enorgullece la confianza que nuestros pacientes depositan en nosotros.</p>
            <div className="patient-images-grid">
              {[1, 2, 3, 4].map((i) => {
                const patientImages = [
                  '/assets/confiado1.jpg',
                  '/assets/confiado2.JPG',
                  '/assets/confiado3jpg.jpg',
                  '/assets/confiado4.jpg',
                ];
                return (
                  <div key={i} className="patient-image-container">
                    <div
                      className="patient-image"
                      style={{ backgroundImage: `url("${patientImages[i - 1]}")` }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* --- Testimonials Section --- */}
          <section className="testimonials-section">
            <h2 className="testimonials-title">Lo que Dicen Nuestros Pacientes</h2>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-image" style={{ backgroundImage: `url("${testimonial.image}")` }}></div>
                    <div>
                      <p className="testimonial-name">{testimonial.name}</p>
                      <p className="testimonial-time">{testimonial.time}</p>
                    </div>
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  {testimonial.beforeImage && testimonial.afterImage && (
                    <div className="testimonial-before-after">
                      <div className="before-image-container" onClick={() => openModal(testimonial.beforeImage)}>
                        <img src={testimonial.beforeImage} alt="Antes" className="before-image" />
                        <span className="image-label">Antes</span>
                      </div>
                      <div className="after-image-container" onClick={() => openModal(testimonial.afterImage)}>
                        <img src={testimonial.afterImage} alt="Después" className="after-image" />
                        <span className="image-label">Después</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* --- Services Section --- */}
          <section className="services-section">
            <h2 className="services-title">Nuestros Servicios</h2>
            <div className="services-grid">
              {services.map((service, index) => (
                <Link to={`/servicios#${toSlug(service.name)}`} key={index} className="service-card-link">
                  <div className="service-card-image-container">
                    <div className="service-card-image" style={{ backgroundImage: `url(${service.image})` }}></div>
                    <h3 className="service-card-title">{service.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* --- FAQ Section --- */}
          <section className="faq-section">
            <div className="faq-content-grid">
              <div className="faq-questions-column">
                <h2 className="faq-title">
                  Preguntas Frecuentes
                </h2>
                <div className="faq-list">
                  {[
                    {
                      question: "¿A partir de qué edad se recomiendan estos tratamientos?",
                      answer: "Esa es una de las preguntas más inteligentes que puedes hacer, porque la respuesta correcta no es un número mágico, sino un enfoque: la medicina estética moderna se adapta a tus necesidades en cada etapa de la vida. No se trata de una edad específica, sino del momento en que deseas empezar a cuidar tu piel de forma proactiva o corregir algo que te incomoda."
                    },
                    {
                      question: "¿Qué tipos de tratamientos ofrecen?",
                      answer: "Ofrecemos una amplia variedad de tratamientos que incluyen rejuvenecimiento facial, contorno corporal, diversos tratamientos para la piel, inyectables como Botox y rellenos, terapia láser para diferentes problemas de la piel y técnicas avanzadas de restauración capilar."
                    },
                    {
                      question: "¿Cómo reservo una cita?",
                      answer: "¡Reservar una cita es fácil! Puedes hacer clic en el botón 'Reservar Cita' en nuestro sitio web para acceder a nuestro formulario de programación en línea. Alternativamente, puedes llamar a nuestra clínica directamente o contactarnos a través de WhatsApp."
                    }
                  ].map((faq, index) => (
                    <details key={index} className="faq-item">
                      <summary className="faq-question-summary">
                        <p className="faq-question-text">{faq.question}</p>
                        <div className="faq-arrow-icon">
                          <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                      </summary>
                      <p className="faq-answer-text">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="faq-related-articles-column">
                <h2 className="related-articles-title">Desde Nuestro Blog</h2>
                {featuredArticles.length === 0 ? (
                  <p>No se encontraron artículos destacados.</p>
                ) : (
                  featuredArticles.map((article) => (
                    <Link to={`/blog/${article.slug}`} key={article.id} className="related-article-card">
                      <div className="related-article-image" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
                      <div className="related-article-text-content">
                        <p className="related-article-category">{article.category}</p>
                        <h3 className="related-article-title">{article.title}</h3>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>

        </div>
      </main>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={modalImageUrl}
        altText="Vista ampliada"
      />
    </div>
  );
}