'use client'

/* Componentes De Next */

import "boxicons/css/boxicons.min.css";

/* Componentes De Next */

import Alert from "../Alertas/Alert";

/* Hooks */

import { useSideBar } from "@/hooks/Global/useSidebar";
import { useFormProf } from "@/hooks/Profesores/useFormProf";

function FormProf() {

  const { open } = useSideBar();
  const { formData, alert, handleChange, handleSubmit } = useFormProf();

  return (
    <div className={`transition-all duration-300 ${open ? "ml-72" : "ml-20"} min-h-screen bg-gray-50 p-8 overflow-x-hidden`}>
      <div className="max-w-7xl mx-auto bg-white/90 rounded-xl shadow-lg p-6 border border-gray-200">

        <form className="space-y-6" onSubmit={handleSubmit}>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">

            <h2 className="lg:col-span-2 text-lg font-semibold text-gray-800">
              Registro de profesores
            </h2>

            {alert.show && (
              <Alert type={alert.type} message={alert.message} />
            )}

            <div className="form-group">
              <input id="nombre" type="text" value={formData.nombre} onChange={handleChange} placeholder="Ingrese el nombre" className="form-input"/>
              <label htmlFor="nombre" className="form-label">Nombre</label>
            </div>

            <div className="form-group">
              <input id="apellido" type="text" value={formData.apellido} onChange={handleChange} placeholder="Ingrese el apellido" className="form-input"/>
              <label htmlFor="apellido" className="form-label">Apellido</label>
            </div>

            <div className="form-group">
              <input id="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="correo@ejemplo.com" className="form-input"/>
              <label htmlFor="correo" className="form-label">Correo</label>
            </div>

            <div className="form-group">
              <input id="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} className="form-input"/>
              <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
            </div>

            <div className="form-group">
              <input id="telefono" type="text" value={formData.telefono} onChange={handleChange} placeholder="0412-1234567" className="form-input"/>
              <label htmlFor="telefono" className="form-label">Teléfono</label>
            </div>

            <div className="form-group">
              <input id="direccion" type="text" value={formData.direccion} onChange={handleChange} placeholder="Ingrese la dirección" className="form-input"/>
              <label htmlFor="direccion" className="form-label">Dirección</label>
            </div>

          </section>

          <section className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button type="reset" className="cursor-pointer rounded-lg border bg-red-400 px-5 py-2 text-white hover:bg-red-500 transition-colors">
              Cancelar
            </button>

            <button type="submit" className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition-colors">
              Registrar profesor
            </button>
          </section>
        </form>

      </div>
    </div>
  );
}

export default FormProf;