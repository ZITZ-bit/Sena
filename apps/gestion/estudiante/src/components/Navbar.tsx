'use client'

import "boxicons/css/boxicons.min.css";
import { clearSession } from "@sena/auth";

interface NavbarProps {
  onSelect: (section: string) => void;
}

const portalUrl =
  process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3001";

function NavBar({ onSelect }: NavbarProps ) {
  const logout = () => {
    clearSession();
    window.location.assign("/");
  };

  return (
    <header className="w-full h-16 bg-[#4F566F] text-white shadow-sm">
      <section className="h-full flex items-center justify-between px-6">
        
        <section>
          <h1 className="font-bold text-lg leading-none">SENA</h1>
          <p className="text-[10px] tracking-[2px] text-slate-300">Gestión Estudiantil</p>
        </section>

        <nav className="flex items-center gap-1">

          <button onClick={() => onSelect("Estudiante")} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#5B637D] transition-colors cursor-pointer">
            <i className="bx bx-user text-lg" />
            <span className="text-sm">Estudiantes</span>
          </button>

          <button onClick={() => onSelect("Calendario")} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#5B637D] transition-colors cursor-pointer">
            <i className="bx bx-calendar" />
            <span className="text-sm">Candelario</span>
          </button>

          <button onClick={() => onSelect("Estadisticas")} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#5B637D] transition-colors cursor-pointer">
            <i className="bx bx-bar-chart-alt-2 text-lg" />
            <span className="text-sm">Estadisticas</span>
          </button>

        </nav>

        <div className="flex items-center gap-1">
          <a
            href={portalUrl}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#5B637D] transition-colors"
          >
            <i className="bx bx-home text-lg" />
            <span className="text-sm">Portal</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <i className="bx bx-log-out text-lg" />
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>

      </section>
    </header>
  );
}

export default NavBar;