import React from "react";
import { InputsForms } from "./forms/InputsForms";
import variantClassBtn from "./variantClassBtn";

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
  formData,
  errors,
  isLoading,
  onUpdateFormData,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <InputsForms
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(value) => onUpdateFormData("email", value)}
          error={errors.email}
          required
        />

        <InputsForms
          label="Senha"
          type="password"
          placeholder="Sua senha"
          value={formData.password}
          onChange={(value) => onUpdateFormData("password", value)}
          error={errors.password}
          required
        />
      </div>

      {errors.submit && (
        <div className="text-red-600 text-sm text-center">{errors.submit}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`${variantClassBtn.primary} w-full`}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};
