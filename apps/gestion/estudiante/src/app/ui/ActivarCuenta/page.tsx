import { Suspense } from "react";
import ActivationContent from "@/components/ActivationContent";

export default function ActivateAccountRoute() {
  return (
    <Suspense
      fallback={
        <main className="activation-route-loading">
          Validando el enlace de activación...
        </main>
      }
    >
      <ActivationContent />
    </Suspense>
  );
}
