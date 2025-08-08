import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  validarFormularioCadastro, 
  buscarEnderecoPorCep,
  exibirErrosValidacao,
  DadosFormulario
} from '../utils/validadoresForm';
import { registrationService } from '../services/registrationService';

export const useFormularioCadastro = () => {
  const navegar = useNavigate();
  
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
    habilidades: "",
    necessidades: "",
    diasDisponiveis: [] as string[],
  });

  const [imagemPerfilPreview, setImagemPerfilPreview] = useState<File | null>(null);
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [enviando, setEnviando] = useState(false);

  const atualizarCampo = (campo: string, valor: string | string[]) => {
    if (campo.startsWith('endereco.')) {
      const subcampo = campo.split('.')[1];
      setDadosFormulario(anterior => ({
        ...anterior,
        endereco: {
          ...anterior.endereco,
          [subcampo]: valor
        }
      }));
    } else {
      setDadosFormulario(anterior => ({ ...anterior, [campo]: valor }));
    }
    
    // Limpa erro quando usuário começa a digitar
    if (erros[campo]) {
      setErros(anterior => ({ ...anterior, [campo]: false }));
    }
  };

  const alterarDiasDisponiveis = (dia: string, selecionado: boolean) => {
    const diasAtualizados = selecionado
      ? [...dadosFormulario.diasDisponiveis, dia]
      : dadosFormulario.diasDisponiveis.filter(d => d !== dia);
    
    atualizarCampo('diasDisponiveis', diasAtualizados);
  };

  const buscarCep = async (cep: string) => {
    await buscarEnderecoPorCep(
      cep,
      (valor) => atualizarCampo('endereco.logradouro', valor),
      (valor) => atualizarCampo('endereco.cidade', valor),
      (valor) => atualizarCampo('endereco.bairro', valor)
    );
  };

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (enviando) return;

    // Prepara os dados conforme esperado pelo validador
    const dadosParaValidar: DadosFormulario = {
      ...dadosFormulario,
      // Dependendo do tipo de usuário, define o campo correto
      habilidades: dadosFormulario.tipoUsuario === "ajudante" ? dadosFormulario.habilidades : undefined,
      necessidades: dadosFormulario.tipoUsuario !== "ajudante" ? dadosFormulario.necessidades : undefined
    };

    // Usa a validação completa do módulo validadoresForm
    const resultadoValidacao = validarFormularioCadastro(dadosParaValidar, setErros);
    
    if (!resultadoValidacao.valido) {
      exibirErrosValidacao(resultadoValidacao);
      return;
    }

    try {
      setEnviando(true);
      
      // Adapta os dados para o formato esperado pela API e para o tipo FormValues
      const dadosParaAPI = {
        name: dadosFormulario.nome,
        birthDate: dadosFormulario.dataNascimento,
        dob: dadosFormulario.dataNascimento, // Adiciona dob conforme esperado por FormValues
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
        userType: dadosFormulario.tipoUsuario, // Adiciona userType conforme esperado por FormValues
        ...(dadosFormulario.tipoUsuario === "ajudante"
          ? { skills: dadosFormulario.habilidades }
          : { needs: dadosFormulario.necessidades })
      };

      const usuarioCriado = await registrationService.registerUser(dadosParaAPI);

      if (imagemPerfilPreview && usuarioCriado.id) {
        await registrationService.uploadProfileImage(
          dadosFormulario.tipoUsuario,
          usuarioCriado.id,
          imagemPerfilPreview
        );
      }

      alert("Cadastro realizado com sucesso!");
      navegar("/usuarios");
    } catch (erro) {
      const mensagemErro = erro instanceof Error 
        ? erro.message 
        : "Ocorreu um erro ao realizar o cadastro.";
      alert(mensagemErro);
    } finally {
      setEnviando(false);
    }
  };

  return {
    dadosFormulario,
    imagemPerfilPreview,
    erros,
    enviando,
    atualizarCampo,
    setImagemPerfilPreview,
    alterarDiasDisponiveis,
    buscarCep,
    enviarFormulario,
  };
};
