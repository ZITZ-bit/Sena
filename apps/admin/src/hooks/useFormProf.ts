import { useState } from "react";
import { useAlert } from "./useAlert";

export function useFormProf() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
    foto_perfil: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({
      ...formData,
      foto_perfil: file.name,
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
      correo: "",
      fecha_nacimiento: "",
      telefono: "",
      direccion: "",
      foto_perfil: "",
      });
    } catch {
      showError("No se pudo conectar con el servidor.");
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