import "../styles/about.css";

export default function AboutPage() {

  return (
    <div className="page-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Acerca de <span className="text-primary">TaskWare</span>
            </h1>
            <p className="hero-description">
              La historia detrás del gestor de tareas que está transformando la manera en que los estudiantes
              universitarios colaboran y se organizan.
            </p>
          </div>

          {/* Creator Section */}
          <div className="card">
            <div className="card-header">
              <div className="creator-header">
                <div>
                  <h3 className="card-title">Moises Casanova</h3>
                  <p className="card-subtitle">
                    Estudiante de Ingeniería en Sistemas Computacionales
                  </p>
                </div>
              </div>
            </div>
            <div className="card-content">
              <p className="card-text">
                Como estudiante de ingeniería, he experimentado de primera mano los desafíos de coordinar proyectos
                grupales, gestionar múltiples deadlines y mantener a todos los miembros del equipo sincronizados.
                TaskWare nació de esta necesidad real: crear una herramienta que realmente entienda el flujo de trabajo
                de los estudiantes universitarios.
              </p>
              <p className="card-text">
                Mi objetivo es simple: ayudar a otros estudiantes a organizarse mejor con sus compañeros de equipo,
                eliminando la frustración de la desorganización y permitiendo que se enfoquen en lo que realmente
                importa: aprender y crear.
              </p>
            </div>
          </div>

          {/* Mission & Inspiration Section */}
          <div className="cards-grid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">La Inspiración</h3>
              </div>
              <div className="card-content">
                <p className="card-text">
                  TaskWare surgió durante un proyecto particularmente caótico en mi carrera. Entre WhatsApp groups
                  desorganizados, archivos perdidos y deadlines confusos, me di cuenta de que necesitábamos algo mejor.
                  Algo diseñado específicamente para estudiantes, por un estudiante.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">La Misión</h3>
              </div>
              <div className="card-content">
                <p className="card-text">
                  Crear la herramienta de gestión de tareas más intuitiva y efectiva para estudiantes universitarios.
                  Una plataforma que entienda las necesidades únicas del entorno académico y facilite la colaboración
                  entre compañeros de clase.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Tecnología
              </h3>
            </div>
            <div className="card-content">
              <p className="card-text">
                TaskWare está construido con tecnologías modernas y confiables:
              </p>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">CSS</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">PostgreSQL</span>
              </div>
              <p className="card-text">
                Elegí estas tecnologías por su robustez, escalabilidad y porque me permiten iterar rápidamente basándome
                en el feedback de otros estudiantes.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Visión a Futuro
              </h3>
            </div>
            <div className="card-content">
              <p className="card-text">
                Esta es solo la primera versión de TaskWare. Tengo planes ambiciosos para mejorar continuamente la
                experiencia y adaptarnos a las necesidades de los estudiantes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
