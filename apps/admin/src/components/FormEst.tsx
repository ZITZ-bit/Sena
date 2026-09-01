'use client'

/* Componentes De Next */

import { useState } from "react";
import "boxicons/css/boxicons.min.css";

/* Componentes De Next */

import Alert from "./Alert";

/* Hooks */

import { useSideBar } from "../hooks/Global/useSidebar";
import { useFormEst } from "../hooks/Estudiantes/useFormEst"; 

function FormEst() {

  const { open } = useSideBar();

  const { formData, alert, carreras, semestres,
        handleChange, handleSubmit } = useFormEst();

  return (
    <div className={`transition-all duration-300 ${open ? "ml-72" : "ml-20"} min-h-screen bg-gray-50 p-8 overflow-x-hidden`}>
      <div className="max-w-7xl mx-auto bg-white/90 rounded-xl shadow-lg p-6 border border-gray-200">

        <form className="space-y-6" onSubmit={handleSubmit}>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">

            <h2 className="lg:col-span-2 text-lg font-semibold text-gray-800">
              Registro de estudiantes
            </h2>

            {alert.show && (  
              <Alert type={alert.type} message={alert.message}/>
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
              <input id="cedula" type="text" value={formData.cedula} onChange={handleChange} placeholder="Ej: V-12345678" className="form-input"/>
              <label htmlFor="cedula" className="form-label">Cédula</label>
            </div>

            <div className="form-group">
              <input id="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="correo@ejemplo.com" className="form-input"/>
              <label htmlFor="correo" className="form-label">Correo</label>
            </div>

            <div className="form-group">
              <input id="password" type="password" value={formData.password} onChange={handleChange} placeholder="Ingrese la contraseña" className="form-input" />
              <label htmlFor="password" className="form-label">Contraseña</label>
            </div>

            <div className="form-group">
              <input id="telefono" type="text" value={formData.telefono} onChange={handleChange} placeholder="0412-1234567" className="form-input"/>
              <label htmlFor="telefono" className="form-label">Teléfono</label>
            </div>

            <div className="form-group">
              <input id="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} className="form-input"/>
              <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
            </div>

            <div className="form-group">

              <select id="carrera_id" value={formData.carrera_id} onChange={handleChange} className="form-select">
                <option value="">Seleccione una carrera</option>

                {carreras.map((carrera) => (
                  <option key={carrera.id} value={carrera.id}>
                    {carrera.nombre}
                  </option>
                ))}

              </select>

              <label htmlFor="carrera_id" className="form-label">Carrera</label>

            </div>

            <div className="form-group">

              <select id="semestre_id" value={formData.semestre_id} onChange={handleChange} className="form-select">
                <option value="">Seleccione un semestre</option>

                {semestres.map((semestre) => (
                  <option key={semestre.id} value={semestre.id}>
                    {semestre.nombre}
                  </option>
                ))}

              </select>

              <label htmlFor="semestre_id" className="form-label">Semestre</label>

            </div>

          </section>

          <section className="flex justify-end gap-3 border-t border-gray-200 pt-5">

            <button type="reset" className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100 transition-colors">
              Cancelar
            </button>

            <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition-colors">
              Registrar estudiante
            </button>

          </section>

        </form>

      </div>
    </div>
  );

}

export default FormEst;