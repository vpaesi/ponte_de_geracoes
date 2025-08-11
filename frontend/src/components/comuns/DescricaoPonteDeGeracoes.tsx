import React from "react";

interface DescricaoPonteDeGeracoesProps {
  className?: string;
}

const DescricaoPonteDeGeracoes: React.FC<DescricaoPonteDeGeracoesProps> = ({
  className = "",
}) => {
  return (
    <span className={className}>
      Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
      necessidades específicas a pessoas dispostas a ajudar.
    </span>
  );
};

export default DescricaoPonteDeGeracoes;
