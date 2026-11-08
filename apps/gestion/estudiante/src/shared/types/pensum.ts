export interface Materia {
  id: number;
  nombre: string;
  nota: number | null;
  periodo: string;
  creditos: number;
  estado: 'Aprobada' | 'Reprobada' | 'En curso';
}

export interface Semestre {
  id: number;
  nombre: string;
  materias: Materia[];
}

export interface PensumTableProps {
  semestres: Semestre[];
}
