import type { AuthUser } from "./auth.types";

const SESSION_COOKIE = "sena_session";
const LOGOUT_COOKIE = "sena_logged_out";
const SESSION_MAX_AGE = 60 * 60 * 24 * 365;

function cookieDomain(): string {
  const domain = process.env.NEXT_PUBLIC_SESSION_COOKIE_DOMAIN;
  return domain ? `; Domain=${domain}` : "";
}

export function saveSession(user: AuthUser): void {
  const value = encodeURIComponent(JSON.stringify(user));
  document.cookie = `${SESSION_COOKIE}=${value}; Path=/; Max-Age=${SESSION_MAX_AGE}; SameSite=Lax${cookieDomain()}`;
  document.cookie = `${LOGOUT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${cookieDomain()}`;
}

export function getSession(): AuthUser | null {
  const savedCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);

  if (savedCookie) {
    try {
      const parsed: unknown = JSON.parse(decodeURIComponent(savedCookie));
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as AuthUser;
      }
    } catch {
      clearSession();
      return null;
    }
  }

  if (
    document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith(`${LOGOUT_COOKIE}=`))
  ) {
    return null;
  }

  try {
    const savedLocal = localStorage.getItem("usuario");
    if (savedLocal) {
      const parsed: unknown = JSON.parse(savedLocal);
      if (typeof parsed === "object" && parsed !== null) {
        saveSession(parsed as AuthUser);
        return parsed as AuthUser;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function clearSession(): void {
  document.cookie = `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${cookieDomain()}`;
  document.cookie = `${LOGOUT_COOKIE}=1; Path=/; Max-Age=${SESSION_MAX_AGE}; SameSite=Lax${cookieDomain()}`;
}
