"use client"

import { useState } from "react";
import type { UseLoginProps, UseLoginReturn, LoginCredentials, AuthResponse } from "../lib/auth.types";

export function useLogin({ onLogin, onSuccess, onError }: UseLoginProps): UseLoginReturn {

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

      const data: AuthResponse = await onLogin({ cedula, password });

      // ✅ Login correcto
      setSuccess("Inicio de sesión exitoso.");

      onSuccess?.(data);

    } catch (err) {

      const message = err instanceof Error ? err.message : "No se pudo iniciar sesión.";

      setError(message);

      onError?.(message);

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
