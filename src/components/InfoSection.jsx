import React from 'react';
import InfoCard from './InfoCard';
import styles from './InfoSection.module.css';

const InfoSection = () => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>¿Qué es la medicina estética?</h2>
        <p className={styles.subtitle}>
          En BioRed, nos dedicamos a ofrecer soluciones innovadoras y sostenibles para el bienestar.
          Descubre cómo podemos ayudarte a alcanzar tus objetivos.
        </p>
      </div>
      <div className={styles.cardsContainer}>
        <InfoCard
          icon={<i className="fas fa-syringe"></i>} // Icono de jeringa para medicina estética
          title="Tratamientos Personalizados"
          description="Ofrecemos una amplia gama de procedimientos adaptados a tus necesidades y objetivos estéticos."
        />
        <InfoCard
          icon={<i className="fas fa-user-md"></i>} // Icono de doctor
          title="Profesionales Expertos"
          description="Nuestro equipo está formado por expertas altamente cualificados y con amplia experiencia."
        />
        <InfoCard
          icon={<i className="fas fa-clinic-medical"></i>} // Icono de clínica
          title="Tecnología Avanzada"
          description="Utilizamos las últimas innovaciones y equipos de vanguardia para resultados óptimos."
        />
      </div>
    </section>
  );
};

export default InfoSection;
