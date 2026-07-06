"use client"

import "@/styles/login.css"

export default function Login() {
  return (
    <main className="login-container">

      <section className="login-image">
        <div className="login-overlay">
          {/* Contenedor de marca premium reemplazando el "Bienvenidos" feo */}
          <div className="brand-showcase">
            <div className="brand-logo-accent"></div>
            <h1 className="brand-title">SENA</h1>
            <p className="brand-tagline">Construyendo un futuro de conocimiento y tecnología.</p>
          </div>
        </div>
      </section>

      <section className="login-card">

        <div className="system-header">
          <h1 className="system-title">SENA</h1>
          <h2 className="system-subtitle">Sistema de Gestión Académica</h2>
          <h3 className="login-title">Acceso al Sistema</h3>
        </div>

        <form className="login-form">

          <section className="form-group">
            <input id="cedula" name="cedula" type="text" placeholder="Ingrese su cédula" className="form-input" required />
            <label htmlFor="cedula" className="form-label">Cédula</label>
          </section>

          <section className="form-group">
            <input id="password" name="password" type="password" placeholder="Ingrese su contraseña" className="form-input" required/>
            <label htmlFor="password" className="form-label">Contraseña</label>
          </section>

          {/* Enlace de recuperación */}
          <div className="form-options">
            <a href="#" className="forgot-password">¿Haz olvidado tu contraseña?</a>
          </div>

          <button type="submit" className="login-button">Ingresar</button>

        </form>

      </section>

    </main>
  );
}
