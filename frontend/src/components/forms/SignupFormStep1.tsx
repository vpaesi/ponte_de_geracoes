import React from "react";
import { DadosPessoaisSection } from "./sections/DadosPessoaisSection";
import { TipoUsuarioSection } from "./sections/TipoUsuarioSection";

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
  return (
    <div className="space-y-8">
      <DadosPessoaisSection
        dados={dadosFormulario}
        erros={erros}
        atualizarCampo={atualizarCampo}
        showPasswords={true}
        showFileUpload={true}
        onImageChange={setImagemPerfilPreview}
      />

      <TipoUsuarioSection
        tipoUsuario={dadosFormulario.tipoUsuario}
        atualizarCampo={atualizarCampo}
        erro={erros.tipoUsuario}
      />
    </div>
  );
};
