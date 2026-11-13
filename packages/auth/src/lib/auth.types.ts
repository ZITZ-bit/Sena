export interface LoginCredentials {
  cedula: string;
  password: string;
}

export interface AuthUser {
  [key: string]: unknown;
}

export interface AuthResponse {
  usuario?: AuthUser | null;
  message?: string | string[];
  [key: string]: unknown;
}

export interface UseLoginProps {
  onLogin: (credentials: LoginCredentials) => Promise<AuthResponse>;
  onSuccess?: (data: AuthResponse) => void;
  onError?: (message: string) => void;
}

export interface UseLoginReturn {
  cedula: string;
  password: string;
  setCedula: (value: string) => void;
  setPassword: (value: string) => void;
  error: string;
  success: string;
  successType: "success" | "programador";
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface LoginPageProps {
  onLogin: UseLoginProps["onLogin"];
  onSuccess?: UseLoginProps["onSuccess"];
  onError?: UseLoginProps["onError"];
  className?: string;
}
