import { cepService } from '../services/cepService';
import type { Address, FormData, ValidationError, ValidationResult } from '../types';

export const validadores = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  maiorIdade: (dataNascimento: string): boolean => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      return idade - 1 >= 18;
    }
    return idade >= 18;
  },

  cpf: (cpf: string): boolean => {
    const numeros = cpf.replace(/\D/g, '');
    if (numeros.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(numeros)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(numeros[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(numeros[9])) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(numeros[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(numeros[10]);
  },

  campoPreenchido: (texto: string): boolean => {
    return texto.trim().length > 0;
  },

  numeroValido: (valor: string): boolean => {
    const numero = Number(valor);
    return !isNaN(numero) && numero > 0;
  },

  senhasIguais: (senha: string, confirmacao: string): boolean => {
    return senha === confirmacao;
  },

  arrayNaoVazio: (array: unknown[]): boolean => {
    return Array.isArray(array) && array.length > 0;
  },
};

export const buscarEnderecoPorCep = async (
  cep: string,
  setLogradouro: (valor: string) => void,
  setCidade: (valor: string) => void,
  setBairro: (valor: string) => void
): Promise<boolean> => {
  if (!cep.trim()) return false;

  try {
    const dados = await cepService.buscarEnderecoPorCep(cep);
    
    setLogradouro(dados.logradouro || "");
    setCidade(dados.localidade || "");
    setBairro(dados.bairro || "");
    return true;
  } catch (erro) {
    console.error("Erro ao buscar CEP:", erro);
    return false;
  }
};

export const validarFormularioCadastro = (
  valores: FormData,
  setErros: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
): ValidationResult => {
  const novosErros: Record<string, boolean> = {};
  const mensagensErro: ValidationError[] = [];

  const {
    nome,
    dataNascimento,
    rg,
    cpf,
    email,
    telefone,
    senha,
    confirmarSenha,
    diasDisponiveis,
    endereco,
  } = valores;

  // Validações básicas
  if (!validadores.campoPreenchido(nome)) {
    novosErros.nome = true;
    mensagensErro.push({ campo: 'nome', mensagem: 'Nome é obrigatório' });
  }

  if (!validadores.campoPreenchido(dataNascimento)) {
    novosErros.dataNascimento = true;
    mensagensErro.push({ campo: 'dataNascimento', mensagem: 'Data de nascimento é obrigatória' });
  } else if (!validadores.maiorIdade(dataNascimento)) {
    novosErros.dataNascimento = true;
    mensagensErro.push({ campo: 'dataNascimento', mensagem: 'Você precisa ser maior de idade' });
  }

  if (!validadores.campoPreenchido(rg)) {
    novosErros.rg = true;
    mensagensErro.push({ campo: 'rg', mensagem: 'RG é obrigatório' });
  }

  if (!validadores.campoPreenchido(cpf)) {
    novosErros.cpf = true;
    mensagensErro.push({ campo: 'cpf', mensagem: 'CPF é obrigatório' });
  } else if (!validadores.cpf(cpf)) {
    novosErros.cpf = true;
    mensagensErro.push({ campo: 'cpf', mensagem: 'CPF inválido' });
  }

  if (!validadores.campoPreenchido(email)) {
    novosErros.email = true;
    mensagensErro.push({ campo: 'email', mensagem: 'Email é obrigatório' });
  } else if (!validadores.email(email)) {
    novosErros.email = true;
    mensagensErro.push({ campo: 'email', mensagem: 'Email inválido' });
  }

  if (!validadores.campoPreenchido(telefone)) {
    novosErros.telefone = true;
    mensagensErro.push({ campo: 'telefone', mensagem: 'Telefone é obrigatório' });
  }

  if (!validadores.campoPreenchido(senha)) {
    novosErros.senha = true;
    mensagensErro.push({ campo: 'senha', mensagem: 'Senha é obrigatória' });
  }

  if (!validadores.campoPreenchido(confirmarSenha)) {
    novosErros.confirmarSenha = true;
    mensagensErro.push({ campo: 'confirmarSenha', mensagem: 'Confirmação de senha é obrigatória' });
  }

  if (validadores.campoPreenchido(senha) && validadores.campoPreenchido(confirmarSenha) && !validadores.senhasIguais(senha, confirmarSenha)) {
    novosErros.confirmarSenha = true;
    mensagensErro.push({ campo: 'confirmarSenha', mensagem: 'As senhas não coincidem' });
  }

  // Validação de endereço
  if (!validadores.campoPreenchido(endereco.street)) {
    novosErros.enderecoLogradouro = true;
    mensagensErro.push({ campo: 'enderecoLogradouro', mensagem: 'Logradouro é obrigatório' });
  }

  if (!validadores.campoPreenchido(endereco.number) || !validadores.numeroValido(endereco.number)) {
    novosErros.enderecoNumero = true;
    mensagensErro.push({ campo: 'enderecoNumero', mensagem: 'Número deve ser um valor positivo' });
  }

  if (!validadores.campoPreenchido(endereco.zipCode)) {
    novosErros.enderecoCep = true;
    mensagensErro.push({ campo: 'enderecoCep', mensagem: 'CEP é obrigatório' });
  }

  if (!validadores.campoPreenchido(endereco.city)) {
    novosErros.enderecoCidade = true;
    mensagensErro.push({ campo: 'enderecoCidade', mensagem: 'Cidade é obrigatória' });
  }

  // Validação de disponibilidade
  if (!validadores.arrayNaoVazio(diasDisponiveis)) {
    novosErros.diasDisponiveis = true;
    mensagensErro.push({ campo: 'diasDisponiveis', mensagem: 'Selecione pelo menos um dia de disponibilidade' });
  }

  setErros(novosErros);

  return {
    valido: mensagensErro.length === 0,
    erros: novosErros,
    mensagens: mensagensErro
  };
};

export const obterMensagemErro = (
  resultadoValidacao: ValidationResult,
  campo: string
): string | undefined => {
  const erro = resultadoValidacao.mensagens.find(e => e.campo === campo);
  return erro?.mensagem;
};

export const exibirErrosValidacao = (
  resultadoValidacao: ValidationResult,
  exibirAlerta: boolean = true
): string => {
  if (resultadoValidacao.valido) return '';
  
  const mensagens = resultadoValidacao.mensagens.map(e => e.mensagem);
  const textoErro = mensagens.join('\n');
  
  if (exibirAlerta && mensagens.length > 0) {
    alert(textoErro);
  }
  
  return textoErro;
};