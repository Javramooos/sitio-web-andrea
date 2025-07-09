// src/pages/Blog.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// Mantenemos las importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Blog() {
  // Usamos el estado de React para guardar los artículos y el estado de carga
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hacemos la llamada a la API de Strapi cuando el componente se monta
  useEffect(() => {
    const strapiUrl = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

    const fetchArticles = async () => {
      try {
        // La URL para obtener los artículos de Strapi, incluyendo sus imágenes
        const response = await fetch(`${strapiUrl}/api/articulos?populate=*`);
        const data = await response.json();

        // Transformamos los datos de Strapi a la estructura que tu componente ya usa
        const formattedArticles = data.data.map(item => ({
          id: item.id,
          slug: item.attributes.slug,
          categoria: item.attributes.categoria, // Asegúrate que este campo exista en Strapi
          titulo: item.attributes.titulo,
          resumen: item.attributes.resumen,   // Asegúrate que este campo exista en Strapi
          imagen: `${strapiUrl}${item.attributes.imagen_portada.data.attributes.url}`,
          fecha: item.attributes.publishedAt, // Usamos la fecha de publicación de Strapi
        }));
        
        setArticulos(formattedArticles);
      } catch (error) {
        console.error("Error al obtener los artículos de Strapi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []); // El array vacío asegura que la llamada se haga solo una vez

  // Mantenemos tu lógica para separar artículos destacados del resto
  const articulosOrdenados = [...articulos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const articulosDestacados = articulosOrdenados.slice(0, 5);
  const otrosArticulos = articulosOrdenados.slice(5);

  // Mostramos un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div className="blog-page-container fade-in"><p>Cargando blog...</p></div>;
  }

  // Tu JSX para mostrar los artículos se mantiene casi idéntico
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
          {/* Tu sidebar se mantiene igual */}
        </aside>
      </div>
    </div>
  );
}