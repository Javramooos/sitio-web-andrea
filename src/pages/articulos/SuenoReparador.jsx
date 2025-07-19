import React from 'react';
import ReviewArticle from '../../components/ReviewArticle';

const articleData = {
  id: 6,
  title: "El Arte del Descanso: La Importancia de un Sueño Reparador",
  author: "Dra. Andrea Diaz",
  date: "18 de Julio, 2025",
  introduction: "En nuestra sociedad moderna, el sueño a menudo se sacrifica en aras de la productividad o el ocio. Sin embargo, dormir no es un lujo, sino una necesidad biológica fundamental para nuestra salud física y mental. Descubre por qué un sueño de calidad es tan importante como la dieta y el ejercicio.",
  pros: [
    "Mejora la función cognitiva y la concentración.",
    "Fortalece el sistema inmunológico.",
    "Regula el estado de ánimo y reduce el estrés.",
    "Promueve la reparación celular y el crecimiento físico."
  ],
  cons: [
    "Factores externos (ruido, luz) pueden dificultar el sueño.",
    "El estrés y la ansiedad pueden interferir con el descanso.",
    "Requiere disciplina para establecer una rutina de sueño."
  ],
  category: "Salud",
  imageUrl: "/assets/poster_corporal.jpg",
  breadcrumbs: [
    { name: "Blog", url: "/blog" },
    { name: "Salud", url: "/blog?categoria=Salud" },
    { name: "Sueño Reparador", url: "/blog/importancia-sueno-reparador" }
  ],
  reviewSchema: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "El Arte del Descanso: La Importancia de un Sueño Reparador",
    "author": { "@type": "Person", "name": "Dra. Andrea Diaz" },
    "datePublished": "2025-07-18",
    "image": "/assets/poster_corporal.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "BioRed Site",
      "logo": {
        "@type": "ImageObject",
        "url": "/assets/logo-andrea.png"
      }
    },
    "description": "Aprende por qué un sueño de calidad es tan importante como la dieta y el ejercicio para tu salud física y mental."
  },
  faqs: [
    {
      question: "¿Cuántas horas de sueño necesito realmente?",
      answer: "La mayoría de los adultos necesitan entre 7 y 9 horas de sueño por noche. Sin embargo, las necesidades individuales pueden variar. Lo importante es despertarse sintiéndose descansado y energizado."
    },
    {
      question: "¿Qué es la higiene del sueño?",
      answer: "La higiene del sueño se refiere a un conjunto de hábitos y prácticas que son necesarios para tener una buena calidad de sueño de forma regular. Incluye mantener un horario de sueño regular, crear un ambiente propicio para dormir y evitar estimulantes antes de acostarse."
    },
    {
      question: "¿Es malo usar el teléfono antes de dormir?",
      answer: "Sí, la luz azul emitida por las pantallas de teléfonos, tabletas y computadoras puede suprimir la producción de melatonina, la hormona que regula el sueño. Se recomienda evitar las pantallas al menos una hora antes de acostarse."
    }
  ]
};

const SuenoReparador = () => {
  return (
    <ReviewArticle articleData={articleData}>
      <p>En la sociedad actual, a menudo se glorifica la falta de sueño como un signo de productividad o dedicación. Sin embargo, esta mentalidad es profundamente errónea y perjudicial para nuestra salud. El sueño no es un tiempo de inactividad, sino un proceso biológico activo y esencial durante el cual nuestro cuerpo y mente se reparan, consolidan recuerdos y se preparan para el día siguiente.</p>

      <h2>¿Qué Sucede Mientras Dormimos?</h2>
      <p>El sueño se divide en ciclos, cada uno compuesto por diferentes etapas: sueño REM (Rapid Eye Movement) y sueño No-REM (que incluye las etapas de sueño ligero y profundo). Cada etapa cumple funciones vitales:</p>
      <ul>
        <li><strong>Sueño No-REM:</strong> Durante las etapas de sueño profundo, el cuerpo se repara físicamente. Se liberan hormonas de crecimiento, se reparan tejidos, se fortalece el sistema inmunológico y se restaura la energía.</li>
        <li><strong>Sueño REM:</strong> Esta etapa es crucial para la función cerebral. Se consolidan los recuerdos, se procesan las emociones y se resuelven problemas. Es cuando soñamos más vívidamente.</li>
      </ul>

      <h2>Consecuencias de la Privación del Sueño</h2>
      <p>La falta crónica de sueño puede tener un impacto devastador en casi todos los aspectos de nuestra vida:</p>
      <ul>
        <li><strong>Salud Física:</strong> Aumenta el riesgo de enfermedades cardíacas, diabetes tipo 2, obesidad y debilita el sistema inmunológico.</li>
        <li><strong>Salud Mental:</strong> Contribuye a la irritabilidad, ansiedad, depresión y dificultad para manejar el estrés.</li>
        <li><strong>Función Cognitiva:</strong> Deteriora la concentración, la memoria, la toma de decisiones y la creatividad.</li>
        <li><strong>Rendimiento:</strong> Reduce la productividad en el trabajo o estudio y aumenta el riesgo de accidentes.</li>
      </ul>

      <h2>Consejos para Cultivar un Sueño Reparador (Higiene del Sueño)</h2>
      <p>Mejorar la calidad de tu sueño es una inversión en tu salud general. Aquí tienes algunas estrategias clave:</p>
      <ul>
        <li><strong>Establece un Horario Regular:</strong> Intenta acostarte y levantarte a la misma hora todos los días, incluso los fines de semana. Esto ayuda a regular tu reloj biológico.</li>
        <li><strong>Crea un Ambiente Propicio:</strong> Asegúrate de que tu dormitorio sea oscuro, silencioso, fresco y cómodo. Invierte en un buen colchón y almohadas.</li>
        <li><strong>Evita Estimulantes:</strong> Limita la cafeína y el alcohol, especialmente en las horas previas a dormir. La nicotina también es un estimulante.</li>
        <li><strong>Desconéctate de las Pantallas:</strong> La luz azul de teléfonos, tabletas y computadoras puede interferir con la producción de melatonina. Evita las pantallas al menos una hora antes de acostarte.</li>
        <li><strong>Rutina Relajante Pre-Sueño:</strong> Toma un baño caliente, lee un libro, escucha música suave o practica técnicas de relajación como la meditación o la respiración profunda.</li>
        <li><strong>Ejercicio Regular:</strong> La actividad física durante el día puede mejorar la calidad del sueño, pero evita el ejercicio intenso justo antes de acostarte.</li>
      </ul>

      <p>Priorizar el sueño es un acto de autocuidado que te permitirá funcionar a tu máximo potencial, tanto física como mentalmente. ¡Empieza hoy a construir hábitos de sueño saludables y experimenta la transformación!</p>

    </ReviewArticle>
  );
};

export default SuenoReparador;
