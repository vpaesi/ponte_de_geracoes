import React from "react";
import { EnderecoSection } from "./sections/EnderecoSection";
import { buscarEnderecoPorCep } from "../../utils/validadores";

interface SignupFormStep2Props {
  dadosFormulario: {
    endereco: {
      street: string;
      number: string;
      complement?: string;
      zipCode: string;
      city: string;
    };
  };
  erros: Record<string, boolean>;
  atualizarCampo: (campo: string, valor: string) => void;
}

export const SignupFormStep2: React.FC<SignupFormStep2Props> = ({
  dadosFormulario,
  erros,
  atualizarCampo,
}) => {
  const handleCepBlur = async () => {
    if (dadosFormulario.endereco.zipCode.length >= 8) {
      await buscarEnderecoPorCep(
        dadosFormulario.endereco.zipCode,
        atualizarCampo
      );
    }
  };

  return (
    <EnderecoSection
      endereco={dadosFormulario.endereco}
      erros={erros}
      atualizarCampo={atualizarCampo}
      onCepBlur={handleCepBlur}
    />
  );
};
