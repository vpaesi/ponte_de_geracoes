import React, { useState } from "react";
import { useFormularioCadastro } from "../hooks/useFormularioCadastro";
import { PageLayout } from "../components/PageLayout";
import { SignUpFormHeader } from "../components/forms/SignUpFormHeader";
import { IndicativoDePaginas } from "../components/comuns/IndicativoDePaginas";
import { SignupFormStep1 } from "../components/forms/SignupFormStep1";
import { SignupFormStep2 } from "../components/forms/SignupFormStep2";
import { SignupFormStep3 } from "../components/forms/SignupFormStep3";

const SignUp: React.FC = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const {
    dadosFormulario,
    imagemPerfilPreview,
    erros,
    enviando,
    atualizarCampo,
    setImagemPerfilPreview,
    alterarDiasDisponiveis,
    buscarCep,
    enviarFormulario,
  } = useFormularioCadastro();

  const validarEtapaAtual = (etapa: number): boolean => {
    const novosErros: Record<string, boolean> = {};
    
    if (etapa === 1) {
      if (!dadosFormulario.nome.trim()) novosErros.nome = true;
      if (!dadosFormulario.dataNascimento.trim()) novosErros.dataNascimento = true;
      if (!dadosFormulario.email.trim()) novosErros.email = true;
      if (!dadosFormulario.telefone.trim()) novosErros.telefone = true;
      if (!dadosFormulario.senha.trim()) novosErros.senha = true;
      if (!dadosFormulario.tipoUsuario.trim()) novosErros.tipoUsuario = true;
    } else if (etapa === 2) {
      if (!dadosFormulario.endereco.zipCode.trim()) novosErros["endereco.zipCode"] = true;
      if (!dadosFormulario.endereco.street.trim()) novosErros["endereco.street"] = true;
      if (!dadosFormulario.endereco.number.trim()) novosErros["endereco.number"] = true;
      if (!dadosFormulario.endereco.city.trim()) novosErros["endereco.city"] = true;
    } else if (etapa === 3) {
      if (dadosFormulario.diasDisponiveis.length === 0) {
        novosErros.diasDisponiveis = true;
        alert("Por favor, selecione ao menos um dia da semana em que você está disponível.");
      }
      if (!dadosFormulario.habilidadesNecessidades?.trim()) {
        novosErros.habilidadesNecessidades = true;
      }
    }

    return Object.keys(novosErros).length === 0;
  };

  const avancarEtapa = () => {
    if (validarEtapaAtual(etapaAtual)) {
      setEtapaAtual(Math.min(3, etapaAtual + 1));
    }
  };

  const renderizarEtapaAtual = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <SignupFormStep1
            dadosFormulario={dadosFormulario}
            erros={erros}
            atualizarCampo={atualizarCampo}
            onNext={avancarEtapa}
          />
        );
      case 2:
        return (
          <SignupFormStep2
            dadosFormulario={dadosFormulario}
            erros={erros}
            atualizarCampo={atualizarCampo}
            buscarCep={buscarCep}
            onNext={avancarEtapa}
            onBack={() => setEtapaAtual(1)}
          />
        );
      case 3:
        return (
          <SignupFormStep3
            dadosFormulario={dadosFormulario}
            erros={erros}
            imagemPerfilPreview={imagemPerfilPreview}
            atualizarCampo={atualizarCampo}
            setImagemPerfilPreview={setImagemPerfilPreview}
            alterarDiasDisponiveis={alterarDiasDisponiveis}
            enviando={enviando}
            onSubmit={enviarFormulario}
            onBack={() => setEtapaAtual(2)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SignUpFormHeader />
          <IndicativoDePaginas etapaAtual={etapaAtual} totalEtapas={3} />
          <div className="glass-card p-8">
            {renderizarEtapaAtual()}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignUp;
