import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/ImageCarousel";
import "../styles/portal.css";

const news = [
  {
    category: "Vida universitaria",
    date: "12 de octubre, 2026",
    title: "Una comunidad que aprende, crea y transforma",
    excerpt:
      "Conoce las actividades y experiencias que hacen de nuestro campus un espacio para crecer dentro y fuera del aula.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
    imageLabel: "Estudiantes compartiendo en el campus",
  },
  {
    category: "Admisiones",
    date: "08 de octubre, 2026",
    title: "Ya están abiertas las inscripciones",
    excerpt:
      "Da el siguiente paso en tu formación. Revisa la oferta académica y descubre todo lo que puedes alcanzar.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85",
    imageLabel: "Graduados celebrando su logro académico",
  },
  {
    category: "Investigación",
    date: "02 de octubre, 2026",
    title: "Ideas que se convierten en oportunidades",
    excerpt:
      "Impulsamos proyectos, talento y conocimiento para construir respuestas a los retos de nuestro entorno.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85",
    imageLabel: "Investigadora trabajando en un laboratorio",
  },
];

const quickLinks = [
  {
    number: "01",
    title: "Sistema académico",
    description: "Consulta tus materias, calificaciones y horario.",
    href: "http://localhost:3005",
    icon: "↗",
  },
  {
    number: "02",
    title: "Oferta académica",
    description: "Encuentra el programa que va contigo.",
    href: "#oferta-academica",
    icon: "✳",
  },
  {
    number: "03",
    title: "Vida estudiantil",
    description: "Todo lo que puedes vivir en el campus.",
    href: "#vida-estudiantil",
    icon: "⌂",
  },
];

export default function Portal() {
  return (
    <main>
      <div className="portal-topbar">
        <div className="portal-container portal-topbar__inner">
          <p>Formamos hoy a quienes transformarán el mañana.</p>
          <div className="portal-topbar__links">
            <a href="mailto:info@sena.edu.ve">info@sena.edu.ve</a>
            <span aria-hidden="true">·</span>
            <a href="#contacto">Contáctanos</a>
          </div>
        </div>
      </div>

      <Navbar />

      <ImageCarousel />

      <section className="portal-shortcuts" aria-label="Accesos rápidos">
        <div className="portal-container portal-shortcuts__grid">
          {quickLinks.map((link) => (
            <a className="portal-shortcut" href={link.href} key={link.number}>
              <span className="portal-shortcut__number">{link.number}</span>
              <span className="portal-shortcut__copy">
                <strong>{link.title}</strong>
                <span>{link.description}</span>
              </span>
              <span className="portal-shortcut__icon" aria-hidden="true">
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="portal-news portal-section" id="vida-estudiantil">
        <div className="portal-container">
          <div className="portal-section-heading">
            <div>
              <p className="portal-eyebrow">Lo que está pasando</p>
              <h2>Noticias que nos mueven</h2>
            </div>
            <a className="portal-text-link" href="#noticias">
              Ver todas las noticias <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="portal-news__grid" id="noticias">
            {news.map((item) => (
              <article className="portal-news-card" key={item.title}>
                <div
                  aria-label={item.imageLabel}
                  className="portal-news-card__image"
                  role="img"
                  style={{ backgroundImage: `url("${item.image}")` }}
                >
                  <span>{item.category}</span>
                </div>
                <div className="portal-news-card__body">
                  <p className="portal-news-card__date">{item.date}</p>
                  <h3>{item.title}</h3>
                  <p className="portal-news-card__excerpt">{item.excerpt}</p>
                  <a
                    className="portal-text-link"
                    href="#noticias"
                    aria-label={`Leer más: ${item.title}`}
                  >
                    Leer más <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portal-about" id="oferta-academica">
        <div className="portal-container portal-about__inner">
          <div className="portal-about__copy">
            <p className="portal-eyebrow portal-eyebrow--light">Más que una institución</p>
            <h2>Tu futuro empieza con una buena decisión.</h2>
            <p>
              Aquí encuentras las herramientas, las personas y las oportunidades
              para convertir lo que te apasiona en lo que puedes lograr.
            </p>
            <a className="portal-button portal-button--light" href="#contacto">
              Explora nuestra oferta <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="portal-about__stats" aria-label="Nuestra comunidad">
            <div>
              <strong>+25</strong>
              <span>años formando profesionales</span>
            </div>
            <div>
              <strong>12</strong>
              <span>programas para elegir</span>
            </div>
            <div>
              <strong>+8 mil</strong>
              <span>historias que nos inspiran</span>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-cta" id="sistema-academico">
        <div className="portal-container portal-cta__inner">
          <div>
            <p className="portal-eyebrow">Tu espacio, a un clic</p>
            <h2>¿Ya formas parte de nuestra comunidad?</h2>
            <p>Ingresa al sistema académico y mantente al día con tu vida universitaria.</p>
          </div>
          <a className="portal-button portal-button--dark" href="http://localhost:3005">
            Ir al sistema <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="portal-footer" id="contacto">
        <div className="portal-container portal-footer__inner">
          <a className="portal-footer__brand" href="#" aria-label="SENA, inicio">
            <span className="portal-brand__mark" aria-hidden="true">S</span>
            <span>SENA<span className="portal-brand__dot">.</span></span>
          </a>
          <p>Formamos hoy a quienes transformarán el mañana.</p>
          <span>© 2026 SENA · Todos los derechos reservados</span>
        </div>
      </footer>
    </main>
  );
}
