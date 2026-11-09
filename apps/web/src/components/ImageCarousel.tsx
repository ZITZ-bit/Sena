"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "Una nueva etapa comienza aquí",
    title: "Aprende. Crece. Llega más lejos.",
    description:
      "Un lugar para descubrir lo que te apasiona y prepararte para todo lo que viene.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90",
    imageLabel: "Edificio universitario rodeado de árboles",
    action: "Conoce nuestra institución",
    href: "#oferta-academica",
  },
  {
    eyebrow: "Tu talento tiene un lugar",
    title: "El futuro se construye en comunidad.",
    description:
      "Comparte ideas, haz preguntas y encuentra nuevas formas de transformar tu entorno.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2200&q=90",
    imageLabel: "Estudiantes celebrando su graduación",
    action: "Descubre la vida estudiantil",
    href: "#vida-estudiantil",
  },
  {
    eyebrow: "Inscripciones abiertas",
    title: "El próximo paso es tuyo.",
    description:
      "Explora nuestros programas académicos y empieza a diseñar el camino que quieres recorrer.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=90",
    imageLabel: "Grupo de estudiantes conversando en el campus",
    action: "Explora la oferta académica",
    href: "#oferta-academica",
  },
];

export default function ImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction: -1 | 1) => {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  const slide = slides[activeSlide];

  return (
    <section
      aria-label="Presentación de la institución"
      aria-roledescription="carrusel"
      className="relative isolate min-h-[570px] overflow-hidden bg-[#102b49] sm:min-h-[620px] lg:min-h-[680px]"
    >
      <div
        aria-label={slide.imageLabel}
        className="absolute inset-0 -z-10 bg-cover bg-center transition-[background-image] duration-700"
        role="img"
        style={{ backgroundImage: `url("${slide.image}")` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b2038]/90 via-[#102b49]/65 to-[#102b49]/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b2038]/40 via-transparent to-[#0b2038]/10" />

      <div className="mx-auto flex min-h-[570px] max-w-[1240px] items-center px-5 pb-24 pt-16 sm:min-h-[620px] sm:px-8 sm:pb-28 lg:min-h-[680px] lg:px-10">
        <div
          aria-live="polite"
          className="max-w-[740px] text-white"
          key={slide.title}
        >
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.23em] text-[#ffd475] sm:text-sm">
            <span className="h-px w-9 bg-[#ffd475]" />
            {slide.eyebrow}
          </p>
          <h1 className="max-w-[700px] text-5xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
            {slide.title}
          </h1>
          <p className="mt-6 max-w-[560px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            {slide.description}
          </p>
          <a
            className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#f1b83f] px-6 py-4 text-sm font-bold text-[#132c49] transition hover:bg-white"
            href={slide.href}
          >
            {slide.action}
            <span aria-hidden="true" className="text-lg">↗</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2.5" aria-label="Seleccionar diapositiva">
            {slides.map((item, index) => (
              <button
                aria-label={`Mostrar diapositiva ${index + 1}: ${item.eyebrow}`}
                aria-pressed={activeSlide === index}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index
                    ? "w-10 bg-[#f1b83f]"
                    : "w-5 bg-white/55 hover:bg-white"
                }`}
                key={item.title}
                onClick={() => setActiveSlide(index)}
                type="button"
              />
            ))}
            <span className="ml-3 text-xs font-medium tracking-[0.16em] text-white/75">
              0{activeSlide + 1} <span className="px-1 text-white/40">/</span> 0
              {slides.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              aria-label="Diapositiva anterior"
              className="flex size-11 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:border-[#f1b83f] hover:bg-[#f1b83f] hover:text-[#132c49]"
              onClick={() => changeSlide(-1)}
              type="button"
            >
              ←
            </button>
            <button
              aria-label="Siguiente diapositiva"
              className="flex size-11 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:border-[#f1b83f] hover:bg-[#f1b83f] hover:text-[#132c49]"
              onClick={() => changeSlide(1)}
              type="button"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
