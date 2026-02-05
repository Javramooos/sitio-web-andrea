import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { articles } from '../articuloData';
import './Blog.css';
import useSEO from '../hooks/useSEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ArticleCard = ({ article }) => (
  <Link to={`/blog/${article.slug}`} key={article.id} className="articulo-card">
    <div className="card-imagen">
      <img src={article.imageUrl} alt={article.title} loading="lazy" decoding="async" />
    </div>
    <div className="card-texto">
      <span className="categoria-tag">{article.category}</span>
      <h4>{article.title}</h4>
      <p>{article.summary}</p>
      <div className="leer-mas">Leer más →</div>
    </div>
  </Link>
);

const ARTICLES_PER_PAGE = 3; // Mostrar 3 artículos por página en la sección principal

export default function Blog() {
  useSEO({
    title: 'Blog de Medicina Estética y Bienestar - Dra. Andrea Diaz',
    description: 'Explora artículos sobre los últimos tratamientos de medicina estética, consejos para el cuidado de la piel y bienestar general por la Dra. Andrea Diaz en Bogotá.',
    canonical: 'https://andreadiazmd.com/blog'
  });
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('categoria');
  const [currentPage, setCurrentPage] = useState(1);

  // Artículos para el slider (los 3 primeros del total)
  const featuredArticles = articles.slice(0, 3);

  // Artículos para la paginación (todos los artículos, filtrados por categoría si aplica)
  const allArticlesForPagination = selectedCategory && selectedCategory !== 'Todos'
    ? articles.filter(a => a.category === selectedCategory)
    : articles;

  const allCategories = ['Todos', ...new Set(articles.map(a => a.category))];

  // Lógica de paginación
  const totalPages = Math.ceil(allArticlesForPagination.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const articlesToDisplay = allArticlesForPagination.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcional: scroll al inicio de la página
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'pagination-button active' : 'pagination-button'}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="blog-page-container fade-in">
      <Swiper
        className="featured-articles-swiper"
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={featuredArticles.length > 1}
      >
        {featuredArticles.map(article => (
          <SwiperSlide key={article.id}>
            <Link to={`/blog/${article.slug}`} className="articulo-destacado-slide">
              <img src={article.imageUrl} alt={article.title} />
              <div className="destacado-overlay">
                <span className="categoria-tag">{article.category}</span>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="blog-content-wrapper">
        <main className="blog-main-content">
          <h3>{selectedCategory && selectedCategory !== 'Todos' ? `Publicaciones sobre ${selectedCategory}` : 'Todas las Publicaciones'}</h3>
          <div className="articles-grid">
            {articlesToDisplay.length > 0 ? (
              articlesToDisplay.map(article => <ArticleCard key={article.id} article={article} />)
            ) : (
              <p>No hay publicaciones en esta categoría.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Primera
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Anterior
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Siguiente
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Última
              </button>
            </div>
          )}
        </main>

        <aside className="blog-sidebar">
          <div className="sidebar-section social-section">
            <h4>Síguenos</h4>
            <div className="sidebar-social-icons">
              <a href="https://www.instagram.com/dra.andreadm/" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.facebook.com/share/176LjUnJeu/" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.tiktok.com/@dra.andreadiaz" target="_blank" rel="noopener noreferrer" className="social-icon tiktok" aria-label="TikTok">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
              <a href="https://wa.me/573143712078" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" aria-label="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </div>
          <h4>Categorías</h4>
          <ul>
            {allCategories.map(category => (
              <li key={category} className={selectedCategory === category || (!selectedCategory && category === 'Todos') ? 'active-category' : ''}>
                <Link to={`/blog?categoria=${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}