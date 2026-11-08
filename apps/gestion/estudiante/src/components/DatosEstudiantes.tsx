import { estudiante } from "@/shared/data/estudiante";

export default function DatosEstudiante() {
  return (
    <div className="w-full bg-slate-50 border border-slate-300 rounded-lg shadow-sm p-3">

      <h1 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-2 mb-3">
        Datos del Estudiante
      </h1>

      <div className="space-y-3">

        <div>
          <h2 className="text-base font-bold text-slate-800">
            {estudiante.nombre} {estudiante.apellido}
          </h2>
          <p className="text-xs text-slate-500">
            {estudiante.cedula}
          </p>
        </div>

        <div className="border-t border-slate-200 pt-3">

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">

            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Carnet
              </p>
              <p className="text-sm font-medium text-slate-800">
                {estudiante.carnet}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Sexo
              </p>
              <p className="text-sm font-medium text-slate-800">
                {estudiante.sexo}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Nacimiento
              </p>
              <p className="text-sm font-medium text-slate-800">
                {estudiante.fechaNacimiento}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">Estado</p>
              
              <span className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded bg-green-100 text-green-700">
                {estudiante.estado}
              </span>
            </div>

          </div>

          <div className="border-t border-slate-200 mt-3 pt-3 space-y-2 text-sm">

            <div className="flex justify-between">
              <span className="text-slate-500">Correo</span>
              <span className="font-semibold truncate max-w-[170px]">
                {estudiante.correo}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Teléfono</span>
              <span className="font-semibold">
                {estudiante.telefono}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2">
              <span className="text-slate-500">Dirección</span>
              <span className="font-semibold text-right">
                {estudiante.direccion}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
