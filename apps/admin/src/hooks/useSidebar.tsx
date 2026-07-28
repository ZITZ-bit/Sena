import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";

const menuItems = [
  {
    icon: "bx-home-alt",
    label: "Inicio"
  },
  {
    icon: "bx-user-plus",
    label: "Registrar Profesores"
  },
  {
    icon: "bx-group",
    label: "Ver Profesores"
  },
  {
    icon: "bx-book-add",
    label: "Registrar Estudiantes"
  },
  {
    icon: "bx-id-card",
    label: "Ver Estudiantes"
  }
];

export function useSideBar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSideBar debe ser usado dentro de SidebarProvider");
  }

  const { open, toggleSideBar } = context;

  return {
    open,
    menuItems,
    toggleSideBar
  };
}