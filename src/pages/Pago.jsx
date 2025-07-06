import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import './Pago.css';

// 1. Importamos los componentes y módulos necesarios de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// 2. AÑADIMOS MÁS ARTÍCULOS Y UNA FECHA para poder ordenarlos
const articulosDelBlog = [
  {
    id: 1, slug: 'guia-completa-acido-hialuronico', categoria: 'Cuidado de la Piel',
    titulo: 'Guía Completa sobre el Ácido Hialurónico',
    resumen: 'Descubre por qué este ingrediente es el rey de la hidratación y cómo puede transformar tu piel.',
    imagen: '/assets/blog_hialuronico.jpg',
    fecha: '2025-07-03'
  },
  {
    id: 2, slug: 'mitos-y-verdades-del-botox', categoria: 'Tratamientos',
    titulo: 'Mitos y Verdades sobre la Toxina Botulínica (Botox)',
    resumen: 'La Dra. Andrea Diaz desmiente los mitos más comunes y te explica sus beneficios reales.',
    imagen: '/assets/blog_botox.jpg',
    fecha: '2025-06-28'
  },
  {
    id: 3, slug: 'mejores-serums-vitamina-c', categoria: 'Productos',
    titulo: 'Los Sérums con Vitamina C recomendados por la Doctora',
    resumen: 'Aprende a elegir el producto ideal para tu tipo de piel y tus objetivos de luminosidad.',
    imagen: '/assets/producto_serum_c.jpg',
    fecha: '2025-06-20'
  },
  {
    id: 4, slug: 'importancia-protector-solar', categoria: 'Cuidado de la Piel',
    titulo: 'Protector Solar: El Paso Anti-Edad que No Puedes Omitir',
    resumen: 'Más allá de prevenir quemaduras, el uso diario del protector solar es tu mejor inversión a largo plazo.',
    imagen: '/assets/producto_protector.jpg',
    fecha: '2025-06-15'
  },
  {
    id: 5, slug: 'que-es-la-microdermoabrasion', categoria: 'Tratamientos',
    titulo: '¿Qué es la Microdermoabrasión y es para ti?',
    resumen: 'Una exfoliación profunda que revela una piel nueva, suave y sin imperfecciones. Conoce sus ventajas.',
    imagen: '/assets/microdermoabrasion.jpg',
    fecha: '2025-06-10'
  },
  {
    id: 6, slug: 'rellenos-dermicos-naturales', categoria: 'Tratamientos',
    titulo: 'Rellenos Dérmicos: Logrando Volumen de Forma Natural',
    resumen: 'El secreto para redefinir contornos y suavizar líneas de expresión sin perder tu esencia.',
    imagen: '/assets/rellenos.jpg',
    fecha: '2025-06-05'
  },
];

// 3. Lógica para obtener los 5 artículos más recientes para el slider
// Ordenamos los artículos por fecha, del más nuevo al más viejo
const articulosOrdenados = [...articulosDelBlog].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
const articulosDestacados = articulosOrdenados.slice(0, 5); // Tomamos los primeros 5
const otrosArticulos = articulosOrdenados.slice(5);      // El resto para la lista de abajo


export default function Blog() {
  return (
    <div className="blog-page-container fade-in">
      
      {/* 4. REEMPLAZAMOS el artículo destacado estático por el Carrusel de Swiper */}
      <Swiper
        className="featured-articles-swiper"
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
      >
        {articulosDestacados.map(articulo => (
          <SwiperSlide key={articulo.id}>
            <Link to={`/blog/${articulo.slug}`} className="articulo-destacado-slide">
              <img src={articulo.imagen} alt={articulo.titulo} />
              <div className="destacado-overlay">
                <span className="categoria-tag">{articulo.categoria}</span>
                <h2>{articulo.titulo}</h2>
                <p>{articulo.resumen}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="blog-content-wrapper">
        <main className="blog-main-content">
          <h3>Otras Publicaciones</h3>
          {otrosArticulos.map(articulo => (
            <Link to={`/blog/${articulo.slug}`} key={articulo.id} className="articulo-card">
              <div className="card-imagen"><img src={articulo.imagen} alt={articulo.titulo} /></div>
              <div className="card-texto">
                <span className="categoria-tag">{articulo.categoria}</span>
                <h4>{articulo.titulo}</h4>
                <p>{articulo.resumen}</p>
                <div className="leer-mas">Leer más →</div>
              </div>
            </Link>
          ))}
        </main>

        <aside className="blog-sidebar">
          {/* La barra lateral no cambia */}
          <h4>Explorar Secciones</h4>
          <Link to="/pago" className="sidebar-card">Productos Recomendados</Link>
          <Link to="/servicios" className="sidebar-card">Tratamientos y cómo ayudan</Link>
          <Link to="/blog/cuidado-de-la-piel" className="sidebar-card">Guías para Cuidar tu Piel</Link>
        </aside>
      </div>
    </div>
  );
}