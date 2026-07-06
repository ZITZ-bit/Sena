'use client'

import { useState } from "react"; 

import Estudiante from "@/app/views/Estudiante";
import Calendario from "@/app/views/Calendario";
import Estadisticas from "@/app/views/Estadisticas";

import Navbar from "@/components/Navbar";

import "@/styles/DashboardEstudiantes.css"

export default function DashboardEstudiantes() {

  const [activeSection, setActiveSection] = useState("Estudiante");

  return (
    <>
      <header>
        <Navbar onSelect={setActiveSection} />
      </header>

      <main>

        {activeSection === "Estudiante" && <Estudiante />}
        {activeSection === "Calendario" && <Calendario />}
        {activeSection === "Estadisticas" && <Estadisticas />}

      </main>

      <footer>

      </footer>
    </>
  );
}