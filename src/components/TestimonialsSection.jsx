import React from 'react';
import TestimonialCard from './TestimonialCard';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.title}>Lo que Dicen Nuestros Pacientes</h2>
      <div className={styles.cardsContainer}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            profilePic={testimonial.image}
            name={testimonial.name}
            date={testimonial.time}
            review={testimonial.text}
            beforeAfterImages={[
              testimonial.beforeImage,
              testimonial.afterImage,
            ]}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
