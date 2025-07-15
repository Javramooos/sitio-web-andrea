// src/pages/Blog.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../blogData'; // Importamos los datos estáticos
import './Blog.css';

// Mantenemos las importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Blog() {
  // Usamos directamente los datos importados
  const articulos = blogData.map(articulo => ({
    ...articulo,
    // Renombramos las claves para que coincidan con el JSX existente si es necesario
    titulo: articulo.title,
    resumen: articulo.summary,
    imagen: articulo.imageUrl,
    categoria: articulo.category
  }));

  // Lógica para separar artículos destacados del resto
  // En este caso, tomaremos los primeros 3 como destacados y el resto como "otros"
  const articulosDestacados = articulos.slice(0, 3);
  const otrosArticulos = articulos.slice(3);

  return (
    <div className="blog-page-container fade-in">
      <Swiper
        className="featured-articles-swiper"
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={articulosDestacados.length > 1}
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
          {otrosArticulos.length > 0 ? (
            otrosArticulos.map(articulo => (
              <Link to={`/blog/${articulo.slug}`} key={articulo.id} className="articulo-card">
                <div className="card-imagen"><img src={articulo.imagen} alt={articulo.titulo} /></div>
                <div className="card-texto">
                  <span className="categoria-tag">{articulo.categoria}</span>
                  <h4>{articulo.titulo}</h4>
                  <p>{articulo.resumen}</p>
                  <div className="leer-mas">Leer más →</div>
                </div>
              </Link>
            ))
          ) : (
            <p>No hay más publicaciones por el momento.</p>
          )}
        </main>

        <aside className="blog-sidebar">
          {/* Aquí podrías agregar contenido estático o enlaces a categorías */}
          <h4>Categorías</h4>
          <ul>
            <li><Link to="/blog">Todos</Link></li>
            <li><Link to="/blog?categoria=Productos">Productos</Link></li>
            <li><Link to="/blog?categoria=Salud">Salud</Link></li>
          </ul>
        </aside>
      </div>
    </div>
  );
}