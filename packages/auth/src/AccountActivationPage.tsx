"use client";

import { useEffect, useState } from "react";
import LoginAlert from "./components/LoginAlert";
import "./styles/login.css";

export interface AccountActivationDetails {
  cedula: string;
  nombre: string;
}

export interface AccountActivationPageProps {
  token: string;
  onLoadAccount: (token: string) => Promise<AccountActivationDetails>;
  onActivate: (token: string, password: string) => Promise<void>;
}

export default function AccountActivationPage({
  token,
  onLoadAccount,
  onActivate,
}: AccountActivationPageProps) {
  const [account, setAccount] = useState<AccountActivationDetails | null>(null);
  const [password, setPassword] = useState("");
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    if (!token) {
      return () => {
        active = false;
      };
    }

    onLoadAccount(token)
      .then((details) => {
        if (active) {
          setAccount(details);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No se pudo validar el enlace de activación.",
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoadingAccount(false);
        }
      });

    return () => {
      active = false;
    };
  }, [token, onLoadAccount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await onActivate(token, password);
      setSuccess("Tu cuenta fue activada. Ya puedes iniciar sesión.");
      setPassword("");
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo activar la cuenta.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-container">
      <a className="back-to-portal" href="http://localhost:3001">
        <span aria-hidden="true">←</span>
        Volver
      </a>

      <section className="login-image">
        <div className="login-overlay">
          <div className="brand-showcase">
            <div className="brand-logo-accent" />
            <p className="brand-kicker">EDUCACIÓN QUE TRANSFORMA</p>
            <h1 className="brand-title">
              Tu futuro
              <br />
              <span>empieza aquí.</span>
            </h1>
            <p className="brand-tagline">
              Cada gran camino comienza con una oportunidad.
            </p>
          </div>
        </div>
      </section>

      <section className="login-card">
        <div className="system-header">
          <h1 className="system-title">SENA</h1>
          <h2 className="system-subtitle">Sistema de Gestión Académica</h2>
          <h3 className="login-title">Activación de cuenta</h3>
        </div>

        <div className="activation-content">
          {(error || !token) && (
            <LoginAlert
              type="error"
              message={error || "El enlace de activación no es válido o ya venció."}
            />
          )}
          {success && <LoginAlert type="success" message={success} />}

          {token && loadingAccount ? (
            <p className="activation-status" role="status">
              Validando el enlace de activación...
            </p>
          ) : account && !success ? (
            <>
              <p className="activation-description">
                Confirma tus datos y crea una contraseña para ingresar al sistema.
              </p>

              <div className="activation-identity">
                <div>
                  <span>Cédula</span>
                  <strong>{account.cedula}</strong>
                </div>
                <div>
                  <span>Nombre</span>
                  <strong>{account.nombre}</strong>
                </div>
              </div>

              <form className="login-form activation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    autoComplete="new-password"
                    className="form-input"
                    id="activation-password"
                    maxLength={128}
                    minLength={8}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Crea una contraseña"
                    required
                    type="password"
                    value={password}
                  />
                  <label
                    className="form-label"
                    htmlFor="activation-password"
                  >
                    Nueva contraseña
                  </label>
                </div>

                <p className="activation-hint">
                  Usa al menos 8 caracteres.
                </p>

                <button
                  className="login-button"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "Activando..." : "Activar cuenta"}
                </button>
              </form>
            </>
          ) : null}

          {success && (
            <a className="activation-login-link" href="/">
              Ir al inicio de sesión <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
