import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import './Inicio.css'; // Asegúrate de que la importación del CSS sigue aquí
import DrDiazSection from '../components/DrDiazSection'; // Importa el nuevo componente
import InfoSection from '../components/InfoSection'; // Importa el nuevo componente InfoSection

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
  const [latestArticles, setLatestArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errorArticles, setErrorArticles] = useState(null);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        // Asume que tu backend Strapi está corriendo en http://localhost:1337
        // y que el endpoint para artículos es /api/articulos
        const response = await fetch('http://localhost:1337/api/articulos?sort=createdAt:desc&pagination[limit]=2');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLatestArticles(data.data);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
        setErrorArticles(error);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchLatestArticles();
  }, []);

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
                La Dra. Andrea Diaz se especializa en tratamientos estéticos avanzados diseñados para tus necesidades únicas.
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
            imageSrc="https://i0.wp.com/revistareplicante.com/wp-content/uploads/2011/06/dr-house-2.jpeg?fit=320%2C474&ssl=1"
            mainTitle="Conoce a la Dra. Andrea Diaz"
            mainSubtitle="Especialista en Medicina Estética Avanzada"
            descriptionText="Con más de 10 años de experiencia, la Dra. Andrea Diaz es una especialista líder dedicada a ofrecer cuidado personalizado y lograr resultados naturales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed posuere magna, at aliquam quam. Vivamus pretium sit amet nisl dignissim luctus. Suspendisse ultrices gravida nisi, eget auctor nisl pulvinar et. In hac habitasse platea dictumst. Pellentesque tortor lacus, laoreet nec ligula a, egestas posuere urna. Suspendisse suscipit purus id aliquam feugiat. Vestibulum in nisi molestie, molestie erat vel, tincidunt nisl. Vestibulum dapibus sapien vel leo dictum feugiat. Maecenas eget est non ex vulputate congue. Suspendisse fringilla enim massa, vel fringilla nibh dapibus at. In hac habitasse platea dictumst. In hac habitasse platea dictumst. Sed consequat, erat ac vulputate pharetra, purus dui ultrices mauris, quis fermentum ex dui in orci."
          />

          {/* --- Trusted by Patients Section --- */}
          <section className="trusted-patients-section">
            <h2 className="trusted-patients-title">Confiado por Pacientes</h2>
            <p className="trusted-patients-subtitle">Nos enorgullece la confianza que nuestros pacientes depositan en nosotros.</p>
            <div className="patient-images-grid">
              {[1, 2, 3, 4].map((i) => {
                const patientImages = [
                  'https://cdn-icons-png.flaticon.com/512/6660/6660254.png',
                  'https://img.freepik.com/vector-premium/joven-doctora-saludando_70172-3507.jpg?semt=ais_hybrid&w=740',
                  'https://media.istockphoto.com/id/1372002650/es/foto/retrato-recortado-de-una-atractiva-joven-doctora-de-pie-con-los-brazos-cruzados-en-la-oficina.jpg?s=612x612&w=0&k=20&c=nyNHWMzJiXcmpJOA5jueMfaFTMKLiSZ2yKMFGvNLrg0=',
                  'https://png.pngtree.com/png-vector/20250320/ourlarge/pngtree-smiling-cartoon-female-doctor-with-arms-crossed-ready-to-assist-png-image_15793331.png',
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
                      <div className="before-image-container">
                        <img src={testimonial.beforeImage} alt="Antes" className="before-image" />
                        <span className="image-label">Antes</span>
                      </div>
                      <div className="after-image-container">
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
                      question: "¿Qué es la medicina estética?",
                      answer: "La medicina estética abarca una gama de tratamientos cosméticos no invasivos o mínimamente invasivos diseñados para mejorar su apariencia y aumentar la confianza. Estos procedimientos se centran en mejorar la apariencia cosmética a través de varios tratamientos."
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
                <h2 className="related-articles-title">Artículos Destacados</h2>
                {loadingArticles && <p>Cargando artículos...</p>}
                {errorArticles && <p>Error al cargar los artículos: {errorArticles.message}</p>}
                {!loadingArticles && latestArticles.length === 0 && <p>No se encontraron artículos.</p>}
                {!loadingArticles && latestArticles.map((article) => {
                  if (!article || !article.attributes) {
                    console.warn("Skipping malformed article:", article);
                    return null; // Skip this article if it's malformed
                  }
                  const imageUrl = article.attributes.image?.data?.attributes?.url
                    ? `http://localhost:1337${article.attributes.image.data.attributes.url}`
                    : '';

                  return (
                    <Link to={`/blog/${article.id}`} key={article.id} className="related-article-card">
                      <div className="related-article-image" style={{ backgroundImage: `url("${imageUrl}")` }}></div>
                      <div className="related-article-text-content">
                        <p className="related-article-category">Artículo Destacado</p>
                        <h3 className="related-article-title">{article.attributes.title}</h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}