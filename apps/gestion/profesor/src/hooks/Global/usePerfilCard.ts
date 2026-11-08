export interface PerfilData {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  foto_perfil: string;
  estado: boolean;
}

export interface TarjetaPerfilProps {

  perfil: PerfilData;

  onEdit?: () => void;

  onDelete?: () => void;

}