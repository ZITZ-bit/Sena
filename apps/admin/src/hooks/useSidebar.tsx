import { useState } from "react";

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

  const [open, setOpen] = useState(false);

  const toggleSideBar = () => {
    setOpen(prev => !prev);
  };

  return {
    open,
    menuItems,
    toggleSideBar
  };

}