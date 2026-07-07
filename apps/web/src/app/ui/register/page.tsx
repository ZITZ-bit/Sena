'use client'

import "@/styles/register.css";

import { GraduationCap } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="pageWrapper">

      <section className="brandArea">
        <div className="logoMark">
          <GraduationCap size={28} color="white" />
        </div>

        <span className="brandName">SENA</span>
      </section>

      <section className="centeredCard">

        <div className="cardHeader">
          <h1 className="cardTitle">Crear cuenta</h1>
          <p className="cardSubtitle">Completa los datos para registrarte en la plataforma.</p>
        </div>

        <p className="loginPrompt">¿Ya tienes una cuenta?{" "}
          <a href="/ui/login" className="loginLink">Inicia sesión</a>
        </p>

      </section>
    </main>
  );
}