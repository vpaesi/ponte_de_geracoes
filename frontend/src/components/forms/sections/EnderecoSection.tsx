import React from "react";
import { InputsFormsFormatado } from "../InputsFormsFormatado";
import { formataCep } from "../../../utils/formatadores";

interface EnderecoSectionProps {
  endereco: {
    street: string;
    number: string;
    complement?: string;
    zipCode: string;
    city: string;
    neighborhood: string;
  };
  erros?: Record<string, boolean | string>;
  atualizarCampo: (campo: string, valor: string) => void;
  onCepBlur?: () => void;
}

export const EnderecoSection: React.FC<EnderecoSectionProps> = ({
  endereco,
  erros = {},
  atualizarCampo,
  onCepBlur,
}) => {
  const getErrorMessage = (campo: string, defaultMessage: string): string => {
    const erro = erros[campo];
    if (typeof erro === 'string') return erro;
    if (erro === true) return defaultMessage;
    return "";
  };

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Endereço
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputsFormsFormatado
          label="CEP"
          type="text"
          placeholder="00000-000"
          value={endereco.zipCode}
          onChange={(valor) => atualizarCampo("endereco.zipCode", valor)}
          onBlur={onCepBlur}
          error={getErrorMessage("endereco.zipCode", "CEP é obrigatório")}
          formatter={formataCep}
          required
        />

        <InputsFormsFormatado
          label="Cidade"
          type="text"
          placeholder="Sua cidade"
          value={endereco.city}
          onChange={(valor) => atualizarCampo("endereco.city", valor)}
          error={getErrorMessage("endereco.city", "Cidade é obrigatória")}
          required
        />

        <InputsFormsFormatado
          label="Logradouro"
          type="text"
          placeholder="Rua, Avenida, etc."
          value={endereco.street}
          onChange={(valor) => atualizarCampo("endereco.street", valor)}
          error={getErrorMessage("endereco.street", "Logradouro é obrigatório")}
          required
        />

        <InputsFormsFormatado
          label="Número"
          type="text"
          placeholder="123"
          value={endereco.number}
          onChange={(valor) => atualizarCampo("endereco.number", valor)}
          error={getErrorMessage("endereco.number", "Número é obrigatório")}
          required
        />

        <InputsFormsFormatado
          label="Bairro"
          type="text"
          placeholder="Seu bairro"
          value={endereco.neighborhood}
          onChange={(valor) => atualizarCampo("endereco.neighborhood", valor)}
          error={getErrorMessage("endereco.neighborhood", "Bairro é obrigatório")}
          required
        />

        <InputsFormsFormatado
          label="Complemento (opcional)"
          type="text"
          placeholder="Apto, Bloco, etc."
          value={endereco.complement || ""}
          onChange={(valor) => atualizarCampo("endereco.complement", valor)}
        />
      </div>
    </div>
  );
};