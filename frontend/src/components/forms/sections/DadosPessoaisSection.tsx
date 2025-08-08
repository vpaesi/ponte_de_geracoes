import React from "react";
import { InputsFormsFormatado } from "../InputsFormsFormatado";
import { formataCpf, formataCelular } from "../../../utils/formatadores";

interface DadosPessoaisSectionProps {
  dados: {
    nome?: string;
    nome?: string;
    email: string;
    birthDate?: string;
    dataNascimento?: string;
    phone?: string;
    telefone?: string;
    rg?: string;
    cpf?: string;
    senha?: string;
    confirmarSenha?: string;
  };
  erros?: Record<string, boolean | string>;
  atualizarCampo: (campo: string, valor: string) => void;
  showPasswords?: boolean;
  showFileUpload?: boolean;
  onImageChange?: (file: File | null) => void;
  fileInputLabel?: string;
}

export const DadosPessoaisSection: React.FC<DadosPessoaisSectionProps> = ({
  dados,
  erros = {},
  atualizarCampo,
  showPasswords = false,
  showFileUpload = false,
  onImageChange,
  fileInputLabel = "Foto de Perfil",
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (arquivo && onImageChange) {
      onImageChange(arquivo);
    }
  };

  const getErrorMessage = (campo: string, defaultMessage: string): string => {
    const erro = erros[campo];
    if (typeof erro === 'string') return erro;
    if (erro === true) return defaultMessage;
    return "";
  };

  // Normalizar nomes dos campos para compatibilidade
  const nomeField = dados.nome ?? dados.nome ?? "";
  const emailField = dados.email ?? "";
  const nascimentoField = dados.birthDate ?? dados.dataNascimento ?? "";
  const telefoneField = dados.phone ?? dados.telefone ?? "";
  const rgField = dados.rg ?? "";
  const cpfField = dados.cpf ?? "";
  const senhaField = dados.senha ?? "";
  const confirmarSenhaField = dados.confirmarSenha ?? "";

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Dados Pessoais
      </h2>

      <div className="space-y-6">
        {/* Upload de arquivo */}
        {showFileUpload && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {fileInputLabel}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-accent-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        )}

        {/* Campos principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputsFormsFormatado
            label="Nome completo"
            type="text"
            placeholder="Seu nome completo"
            value={nomeField}
            onChange={(valor) => atualizarCampo(dados.nome !== undefined ? "nome" : "nome", valor)}
            error={getErrorMessage(dados.nome !== undefined ? "nome" : "nome", "Nome é obrigatório")}
            required
          />

          <InputsFormsFormatado
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={emailField}
            onChange={(valor) => atualizarCampo("email", valor)}
            error={getErrorMessage("email", "Email válido é obrigatório")}
            required
          />
        </div>

        {/* Campos secundários */}
        <div className={`grid grid-cols-1 ${showPasswords ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
          <InputsFormsFormatado
            label="Data de nascimento"
            type="date"
            placeholder=""
            value={nascimentoField}
            onChange={(valor) => atualizarCampo(dados.birthDate !== undefined ? "birthDate" : "dataNascimento", valor)}
            error={getErrorMessage(dados.birthDate !== undefined ? "birthDate" : "dataNascimento", "Data de nascimento é obrigatória")}
            required
          />

          <InputsFormsFormatado
            label="Telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={telefoneField}
            onChange={(valor) => atualizarCampo(dados.phone !== undefined ? "phone" : "telefone", valor)}
            error={getErrorMessage(dados.phone !== undefined ? "phone" : "telefone", "Telefone é obrigatório")}
            formatter={formataCelular}
            required
          />

          <InputsFormsFormatado
            label="RG"
            type="text"
            placeholder="00.000.000-0"
            value={rgField}
            onChange={(valor) => atualizarCampo("rg", valor)}
            error={getErrorMessage("rg", "RG é obrigatório")}
            required
          />

          <InputsFormsFormatado
            label="CPF"
            type="text"
            placeholder="000.000.000-00"
            value={cpfField}
            onChange={(valor) => atualizarCampo("cpf", valor)}
            error={getErrorMessage("cpf", "CPF é obrigatório")}
            formatter={formataCpf}
            required
          />

          {/* Campos de senha */}
          {showPasswords && (
            <>
              <InputsFormsFormatado
                label="Senha"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={senhaField}
                onChange={(valor) => atualizarCampo("senha", valor)}
                error={getErrorMessage("senha", "Senha é obrigatória")}
                required
              />

              <InputsFormsFormatado
                label="Confirmar senha"
                type="password"
                placeholder="Digite a senha novamente"
                value={confirmarSenhaField}
                onChange={(valor) => atualizarCampo("confirmarSenha", valor)}
                error={getErrorMessage("confirmarSenha", "As senhas não coincidem")}
                required
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};