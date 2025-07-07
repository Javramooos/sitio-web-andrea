import React from 'react';
import './Inicio.css'; // Asegúrate de que la importación del CSS sigue aquí

// --- Datos para las secciones ---
const testimonials = [
  {
    name: 'Sophia Clark',
    time: '2 months ago',
    image: 'https://i0.wp.com/www.venezuelaennotas.com/wp-content/uploads/La-Gaita-Zuliana-1.jpg?resize=800%2C520&ssl=1',
    text: 'Dr. Diaz is amazing! She took the time to understand my goals and recommended the perfect treatment plan. The results are natural and I feel more confident than ever.',
  },
  {
    name: 'Olivia Bennett',
    time: '3 months ago',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelu0MWPNqlyhTG9nPmrVkibmeiSK3wv5b2A&s',
    text: "I've been seeing Dr. Diaz for years and she always delivers exceptional results. Her expertise and attention to detail are unmatched.",
  },
  {
    name: 'Emma Carter',
    time: '5 months ago',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/General_Marcos_Evangelista_P%C3%A9rez_Jim%C3%A9nez%2C_Venezuela.jpg',
    text: "I highly recommend Dr. Diaz. She is professional, caring, and truly passionate about her work. I'm thrilled with the outcome of my procedure.",
  },
];

const services = [
  { name: 'Facial Rejuvenation', image: 'https://via.placeholder.com/400x400?text=Facial' },
  { name: 'Body Contouring', image: 'https://via.placeholder.com/400x400?text=Body' },
  { name: 'Skin Treatments', image: 'https://via.placeholder.com/400x400?text=Skin' },
  { name: 'Injectables', image: 'https://via.placeholder.com/400x400?text=Injectables' },
  { name: 'Laser Therapy', image: 'https://via.placeholder.com/400x400?text=Laser' },
  { name: 'Hair Restoration', image: 'https://via.placeholder.com/400x400?text=Hair' },
];

export default function Inicio() {
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 justify-center py-5">
        <div className="flex flex-col w-full max-w-none px-0">

          {/* --- Hero Section --- */}
          <div className="relative w-full h-[80vh] overflow-hidden mt-0 pt-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/assets/andrea.mp4"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <h1 className="text-5xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-6xl">
                Medicina Estética Avanzada para tu Belleza Natural
              </h1>
              <p className="mt-4 text-base font-normal leading-relaxed text-white/90 sm:text-lg">
                La Dra. Andrea Diaz se especializa en tratamientos estéticos avanzados diseñados para tus necesidades únicas.
              </p>
              <a href="servicios">
                <button className="mt-6 flex h-12 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[var(--primary-color)] px-6 text-base font-bold leading-normal tracking-[0.015em] text-white transition-all hover:scale-105 hover:bg-opacity-90">
                  <span className="truncate">Agendar una Consulta</span>
                </button>
              </a>
            </div>
          </div>

          {/* --- Trusted by Patients Section --- */}
          <section className="py-16">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-2">Confiado por Pacientes</h2>
            <p className="text-center text-[var(--text-secondary)] mb-10">Nos enorgullece la confianza que nuestros pacientes depositan en nosotros.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="overflow-hidden rounded-xl aspect-[4/5]">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-300 hover:scale-105"
                    style={{ backgroundImage: `url("https://images.template.net/391183/Health-Clinic-Icon-edit-online.jpg")` }}
                  ></div>
                </div>
              ))}
            </div>
          </section>

          {/* --- Meet Dr. Andrea Diaz Section --- */}
          <section className="py-16 bg-white rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 px-6 md:px-12">
              <div className="flex-shrink-0">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-48 shadow-lg"
                  style={{ backgroundImage: 'url("https://i0.wp.com/revistareplicante.com/wp-content/uploads/2011/06/dr-house-2.jpeg?fit=320%2C474&ssl=1")' }}
                ></div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold leading-tight tracking-tight mb-2">Conoce a la Dra. Andrea Diaz</h2>
                <p className="text-[var(--text-secondary)] text-lg font-medium">Especialista en Medicina Estética Avanzada</p>
                <p className="text-[var(--text-secondary)] mt-4 max-w-xl">
                  Con más de 10 años de experiencia, la Dra. Andrea Diaz es una especialista líder dedicada a ofrecer cuidado personalizado y lograr resultados naturales.
                </p>
              </div>
            </div>
          </section>

          {/* --- Testimonials Section --- */}
          <section className="py-16">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-10">Lo que Dicen Nuestros Pacientes</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style={{ backgroundImage: `url("${testimonial.image}")` }}></div>
                    <div>
                      <p className="text-[var(--text-primary)] text-base font-bold">{testimonial.name}</p>
                      <p className="text-[var(--text-secondary)] text-sm">{testimonial.time}</p>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)]">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- Services Section --- */}
          <section className="py-16">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-10">Nuestros Servicios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="flex flex-col gap-4 group">
                  <div className="overflow-hidden rounded-xl">
                    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url("${service.image}")` }}></div>
                  </div>
                  <h3 className="text-xl font-bold text-center">{service.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* --- FAQ Section --- */}
          <section className="py-16 px-6 md:px-12 bg-white rounded-2xl">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="flex flex-col gap-y-8">
                <h2 className="text-3xl font-bold leading-tight tracking-tight mb-2">
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      question: "What is aesthetic medicine?",
                      answer: "Aesthetic medicine includes a range of non-invasive to minimally invasive cosmetic treatments designed to enhance your appearance and boost confidence. These procedures focus on improving cosmetic appearance through various treatments."
                    },
                    {
                      question: "What types of treatments do you offer?",
                      answer: "We offer a wide array of treatments including facial rejuvenation, body contouring, various skin treatments, injectables like Botox and fillers, laser therapy for different skin concerns, and advanced hair restoration techniques."
                    },
                    {
                      question: "How do I book an appointment?",
                      answer: "Booking an appointment is easy! You can click the 'Book Appointment' button on our website to access our online scheduling form. Alternatively, you can call our clinic directly or contact us via WhatsApp."
                    }
                  ].map((faq, index) => (
                    <details key={index} className="flex flex-col rounded-xl border border-gray-200 p-4 group cursor-pointer">
                      <summary className="flex items-center justify-between gap-6 list-none">
                        <p className="text-[var(--text-primary)] font-medium">{faq.question}</p>
                        <div className="text-[var(--text-secondary)] group-open:rotate-180 transition-transform duration-300">
                          <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                      </summary>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8 mt-4 md:mt-0">
                <div className="flex items-center gap-6 rounded-xl overflow-hidden p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-32 h-24 bg-center bg-cover rounded-md flex-shrink-0" style={{ backgroundImage: 'url("https://i0.wp.com/revistareplicante.com/wp-content/uploads/2011/06/dr-house-2.jpeg?fit=320%2C474&ssl=1")' }}></div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[var(--text-secondary)] text-sm font-medium">Featured Article</p>
                    <h3 className="font-bold text-lg leading-tight">The Latest Advances in Aesthetic Medicine</h3>
                  </div>
                </div>

                <div className="flex items-center gap-6 rounded-xl overflow-hidden p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-32 h-24 bg-center bg-cover rounded-md flex-shrink-0" style={{ backgroundImage: 'url("https://i0.wp.com/revistareplicante.com/wp-content/uploads/2011/06/dr-house-2.jpeg?fit=320%2C474&ssl=1")' }}></div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[var(--text-secondary)] text-sm font-medium">Recommended Product</p>
                    <h3 className="font-bold text-lg leading-tight">Skincare Essentials for a Radiant Complexion</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
