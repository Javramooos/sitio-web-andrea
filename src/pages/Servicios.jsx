// Archivo: Servicios.jsx (Con wrapper para el detalle)

import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import './Servicios.css';

const serviciosData = [
  // ... (tus datos de servicios no cambian) ...
  {
    titulo: 'Microdermoabrasión',
    descripcionCorta: 'Mejora la textura de tu piel eliminando células muertas de forma segura.',
    imagen: '/assets/microdermoabrasion.jpg',
    videoUrl: 'https://www.youtube.com/embed/ID_DEL_VIDEO_1',
    posterUrl: '/assets/poster_microdermo.jpg',
    beneficios: [
      'Reduce la apariencia de líneas finas y arrugas.',
      'Minimiza el tamaño de los poros.',
      'Disminuye manchas superficiales y cicatrices de acné.',
      'Piel más suave, lisa y radiante al instante.'
    ],
    faqs: [
      { pregunta: '¿Es esto una exfoliación profunda?', respuesta: 'Sí, es una exfoliación mecánica controlada que retira las capas superficiales de la piel para promover la regeneración celular.' },
      { pregunta: '¿Quedaré con la piel roja después?', respuesta: 'Puede haber un enrojecimiento leve que generalmente desaparece en unas pocas horas. No requiere tiempo de inactividad.' }
    ]
  },
  {
    titulo: 'Rellenos Dérmicos',
    descripcionCorta: 'Corrige volumen y redefine tus facciones con resultados naturales.',
    imagen: '/assets/rellenos.jpg',
    videoUrl: 'https://www.youtube.com/embed/ID_DEL_VIDEO_2',
    posterUrl: '/assets/poster_rellenos.jpg',
    beneficios: [
      'Aumenta el volumen en labios y mejillas.',
      'Suaviza los surcos nasogenianos.',
      'Define el contorno de la mandíbula.',
      'Resultados inmediatos y de aspecto natural.'
    ],
    faqs: [
      { pregunta: '¿Cuánto tiempo dura el efecto del relleno?', respuesta: 'La duración varía según el producto y la zona tratada, pero generalmente los efectos duran entre 9 y 18 meses.' },
      { pregunta: '¿El procedimiento es reversible?', respuesta: 'Los rellenos de ácido hialurónico son reversibles. Se puede utilizar una enzima llamada hialuronidasa para disolver el producto si es necesario.' }
    ]
  },
];

const generalFaqData = [
    // ... (tus datos de FAQ general no cambian) ...
    { pregunta: '¿Necesito una consulta inicial antes de cualquier tratamiento?', respuesta: 'Sí, siempre recomendamos una consulta de valoración inicial. Nos permite evaluar tu tipo de piel, discutir tus objetivos y recomendar el plan de tratamiento más seguro y efectivo para ti.'},
    { pregunta: '¿Qué métodos de pago aceptan?', respuesta: 'Aceptamos pagos con tarjeta de crédito, débito, transferencia bancaria y efectivo. También puedes consultar nuestras opciones de financiación.'},
    { pregunta: '¿Cómo puedo agendar una cita?', respuesta: 'Puedes agendar tu cita fácilmente a través de nuestro botón de WhatsApp, llamando directamente a la clínica o utilizando el formulario de contacto en la sección "Agendar" de nuestra página web.'}
];

// ... (los componentes FaqItemInterno y GeneralFaqItem no cambian) ...
function FaqItemInterno({ pregunta, respuesta }) {
    const [isOpen, setIsOpen] = useState(false);
    return ( <div className="faq-item-interno"> <div className="faq-pregunta-interno" onClick={() => setIsOpen(!isOpen)}><h5>{pregunta}</h5><div className={`faq-icono ${isOpen ? 'open' : ''}`}>+</div></div><div className={`faq-respuesta-interno ${isOpen ? 'open' : ''}`}><p>{respuesta}</p></div></div> );
}
function GeneralFaqItem({ pregunta, respuesta }) {
    const [isOpen, setIsOpen] = useState(false);
    return ( <div className="general-faq-item"><div className="general-faq-pregunta" onClick={() => setIsOpen(!isOpen)}><h3>{pregunta}</h3><div className={`faq-icono ${isOpen ? 'open' : ''}`}>+</div></div><div className={`general-faq-respuesta ${isOpen ? 'open' : ''}`}><p>{respuesta}</p></div></div> );
}


export default function Servicios() {
  const [openIndex, setOpenIndex] = useState(null);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

  const handleToggle = (index) => {
    const newOpenIndex = openIndex === index ? null : index;
    setOpenIndex(newOpenIndex);
    if (newOpenIndex === null) setPlayingVideoIndex(null);
  };

  const handlePlayVideo = (e, index) => {
    e.stopPropagation();
    setPlayingVideoIndex(index);
  };

  return (
    <>
      <section className="servicios-page-container fade-in">
        <h1>Nuestros Servicios</h1>
        <p className="subtitulo-servicios">
          Descubre cómo podemos ayudarte a realzar tu belleza natural con tratamientos personalizados y de vanguardia.
        </p>

        <div className="servicios-grid-container">
          {serviciosData.map((servicio, index) => (
            <Fragment key={servicio.titulo}>
              <div className={`servicio-item ${openIndex === index ? 'active' : ''}`} onClick={() => handleToggle(index)}>
                <div className="servicio-header">
                  <img src={servicio.imagen} alt={servicio.titulo} className="servicio-header-img" />
                  <div className="servicio-header-texto">
                    <h3>{servicio.titulo}</h3>
                    <p>{servicio.descripcionCorta}</p>
                  </div>
                </div>
              </div>

              {openIndex === index && (
                <div className="servicio-detalle-expandido">
                  {/* === ESTE ES EL NUEVO DIV QUE AÑADIMOS === */}
                  <div className="detalle-contenido-wrapper">
                    {/* Columna del Video */}
                    <div className="detalle-columna video">
                      <h4>Video Demostrativo</h4>
                      <div className="video-player-wrapper">
                        {playingVideoIndex === index ? (
                          <div className="video-container">
                            <iframe src={`${servicio.videoUrl}?autoplay=1`} title={`Video del tratamiento ${servicio.titulo}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          </div>
                        ) : (
                          <div className="video-poster" onClick={(e) => handlePlayVideo(e, index)}>
                            <img src={servicio.posterUrl} alt={`Póster de ${servicio.titulo}`} />
                            <div className="play-button-overlay"><FontAwesomeIcon icon={faPlayCircle} /></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Columna de Contenido (Beneficios y FAQs) */}
                    <div className="detalle-columna contenido">
                      <h4>Beneficios Clave</h4>
                      <ul className="beneficios-lista">
                        {servicio.beneficios.map((beneficio, i) => (<li key={i}>{beneficio}</li>))}
                      </ul>
                      <h4 style={{ marginTop: '2rem' }}>Preguntas Frecuentes</h4>
                      <div className="faq-list-interna">
                        {servicio.faqs.map((faq, faqIndex) => (<FaqItemInterno key={faqIndex} pregunta={faq.pregunta} respuesta={faq.respuesta} />))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="faq-general-container fade-in">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-general-list">
            {generalFaqData.map((faq, index) => (<GeneralFaqItem key={index} pregunta={faq.pregunta} respuesta={faq.respuesta} />))}
        </div>
      </section>
    </>
  );
}