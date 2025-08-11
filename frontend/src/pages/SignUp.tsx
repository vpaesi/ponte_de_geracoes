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
    atualizarErros,
  } = useFormularioCadastro();

  const handleAvailableDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => {
    alterarDiasDisponiveis(day, event.target.checked);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, boolean | string> = {};

    switch (step) {
      case 1:
        if (!dadosFormulario.nome?.trim()) {
          newErrors.nome = "Nome é obrigatório";
        }

        if (!dadosFormulario.email?.trim()) {
          newErrors.email = "Email é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosFormulario.email)) {
          newErrors.email = "Email deve ter um formato válido";
        }

        if (!dadosFormulario.dataNascimento) {
          newErrors.dataNascimento = "Data de nascimento é obrigatória";
        }

        if (!dadosFormulario.cpf?.trim()) {
          newErrors.cpf = "CPF é obrigatório";
        } else if (dadosFormulario.cpf.replace(/\D/g, "").length !== 11) {
          newErrors.cpf = "CPF deve ter 11 dígitos";
        }

        if (!dadosFormulario.telefone?.trim()) {
          newErrors.telefone = "Telefone é obrigatório";
        } else if (dadosFormulario.telefone.replace(/\D/g, "").length < 10) {
          newErrors.telefone = "Telefone deve ter pelo menos 10 dígitos";
        }

        if (!dadosFormulario.senha?.trim()) {
          newErrors.senha = "Senha é obrigatória";
        } else if (dadosFormulario.senha.length < 6) {
          newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
        }

        if (!dadosFormulario.confirmarSenha?.trim()) {
          newErrors.confirmarSenha = "Confirmação de senha é obrigatória";
        } else if (dadosFormulario.senha !== dadosFormulario.confirmarSenha) {
          newErrors.confirmarSenha = "As senhas não coincidem";
        }
        break;

      case 2:
        if (!dadosFormulario.endereco.zipCode?.trim()) {
          newErrors["endereco.zipCode"] = "CEP é obrigatório";
        } else if (
          dadosFormulario.endereco.zipCode.replace(/\D/g, "").length !== 8
        ) {
          newErrors["endereco.zipCode"] = "CEP deve ter 8 dígitos";
        }

        if (!dadosFormulario.endereco.city?.trim()) {
          newErrors["endereco.city"] = "Cidade é obrigatória";
        }

        if (!dadosFormulario.endereco.street?.trim()) {
          newErrors["endereco.street"] = "Logradouro é obrigatório";
        }

        if (!dadosFormulario.endereco.number?.trim()) {
          newErrors["endereco.number"] = "Número é obrigatório";
        }

        if (!dadosFormulario.endereco.neighborhood?.trim()) {
          newErrors["endereco.neighborhood"] = "Bairro é obrigatório";
        }
        break;

      case 3:
        if (!dadosFormulario.tipoUsuario) {
          newErrors.tipoUsuario = "Selecione o tipo de usuário";
        }
        if (dadosFormulario.diasDisponiveis.length === 0) {
          newErrors.diasDisponiveis = "Selecione pelo menos um dia disponível";
        }
        break;
    }

    if (Object.keys(newErrors).length > 0) {
      atualizarErros(newErrors);
      return false;
    }

    const errosParaLimpar: Record<string, boolean | string> = {};
    switch (step) {
      case 1:
        errosParaLimpar.nome = "";
        errosParaLimpar.email = "";
        errosParaLimpar.dataNascimento = "";
        errosParaLimpar.cpf = "";
        errosParaLimpar.telefone = "";
        errosParaLimpar.senha = "";
        errosParaLimpar.confirmarSenha = "";
        break;
      case 2:
        errosParaLimpar["endereco.zipCode"] = "";
        errosParaLimpar["endereco.city"] = "";
        errosParaLimpar["endereco.street"] = "";
        errosParaLimpar["endereco.number"] = "";
        errosParaLimpar["endereco.neighborhood"] = "";
        break;
      case 3:
        errosParaLimpar.tipoUsuario = "";
        errosParaLimpar.diasDisponiveis = "";
        break;
    }
    atualizarErros(errosParaLimpar);

    return true;
  };

  const validateFinalSubmit = (): boolean => {
    const newErrors: Record<string, boolean | string> = {};

    if (!dadosFormulario.tipoUsuario) {
      newErrors.tipoUsuario = "Selecione o tipo de usuário";
    }

    if (dadosFormulario.diasDisponiveis.length === 0) {
      newErrors.diasDisponiveis = "Selecione pelo menos um dia disponível";
    }

    if (dadosFormulario.tipoUsuario === "ajudante") {
      if (!dadosFormulario.habilidades?.trim()) {
        newErrors.habilidades = "Selecione pelo menos uma habilidade";
      }
    } else if (dadosFormulario.tipoUsuario === "assistido") {
      if (!dadosFormulario.necessidades?.trim()) {
        newErrors.necessidades = "Selecione pelo menos uma necessidade";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      atualizarErros(newErrors);
      return false;
    }

    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateFinalSubmit()) {
      enviarFormulario(e);
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
            <form onSubmit={handleFormSubmit}>
              {renderizarEtapaAtual()}
              <BtnPaginacao
                currentStep={etapaAtual}
                isLoading={enviando}
                setCurrentStep={setEtapaAtual}
                onValidateStep={validateStep}
              />
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignUp;
