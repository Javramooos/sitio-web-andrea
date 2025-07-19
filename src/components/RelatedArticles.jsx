import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../articuloData';
import styles from './RelatedArticles.module.css';

const RelatedArticles = ({ currentArticleId, category }) => {
  const related = articles
    .filter(a => a.category === category && a.id !== currentArticleId)
    .slice(0, 2); // Mostramos hasta 2 artículos relacionados

  if (related.length === 0) {
    return null; // No mostrar nada si no hay artículos relacionados
  }

  return (
    <div className={styles.relatedContainer}>
      <h3>También te puede interesar</h3>
      <div className={styles.grid}>
        {related.map(article => (
          <Link to={`/blog/${article.slug}`} key={article.id} className={styles.card}>
            <img src={article.imageUrl} alt={article.title} className={styles.cardImage} loading="lazy" decoding="async" />
            <div className={styles.cardContent}>
              <span className={styles.categoryTag}>{article.category}</span>
              <h4>{article.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
