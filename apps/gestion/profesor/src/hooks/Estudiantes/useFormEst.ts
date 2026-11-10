import { useEffect, useState } from "react";

import { useAlert } from "../Global/useAlert";
import { API_URL } from "@/lib/api";

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
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
    sexo: "",
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
        const [carrerasRes, semestresRes] = await Promise.allSettled([
          fetch(`${API_URL}/carreras`),
          fetch(`${API_URL}/semestres`),
        ]);

        if (carrerasRes.status === "fulfilled" && carrerasRes.value.ok) {
          const carrerasData = await carrerasRes.value.json();
          setCarreras(carrerasData);
        } else {
          console.warn("No se pudieron cargar las carreras.");
        }

        if (semestresRes.status === "fulfilled" && semestresRes.value.ok) {
          const semestresData = await semestresRes.value.json();
          setSemestres(semestresData);
        } else {
          console.warn("No se pudieron cargar los semestres.");
        }
      } catch (error) {
        console.error("Error cargando carreras y semestres:", error);
        showError("No se pudieron cargar las carreras y semestres.");
      }
    };

    cargarDatos();
  }, []);

  // Cambiar campos
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Registrar estudiante
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const camposObligatorios = [
      formData.nombre,
      formData.apellido,
      formData.cedula,
      formData.correo,
      formData.fecha_nacimiento,
      formData.carrera_id,
      formData.semestre_id,
    ];

    const hayCampoVacio = camposObligatorios.some(
      (campo) => !String(campo).trim()
    );

    if (hayCampoVacio) {
      showWarning(
        "Debes completar todos los campos obligatorios antes de registrar el estudiante."
      );

      return;
    }

    try {

      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        cedula: formData.cedula,
        correo: formData.correo,
        fecha_nacimiento: formData.fecha_nacimiento,

        telefono: formData.telefono || undefined,

        direccion: formData.direccion || undefined,
        sexo: formData.sexo || undefined,

        carrera_id: formData.carrera_id
          ? Number(formData.carrera_id)
          : undefined,

        semestre_id: formData.semestre_id
          ? Number(formData.semestre_id)
          : undefined,

        foto_perfil: "/Image/Perfil_Default.jpg",
      };

      const response = await fetch(
        `${API_URL}/estudiantes`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const responseData =
        await response.json();

      if (!response.ok) {

        if (response.status === 409) {
          showWarning(responseData.message);
        } else {
          showError(
            responseData.message ||
            "No se pudo registrar el estudiante."
          );
        }

        return;
      }

      console.log(
        "Estudiante registrado:",
        responseData
      );

      showSuccess(
        responseData.message ||
          "Estudiante registrado. Se envió el enlace de activación al correo indicado."
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
    handleSubmit,
  };
}
