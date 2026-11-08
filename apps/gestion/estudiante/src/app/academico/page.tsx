"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Carrera = { id: number; nombre: string; descripcion?: string | null };
type Materia = {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number | null;
  carrera_id: number;
  carreras?: Carrera | null;
  secciones?: any[];
};
type Seccion = {
  id: number;
  nombre: string;
  materia_id: number;
  materias?: any;
};

export default function Academico() {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [semestres, setSemestres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const cargarDatos = async () => {
      try {
        const [carrerasRes, materiasRes, seccionesRes, semestresRes] =
          await Promise.allSettled([
            api.carreras(),
            api.materias(),
            api.secciones(),
            api.semestres(),
          ]);

        if (!mounted) return;

        if (carrerasRes.status === "fulfilled") {
          setCarreras(carrerasRes.value);
        }
        if (materiasRes.status === "fulfilled") {
          setMaterias(materiasRes.value);
        }
        if (seccionesRes.status === "fulfilled") {
          setSecciones(seccionesRes.value);
        }
        if (semestresRes.status === "fulfilled") {
          setSemestres(semestresRes.value);
        }

        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        setError(
          err instanceof Error ? err.message : "Error inesperado al cargar datos."
        );
        setLoading(false);
      }
    };

    cargarDatos();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Cargando datos de la base de datos…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
        No se pudo conectar con la API: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Datos Académicos</h1>
        <p className="text-slate-600 mt-1">
          Información consultada directamente de la base de datos PostgreSQL
          ({carreras.length} carreras, {materias.length} materias,
          {secciones.length} secciones, {semestres.length} semestres).
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Carreras"
          count={carreras.length}
          icon="bx bx-building"
        >
          <ul className="text-sm text-slate-600 divide-y divide-slate-200">
            {carreras.map((c) => (
              <li key={c.id} className="py-2 flex justify-between">
                <span>{c.nombre}</span>
                <span className="text-slate-400">{c.descripcion || "-"}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Materias"
          count={materias.length}
          icon="bx bx-book"
        >
          <ul className="text-sm text-slate-600 divide-y divide-slate-200">
            {materias.map((m) => (
              <li key={m.id} className="py-2 flex justify-between">
                <span>
                  {m.codigo} - {m.nombre}
                </span>
                <span className="text-slate-400">
                  {m.carreras?.nombre || "-"}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Secciones"
          count={secciones.length}
          icon="bx bx-layer"
        >
          <ul className="text-sm text-slate-600 divide-y divide-slate-200">
            {secciones.map((s) => (
              <li key={s.id} className="py-2 flex justify-between">
                <span>Sección {s.nombre}</span>
                <span className="text-slate-400">
                  {s.materias?.nombre || "-"}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="border border-slate-200 rounded-lg bg-white p-4">
        <h2 className="text-lg font-bold text-slate-800 mb-3">
          Semestres
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {semestres.map((s) => (
            <li key={s.id} className="px-3 py-2 bg-slate-50 rounded text-sm text-slate-700 border border-slate-100">
              {s.nombre}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Card({
  title,
  count,
  icon,
  children,
}: {
  title: string;
  count: number;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-bold uppercase text-slate-500">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-800">{count}</p>
        </div>
        <i className={`bx ${icon} text-2xl text-slate-400`} />
      </div>
      <div>{children}</div>
    </div>
  );
}
