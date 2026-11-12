"use client"

import { useState, useEffect } from "react";
import type { AuthResponse, AuthUser } from "../lib/auth.types";
import { getSession } from "../lib/session";

/**
 * Lee la sesión compartida del navegador sin realizar llamadas HTTP.
 */
export function useUsuario() {
  const [usuario, setUsuario] = useState<AuthUser | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setUsuario(getSession());
    setCargando(false);
  }, []);

  return { usuario, setUsuario, cargando };
}

export type { AuthResponse, AuthUser };
