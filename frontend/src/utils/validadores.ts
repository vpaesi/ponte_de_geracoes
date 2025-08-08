import type { FormData, ValidationResult, ValidationError } from '../types';
import { cepService } from '../services/cepService';

export const validadores = {
  email: (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
      soma += parseInt(numeros.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(numeros.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(numeros.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(numeros.charAt(10))) return false;

    return true;
  },

  campoPreenchido: (texto: string): boolean => {
    return texto.trim().length > 0;
  },

  numeroValido: (valor: string): boolean => {
    return /^\d+$/.test(valor) && parseInt(valor) > 0;
  },

  senhasIguais: (senha: string, confirmacao: string): boolean => {
    return senha === confirmacao && senha.length >= 6;
  },

  arrayNaoVazio: (array: unknown[]): boolean => {
    return Array.isArray(array) && array.length > 0;
  },
};

export const validarFormularioCadastro = (
  dados: FormData,
  setErros: (erros: Record<string, boolean>) => void
): ValidationResult => {
  const erros: Record<string, boolean> = {};
  const mensagens: ValidationError[] = [];

  // Validar dados pessoais
  if (!validadores.campoPreenchido(dados.nome)) {
    erros.nome = true;
    mensagens.push({ campo: 'nome', mensagem: 'Nome é obrigatório' });
  }

  if (!validadores.email(dados.email)) {
    erros.email = true;
    mensagens.push({ campo: 'email', mensagem: 'Email inválido' });
  }

  if (!dados.dataNascimento || !validadores.maiorIdade(dados.dataNascimento)) {
    erros.dataNascimento = true;
    mensagens.push({ campo: 'dataNascimento', mensagem: 'Deve ser maior de 18 anos' });
  }

  if (!validadores.cpf(dados.cpf)) {
    erros.cpf = true;
    mensagens.push({ campo: 'cpf', mensagem: 'CPF inválido' });
  }

  if (!validadores.campoPreenchido(dados.rg)) {
    erros.rg = true;
    mensagens.push({ campo: 'rg', mensagem: 'RG é obrigatório' });
  }

  if (!validadores.campoPreenchido(dados.telefone)) {
    erros.telefone = true;
    mensagens.push({ campo: 'telefone', mensagem: 'Telefone é obrigatório' });
  }

  if (!validadores.senhasIguais(dados.senha, dados.confirmarSenha)) {
    erros.senha = true;
    erros.confirmarSenha = true;
    mensagens.push({ campo: 'senha', mensagem: 'Senhas não coincidem ou são muito curtas' });
  }

  // Validar endereço
  if (!validadores.campoPreenchido(dados.endereco.zipCode)) {
    erros['endereco.zipCode'] = true;
    mensagens.push({ campo: 'endereco.zipCode', mensagem: 'CEP é obrigatório' });
  }

  if (!validadores.campoPreenchido(dados.endereco.street)) {
    erros['endereco.street'] = true;
    mensagens.push({ campo: 'endereco.street', mensagem: 'Logradouro é obrigatório' });
  }

  if (!validadores.campoPreenchido(dados.endereco.city)) {
    erros['endereco.city'] = true;
    mensagens.push({ campo: 'endereco.city', mensagem: 'Cidade é obrigatória' });
  }

  if (!validadores.campoPreenchido(dados.endereco.neighborhood)) {
    erros['endereco.neighborhood'] = true;
    mensagens.push({ campo: 'endereco.neighborhood', mensagem: 'Bairro é obrigatório' });
  }

  if (!validadores.numeroValido(dados.endereco.number)) {
    erros['endereco.number'] = true;
    mensagens.push({ campo: 'endereco.number', mensagem: 'Número é obrigatório' });
  }

  // Validar tipo de usuário e campos específicos
  if (!dados.tipoUsuario || (dados.tipoUsuario !== 'ajudante' && dados.tipoUsuario !== 'assistido')) {
    erros.tipoUsuario = true;
    mensagens.push({ campo: 'tipoUsuario', mensagem: 'Tipo de usuário é obrigatório' });
  }

  if (dados.tipoUsuario === 'ajudante' && !validadores.campoPreenchido(dados.habilidades || '')) {
    erros.habilidades = true;
    mensagens.push({ campo: 'habilidades', mensagem: 'Habilidades são obrigatórias' });
  }

  if (dados.tipoUsuario === 'assistido' && !validadores.campoPreenchido(dados.necessidades || '')) {
    erros.necessidades = true;
    mensagens.push({ campo: 'necessidades', mensagem: 'Necessidades são obrigatórias' });
  }

  if (!validadores.arrayNaoVazio(dados.diasDisponiveis)) {
    erros.diasDisponiveis = true;
    mensagens.push({ campo: 'diasDisponiveis', mensagem: 'Selecione pelo menos um dia disponível' });
  }

  setErros(erros);

  return {
    valido: Object.keys(erros).length === 0,
    erros,
    mensagens
  };
};

export const buscarEnderecoPorCep = async (
  cep: string,
  setLogradouro: (valor: string) => void,
  setCidade: (valor: string) => void,
  setBairro: (valor: string) => void
): Promise<void> => {
  try {
    const endereco = await cepService.fetchAddressByCep(cep);
    if (endereco.logradouro) setLogradouro(endereco.logradouro);
    if (endereco.localidade) setCidade(endereco.localidade);
    if (endereco.bairro) setBairro(endereco.bairro);
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
  }
};

export const exibirErrosValidacao = (resultado: ValidationResult): void => {
  if (resultado.mensagens.length > 0) {
    const primeiroErro = resultado.mensagens[0];
    alert(`Erro: ${primeiroErro.mensagem}`);
  }
};