import React, { useState } from "react";
import { useFormularioCadastro } from "../hooks/useFormularioCadastro";
import { PageLayout } from "../components/PageLayout";
import { SignUpFormHeader } from "../components/forms/SignUpFormHeader";
import { IndicativoDePaginas } from "../components/comuns/IndicativoDePaginas";
import { SignupFormStep1 } from "../components/forms/SignupFormStep1";
import { SignupFormStep2 } from "../components/forms/SignupFormStep2";
import { SignupFormStep3 } from "../components/forms/SignupFormStep3";
import { BtnPaginacao } from "../components/comuns/BtnPaginacao";
import { validadores } from "../utils/validadores";

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
        if (!validadores.campoPreenchido(dadosFormulario.nome || "")) {
          newErrors.nome = "Nome é obrigatório";
        }

        if (!dadosFormulario.email?.trim()) {
          newErrors.email = "Email é obrigatório";
        } else if (!validadores.email(dadosFormulario.email)) {
          newErrors.email = "Email deve ter um formato válido";
        }

        if (!dadosFormulario.dataNascimento) {
          newErrors.dataNascimento = "Data de nascimento é obrigatória";
        } else if (!validadores.maiorIdade(dadosFormulario.dataNascimento)) {
          newErrors.dataNascimento = "Deve ser maior de 18 anos";
        }

        if (!dadosFormulario.cpf?.trim()) {
          newErrors.cpf = "CPF é obrigatório";
        } else if (!validadores.cpf(dadosFormulario.cpf)) {
          newErrors.cpf = "CPF inválido";
        }

        if (!validadores.campoPreenchido(dadosFormulario.telefone || "")) {
          newErrors.telefone = "Telefone é obrigatório";
        } else if (dadosFormulario.telefone.replace(/\D/g, "").length < 10) {
          newErrors.telefone = "Telefone deve ter pelo menos 10 dígitos";
        }

        if (!validadores.campoPreenchido(dadosFormulario.senha || "")) {
          newErrors.senha = "Senha é obrigatória";
        } else if (dadosFormulario.senha.length < 6) {
          newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
        }

        if (!validadores.campoPreenchido(dadosFormulario.confirmarSenha || "")) {
          newErrors.confirmarSenha = "Confirmação de senha é obrigatória";
        } else if (
          !validadores.senhasIguais(
            dadosFormulario.senha || "",
            dadosFormulario.confirmarSenha || ""
          )
        ) {
          newErrors.confirmarSenha = "As senhas não coincidem ou são muito curtas";
        }
        break;

      case 2:
        if (!validadores.campoPreenchido(dadosFormulario.endereco.zipCode || "")) {
          newErrors["endereco.zipCode"] = "CEP é obrigatório";
        } else if (dadosFormulario.endereco.zipCode.replace(/\D/g, "").length !== 8) {
          newErrors["endereco.zipCode"] = "CEP deve ter 8 dígitos";
        }

        if (!validadores.campoPreenchido(dadosFormulario.endereco.city || "")) {
          newErrors["endereco.city"] = "Cidade é obrigatória";
        }

        if (!validadores.campoPreenchido(dadosFormulario.endereco.street || "")) {
          newErrors["endereco.street"] = "Logradouro é obrigatório";
        }

        if (!validadores.numeroValido(dadosFormulario.endereco.number || "")) {
          newErrors["endereco.number"] = "Número é obrigatório";
        }

        if (!validadores.campoPreenchido(dadosFormulario.endereco.neighborhood || "")) {
          newErrors["endereco.neighborhood"] = "Bairro é obrigatório";
        }
        break;

      case 3:
        if (!dadosFormulario.tipoUsuario || 
            (dadosFormulario.tipoUsuario !== 'ajudante' && dadosFormulario.tipoUsuario !== 'assistido')) {
          newErrors.tipoUsuario = "Selecione o tipo de usuário";
        }
        if (!validadores.arrayNaoVazio(dadosFormulario.diasDisponiveis)) {
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

    if (!dadosFormulario.tipoUsuario || 
        (dadosFormulario.tipoUsuario !== 'ajudante' && dadosFormulario.tipoUsuario !== 'assistido')) {
      newErrors.tipoUsuario = "Selecione o tipo de usuário";
    }

    if (!validadores.arrayNaoVazio(dadosFormulario.diasDisponiveis)) {
      newErrors.diasDisponiveis = "Selecione pelo menos um dia disponível";
    }

    if (dadosFormulario.tipoUsuario === "ajudante") {
      if (!validadores.campoPreenchido(dadosFormulario.habilidades || "")) {
        newErrors.habilidades = "Selecione pelo menos uma habilidade";
      }
    } else if (dadosFormulario.tipoUsuario === "assistido") {
      if (!validadores.campoPreenchido(dadosFormulario.necessidades || "")) {
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
