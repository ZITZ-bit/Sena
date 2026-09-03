"use client";

import { Pencil, Trash2 } from "lucide-react";

import { useSideBar } from "@/hooks/Global/useSidebar";
import { TarjetaPerfilProps } from "@/hooks/Global/usePerfilCard";

export default function TarjetaPerfil({ perfil, onEdit, onDelete }: TarjetaPerfilProps) {

  const { open } = useSideBar();
  const isActivo = perfil.estado;

  const fotoPerfilSrc =
    perfil.foto_perfil?.startsWith("/uploads/")
      ? `http://localhost:3002${perfil.foto_perfil}`
      : perfil.foto_perfil || "/Image/Perfil_Default.jpg";

  return (
    <div className={`transition-all duration-300 ${open ? "ml-72" : "ml-20"} bg-gradient-to-br from-gray-50 to-gray-100 px-8 pt-8 pb-1 overflow-x-hidden`}>
      <div className="w-full max-w-7xl mx-auto mb-4">

        <div className="flex items-center w-full min-h-24 rounded-2xl border border-gray-200 bg-white/90 px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md">

          <div className="w-24 shrink-0 flex justify-center">
            <img
              src={fotoPerfilSrc}
              alt="Foto de perfil"
              className="h-14 w-14 rounded-full object-cover border-2 border-gray-100"
            />
          </div>

          <div className="w-48 shrink-0 text-center px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Nombre</p>
            <p className="mt-1 text-sm font-semibold text-gray-800 truncate">{perfil.nombre}</p>
          </div>

          <div className="w-48 shrink-0 text-center px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Apellido</p>
            <p className="mt-1 text-sm font-semibold text-gray-800 truncate">{perfil.apellido}</p>
          </div>

          <div className="w-40 shrink-0 text-center px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Cédula</p>
            <p className="mt-1 text-sm text-gray-700">{perfil.cedula || "No Registrada"}</p>
          </div>

          <div className="w-48 shrink-0 text-center px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Teléfono</p>
            <p className="mt-1 text-sm text-gray-700">{perfil.telefono || "No Registrado"}</p>
          </div>

          <div className="mt-1 flex justify-center">
            <div className="w-40 shrink-0 text-center px-2">

              {isActivo ? (

                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />Activo
                </span>

              ) : (

                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  <span className="h-2 w-2 rounded-full bg-red-500" />Inactivo
                </span>

              )}

            </div>
          </div>

          <div className="ml-auto shrink-0 flex items-center gap-2 border-l border-gray-100 pl-5">

            <button
              type="button"
              title="Editar"
              onClick={onEdit}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition hover:bg-yellow-50 hover:text-yellow-600"
            >
              <Pencil size={18} />
            </button>

            <button
              type="button"
              title="Eliminar"
              onClick={onDelete}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
