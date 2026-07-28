'use client'

import "boxicons/css/boxicons.min.css";
import { useSideBar } from "../hooks/useSidebar";

function FormEst() {
  
  const { open } = useSideBar();

  return (
    <div className={`transition-all duration-300 ${open ? "ml-72" : "ml-20"} min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-x-hidden`}>
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <form className="space-y-6">

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">

            <h2 className="lg:col-span-2 text-lg font-semibold text-gray-800">
              Registro de estudiantes
            </h2>

            <div className="form-group">
              <input
                id="nombre"
                type="text"
                placeholder="Ingrese el nombre"
                className="form-input"
              />
              <label htmlFor="nombre" className="form-label">Nombre</label>
            </div>

            <div className="form-group">
              <input
                id="apellido"
                type="text"
                placeholder="Ingrese el apellido"
                className="form-input"
              />
              <label htmlFor="apellido" className="form-label">Apellido</label>
            </div>

            <div className="form-group">
              <input
                id="cedula"
                type="text"
                placeholder="Ej: V-12345678"
                className="form-input"
              />
              <label htmlFor="cedula" className="form-label">Cédula</label>
            </div>

            <div className="form-group">
              <input
                id="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                className="form-input"
              />
              <label htmlFor="correo" className="form-label">Correo</label>
            </div>

            <div className="form-group">
              <input
                id="fecha-nacimiento"
                type="date"
                className="form-input"
              />
              <label htmlFor="fecha-nacimiento" className="form-label">Fecha de nacimiento</label>
            </div>

            <div className="form-group">
              <select id="carrera" className="form-select">
                <option value="">Seleccione una carrera</option>
              </select>
              <label htmlFor="carrera" className="form-label">Carrera</label>
            </div>

            <div className="form-group">
              <select id="semestre" className="form-select">
                <option value="">Seleccione un semestre</option>
              </select>
              <label htmlFor="semestre" className="form-label">Semestre</label>
            </div>

            <div className="form-group">
              <input
                id="telefono"
                type="text"
                placeholder="0412-1234567"
                className="form-input"
              />
              <label htmlFor="telefono" className="form-label">Teléfono</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Foto de perfil</label>
              <input
                type="file"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

          </section>

          <div className="mt-4">
            <div className="form-group">
              <textarea
                id="descripcion"
                placeholder="Descripción breve..."
                className="form-input form-textarea"
              />
              <label htmlFor="descripcion" className="form-label">Descripción</label>
            </div>
          </div>

          <section className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="reset"
              className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              Registrar estudiante
            </button>
          </section>

        </form>
      </div>
    </div>
  );
}

export default FormEst;
