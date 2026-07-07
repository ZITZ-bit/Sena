'use client';

import type { TablaSimpleProps } from "@/shared/types/materia";

export default function Tabla({ materias }: TablaSimpleProps) {
  return (
    <div className="w-full bg-slate-50 border border-slate-300 rounded-lg overflow-hidden shadow-sm">

      <table className="w-full border-collapse text-left font-sans select-none">

        <thead>
          <tr className="bg-slate-100 text-slate-700 uppercase text-[11px] font-bold tracking-wider border-b border-slate-300">

            <th className="py-2 px-3 w-16 border-r border-slate-300">#</th>
            <th className="py-2 px-3 border-r border-slate-300">Materia</th>
            <th className="py-2 px-3 w-24 text-center">Nota</th>

          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 text-[12px]">

          {materias.map((materia, index) => (
            <tr key={materia.id} className="hover:bg-slate-100 transition-colors">

              <td className="py-3 px-3 font-bold text-slate-700 border-r border-slate-200">
                {index + 1}
              </td>

              <td className="py-3 px-3 font-medium text-slate-800 border-r border-slate-200">
                {materia.nombre}
              </td>

              <td className="py-3 px-3 text-center font-bold text-slate-700">
                {materia.nota ?? '--'}
              </td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}