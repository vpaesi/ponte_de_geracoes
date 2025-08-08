import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  validarFormularioCadastro, 
  buscarEnderecoPorCep,
  exibirErrosValidacao
} from '../utils/validadoresForm';
import { registrationService } from '../services/registrationService';
import type { FormData } from '../types';

export const useFormularioCadastro = () => {
  const navegar = useNavigate();
  
  const [dadosFormulario, setDadosFormulario] = useState<FormData>({
    nome: "",
    dataNascimento: "",
    rg: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    endereco: {
      street: "",
      number: "",
      zipCode: "",
      city: "",
      neighborhood: "",
      complement: ""
    },
    tipoUsuario: "ajudante",
    sobreMim: "",
    habilidades: "",
    necessidades: "",
    diasDisponiveis: [],
  });

  const [imagemPerfilPreview, setImagemPerfilPreview] = useState<File | null>(null);
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [enviando, setEnviando] = useState(false);

  const atualizarCampo = (campo: string, valor: string | string[]) => {
    if (campo.startsWith('endereco.')) {
      const subcampo = campo.split('.')[1] as keyof FormData['endereco'];
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
      (valor) => atualizarCampo('endereco.street', valor),
      (valor) => atualizarCampo('endereco.city', valor),
      (valor) => atualizarCampo('endereco.neighborhood', valor)
    );
  };

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (enviando) return;

    const resultadoValidacao = validarFormularioCadastro(dadosFormulario, setErros);
    
    if (!resultadoValidacao.valido) {
      exibirErrosValidacao(resultadoValidacao);
      return;
    }

    try {
      setEnviando(true);
      
      const dadosParaAPI = {
        name: dadosFormulario.nome,
        birthDate: dadosFormulario.dataNascimento,
        rg: dadosFormulario.rg,
        cpf: dadosFormulario.cpf,
        email: dadosFormulario.email,
        phone: dadosFormulario.telefone,
        password: dadosFormulario.senha,
        address: {
          street: dadosFormulario.endereco.street,
          number: dadosFormulario.endereco.number,
          complement: dadosFormulario.endereco.complement,
          zipCode: dadosFormulario.endereco.zipCode,
          city: dadosFormulario.endereco.city,
          neighborhood: dadosFormulario.endereco.neighborhood
        },
        availableDays: dadosFormulario.diasDisponiveis,
        aboutYou: dadosFormulario.sobreMim,
        userType: dadosFormulario.tipoUsuario,
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
