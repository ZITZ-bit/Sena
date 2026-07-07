'use client'

/* Componentes De Next */



/* Componentes Reutilizables */

import Tabla from "@/components/Tabla";
import TablaSemestre from "@/components/PensumTable";
import DatosAcademicos from "@/components/DatosAcademicos";
import DatosEstudiante from "@/components/DatosEstudiantes";

/* Data */

import { materias } from "@/shared/data/materias";
import { semestres } from "@/shared/data/semestres";

export default function Estudiante() {

  return (
    <main className="grid grid-cols-2 gap-x-3 gap-y-5 p-3">

      <section>
        <DatosEstudiante />
      </section>

      <section>
        <DatosAcademicos />
      </section>

      <section>
        <Tabla materias={materias} />
      </section>

      <section>
        <TablaSemestre semestres={semestres} />
      </section>

    </main>
  );
}