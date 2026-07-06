'use client';

import { useState } from 'react';
import type { PensumTableProps } from "@/shared/types/pensum";

export default function PensumTable({ semestres }: PensumTableProps) {

  const [semestreActivo, setSemestreActivo] = useState(semestres[0]?.id);
  const semestreActual = semestres.find(s => s.id === semestreActivo);

  return (
    <div className="w-full bg-slate-50 border border-slate-300 rounded-lg overflow-hidden shadow-sm">

      <div className="flex border-b border-slate-300 bg-slate-100 overflow-x-auto">

        {semestres.map((semestre) => (
          <button
          
            key={semestre.id}
            onClick={() => setSemestreActivo(semestre.id)}
            className={`px-4 py-3 text-xs font-bold uppercase whitespace-nowrap transition-all border-r border-slate-300
              
              ${semestreActivo === semestre.id
                ? 'bg-white text-slate-900'
                : 'text-slate-500 hover:bg-slate-200'
              }`}

          >
            {semestre.nombre}
          </button>
        ))}

      </div>

      <table className="w-full border-collapse text-left font-sans select-none">

        <thead>
          <tr className="bg-slate-100 text-slate-700 uppercase text-[11px] font-bold tracking-wider border-b border-slate-300">

            <th className="py-2 px-3 w-14 border-r border-slate-300">#</th>
            <th className="py-2 px-3 border-r border-slate-300">Materia</th>
            <th className="py-2 px-3 w-24 text-center border-r border-slate-300">Nota</th>
            <th className="py-2 px-3 w-28 text-center border-r border-slate-300">Período</th>
            <th className="py-2 px-3 w-24 text-center border-r border-slate-300">Créditos</th>
            <th className="py-2 px-3 w-32 text-center">Estado</th>

          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 text-[12px]">

          {semestreActual?.materias.map((materia, index) => (
            <tr key={materia.id} className="hover:bg-slate-100 transition-colors">

              <td className="py-3 px-3 font-bold border-r border-slate-200">
                {index + 1}
              </td>

              <td className="py-3 px-3 border-r border-slate-200">
                {materia.nombre}
              </td>

              <td className="py-3 px-3 text-center font-bold border-r border-slate-200">
                {materia.nota ?? '--'}
              </td>

              <td className="py-3 px-3 text-center border-r border-slate-200">
                {materia.periodo}
              </td>

              <td className="py-3 px-3 text-center font-bold border-r border-slate-200">
                {materia.creditos}
              </td>

              <td className="py-3 px-3 text-center">
                <span className={`px-2 py-1 rounded-md text-[11px] font-semibold
                  ${
                    materia.estado === 'Aprobada'
                      ? 'bg-green-100 text-green-700'
                      : materia.estado === 'Reprobada'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }
                `}>
                  {materia.estado}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}