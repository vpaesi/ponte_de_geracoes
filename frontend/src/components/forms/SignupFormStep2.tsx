import React from "react";

interface SignupFormStep2Props {
  dadosFormulario: {
    endereco: {
      logradouro: string;
      numero: string;
      complemento: string;
      cep: string;
      cidade: string;
      bairro: string;
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
    if (dadosFormulario.endereco.cep.length >= 8) {
      buscarCep(dadosFormulario.endereco.cep);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Endereço
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormattedFormField
          label="CEP"
          type="text"
          placeholder="00000-000"
          value={dadosFormulario.endereco.cep}
          onChange={(valor) => atualizarCampo("endereco.cep", valor)}
          onBlur={handleCepBlur}
          error={erros["endereco.cep"] ? "CEP é obrigatório" : ""}
          formatter={formatarCEP}
          required
        />

        <FormattedFormField
          label="Cidade"
          type="text"
          placeholder="Sua cidade"
          value={dadosFormulario.endereco.cidade}
          onChange={(valor) => atualizarCampo("endereco.cidade", valor)}
          error={erros["endereco.cidade"] ? "Cidade é obrigatória" : ""}
          required
        />

        <FormattedFormField
          label="Logradouro"
          type="text"
          placeholder="Rua, Avenida, etc."
          value={dadosFormulario.endereco.logradouro}
          onChange={(valor) => atualizarCampo("endereco.logradouro", valor)}
          error={erros["endereco.logradouro"] ? "Logradouro é obrigatório" : ""}
          required
        />

        <FormattedFormField
          label="Número"
          type="text"
          placeholder="123"
          value={dadosFormulario.endereco.numero}
          onChange={(valor) => atualizarCampo("endereco.numero", valor)}
          error={erros["endereco.numero"] ? "Número é obrigatório" : ""}
          required
        />

        <FormattedFormField
          label="Bairro"
          type="text"
          placeholder="Seu bairro"
          value={dadosFormulario.endereco.bairro}
          onChange={(valor) => atualizarCampo("endereco.bairro", valor)}
          error={erros["endereco.bairro"] ? "Bairro é obrigatório" : ""}
          required
        />

        <FormattedFormField
          label="Complemento (opcional)"
          type="text"
          placeholder="Apto, Bloco, etc."
          value={dadosFormulario.endereco.complemento}
          onChange={(valor) => atualizarCampo("endereco.complemento", valor)}
        />
      </div>
    </div>
  );
};
