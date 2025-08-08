import React from "react";
import { InputsFormsFormatado } from "./InputsFormsFormatado";
import { formataCpf, formataCelular } from "../../utils/formatadores";

interface PropsFormularioCadastroEtapa1 {
  dadosFormulario: {
    nome: string;
    dataNascimento: string;
    rg: string;
    cpf: string;
    email: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
    tipoUsuario: string;
  };
  erros: Record<string, boolean>;
  atualizarCampo: (campo: string, valor: string) => void;
  setImagemPerfilPreview: React.Dispatch<React.SetStateAction<File | null>>;
}

export const SignupFormStep1: React.FC<PropsFormularioCadastroEtapa1> = ({
  dadosFormulario,
  erros,
  atualizarCampo,
  setImagemPerfilPreview,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (arquivo) {
      setImagemPerfilPreview(arquivo);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Dados Pessoais
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputsFormsFormatado
          label="Nome completo"
          type="text"
          placeholder="Seu nome completo"
          value={dadosFormulario.nome}
          onChange={(valor) => atualizarCampo("nome", valor)}
          error={erros.nome ? "Nome é obrigatório" : ""}
          required
        />

        <InputsFormsFormatado
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={dadosFormulario.email}
          onChange={(valor) => atualizarCampo("email", valor)}
          error={erros.email ? "Email válido é obrigatório" : ""}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InputsFormsFormatado
          label="Data de nascimento"
          type="date"
          placeholder=""
          value={dadosFormulario.dataNascimento}
          onChange={(valor) => atualizarCampo("dataNascimento", valor)}
          error={erros.dataNascimento ? "Data de nascimento é obrigatória" : ""}
          required
        />

        <InputsFormsFormatado
          label="Telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={dadosFormulario.telefone}
          onChange={(valor) => atualizarCampo("telefone", valor)}
          error={erros.telefone ? "Telefone é obrigatório" : ""}
          formatter={formataCelular}
          required
        />

        <InputsFormsFormatado
          label="RG"
          type="text"
          placeholder="00.000.000-0"
          value={dadosFormulario.rg}
          onChange={(valor) => atualizarCampo("rg", valor)}
          error={erros.rg ? "RG é obrigatório" : ""}
          required
        />

        <InputsFormsFormatado
          label="CPF"
          type="text"
          placeholder="000.000.000-00"
          value={dadosFormulario.cpf}
          onChange={(valor) => atualizarCampo("cpf", valor)}
          error={erros.cpf ? "CPF é obrigatório" : ""}
          formatter={formataCpf}
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
            onChange={handleImageChange}
            className="w-full p-2 border border-accent-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <InputsFormsFormatado
          label="Senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={dadosFormulario.senha}
          onChange={(valor) => atualizarCampo("senha", valor)}
          error={erros.senha ? "Senha é obrigatória" : ""}
          required
        />

        <InputsFormsFormatado
          label="Confirmar senha"
          type="password"
          placeholder="Digite a senha novamente"
          value={dadosFormulario.confirmarSenha}
          onChange={(valor) => atualizarCampo("confirmarSenha", valor)}
          error={erros.confirmarSenha ? "As senhas não coincidem" : ""}
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-accent-700">
          Você é um:
        </label>
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="ajudante"
              checked={dadosFormulario.tipoUsuario === "ajudante"}
              onChange={() => atualizarCampo("tipoUsuario", "ajudante")}
              className="w-4 h-4 text-primary-600 border-accent-300 focus:ring-primary-500"
            />
            <span className="text-accent-700">Voluntário (quero ajudar)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="assistido"
              checked={dadosFormulario.tipoUsuario === "assistido"}
              onChange={() => atualizarCampo("tipoUsuario", "assistido")}
              className="w-4 h-4 text-secondary-600 border-accent-300 focus:ring-secondary-500"
            />
            <span className="text-accent-700">
              Pessoa que precisa de ajuda
            </span>
          </label>
        </div>
        {erros.tipoUsuario && (
          <p className="text-red-500 text-sm">
            Selecione o tipo de usuário
          </p>
        )}
      </div>
    </div>
  );
};
