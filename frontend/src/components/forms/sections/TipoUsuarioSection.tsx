import React from "react";

interface TipoUsuarioSectionProps {
  tipoUsuario: string;
  atualizarCampo: (campo: string, valor: string) => void;
  erro?: boolean | string;
}

export const TipoUsuarioSection: React.FC<TipoUsuarioSectionProps> = ({
  tipoUsuario,
  atualizarCampo,
  erro,
}) => {
  const getErrorMessage = (): string => {
    if (typeof erro === "string") return erro;
    if (erro === true) return "Selecione o tipo de usuário";
    return "";
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-accent-700">
        Você é um: <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="flex space-x-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="userType"
            value="ajudante"
            checked={tipoUsuario === "ajudante"}
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
            checked={tipoUsuario === "assistido"}
            onChange={() => atualizarCampo("tipoUsuario", "assistido")}
            className="w-4 h-4 text-secondary-600 border-accent-300 focus:ring-secondary-500"
          />
          <span className="text-accent-700">
            Pessoa que precisa de ajuda
          </span>
        </label>
      </div>
      {getErrorMessage() && (
        <p className="text-red-500 text-sm">
          {getErrorMessage()}
        </p>
      )}
    </div>
  );
};