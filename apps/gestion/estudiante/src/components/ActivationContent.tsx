"use client";

import { useSearchParams } from "next/navigation";
import { AccountActivationPage } from "@sena/auth";
import {
  activateAccount,
  getActivationDetails,
} from "@/lib/auth";

export default function ActivationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return (
    <AccountActivationPage
      token={token}
      onLoadAccount={getActivationDetails}
      onActivate={activateAccount}
    />
  );
}
