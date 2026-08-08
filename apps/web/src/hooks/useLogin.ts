import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogin() {

  const router = useRouter();

  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Validar cédula
    if (!cedula.trim()) {

      setError("Por favor, ingrese su cédula.");
      return;

    }

    // Validar contraseña
    if (!password.trim()) {

      setError("Por favor, ingrese su contraseña.");
      return;

    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:3002/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            cedula,
            password,
          }),
        }
      );

      const data = await response.json();

      // ❌ Error del backend
      if (!response.ok) {

        setError(
          Array.isArray(data.message)
            ? data.message[0]
            : data.message || "No se pudo iniciar sesión."
        );

        return;
      }

      // ✅ Login correcto
      console.log(
        "Usuario autenticado:",
        data
      );

      console.log(
        "Usuario:",
        data.usuario
      );

      console.log(
        "Roles:",
        data.usuario.roles
      );

      setSuccess(
        "Inicio de sesión exitoso."
      );

      // Guardar usuario en el navegador
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      // Esperar un momento para mostrar el aviso
      setTimeout(() => {

        router.push(
          "/ui/DashboardEstudiantes"
        );

      }, 800);


    } catch (error) {

      console.error(
        "Error conectando con el servidor:",
        error
      );

      setError(
        "No se pudo conectar con el servidor."
      );

    } finally {

      setLoading(false);

    }

  };


  return {

    cedula,
    password,

    setCedula,
    setPassword,

    error,
    success,
    loading,

    handleSubmit,

  };

}