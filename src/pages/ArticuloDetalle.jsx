import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articles } from '../articuloData';
import './ArticuloDetalle.css';
import useSEO from '../hooks/useSEO';
import JsonLD from './JsonLD'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faHome, faClock, faCalendarAlt, faUserMd } from '@fortawesome/free-solid-svg-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ArticleLoader = () => (
  <div className="detalle-container fade-in">
    <p>Cargando artículo...</p>
  </div>
);

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

export default function ArticuloDetalle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
      window.scrollTo(0, 0); // Scroll al inicio al cargar nuevo artículo
    } else {
      navigate('/404');
    }
  }, [slug, navigate]);

  useSEO({
    title: article ? article.title : 'Cargando...',
    description: article ? article.summary : 'Cargando...',
    canonical: article ? `https://andreadiazmd.com/blog/${article.slug}` : ''
  });

  // Procesar contenido HTML: generar IDs para h2 y extraer TOC
  const { htmlContent, tocHeadings } = useMemo(() => {
    if (!article) return { htmlContent: '', tocHeadings: [] };
    
    const headings = [];
    // Regex para encontrar headers HTML (<h2>Titulo</h2>)
    const regex = /<h2>(.*?)<\/h2>/g;
    
    const newContent = article.content.replace(regex, (match, title) => {
      const id = generateSlug(title);
      headings.push({ id, title });
      return `<h2 id="${id}">${title}</h2>`;
    });
    
    return { htmlContent: newContent, tocHeadings: headings };
  }, [article]);

  if (!article) {
    return <ArticleLoader />;
  }

  // Lógica para artículos recomendados (misma categoría, excluyendo el actual)
  const recommendedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 4);
  
  // Rellenar con otros si no hay suficientes de la misma categoría
  if (recommendedArticles.length < 2) {
    const others = articles
      .filter(a => a.id !== article.id && !recommendedArticles.includes(a))
      .slice(0, 4 - recommendedArticles.length);
    recommendedArticles.push(...others);
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(article.title);

  // Cálculo de tiempo de lectura (aprox 200 palabras por minuto)
  const readingTime = Math.ceil(article.content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://andreadiazmd.com/blog/${article.slug}`
    },
    "headline": article.title,
    "description": article.summary,
    "image": `https://andreadiazmd.com${article.imageUrl}`,
    "author": {
      "@type": "Person",
      "name": "Dra. Andrea Diaz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dra. Andrea Diaz - Medicina Estética Avanzada",
      "logo": {
        "@type": "ImageObject",
        "url": "https://andreadiazmd.com/assets/logo-andrea-512x512.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Blog",
        "item": "https://andreadiazmd.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": article.title
      }
    ]
  };

  return (
    <article className="detalle-container fade-in">
      <JsonLD data={articleSchema} />
      <JsonLD data={breadcrumbSchema} />

      {/* Breadcrumbs (Migas de Pan) */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></li>
          <li><span className="separator">/</span></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><span className="separator">/</span></li>
          <li><span className="current">{article.category}</span></li>
        </ol>
      </nav>

      <header className="detalle-header">
        <span className="categoria-tag">{article.category}</span>
        <h1>{article.title}</h1>
        <p className="article-meta">
          <span className="meta-item"><FontAwesomeIcon icon={faUserMd} /> {article.author}</span>
          <span className="meta-item"><FontAwesomeIcon icon={faCalendarAlt} /> <time dateTime={article.date}>{article.date}</time></span>
          <span className="meta-item"><FontAwesomeIcon icon={faClock} /> {readingTime} min de lectura</span>
        </p>
      </header>

      <img src={article.imageUrl} alt={article.title} className="detalle-imagen-portada" itemProp="image" />
      
      {/* Tabla de Contenidos Automática */}
      {tocHeadings.length > 0 && (
        <div className="tabla-contenidos-box">
          <h3>En este artículo:</h3>
          <ul>
            {tocHeadings.map(heading => (
              <li key={heading.id}>
                <a href={`#${heading.id}`} onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div 
        className="detalle-contenido" 
        itemProp="articleBody"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* CTA (Llamada a la acción) para conversión */}
      <div className="blog-cta-box">
        <h3>¿Te interesa este tratamiento?</h3>
        <p>Agenda una valoración personalizada con la Dra. Andrea Diaz y descubre cómo podemos ayudarte a resaltar tu mejor versión.</p>
        <Link to="/agenda" className="btn-cta-blog">Agendar Cita Ahora</Link>
      </div>

      {/* Imagen promocional pie de artículo (Footer interno del blog) */}
      <div className="article-footer-image-container">
        <Link to="/servicios">
          <img src="/assets/ANDREAFOOTER.png" alt="Promoción exclusiva Dra. Andrea Diaz" className="article-footer-image" />
        </Link>
      </div>

      {/* Caja de Autor (E-E-A-T) */}
      <div className="author-bio-box">
        <div className="author-avatar">
          <img src={article.authorImage || "/assets/principal3.jpg"} alt={article.author} />
        </div>
        <div className="author-info">
          <h4>Escrito por {article.author}</h4>
          <p className="author-role">Médico Estético Especialista</p>
          <p className="author-description">Experta en armonización facial y tratamientos láser con más de 10 años de experiencia transformando vidas a través de la medicina estética responsable.</p>
        </div>
      </div>

      {/* Sección de Compartir en Redes Sociales */}
      <div className="social-share-container">
        <h4>Compartir este artículo</h4>
        <div className="social-buttons">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-button facebook" aria-label="Compartir en Facebook">
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </a>
          <a href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-button whatsapp" aria-label="Compartir en WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer" className="social-button linkedin" aria-label="Compartir en LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
        </div>
      </div>

      {/* Carrusel de Artículos Recomendados */}
      <div className="articulos-relacionados-container">
        <h3>Artículos Recomendados</h3>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 }
          }}
          className="relacionados-swiper"
          style={{ paddingBottom: '40px' }}
        >
          {recommendedArticles.map(rel => (
            <SwiperSlide key={rel.id}>
              <Link to={`/blog/${rel.slug}`} className="relacionado-card">
                <img src={rel.imageUrl} alt={rel.title} />
                <div className="relacionado-card-content">
                  <span className="categoria-tag-relacionado">{rel.category}</span>
                  <h4>{rel.title}</h4>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </article>
  );
}
