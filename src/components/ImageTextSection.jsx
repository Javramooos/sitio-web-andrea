import React from 'react';
import styles from './ImageTextSection.module.css';

const ImageTextSection = ({ image, title, text }) => {
  return (
    <section className={styles.imageTextSection}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} loading="lazy" decoding="async" />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        {text.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default ImageTextSection;
