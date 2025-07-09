import React from 'react';
import styles from './DrDiazSection.module.css';

const DrDiazSection = ({ imageSrc, mainTitle, mainSubtitle, descriptionText }) => {
  return (
    <section className={styles.drDiazSection}>
      <h2 className={styles.mainTitle}>{mainTitle}</h2>
      <p className={styles.mainSubtitle}>{mainSubtitle}</p>
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <img src={imageSrc} alt="Dra. Andrea Diaz" className={styles.drDiazImage} />
        </div>
        <div className={styles.textContent}>
          <p className={styles.description}>{descriptionText}</p>
        </div>
      </div>
    </section>
  );
};

export default DrDiazSection;