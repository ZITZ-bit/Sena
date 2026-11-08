import { Users, UserPlus } from "lucide-react";

function EstadosVacios() {
  return (
    <section className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
      
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-gray-200/50">
          <Users size={48} strokeWidth={1.5} className="text-gray-400/70"/>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-700">
        No hay usuarios registrados
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
        Todavía no se ha registrado ningún usuario.
        Cuando agregues uno, aparecerá aquí.
      </p>
      
    </section>
  );
}

export default EstadosVacios;