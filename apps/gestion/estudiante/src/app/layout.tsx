import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sena",
  description: "Sistema de administracion de notas",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
