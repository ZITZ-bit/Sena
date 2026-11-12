"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser } from "../lib/auth.types";
import { getSession } from "../lib/session";

export interface AuthContextValue {
  usuario: AuthUser | null;
  setUsuario: (usuario: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUsuario(getSession());
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return ctx;
}
