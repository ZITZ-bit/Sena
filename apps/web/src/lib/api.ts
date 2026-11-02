export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

async function request(path: string, init?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }

  return res.json();
}

export const api = {
  carreras: () => request("/carreras"),
  materias: () => request("/materias"),
  secciones: () => request("/secciones"),
  semestres: () => request("/semestres"),
};
