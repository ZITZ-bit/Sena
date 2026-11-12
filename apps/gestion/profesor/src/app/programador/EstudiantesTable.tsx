"use client";

import { useCallback, useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

type DataRow = Record<string, unknown> & { id: number };

interface Column {
  label: string;
  path: string;
}

interface DataSection {
  title: string;
  endpoint: string;
  columns: Column[];
  layout?: "compact" | "wide";
  deleteWarning?: string;
}

const sections: Record<string, DataSection> = {
  Estudiantes: {
    title: "Estudiantes",
    endpoint: "estudiantes",
    columns: [
      { label: "Nombre", path: "nombre" },
      { label: "Apellido", path: "apellido" },
      { label: "Cédula", path: "usuarios.cedula" },
      { label: "Correo", path: "correo" },
      { label: "Carrera", path: "carreras.nombre" },
      { label: "Semestre", path: "semestres.nombre" },
      { label: "Estado", path: "usuarios.estado" },
    ],
    deleteWarning:
      "También se eliminarán su usuario y sus accesos. Esta acción no se puede deshacer.",
  },
  Profesores: {
    title: "Profesores",
    endpoint: "profesores",
    columns: [
      { label: "Nombre", path: "nombre" },
      { label: "Apellido", path: "apellido" },
      { label: "Cédula", path: "usuarios.cedula" },
      { label: "Correo", path: "correo" },
      { label: "Teléfono", path: "telefono" },
      { label: "Estado", path: "usuarios.estado" },
    ],
    deleteWarning:
      "También se eliminarán su usuario, accesos y asignaciones relacionadas.",
  },
  Materias: {
    title: "Materias",
    endpoint: "materias",
    layout: "wide",
    columns: [
      { label: "ID", path: "id" },
      { label: "Nombre", path: "nombre" },
      { label: "Código", path: "codigo" },
      { label: "Créditos", path: "creditos" },
      { label: "Carrera", path: "carreras.nombre" },
      { label: "Secciones", path: "secciones.length" },
    ],
    deleteWarning:
      "Se eliminarán también sus secciones y asignaciones relacionadas.",
  },
  Secciones: {
    title: "Secciones",
    endpoint: "secciones",
    layout: "compact",
    columns: [{ label: "Sección", path: "nombre" }],
    deleteWarning: "Se eliminarán también las asignaciones relacionadas.",
  },
  Carreras: {
    title: "Carreras",
    endpoint: "carreras",
    columns: [
      { label: "Nombre", path: "nombre" },
      { label: "Descripción", path: "descripcion" },
    ],
    deleteWarning:
      "Se eliminarán también las materias, secciones y asignaciones relacionadas.",
  },
  Semestres: {
    title: "Semestres",
    endpoint: "semestres",
    columns: [{ label: "Nombre", path: "nombre" }],
  },
  Usuarios: {
    title: "Usuarios",
    endpoint: "usuarios",
    columns: [
      { label: "Nombre", path: "nombreCompleto" },
      { label: "Cédula", path: "cedula" },
      { label: "Roles", path: "usuario_roles.roles.nombre" },
      { label: "Estado", path: "estado" },
      { label: "Creado", path: "created_at" },
    ],
    deleteWarning:
      "Se eliminarán también sus perfiles, accesos y datos relacionados.",
  },
  Roles: {
    title: "Roles",
    endpoint: "roles",
    columns: [
      { label: "Nombre", path: "nombre" },
      { label: "Descripción", path: "descripcion" },
      { label: "Usuarios asignados", path: "_count.usuario_roles" },
    ],
    deleteWarning:
      "Solo se pueden eliminar roles que no estén asignados a ningún usuario.",
  },
  Asignaciones: {
    title: "Asignaciones",
    endpoint: "asignaciones",
    columns: [
      { label: "Profesor", path: "profesores.nombreCompleto" },
      { label: "Materia", path: "materias.nombre" },
      { label: "Código", path: "materias.codigo" },
      { label: "Sección", path: "secciones.nombre" },
      { label: "Semestre", path: "semestres.nombre" },
    ],
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getPathValue(value: unknown, path: string): unknown {
  const [part, ...remaining] = path.split(".");
  if (part === "length" && Array.isArray(value)) {
    return value.length;
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => getPathValue(item, path))
      .filter((item) => item !== null && item !== undefined && item !== "");
  }
  if (!isRecord(value) || !(part in value)) {
    return undefined;
  }
  return remaining.length === 0
    ? value[part]
    : getPathValue(value[part], remaining.join("."));
}

function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  if (Array.isArray(value)) {
    return value.map(displayValue).join(", ");
  }
  if (typeof value === "boolean") {
    return value ? "Activo" : "Inactivo";
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString();
  }
  return String(value);
}

function displayColumn(row: DataRow, path: string): string {
  if (path === "profesores.nombreCompleto") {
    return `${displayValue(getPathValue(row, "profesores.nombre"))} ${displayValue(getPathValue(row, "profesores.apellido"))}`;
  }
  if (path === "nombreCompleto") {
    const name =
      getPathValue(row, "nombre") ??
      (getPathValue(row, "estudiantes.nombre")
        ? `${displayValue(getPathValue(row, "estudiantes.nombre"))} ${displayValue(getPathValue(row, "estudiantes.apellido"))}`
        : `${displayValue(getPathValue(row, "profesores.nombre"))} ${displayValue(getPathValue(row, "profesores.apellido"))}`);
    return displayValue(name);
  }
  return displayValue(getPathValue(row, path));
}

async function responseError(response: Response, fallback: string) {
  try {
    const body: unknown = await response.json();
    if (isRecord(body)) {
      if (typeof body.message === "string") {
        return body.message;
      }
      if (
        Array.isArray(body.message) &&
        body.message.every((message) => typeof message === "string")
      ) {
        return body.message.join(" ");
      }
    }
  } catch {
    return fallback;
  }
  return fallback;
}

export default function ProgramadorDataTable({
  section,
}: {
  section: string;
}) {
  const config = sections[section] ?? sections.Estudiantes;
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadRows = useCallback(async () => {
    setError("");

    try {
      const response = await fetch(`${API_URL}/${config.endpoint}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(
          await responseError(
            response,
            `No se pudieron cargar ${config.title.toLowerCase()}.`,
          ),
        );
      }

      const data: unknown = await response.json();
      if (!Array.isArray(data)) {
        throw new Error(
          `La respuesta de ${config.title.toLowerCase()} no es válida.`,
        );
      }
      setRows(
        data.filter(
          (row): row is DataRow =>
            isRecord(row) && typeof row.id === "number",
        ),
      );
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : `Ocurrió un error al cargar ${config.title.toLowerCase()}.`,
      );
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    void Promise.resolve().then(loadRows);
  }, [loadRows]);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timeoutId = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const deleteRow = async (row: DataRow) => {
    const identity = displayColumn(row, config.columns[0]?.path ?? "id");
    const confirmation =
      `¿Eliminar este registro de ${config.title.toLowerCase()} (${identity})?` +
      (config.deleteWarning ? ` ${config.deleteWarning}` : "");
    if (!window.confirm(confirmation)) {
      return;
    }

    setDeletingId(row.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_URL}/${config.endpoint}/${row.id}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error(
          await responseError(
            response,
            `No se pudo eliminar el registro de ${config.title.toLowerCase()}.`,
          ),
        );
      }

      setRows((current) => current.filter((item) => item.id !== row.id));
      setNotice(`Registro de ${config.title.toLowerCase()} eliminado.`);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Ocurrió un error al eliminar el registro.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{config.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {rows.length} {rows.length === 1 ? "registro" : "registros"}
          </p>
        </div>
        <button
          className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#616985] hover:text-[#4f566f] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            void loadRows();
          }}
          type="button"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div
          className="m-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-7"
          role="alert"
        >
          {error}
        </div>
      )}
      {notice && (
        <div
          className="m-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:mx-7"
          role="status"
        >
          {notice}
        </div>
      )}

      {loading ? (
        <p className="px-7 py-12 text-center text-sm text-slate-500">
          Cargando {config.title.toLowerCase()}...
        </p>
      ) : rows.length === 0 ? (
        <p className="px-7 py-12 text-center text-sm text-slate-500">
          No hay registros de {config.title.toLowerCase()}.
        </p>
      ) : (
        <div
          className={`overflow-x-auto ${
            config.layout === "compact" ? "mx-auto max-w-sm" : ""
          }`}
        >
          <table
            className={`w-full text-left text-sm ${
              config.layout === "compact"
                ? "min-w-[240px]"
                : config.layout === "wide"
                  ? "min-w-[1200px]"
                  : "min-w-[760px]"
            }`}
          >
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {config.columns.map((column) => (
                  <th className="px-5 py-3 font-semibold" key={column.path}>
                    {column.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-right font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr className="text-slate-600" key={row.id}>
                  {config.columns.map((column) => (
                    <td className="px-5 py-4" key={column.path}>
                      {displayColumn(row, column.path)}
                    </td>
                  ))}
                  <td className="px-5 py-4 text-right">
                    <button
                      className="cursor-pointer rounded-lg px-3 py-2 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={deletingId !== null}
                      onClick={() => void deleteRow(row)}
                      type="button"
                    >
                      {deletingId === row.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
