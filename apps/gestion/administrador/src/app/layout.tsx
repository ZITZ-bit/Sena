import type { Metadata } from "next";

import "./globals.css";
import "boxicons/css/boxicons.min.css";

import { SidebarProvider } from "../context/SidebarContext";

export const metadata: Metadata = {
  title: "Sena | Administracion",
  description: "Apartado administrativo de Sena",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">

        <SidebarProvider>
          {children}
        </SidebarProvider>
        
      </body>
    </html>
  );
}
