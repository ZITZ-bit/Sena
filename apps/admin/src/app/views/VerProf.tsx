'use client'

/* Componentes De Next */



/* Componentes Reutilizables */

import Loading from "@/components/Estados/Loading";

/* Data */


export default function RegistroEst() {

  return (
    <section className="bg-gray-50 min-h-screen">

    <section className="flex justify-end mb-6">
      <div className="flex w-65 h-8 mt-5 mr-5">

        <input type="text" placeholder="Buscar..." className=" w-full px-2 text-xs bg-white border border-gray-300 outline-none placeholder:text-gray-400 focus:border-[#616985] "/>

        <button className=" w-8 shrink-0 bg-[#616985] text-white flex items-center justify-center hover:bg-[#51586f] transition-colors cursor-pointer">
          <i className="bx bx-search text-sm"></i>
        </button>

      </div>
    </section>

    <section className="flex justify-center items-center h-[calc(100vh-6rem)]">
      <Loading />
    </section>

    </section>
  );
}