"use client";

import { useState } from "react";

export interface ProgramadorSection {
  label: string;
  value: string;
}

export interface NavbarProgramadorProps {
  activeSection?: string;
  onSelect: (section: string) => void;
  onLogout?: () => void;
}

const portalUrl =
  process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3001";

const groups: Array<{
  label: string;
  icon: string;
  sections: ProgramadorSection[];
}> = [
  {
    label: "Estudiantes",
    icon: "01",
    sections: [{ label: "Todos los estudiantes", value: "Estudiantes" }],
  },
  {
    label: "Profesores",
    icon: "02",
    sections: [{ label: "Todos los profesores", value: "Profesores" }],
  },
  {
    label: "Académico",
    icon: "03",
    sections: [
      { label: "Secciones", value: "Secciones" },
      { label: "Materias", value: "Materias" },
      { label: "Carreras", value: "Carreras" },
      { label: "Semestres", value: "Semestres" },
      { label: "Asignaciones", value: "Asignaciones" },
    ],
  },
  {
    label: "Sistema",
    icon: "04",
    sections: [
      { label: "Usuarios", value: "Usuarios" },
      { label: "Roles y accesos", value: "Roles" },
    ],
  },
];

export default function NavbarProgramador({
  activeSection = "Estudiantes",
  onSelect,
  onLogout,
}: NavbarProgramadorProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectSection = (section: string) => {
    onSelect(section);
    setOpenGroup(null);
    setMobileOpen(false);
  };

  const renderGroups = (mobile = false) => (
    <>
      {groups.map((group) => {
        const expanded = openGroup === group.label;
        const groupIsActive = group.sections.some(
          (section) => section.value === activeSection,
        );

        return (
          <div
            className={`relative ${mobile ? "w-full" : ""}`}
            key={group.label}
            onMouseEnter={() => {
              if (!mobile) {
                setOpenGroup(group.label);
              }
            }}
            onMouseLeave={() => {
              if (!mobile) {
                setOpenGroup(null);
              }
            }}
          >
            <button
              aria-expanded={expanded}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                expanded || groupIsActive
                  ? "bg-white/15 text-white"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() =>
                setOpenGroup(expanded ? null : group.label)
              }
              type="button"
            >
              <span className="text-[9px] font-bold tracking-wider text-[#f3c96c]">
                {group.icon}
              </span>
              {group.label}
              <svg
                aria-hidden="true"
                className={`ml-auto size-3.5 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="m3.5 6 4.5 4 4.5-4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            {expanded && (
              <div
                className={`z-50 min-w-56 rounded-xl border border-white/10 bg-[#4d556f] p-1.5 shadow-xl ${
                  mobile
                    ? "relative ml-4 mt-1"
                    : "absolute left-0 top-full"
                }`}
              >
                {group.sections.map((section) => (
                  <button
                    aria-current={
                      section.value === activeSection ? "page" : undefined
                    }
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      section.value === activeSection
                        ? "bg-[#f3c96c] font-semibold text-[#30364b]"
                        : "text-slate-100 hover:bg-white/10"
                    }`}
                    key={section.value}
                    onClick={() => selectSection(section.value)}
                    type="button"
                  >
                    {section.label}
                    {section.value === activeSection && (
                      <span aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <header className="relative z-50 w-full bg-[#616985] text-white shadow-lg shadow-slate-950/10">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <button
          aria-current={activeSection === "Estudiantes" ? "page" : undefined}
          className="flex shrink-0 cursor-pointer items-center gap-3 text-left"
          onClick={() => selectSection("Estudiantes")}
          type="button"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-[#f3c96c] text-lg font-black text-[#34394e]">
            S
          </span>
          <span>
            <span className="block text-base font-extrabold leading-tight tracking-wide">
              SENA
            </span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[.2em] text-slate-300">
              PANEL PROGRAMADOR
            </span>
          </span>
        </button>

        <nav
          aria-label="Navegación del programador"
          className="hidden items-center gap-1 lg:flex"
        >
          {renderGroups()}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            href={portalUrl}
          >
            Volver al portal
          </a>
          {onLogout && (
            <button
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-red-400/15 hover:text-white"
              onClick={onLogout}
              type="button"
            >
              Cerrar sesión
            </button>
          )}
        </div>

        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Cerrar navegación" : "Abrir navegación"}
          className="grid size-10 cursor-pointer place-items-center rounded-lg border border-white/20 text-xl lg:hidden"
          onClick={() => {
            setMobileOpen((open) => !open);
            setOpenGroup(null);
          }}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Navegación del programador"
          className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 lg:hidden"
        >
          <button
            className="cursor-pointer rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-100 hover:bg-white/10"
            onClick={() => selectSection("Estudiantes")}
            type="button"
          >
            Estudiantes
          </button>
          {renderGroups(true)}
          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
            <a
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
              href={portalUrl}
            >
              Volver al portal
            </a>
            {onLogout && (
              <button
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-red-400/15"
                onClick={onLogout}
                type="button"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
