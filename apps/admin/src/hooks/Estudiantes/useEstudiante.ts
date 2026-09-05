import { useEffect, useState } from "react";

import { PerfilData } from "../Global/usePerfilCard";

export function useEstudiante() {

  const [estudiantes, setEstudiantes] = useState<PerfilData[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const cargarEstudiantes = async () => {

      try {

        const response = await fetch(
          "http://localhost:3002/estudiantes"
        );

        if (!response.ok) {
          throw new Error(
            "Error al obtener los estudiantes"
          );
        }

        const data = await response.json();

        console.log(
          "Estudiantes recibidos:",
          data
        );

        const estudiantesNormalizados = data.map(
          (estudiante: any) => ({

            ...estudiante,

            cedula:
              estudiante.usuarios?.cedula ??
              estudiante.cedula ??
              "",

            estado:
              estudiante.usuarios?.estado ??
              estudiante.estado ??
              true,

            foto_perfil:
              estudiante.foto_perfil ||
              "/Image/Perfil_Default.jpg",

            telefono:
              estudiante.telefono ??
              "No Registrado",

          })
        );

        setEstudiantes(estudiantesNormalizados);

      } catch (error) {

        console.error(
          "Error cargando estudiantes:",
          error
        );

        setError(
          "No se pudieron cargar los estudiantes."
        );

      } finally {

        setLoading(false);

      }

    };

    cargarEstudiantes();

  }, []);

  // Eliminar estudiante

  const eliminarEstudiante = async (id: number) => {

    try {

      const response = await fetch(
        `http://localhost:3002/estudiantes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "No se pudo eliminar el estudiante"
        );
      }

      setEstudiantes((estudiantesActuales) =>
        estudiantesActuales.filter(
          (estudiante) => estudiante.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Error eliminando estudiante:",
        error
      );

      setError(
        "No se pudo eliminar el estudiante."
      );

    }

  };

  return {

    estudiantes,

    loading,

    error,

    eliminarEstudiante,

  };

}
