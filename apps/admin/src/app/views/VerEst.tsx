'use client'

/* Componentes De Next */



/* Componentes Reutilizables */

import TarjetaPerfil from "@/components/TarjetaPerfil";

/* Data */

import { useEstudiante } from "@/hooks/Estudiantes/useEstudiante";

export default function RegistroEst() {

  const { estudiantes, loading, error, eliminarEstudiante } = useEstudiante();

  return (
    <section className="bg-gray-50 min-h-screen">
      {estudiantes.map((estudiante) => (

        <TarjetaPerfil
          key={estudiante.id}
          perfil={estudiante}
          onEdit={() => console.log("Editar", estudiante)}
          onDelete={() => eliminarEstudiante(estudiante.id)}
        />

      ))}
    </section>
  );
}