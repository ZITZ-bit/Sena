import { estudiante } from "@/shared/data/estudiantes";

export default function DatosEstudiante() {
  return(
    <>
      <div className="w-full bg-slate-50 border border-slate-300 rounded-lg shadow-sm p-4">
  
        <div className="space-y-4">

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {estudiante.nombre}
            </h2>
            <p className="text-sm text-slate-500">
              {estudiante.carrera}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-[11px] font-bold uppercase text-slate-500">
                  Carnet
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {estudiante.carnet}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase text-slate-500">
                  Semestre
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {estudiante.semestre}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase text-slate-500">
                  Promedio
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {estudiante.promedio}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase text-slate-500">
                  Estado
                </p>
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-green-100 text-green-700">
                  {estudiante.estado}
                </span>
              </div>

            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              Información Académica
            </h3>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-500">Materias aprobadas</span>
                <span className="font-semibold">
                  {estudiante.materiasAprobadas}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Créditos acumulados</span>
                <span className="font-semibold">
                  {estudiante.creditosAcumulados}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Índice académico</span>
                <span className="font-semibold">
                  {estudiante.indiceAcademico} / 10
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  );
}