"use client"

import "@/styles/login.css"

import LoginAlert from "@/components/LoginAlert";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {

  const {

    error, 
    cedula,
    success,
    loading, 
    password, 
    setCedula, 
    setPassword, 
    handleSubmit

  } = useLogin();

  return (
    <main className="login-container">

      <section className="login-image">
        <div className="login-overlay">
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

        <form className="login-form" onSubmit={handleSubmit}>

          {error && (
            <LoginAlert type="error" message={error}/>
          )}

          {success && (
            <LoginAlert type="success" message={success}/>
          )}

          <section className="form-group">
            <input id="cedula" name="cedula" type="text" placeholder="Ingrese su cédula" className="form-input" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
            <label htmlFor="cedula" className="form-label">Cédula</label>
          </section>

          <section className="form-group">
            <input id="password" name="password" type="password" placeholder="Ingrese su contraseña" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <label htmlFor="password" className="form-label">Contraseña</label>
          </section>

          {/* Enlace de recuperación */}
          <div className="form-options">
            <a href="#" className="forgot-password">¿Haz olvidado tu contraseña?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</button>

        </form>

      </section>

    </main>
  );
}
