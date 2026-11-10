"use client"

import { useState, useEffect } from "react";
import type { AuthResponse, AuthUser } from "../lib/auth.types";

/**
 * Lee el usuario autenticado desde localStorage.
 * No realiza llamadas HTTP: la app consumidora es responsable de eso.
 */
export function useUsuario() {
  const [usuario, setUsuario] = useState<AuthUser | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("usuario");
      if (saved) {
        setUsuario(JSON.parse(saved));
      }
    } catch {
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }, []);

  return { usuario, setUsuario, cargando };
}

export type { AuthResponse, AuthUser };
