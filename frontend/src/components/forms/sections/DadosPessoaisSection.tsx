import React from "react";
import { InputsFormsFormatado } from "../InputsFormsFormatado";
import { formataCpf, formataCelular } from "../../../utils/formatadores";

interface DadosPessoaisSectionProps {
  dados: {
    name?: string;
    email: string;
    birthDate?: string;
    dataNascimento?: string;
    phone?: string;
    telefone?: string;
    cpf?: string;
    senha?: string;
    confirmarSenha?: string;
    profileImage?: string; // URL da imagem atual
  };
  erros?: Record<string, boolean | string>;
  atualizarCampo: (campo: string, valor: string) => void;
  showPasswords?: boolean;
  showFileUpload?: boolean;
  onImageChange?: (file: File | null) => void;
  fileInputLabel?: string;
  imagePreview?: string; // Para mostrar preview
}

export const DadosPessoaisSection: React.FC<DadosPessoaisSectionProps> = ({
  dados,
  erros = {},
  atualizarCampo,
  showPasswords = false,
  showFileUpload = false,
  onImageChange,
  fileInputLabel = "Foto de Perfil",
  imagePreview,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];

    if (arquivo) {
      // Validação opcional de tamanho (5MB)
      if (arquivo.size > 5 * 1024 * 1024) {
        alert("Arquivo muito grande. Máximo 5MB.");
        e.target.value = ""; // Limpar input
        return;
      }

      // Validação opcional de tipo
      if (!arquivo.type.startsWith("image/")) {
        alert("Por favor, selecione apenas imagens.");
        e.target.value = ""; // Limpar input
        return;
      }

      if (onImageChange) {
        onImageChange(arquivo);
      }
    }
  };

  const getErrorMessage = (campo: string, defaultMessage: string): string => {
    const erro = erros[campo];
    if (typeof erro === "string") return erro;
    if (erro === true) return defaultMessage;
    return "";
  };

  const nameField = dados.name ?? "";
  const emailField = dados.email ?? "";
  const nascimentoField = dados.birthDate ?? dados.dataNascimento ?? "";
  const telefoneField = dados.phone ?? dados.telefone ?? "";
  const cpfField = dados.cpf ?? "";
  const senhaField = dados.senha ?? "";
  const confirmarSenhaField = dados.confirmarSenha ?? "";

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Dados Pessoais
      </h2>

      <div className="space-y-6">
        {showFileUpload && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {fileInputLabel}
            </label>

            {/* Preview da imagem melhorado */}
            {(imagePreview || dados.profileImage) && (
              <div className="mb-4 text-center">
                <img
                  src={imagePreview || dados.profileImage}
                  alt="Preview da foto de perfil"
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-primary-200 shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {imagePreview ? "Nova imagem selecionada" : "Imagem atual"}
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-accent-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />

            {/* Instruções */}
            <p className="text-xs text-gray-500">
              Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputsFormsFormatado
            label="Nome completo"
            type="text"
            placeholder="Seu name completo"
            value={nameField}
            onChange={(valor) => atualizarCampo("name", valor)}
            error={getErrorMessage(
              dados.name !== undefined ? "name" : "name",
              "Nome é obrigatório"
            )}
            required
          />

          <InputsFormsFormatado
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            value={emailField}
            onChange={(valor) => atualizarCampo("email", valor)}
            error={getErrorMessage("email", "Email válido é obrigatório")}
            required
          />
        </div>

        <div
          className={`grid grid-cols-1 ${
            showPasswords
              ? "md:grid-cols-2 lg:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-4"
          } gap-6`}
        >
          <InputsFormsFormatado
            label="Data de nascimento"
            type="date"
            placeholder=""
            value={nascimentoField}
            onChange={(valor) =>
              atualizarCampo(
                dados.birthDate !== undefined ? "birthDate" : "dataNascimento",
                valor
              )
            }
            error={getErrorMessage(
              dados.birthDate !== undefined ? "birthDate" : "dataNascimento",
              "Data de nascimento é obrigatória"
            )}
            required
          />

          <InputsFormsFormatado
            label="CPF"
            type="text"
            placeholder="123.456.789-00"
            value={cpfField}
            onChange={(valor) => atualizarCampo("cpf", valor)}
            error={getErrorMessage("cpf", "CPF é obrigatório")}
            formatter={formataCpf}
            required
          />
        </div>

        {showPasswords && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputsFormsFormatado
              label="Telefone"
              type="tel"
              placeholder="(51) 91234-5678"
              value={telefoneField}
              onChange={(valor) =>
                atualizarCampo(
                  dados.phone !== undefined ? "phone" : "telefone",
                  valor
                )
              }
              error={getErrorMessage(
                dados.phone !== undefined ? "phone" : "telefone",
                "Telefone é obrigatório"
              )}
              formatter={formataCelular}
              required
            />

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
              error={getErrorMessage(
                "confirmarSenha",
                "As senhas não coincidem"
              )}
              required
            />
          </div>
        )}

        {!showPasswords && (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            <InputsFormsFormatado
              label="Telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={telefoneField}
              onChange={(valor) =>
                atualizarCampo(
                  dados.phone !== undefined ? "phone" : "telefone",
                  valor
                )
              }
              error={getErrorMessage(
                dados.phone !== undefined ? "phone" : "telefone",
                "Telefone é obrigatório"
              )}
              formatter={formataCelular}
              required
            />
          </div>
        )}
      </div>
    </div>
  );
};
