import React from "react";
import { FormField } from "../form/FormField";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
    userType: "ajudante" | "ajudado";
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
      <FormField
        label="Email"
        type="email"
        placeholder="digite@seuemail.com"
        value={formData.email}
        onChange={(value) => onUpdateFormData('email', value)}
        error={errors.email}
        required
      />

      <FormField
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={formData.password}
        onChange={(value) => onUpdateFormData('password', value)}
        error={errors.password}
        required
      />

      {errors.submit && (
        <div className="ml-4 mt-2">
          <p className="text-red-600 text-sm">{errors.submit}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center items-center space-x-2 ${
          formData.userType === 'ajudante' ? 'btn-secondary' : 'btn-primary'
        } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isLoading && (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        <span>{isLoading ? 'Entrando...' : 'Login'}</span>
      </button>
    </form>
  );
};