import type { Semestre } from '@/shared/types/pensum';

export const semestres: Semestre[] = [
  {
    id: 1,
    nombre: 'Semestre I',
    materias: [
      {
        id: 1,
        nombre: 'Introducción a la Informática',
        nota: 18,
        periodo: '2025-I',
        creditos: 3,
        estado: 'Aprobada',
      },
      {
        id: 2,
        nombre: 'Matemática I',
        nota: 17,
        periodo: '2025-I',
        creditos: 4,
        estado: 'Aprobada',
      },
      {
        id: 3,
        nombre: 'Lógica Computacional',
        nota: 19,
        periodo: '2025-I',
        creditos: 3,
        estado: 'Aprobada',
      },
      {
        id: 4,
        nombre: 'Inglés Técnico I',
        nota: 20,
        periodo: '2025-I',
        creditos: 2,
        estado: 'Aprobada',
      },
    ],
  },

  {
    id: 2,
    nombre: 'Semestre II',
    materias: [
      {
        id: 6,
        nombre: 'Programación I',
        nota: 20,
        periodo: '2025-II',
        creditos: 4,
        estado: 'Aprobada',
      },
      {
        id: 7,
        nombre: 'Base de Datos I',
        nota: 18,
        periodo: '2025-II',
        creditos: 4,
        estado: 'Aprobada',
      },
      {
        id: 8,
        nombre: 'Matemática II',
        nota: 15,
        periodo: '2025-II',
        creditos: 4,
        estado: 'Aprobada',
      },
      {
        id: 9,
        nombre: 'Arquitectura del Computador',
        nota: 17,
        periodo: '2025-II',
        creditos: 3,
        estado: 'Aprobada',
      },
    ],
  },

  {
    id: 3,
    nombre: 'Semestre III',
    materias: [
      {
        id: 11,
        nombre: 'Programación II',
        nota: 18,
        periodo: '2026-I',
        creditos: 4,
        estado: 'Aprobada',
      },
      {
        id: 12,
        nombre: 'Base de Datos II',
        nota: 17,
        periodo: '2026-I',
        creditos: 4,
        estado: 'Aprobada',
      },
      {
        id: 13,
        nombre: 'Redes I',
        nota: 16,
        periodo: '2026-I',
        creditos: 3,
        estado: 'Aprobada',
      },
      {
        id: 14,
        nombre: 'Sistemas Operativos',
        nota: 19,
        periodo: '2026-I',
        creditos: 4,
        estado: 'Aprobada',
      },
    ],
  },
];