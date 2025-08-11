import React, { useState } from "react";
import { InputsForms } from "./forms/InputsForms";
import Button from "./comuns/Button";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useUser } from "../utils/UserContext";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
    userType: "ajudante" | "assistido";
  };
  errors: Record<string, string>;
  isLoading: boolean;
  onUpdateFormData: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  errors,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await authService.login({ email, password });
      setUser(user);
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <InputsForms
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          error={errors.email || error}
          required
        />

        <InputsForms
          label="Senha"
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={setPassword}
          error={errors.password}
          required
        />

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading || isLoading}
      >
        {loading || isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};
