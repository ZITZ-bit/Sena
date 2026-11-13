"use client";

import { useState } from "react";
import { clearSession } from "@sena/auth";
import { NavbarProgramador } from "@sena/programador";
import ProgramadorDataTable from "./EstudiantesTable";

const loginUrl =
  process.env.NEXT_PUBLIC_LOGIN_URL || "http://localhost:3005";

export default function ProgramadorPage() {
  const [activeSection, setActiveSection] = useState("Estudiantes");

  const logout = () => {
    clearSession();
    window.location.assign(loginUrl);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <NavbarProgramador
        activeSection={activeSection}
        onSelect={setActiveSection}
        onLogout={logout}
      />

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <ProgramadorDataTable section={activeSection} />
      </section>
    </main>
  );
}
