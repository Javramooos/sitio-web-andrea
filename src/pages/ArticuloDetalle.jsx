
import React, { Suspense, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articles } from '../articuloData';
import './ArticuloDetalle.css';
import useSEO from '../hooks/useSEO';
import JsonLD from '../components/JsonLD'; // Importamos el componente

const ArticleLoader = () => (
  <div className="detalle-container fade-in">
    <p>Cargando artículo...</p>
  </div>
);

export default function ArticuloDetalle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [ArticleComponent, setArticleComponent] = useState(null);

  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
      foundArticle.component().then(module => {
        setArticleComponent(() => module.default);
      });
    } else {
      navigate('/404');
    }
  }, [slug, navigate]);

  useSEO({
    title: article ? article.title : 'Cargando...',
    description: article ? article.summary : 'Cargando...',
    canonical: article ? `https://andreadiazmd.com/blog/${article.slug}` : ''
  });

  if (!article || !ArticleComponent) {
    return <ArticleLoader />;
  }

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
    "datePublished": new Date().toISOString().split('T')[0] // Opcional: añadir fecha de publicación a articuloData.js
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
    <Suspense key={article.id} fallback={<ArticleLoader />}>
      <JsonLD data={articleSchema} />
      <JsonLD data={breadcrumbSchema} />
      <ArticleComponent articleData={article} />
    </Suspense>
  );
}
