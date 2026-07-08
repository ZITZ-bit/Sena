'use client'

import "boxicons/css/boxicons.min.css";

import { useSideBar } from "../hooks/useSidebar";

function SideBar() {

  const {
    open,
    menuItems,
    toggleSideBar
  } = useSideBar();

  return (
    <aside className="fixed left-0 top-0 h-screen flex z-50">

      <section className={`bg-[#616985] text-white h-screen transition-all duration-300 overflow-hidden ${open ? "w-72" : "w-20"}`}>
        <section className="h-24 flex items-center px-6 border-b border-[#717997]">

          <button onClick={toggleSideBar} className="text-3xl cursor-pointer hover:scale-110 transition">
            <i className="bx bx-menu"></i>
          </button>

          {open && (
            <section className="ml-6">
              <h1 className="font-black text-2xl">CENTRO</h1>
              <p className="text-xs tracking-[3px] text-slate-300">DE ADMINISTRACIÓN</p>
            </section>
          )}

        </section>

        <nav className="py-6 flex flex-col">

          {menuItems.map((item) => (
            <button key={item.label} className="flex items-center gap-4 h-14 px-7 hover:bg-[#707897] transition-all duration-300 cursor-pointer">
              <i className={`bx ${item.icon} text-2xl`} />

              {open && (
                <span className="font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}

            </button>
          ))}

        </nav>

        <section className="absolute bottom-0 left-0 w-full border-t border-[#717997]">

          <button className="flex items-center gap-4 h-16 px-7 w-full hover:bg-red-500/20 transition-all duration-300 cursor-pointer">
            
            <i className="bx bx-log-out text-2xl" />
            {open && ( <span>Cerrar Sesión</span> )}

          </button>

        </section>
      </section>

    </aside>
  );
}

export default SideBar;