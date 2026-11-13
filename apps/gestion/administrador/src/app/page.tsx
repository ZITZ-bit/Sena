'use client';

/* Componentes De Next */

import { useState } from "react";

/* Componentes Reutilizables */

import Inicio from "@/app/views/Inicio";
import RegistroProf from "@/app/views/RegistroProf";
import VerProf from "@/app/views/VerProf";
import RegistroEst from "@/app/views/RegistroEst";
import VerEst from "@/app/views/VerEst";

import SideBar from "../components/SideBar";

/* Estilos */

import "../styles/Dashboard.css"

export default function Dashboard() {

  const [activeSection, setActiveSection] = useState("Inicio");

  return (
    <>
      <header>
        <SideBar onSelect={setActiveSection} />
      </header>

      <main>

        {activeSection === "Inicio" && <Inicio/>}
        {activeSection === "Registrar Profesores" && <RegistroProf/>}
        {activeSection === "Ver Profesores" && <VerProf/>}
        {activeSection === "Registrar Estudiantes" && <RegistroEst/>}
        {activeSection === "Ver Estudiantes" && <VerEst/>}

      </main>

      <footer>

      </footer>
    </>
  );
}
