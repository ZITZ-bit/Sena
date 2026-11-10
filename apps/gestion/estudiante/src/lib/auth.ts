import { API_URL } from "./api";
import type { AuthResponse } from "@sena/auth";

export interface ActivationDetails {
  cedula: string;
  nombre: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function responseMessage(data: unknown, fallback: string): string {
  if (!isRecord(data)) {
    return fallback;
  }

  const message = data.message;
  if (Array.isArray(message)) {
    return typeof message[0] === "string" ? message[0] : fallback;
  }

  return typeof message === "string" ? message : fallback;
}

async function parseResponse(response: Response, fallback: string) {
  let data: unknown;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(responseMessage(data, fallback));
  }

  return data;
}

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

  const data = await parseResponse(res, "No se pudo iniciar sesión.");
  return isRecord(data) ? (data as AuthResponse) : {};
}

export async function getActivationDetails(
  token: string,
): Promise<ActivationDetails> {
  let response: Response;

  try {
    response = await fetch(
      `${API_URL}/auth/activation/${encodeURIComponent(token)}`,
      { cache: "no-store" },
    );
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }

  const data = await parseResponse(
    response,
    "No se pudo validar el enlace de activación.",
  );
  if (
    !isRecord(data) ||
    typeof data.cedula !== "string" ||
    typeof data.nombre !== "string"
  ) {
    throw new Error("La respuesta del servidor no contiene los datos de la cuenta.");
  }

  return { cedula: data.cedula, nombre: data.nombre };
}

export async function activateAccount(
  token: string,
  password: string,
): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/activation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
      cache: "no-store",
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }

  await parseResponse(response, "No se pudo activar la cuenta.");
}
