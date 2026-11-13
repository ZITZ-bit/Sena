interface LoginAlertProps {
  type: "error" | "success" | "programador";
  message: string;
}

export default function LoginAlert({ type, message }: LoginAlertProps) {

  if (!message) return null;

  const isError = type === "error";
  const isProgramador = type === "programador";

  return (
    <div
      aria-live={isError ? "assertive" : "polite"}
      className={`login-alert ${
        isError
          ? "login-alert--error"
          : isProgramador
            ? "login-alert--programador"
            : "login-alert--success"
      }`}
      role={isError ? "alert" : "status"}
    >
      <span aria-hidden="true" className="login-alert__icon">
        {isError ? "!" : isProgramador ? "✦" : "✓"}
      </span>
      <div className="login-alert__content">
        <strong className="login-alert__title">
          {isError
            ? "No se pudo ingresar"
            : isProgramador
              ? "Acceso de programador"
              : "¡Bienvenido!"}
        </strong>
        <span className="login-alert__message">{message}</span>
      </div>
      <span aria-hidden="true" className="login-alert__accent" />
    </div>
  );
}
