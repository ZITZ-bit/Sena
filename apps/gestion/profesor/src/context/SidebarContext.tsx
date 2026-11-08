'use client'

import React, { createContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  open: boolean;
  toggleSideBar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleSideBar = () => {
    setOpen(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ open, toggleSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
}
