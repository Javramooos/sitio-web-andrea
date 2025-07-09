import React from 'react';
import styles from './InfoCard.module.css';

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {icon} {/* El icono puede ser un componente SVG, una imagen, o un elemento de texto */}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default InfoCard;
