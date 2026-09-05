import { useState } from "react";
import { useAlert } from "../Global/useAlert";

export function useFormProf() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    password: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
  });

  const { alert, showSuccess, showError } = useAlert();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/profesores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || "No se pudo registrar el profesor.");
        return;
      }

      showSuccess("Profesor registrado correctamente.");
      setFormData({
      nombre: "",
      apellido: "",
      cedula: "",
      password: "",
      correo: "",
      fecha_nacimiento: "",
      telefono: "",
      direccion: "",
      });
    } catch {
      showError("No se pudo conectar con el servidor.");
    }
  };

  return {
    formData,
    alert,
    handleChange,
    handleSubmit,
  };
}