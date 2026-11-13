"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getSession, LoginPage, saveSession } from "@sena/auth";
import { login } from "@/lib/auth";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const usuario = getSession();
    const roles = usuario?.roles;
    if (!Array.isArray(roles)) {
      return;
    }

    const isProgramador = roles.some(
      (role) => typeof role === "string" && role.toLowerCase() === "programador",
    );
    if (isProgramador) {
      window.location.assign(
        process.env.NEXT_PUBLIC_PROGRAMADOR_URL ||
          "http://localhost:3003/programador",
      );
      return;
    }
    router.replace("/ui/DashboardEstudiantes");
  }, [router]);

  return (
    <LoginPage
      onLogin={async (credentials) =>
        login(credentials.cedula, credentials.password)
      }

      onSuccess={(data) => {
        if (data.usuario) {
          saveSession(data.usuario);
        }
        const roles = data.usuario?.roles;
        const isProgramador =
          Array.isArray(roles) &&
          roles.some(
            (role) =>
              typeof role === "string" &&
              role.toLowerCase() === "programador",
          );

        setTimeout(() => {
          if (isProgramador) {
            window.location.assign(
              process.env.NEXT_PUBLIC_PROGRAMADOR_URL ||
                "http://localhost:3003/programador",
            );
            return;
          }
          router.push("/ui/DashboardEstudiantes");
        }, isProgramador ? 1800 : 800);
      }}
    />
  );
}
