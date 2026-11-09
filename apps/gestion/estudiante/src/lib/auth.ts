import { API_URL } from "./api";
import type { AuthResponse } from "@sena/auth";

/**
 * Servicio de comunicación con la API NestJS para autenticación.
 * Permanece fuera de @sena/auth: este paquete solo contiene la interfaz
 * y lógica reutilizable de login. La conexión HTTP vive en la app consumidora.
 */
export async function login(cedula: string, password: string): Promise<AuthResponse> {
  let res: Response;

  try {
    res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedula,
        password,
      }),
      cache: "no-store",
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }

  let data: AuthResponse = {};

  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(
      Array.isArray(data?.message)
        ? data.message[0] ?? "No se pudo iniciar sesión."
        : data?.message || "No se pudo iniciar sesión."
    );
  }

  return data;
}
