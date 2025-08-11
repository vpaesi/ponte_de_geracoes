import React, { useState } from "react";
import { useFormularioCadastro } from "../hooks/useFormularioCadastro";
import { PageLayout } from "../components/PageLayout";
import { SignUpFormHeader } from "../components/forms/SignUpFormHeader";
import { IndicativoDePaginas } from "../components/comuns/IndicativoDePaginas";
import { SignupFormStep1 } from "../components/forms/SignupFormStep1";
import { SignupFormStep2 } from "../components/forms/SignupFormStep2";
import { SignupFormStep3 } from "../components/forms/SignupFormStep3";
import { BtnPaginacao } from "../components/comuns/BtnPaginacao";

const SignUp: React.FC = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const {
    dadosFormulario,
    erros,
    enviando,
    atualizarCampo,
    setImagemPerfilPreview,
    alterarDiasDisponiveis,
    buscarCep,
    enviarFormulario,
  } = useFormularioCadastro();

  const handleAvailableDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => {
    alterarDiasDisponiveis(day, event.target.checked);
  };

  const renderizarEtapaAtual = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <SignupFormStep1
            dadosFormulario={dadosFormulario}
            erros={erros}
            atualizarCampo={atualizarCampo}
            setImagemPerfilPreview={setImagemPerfilPreview}
          />
        );
      case 2:
        return (
          <SignupFormStep2
            dadosFormulario={dadosFormulario}
            erros={erros}
            atualizarCampo={atualizarCampo}
            buscarCep={buscarCep}
          />
        );
      case 3:
        return (
          <SignupFormStep3
            formData={{
              tipoUsuario: dadosFormulario.tipoUsuario,
              habilidades: dadosFormulario.habilidades,
              necessidades: dadosFormulario.necessidades,
              sobreMim: dadosFormulario.sobreMim,
            }}
            errors={erros}
            availableDays={dadosFormulario.diasDisponiveis}
            updateFormData={atualizarCampo}
            handleAvailableDaysChange={handleAvailableDaysChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <SignUpFormHeader />
          <IndicativoDePaginas currentStep={etapaAtual} />
          <div className="glass-card p-1">
            <form onSubmit={enviarFormulario}>
              {renderizarEtapaAtual()}
              <BtnPaginacao
                currentStep={etapaAtual}
                isLoading={enviando}
                setCurrentStep={setEtapaAtual}
              />
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignUp;
