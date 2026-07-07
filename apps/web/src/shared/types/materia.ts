export interface Materia {
  id: number;
  nombre: string;
  nota: number | null;
}

export interface TablaSimpleProps {
  materias: Materia[];
}