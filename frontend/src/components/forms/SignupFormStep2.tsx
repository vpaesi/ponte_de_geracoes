import React from "react";
import { InputsFormsFormatado } from "./InputsFormsFormatado";
import { formataCep } from "../../utils/formatadores";

interface SignupFormStep2Props {
  dadosFormulario: {
    endereco: {
      street: string;
      number: string;
      complement?: string;
      zipCode: string;
      city: string;
      neighborhood: string;
    };
  };
  erros: Record<string, boolean>;
  atualizarCampo: (campo: string, valor: string) => void;
  buscarCep: (cep: string) => Promise<void>;
}

export const SignupFormStep2: React.FC<SignupFormStep2Props> = ({
  dadosFormulario,
  erros,
  atualizarCampo,
  buscarCep,
}) => {
  const handleCepBlur = () => {
    if (dadosFormulario.endereco.zipCode.length >= 8) {
      buscarCep(dadosFormulario.endereco.zipCode);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Endereço
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputsFormsFormatado
          label="CEP"
          type="text"
          placeholder="00000-000"
          value={dadosFormulario.endereco.zipCode}
          onChange={(valor) => atualizarCampo("endereco.zipCode", valor)}
          onBlur={handleCepBlur}
          error={erros["endereco.zipCode"] ? "CEP é obrigatório" : ""}
          formatter={formataCep}
          required
        />

        <InputsFormsFormatado
          label="Cidade"
          type="text"
          placeholder="Sua cidade"
          value={dadosFormulario.endereco.city}
          onChange={(valor) => atualizarCampo("endereco.city", valor)}
          error={erros["endereco.city"] ? "Cidade é obrigatória" : ""}
          required
        />

        <InputsFormsFormatado
          label="Logradouro"
          type="text"
          placeholder="Rua, Avenida, etc."
          value={dadosFormulario.endereco.street}
          onChange={(valor) => atualizarCampo("endereco.street", valor)}
          error={erros["endereco.street"] ? "Logradouro é obrigatório" : ""}
          required
        />

        <InputsFormsFormatado
          label="Número"
          type="text"
          placeholder="123"
          value={dadosFormulario.endereco.number}
          onChange={(valor) => atualizarCampo("endereco.number", valor)}
          error={erros["endereco.number"] ? "Número é obrigatório" : ""}
          required
        />

        <InputsFormsFormatado
          label="Bairro"
          type="text"
          placeholder="Seu bairro"
          value={dadosFormulario.endereco.neighborhood}
          onChange={(valor) => atualizarCampo("endereco.neighborhood", valor)}
          error={erros["endereco.neighborhood"] ? "Bairro é obrigatório" : ""}
          required
        />

        <InputsFormsFormatado
          label="Complemento (opcional)"
          type="text"
          placeholder="Apto, Bloco, etc."
          value={dadosFormulario.endereco.complement || ""}
          onChange={(valor) => atualizarCampo("endereco.complement", valor)}
        />
      </div>
    </div>
  );
};
