import { useState } from "react";
import { useAlert } from "./useAlert";

export function useFormEst() {

  const [formData, setFormData] = useState({

    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
    foto_perfil: "",
    carrera_id: "",
    semestre_id: "",

  });

  const {

    alert,

    showSuccess,

    showWarning,

    showError,

  } = useAlert();

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

      console.log(formData);

      showSuccess("Estudiante registrado correctamente.");

    } catch (error: any) {

      if (error.response?.status === 409) {

        showWarning("La cédula ya está registrada.");

      } else {

        showError("No se pudo registrar el estudiante.");

      }

    }

  };

  return {

    formData,
    alert,
    handleChange,
    handleFileChange,
    handleSubmit,

  };

}
