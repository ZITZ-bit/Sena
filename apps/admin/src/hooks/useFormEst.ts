import { useEffect, useState } from "react";
import { useAlert } from "./useAlert";

interface Carrera {
  id: number;
  nombre: string;
  descripcion?: string;
}

interface Semestre {
  id: number;
  nombre: string;
}

export function useFormEst() {

  const [formData, setFormData] = useState({

    nombre: "",
    apellido: "",
    cedula: "",
    password: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
    foto_perfil: "",
    carrera_id: "",
    semestre_id: "",

  });

  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [semestres, setSemestres] = useState<Semestre[]>([]);

  const {
    alert,
    showSuccess,
    showWarning,
    showError,
  } = useAlert();


  // Obtener carreras y semestres
  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const [carrerasResponse, semestresResponse] = await Promise.all([

          fetch("http://localhost:3002/carreras"),
          fetch("http://localhost:3002/semestres"),

        ]);

        if (!carrerasResponse.ok || !semestresResponse.ok) {
          throw new Error("Error al obtener carreras o semestres");
        }

        const carrerasData = await carrerasResponse.json();
        const semestresData = await semestresResponse.json();

        setCarreras(carrerasData);
        setSemestres(semestresData);

      } catch (error) {

        console.error("Error cargando carreras y semestres:", error);
        showError("No se pudieron cargar las carreras y semestres.");

      }

    };

    cargarDatos();

  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setFormData({

      ...formData,
      [e.target.id]: e.target.value,

    });

  };


  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setFormData({

      ...formData,

      foto_perfil: file.name,

    });

  };


  const handleSubmit = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      const body = {

        ...formData,

        carrera_id: formData.carrera_id
          ? Number(formData.carrera_id)
          : undefined,

        semestre_id: formData.semestre_id
          ? Number(formData.semestre_id)
          : undefined,

      };

      const response = await fetch(
        "http://localhost:3002/estudiantes",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        if (response.status === 409) {

          showWarning(data.message);

        } else {

          showError(
            data.message ||
            "No se pudo registrar el estudiante."
          );

        }

        return;
      }

      console.log(
        "Estudiante registrado:",
        data
      );

      showSuccess(
        "Estudiante registrado correctamente."
      );

    } catch (error) {

      console.error(
        "Error registrando estudiante:",
        error
      );

      showError(
        "No se pudo conectar con el servidor."
      );

    }

  };


  return {

    formData,
    carreras,
    semestres,
    alert,
    handleChange,
    handleFileChange,
    handleSubmit,

  };

}