"use client"

import { useRouter } from "next/navigation";

import { LoginPage } from "@sena/auth";
import { login } from "@/lib/auth";

export default function Page() {
  const router = useRouter();

  return (
    <LoginPage
      onLogin={async (credentials) =>
        login(credentials.cedula, credentials.password)
      }
      onSuccess={(data) => {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        setTimeout(() => {
          router.push("/ui/DashboardEstudiantes");
        }, 800);
      }}
    />
  );
}
