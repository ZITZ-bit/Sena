 "use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Inicio", href: "#" },
  { label: "La institución", href: "#oferta-academica" },
  { label: "Oferta académica", href: "#oferta-academica" },
  { label: "Noticias", href: "#noticias" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-30 bg-white">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex min-h-[82px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <Link
          aria-label="SENA, ir al inicio"
          className="flex items-center gap-3 text-[#142d4e]"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-[#153354] text-xl font-black text-[#f4bd50]">
            S
          </span>
          <span className="text-[22px] font-extrabold tracking-[-0.06em]">
            SENA<span className="text-[#e7a92f]">.</span>
            <span className="mt-0.5 block text-[9px] font-semibold tracking-[0.2em] text-slate-500">
              PORTAL ACADÉMICO
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link, index) => (
            <a
              className={`text-[13px] font-semibold transition-colors hover:text-[#bd8320] ${
                index === 0 ? "text-[#bd8320]" : "text-slate-700"
              }`}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
          <a
            className="rounded-full bg-[#163758] px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#bd8320]"
            href="http://localhost:3003"
          >
            Sistema académico <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-slate-200 text-[#163758] lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span className="h-0.5 w-5 rounded bg-current" />
          <span className="h-0.5 w-5 rounded bg-current" />
          <span className="h-0.5 w-5 rounded bg-current" />
        </button>
      </nav>

      <div
        className={`absolute left-0 right-0 top-full border-t border-slate-100 bg-white px-5 shadow-lg transition-all duration-200 lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
        id="mobile-navigation"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col py-3">
          {links.map((link) => (
            <a
              className="border-b border-slate-100 py-3.5 text-sm font-semibold text-slate-700 last:border-0"
              href={link.href}
              key={link.label}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mt-3 rounded-full bg-[#163758] px-5 py-3 text-center text-sm font-bold text-white"
            href="http://localhost:3003"
            onClick={() => setMenuOpen(false)}
          >
            Sistema académico <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}