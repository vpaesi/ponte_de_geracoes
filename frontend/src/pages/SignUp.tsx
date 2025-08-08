import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validarFormularioCadastro,
  buscarEnderecoPorCep,
  exibirErrosValidacao,
  DadosFormulario
} from "../utils/validadoresForm";
import { PageLayout } from "../components/PageLayout";
import { SignUpFormHeader } from "../components/forms/SignUpFormHeader";
import { IndicativoDePaginas } from "../components/comuns/IndicativoDePaginas";
import { SignupFormStep2 } from "../components/forms/SignupFormStep2";
import { SignupFormStep3 } from "../components/forms/SignupFormStep3";
import { SignupFormStep1 } from "../components/forms/SignupFormStep1";

const Cadastro: React.FC = () => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    dataNascimento: "",
    rg: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    endereco: {
      logradouro: "",
      numero: "",
      cep: "",
      cidade: "",
      bairro: "",
      complemento: ""
    },
    tipoUsuario: "",
    sobreMim: "",
    habilidadesNecessidades: "",
    diasDisponiveis: [] as string[]
  });

  const [imagemPerfilPreview, setImagemPerfilPreview] = useState<File | null>(null);
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [carregando, setCarregando] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const navegar = useNavigate();

  // Atualizar campo simples
  const atualizarCampo = (campo: string, valor: string) => {
    if (campo.includes(".")) {
      // Atualizar campo aninhado (endereço)
      const [objeto, propriedade] = campo.split(".");
      setDadosFormulario(anterior => ({
        ...anterior,
        [objeto]: {
          ...anterior[objeto as keyof typeof anterior] as object,
          [propriedade]: valor
        }
      }));
    } else {
      // Atualizar campo direto
      setDadosFormulario(anterior => ({
        ...anterior,
        [campo]: valor
      }));
    }

    // Limpar erro se o campo estava com erro
    if (erros[campo]) {
      setErros(anterior => ({
        ...anterior,
        [campo]: false
      }));
    }
  };

  // Atualizar dias disponíveis
  const alterarDiasDisponiveis = (
    evento: React.ChangeEvent<HTMLInputElement>,
    dia: string
  ) => {
    const novosDias = evento.target.checked
      ? [...dadosFormulario.diasDisponiveis, dia]
      : dadosFormulario.diasDisponiveis.filter(d => d !== dia);
    
    setDadosFormulario(anterior => ({
      ...anterior,
      diasDisponiveis: novosDias
    }));
  };

  // Buscar endereço pelo CEP
  const buscarCep = async (cep: string) => {
    await buscarEnderecoPorCep(
      cep,
      (valor) => atualizarCampo("endereco.logradouro", valor),
      (valor) => atualizarCampo("endereco.cidade", valor),
      (valor) => atualizarCampo("endereco.bairro", valor)
    );
  };

  // Validar etapa atual antes de avançar
  const validarEtapaAtual = (etapaParaValidar: number): boolean => {
    const novosErros: Record<string, boolean> = {};
    
    // Validações específicas por etapa
    if (etapaParaValidar === 1) {
      // Validação da primeira etapa (dados pessoais)
      if (!dadosFormulario.nome.trim()) novosErros.nome = true;
      if (!dadosFormulario.dataNascimento.trim()) novosErros.dataNascimento = true;
      if (!dadosFormulario.email.trim()) novosErros.email = true;
      if (!dadosFormulario.tipoUsuario.trim()) novosErros.tipoUsuario = true;
    } 
    else if (etapaParaValidar === 2) {
      // Validação da segunda etapa (endereço)
      if (!dadosFormulario.endereco.cep.trim()) novosErros["endereco.cep"] = true;
      if (!dadosFormulario.endereco.logradouro.trim()) novosErros["endereco.logradouro"] = true;
      if (!dadosFormulario.endereco.numero.trim()) novosErros["endereco.numero"] = true;
      if (!dadosFormulario.endereco.cidade.trim()) novosErros["endereco.cidade"] = true;
    }
    else if (etapaParaValidar === 3) {
      // Validação da terceira etapa (disponibilidade)
      if (dadosFormulario.diasDisponiveis.length === 0) {
        novosErros.diasDisponiveis = true;
        alert("Por favor, selecione ao menos um dia da semana em que você está disponível.");
      }
      
      if (!dadosFormulario.habilidadesNecessidades.trim()) {
        novosErros.habilidadesNecessidades = true;
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Avançar para próxima etapa
  const avancarEtapa = () => {
    if (validarEtapaAtual(etapaAtual)) {
      setEtapaAtual(Math.min(3, etapaAtual + 1));
    }
  };

  // Submeter formulário completo
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarEtapaAtual(3)) {
      return;
    }

    setCarregando(true);

    // Preparar dados para validação
    const dadosParaValidar: DadosFormulario = {
      nome: dadosFormulario.nome,
      dataNascimento: dadosFormulario.dataNascimento,
      rg: dadosFormulario.rg,
      cpf: dadosFormulario.cpf,
      email: dadosFormulario.email,
      telefone: dadosFormulario.telefone,
      senha: dadosFormulario.senha,
      confirmarSenha: dadosFormulario.confirmarSenha,
      diasDisponiveis: dadosFormulario.diasDisponiveis,
      endereco: dadosFormulario.endereco,
      tipoUsuario: dadosFormulario.tipoUsuario,
      sobreMim: dadosFormulario.sobreMim,
      // Define apenas o campo apropriado de acordo com o tipo de usuário
      ...(dadosFormulario.tipoUsuario === "ajudante" 
        ? { habilidades: dadosFormulario.habilidadesNecessidades } 
        : { necessidades: dadosFormulario.habilidadesNecessidades })
    };

    // Validação completa antes de enviar
    const resultadoValidacao = validarFormularioCadastro(dadosParaValidar, setErros);

    if (!resultadoValidacao.valido) {
      exibirErrosValidacao(resultadoValidacao);
      setCarregando(false);
      return;
    }

    try {
      // Preparar dados para envio no formato da API
      const dadosParaAPI = {
        name: dadosFormulario.nome,
        birthDate: dadosFormulario.dataNascimento,
        rg: dadosFormulario.rg,
        cpf: dadosFormulario.cpf,
        email: dadosFormulario.email,
        phone: dadosFormulario.telefone,
        password: dadosFormulario.senha,
        confirmPassword: dadosFormulario.confirmarSenha,
        address: {
          street: dadosFormulario.endereco.logradouro,
          number: dadosFormulario.endereco.numero,
          complement: dadosFormulario.endereco.complemento,
          zipCode: dadosFormulario.endereco.cep,
          city: dadosFormulario.endereco.cidade,
          neighborhood: dadosFormulario.endereco.bairro
        },
        availableDays: dadosFormulario.diasDisponiveis,
        aboutYou: dadosFormulario.sobreMim,
        ...(dadosFormulario.tipoUsuario === "ajudante"
          ? { skills: dadosFormulario.habilidadesNecessidades }
          : { needs: dadosFormulario.habilidadesNecessidades })
      };

      const endpoint = dadosFormulario.tipoUsuario === "ajudante" ? "/helper" : "/assisted";
      const resposta = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaAPI),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao enviar os dados para o banco de dados");
      }

      const usuarioCriado = await resposta.json();
      const idUsuario = usuarioCriado.id;

      if (imagemPerfilPreview && idUsuario) {
        await enviarImagemPerfil(
          dadosFormulario.tipoUsuario,
          idUsuario,
          imagemPerfilPreview
        );
      }

      alert("Cadastro realizado com sucesso!");
      navegar("/registered");
    } catch (erro) {
      if (erro instanceof Error) {
        alert(erro.message);
      } else {
        alert("Ocorreu um erro ao realizar o cadastro.");
      }
    } finally {
      setCarregando(false);
    }
  };

  // Função para enviar imagem de perfil
  const enviarImagemPerfil = async (
    tipoUsuario: string,
    idUsuario: string,
    imagem: File
  ) => {
    const formDataImagem = new FormData();
    formDataImagem.append("file", imagem);

    const endpoint =
      tipoUsuario === "ajudante"
        ? `/helper/upload-image/${idUsuario}`
        : `/assisted/upload-image/${idUsuario}`;
        
    const resposta = await fetch(`http://localhost:8080${endpoint}`, {
      method: "POST",
      body: formDataImagem,
    });

    if (!resposta.ok) {
      throw new Error("Erro ao fazer o upload da imagem");
    }
  };

  // Renderizar etapa atual
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
            dadosFormulario={dadosFormulario}
            erros={erros}
            atualizarCampo={atualizarCampo}
            alterarDiasDisponiveis={alterarDiasDisponiveis}

          />
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SignUpFormHeader />
          <IndicativoDePaginas etapaAtual={etapaAtual} />

          <div className="glass-card p-8">
            <form onSubmit={enviarFormulario} className="space-y-8">
              {renderizarEtapaAtual()}

              <div className="flex justify-between items-center pt-8 border-t border-accent-200">
                <button
                  type="button"
                  onClick={() => setEtapaAtual(Math.max(1, etapaAtual - 1))}
                  disabled={etapaAtual === 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    etapaAtual === 1
                      ? "bg-accent-100 text-accent-400 cursor-not-allowed"
                      : "bg-accent-200 text-accent-700 hover:bg-accent-300 hover:shadow-md"
                  }`}
                >
                  Anterior
                </button>

                <div className="flex space-x-4">
                  {etapaAtual < 3 ? (
                    <button
                      type="button"
                      onClick={avancarEtapa}
                      className="btn-primary"
                    >
                      Próximo
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={carregando}
                      className={`btn-primary flex items-center space-x-2 ${
                        carregando ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {carregando && (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      <span>
                        {carregando ? "Finalizando..." : "Finalizar Cadastro"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cadastro;
