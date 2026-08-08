interface LoginAlertProps {
  type: "error" | "success";
  message: string;
}

export default function LoginAlert({ type, message }: LoginAlertProps) {

  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`w-full rounded-lg border px-4 py-3 mb-5 ${
        isError
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-green-200 bg-green-50 text-green-700"
      }`}
    >

      <div className="flex items-start gap-3">

        <div className="text-xl">
          {isError ? "⚠️" : "✓"}
        </div>

        <div className="flex flex-col">

          <strong className="font-semibold">
            {isError
              ? "Ocurrió un problema"
              : "¡Bienvenido!"}
          </strong>

          <span className="text-sm mt-1">
            {message}
          </span>

        </div>

      </div>

    </div>
  );
}