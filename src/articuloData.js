export const articles = [
  {
    id: 1,
    slug: "mejores-protectores-solares-piel-grasa",
    title: "Los 5 Mejores Protectores Solares para Piel Grasa (2025)",
    summary: "Analizamos los 5 mejores protectores solares para piel grasa. Fórmulas ligeras, sin brillos y que no obstruyen los poros.",
    category: "Reseñas",
    imageUrl: "/assets/solar.png",
    component: () => import('/src/pages/articulos/MejoresProtectoresSolares.jsx')
  },
  {
    id: 2,
    slug: "serums-vitamina-c-piel-radiante",
    title: "Guía Definitiva de Sérums con Vitamina C para una Piel Radiante",
    summary: "La vitamina C es un potente antioxidante que puede transformar tu piel. Te presentamos los sérums más efectivos para iluminar, reafirmar y proteger tu rostro.",
    category: "Productos",
    imageUrl: "/assets/poster_facial.jpg",
    component: () => import('/src/pages/articulos/SerumsVitaminaC.jsx')
  },
  {
    id: 3,
    slug: "renueva-cabello-tratamientos-capilares",
    title: "Renueva tu Cabello: Tratamientos Capilares que Realmente Funcionan",
    summary: "Desde la sequedad hasta la caída, los problemas capilares nos afectan a todos. Estos son los tratamientos y productos que necesitas para lucir una melena espectacular.",
    category: "Productos",
    imageUrl: "/assets/poster_capilar.jpg",
    component: () => import('/src/pages/articulos/TratamientosCapilares.jsx')
  },
  {
    id: 4,
    slug: "beneficios-meditacion-diaria",
    title: "5 Beneficios Comprobados de la Meditación Diaria para tu Bienestar",
    summary: "En un mundo acelerado, encontrar un momento de calma es esencial. Descubre cómo solo 10 minutos de meditación al día pueden cambiar tu salud física y mental.",
    category: "Salud",
    imageUrl: "/assets/poster_bienestar.jpg",
    component: () => import('/src/pages/articulos/BeneficiosMeditacion.jsx')
  },
  {
    id: 5,
    slug: "hidratacion-clave-salud-piel",
    title: "Hidratación: La Clave para una Piel Sana y un Cuerpo Energizado",
    summary: "Beber suficiente agua es más que una recomendación básica. Entiende el impacto profundo que tiene la hidratación en tu piel, tu energía y tu salud general.",
    category: "Salud",
    imageUrl: "/assets/poster_antiage.jpg",
    component: () => import('/src/pages/articulos/HidratacionPiel.jsx')
  },
  {
    id: 6,
    slug: "importancia-sueno-reparador",
    title: "El Arte del Descanso: La Importancia de un Sueño Reparador",
    summary: "Dormir no es un lujo, es una necesidad biológica. Aprende por qué un sueño de calidad es tan importante como la dieta y el ejercicio para tu salud.",
    category: "Salud",
    imageUrl: "/assets/poster_corporal.jpg",
    component: () => import('/src/pages/articulos/SuenoReparador.jsx')
  }
];