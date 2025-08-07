import React from "react";
import { FormField } from "../form/FormField";
import { FormattedFormField } from "../form/FormattedFormField";
import { formatPhone, formatRG, formatCPF } from "../../utils/formatters";

interface DadosPessoaisFormProps {
  formData: any;
  errors: Record<string, boolean>;
  updateFormData: (field: string, value: string) => void;
  setProfileImagePreview: (file: File | null) => void;
}

export const DadosPessoaisForm: React.FC<DadosPessoaisFormProps> = ({
  formData,
  errors,
  updateFormData,
  setProfileImagePreview
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center">
        Dados Pessoais
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nome Completo"
          type="text"
          placeholder="Digite seu nome completo"
          value={formData.name}
          onChange={(value) => updateFormData('name', value)}
          error={errors.name ? "Nome é obrigatório" : undefined}
          required
        />

        <FormField
          label="Email"
          type="email"
          placeholder="nome@exemplo.com"
          value={formData.email}
          onChange={(value) => updateFormData('email', value)}
          error={errors.email ? "Email é obrigatório" : undefined}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FormField
          label="Data de Nascimento"
          type="date"
          placeholder=""
          value={formData.birthDate}
          onChange={(value) => updateFormData('birthDate', value)}
          error={errors.birthDate ? "Data é obrigatória" : undefined}
          required
        />

        <FormattedFormField
          label="Celular"
          type="tel"
          placeholder="(11) 99999-9999"
          value={formData.phone}
          onChange={(value) => updateFormData('phone', value)}
          error={errors.phone ? "Celular é obrigatório" : undefined}
          formatter={formatPhone}
          maxLength={15}
          required
        />

        <FormattedFormField
          label="RG"
          type="text"
          placeholder="12.345.678-90"
          value={formData.rg}
          onChange={(value) => updateFormData('rg', value)}
          error={errors.rg ? "RG é obrigatório" : undefined}
          formatter={formatRG}
          maxLength={12}
          required
        />

        <FormattedFormField
          label="CPF"
          type="text"
          placeholder="123.456.789-01"
          value={formData.cpf}
          onChange={(value) => updateFormData('cpf', value)}
          error={errors.cpf ? "CPF é obrigatório" : undefined}
          formatter={formatCPF}
          maxLength={14}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Foto de Perfil
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfileImagePreview(e.target.files[0]);
              }
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.profileImage ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.profileImage && (
            <div className="ml-4 mt-1">
              <p className="text-red-600 text-sm">Foto é obrigatória</p>
            </div>
          )}
        </div>

        <FormField
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={(value) => updateFormData('password', value)}
          error={errors.password ? "Senha é obrigatória" : undefined}
          required
        />

        <FormField
          label="Confirme a Senha"
          type="password"
          placeholder="Digite novamente"
          value={formData.confirmPassword}
          onChange={(value) => updateFormData('confirmPassword', value)}
          error={errors.confirmPassword ? "As senhas não coincidem" : undefined}
          required
        />
      </div>
    </div>
  );
};