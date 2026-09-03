import { useMemo, useState } from "react";
import { PerfilData } from "../Global/usePerfilCard";

export function useBuscarEstudiante(
  estudiantes: PerfilData[]
) {
  const [busqueda, setBusqueda] = useState("");

  const estudiantesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return estudiantes;
    }

    return estudiantes.filter((estudiante) => {
      const nombre = estudiante.nombre?.toLowerCase() ?? "";
      const apellido = estudiante.apellido?.toLowerCase() ?? "";
      const cedula = estudiante.cedula?.toLowerCase() ?? "";

      return (
        nombre.includes(texto) ||
        apellido.includes(texto) ||
        cedula.includes(texto)
      );
    });
  }, [estudiantes, busqueda]);

  return {
    busqueda,
    setBusqueda,
    estudiantesFiltrados,
  };
}