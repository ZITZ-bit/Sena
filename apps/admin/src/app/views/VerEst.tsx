'use client'

/* Componentes De Next */


/* Componentes Reutilizables */

import TarjetaPerfil from "@/components/Tarjetas/TarjetaPerfil";
import EstadosVacios from "@/components/Estados/EstadosVacios";
import Loading from "@/components/Estados/Loading";

/* Hooks */

import { useEstudiante } from "@/hooks/Estudiantes/useEstudiante";
import { useBuscarEstudiante } from "@/hooks/Estudiantes/useBuscarEstudiante";

export default function RegistroEst() {

  const { estudiantes, loading, error, eliminarEstudiante } = useEstudiante();
  const { busqueda, setBusqueda, estudiantesFiltrados } = useBuscarEstudiante(estudiantes);

  return (
    <section className="bg-gray-50 min-h-screen">

    <section className="flex justify-end mb-6">
      <div className="flex w-65 h-8 mt-5 mr-5">

        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar..." className=" w-full px-2 text-xs bg-white border border-gray-300 outline-none placeholder:text-gray-400 focus:border-[#616985] "/>

        <button className=" w-8 shrink-0 bg-[#616985] text-white flex items-center justify-center hover:bg-[#51586f] transition-colors cursor-pointer">
          <i className="bx bx-search text-sm"></i>
        </button>

      </div>
    </section>

      {loading ? (
        <Loading />
      ) : error || estudiantes.length === 0 || estudiantesFiltrados.length === 0 ? (
        <EstadosVacios />
      ) : (
        estudiantesFiltrados.map((estudiante) => (
          <TarjetaPerfil
            key={estudiante.id}
            perfil={estudiante}
            onEdit={() => console.log("Editar", estudiante)}
            onDelete={() => eliminarEstudiante(estudiante.id)}
          />
        ))
      )}
    </section>
  );
}