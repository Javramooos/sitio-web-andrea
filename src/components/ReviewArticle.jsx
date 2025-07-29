import React, { useEffect } from 'react';
import SocialShare from './SocialShare';
import RelatedArticles from './RelatedArticles';
import RecommendedArticles from './RecommendedArticles';
import FAQSection from './FAQSection';
import styles from './ReviewArticle.module.css';

const ReviewArticle = ({ articleData, children }) => {
  const { id, title, author, date, introduction, faqs, breadcrumbs, reviewSchema, imageUrl } = articleData;

  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', introduction);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = introduction;
      document.head.appendChild(newMeta);
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };

    const reviewScript = document.createElement('script');
    reviewScript.type = 'application/ld+json';
    reviewScript.id = 'review-schema';
    reviewScript.innerHTML = JSON.stringify(reviewSchema);
    document.head.appendChild(reviewScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.id = 'breadcrumb-schema';
    breadcrumbScript.innerHTML = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      const reviewScriptElement = document.getElementById('review-schema');
      if (reviewScriptElement) {
        document.head.removeChild(reviewScriptElement);
      }
      const breadcrumbScriptElement = document.getElementById('breadcrumb-schema');
      if (breadcrumbScriptElement) {
        document.head.removeChild(breadcrumbScriptElement);
      }
    };
  }, [title, introduction, reviewSchema, breadcrumbs]);

  return (
    <article className={styles.reviewArticle}>
      <header className={styles.header}>
        <nav aria-label="breadcrumb">
          <ol className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, index) => (
              <li key={index}>
                <a href={crumb.url}>{crumb.name}</a>
              </li>
            ))}
          </ol>
        </nav>
        <h1>{title}</h1>
        <p className={styles.meta}>Por {author} | Publicado el {date}</p>
      </header>

      {imageUrl && <img src={imageUrl} alt={title} className={styles.mainImage} />}

      <p className={styles.introduction}>{introduction}</p>

      <div className={styles.mainContent}>
        {children}
      </div>

      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}

      <SocialShare title={title} />

      <RecommendedArticles currentArticleId={id} />

    </article>
  );
};

export default ReviewArticle;