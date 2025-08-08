import { cepService } from '../services/cepService';

/**
 * Tipos e interfaces para validação
 */
export interface Endereco {
  logradouro: string;
  numero: string;
  cep: string;
  cidade: string;
  bairro: string;
  complemento?: string;
}

export interface DadosFormulario {
  nome: string;
  dataNascimento: string;
  rg: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  diasDisponiveis: string[];
  endereco: Endereco;
  tipoUsuario: string;
  sobreMim?: string;
  habilidades?: string;
  necessidades?: string;
}

export interface ErroValidacao {
  campo: string;
  mensagem: string;
}

/**
 * Resultado de uma validação completa
 */
export interface ResultadoValidacao {
  valido: boolean;
  erros: Record<string, boolean>;
  mensagens: ErroValidacao[];
}

/**
 * Validadores de dados básicos
 */
export const validadores = {
  /**
   * Verifica se um email está no formato correto
   * @param email Email a ser validado
   * @returns true se o email for válido
   */
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Verifica se uma pessoa é maior de idade
   * @param dataNascimento Data de nascimento no formato YYYY-MM-DD
   * @returns true se a pessoa for maior de idade
   */
  maiorIdade: (dataNascimento: string): boolean => {
    const data = new Date(dataNascimento);
    const dataAtual = new Date();
    const dataAdulto = new Date(
      data.getFullYear() + 18,
      data.getMonth(),
      data.getDate()
    );
    return dataAtual >= dataAdulto;
  },

  /**
   * Valida um CPF
   * @param cpf CPF a ser validado
   * @returns true se o CPF for válido
   */
  cpf: (cpf: string): boolean => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica números repetidos (casos inválidos conhecidos)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  },

  /**
   * Verifica se uma string não está vazia
   * @param texto Texto a ser verificado
   * @returns true se o texto não estiver vazio
   */
  campoPreenchido: (texto: string): boolean => {
    return texto.trim().length > 0;
  },

  /**
   * Verifica se um número é válido e positivo
   * @param valor Valor a ser verificado
   * @returns true se for um número válido e positivo
   */
  numeroValido: (valor: string): boolean => {
    const numero = Number(valor);
    return !isNaN(numero) && numero > 0;
  },

  /**
   * Verifica se duas senhas coincidem
   * @param senha Senha original
   * @param confirmacao Confirmação da senha
   * @returns true se as senhas forem iguais
   */
  senhasIguais: (senha: string, confirmacao: string): boolean => {
    return senha === confirmacao;
  },

  /**
   * Verifica se um array contém pelo menos um elemento
   * @param array Array a ser verificado
   * @returns true se o array não estiver vazio
   */
  arrayNaoVazio: (array: any[]): boolean => {
    return Array.isArray(array) && array.length > 0;
  },
};

/**
 * Busca endereço pelo CEP usando serviço externo
 * @param cep CEP a ser consultado
 * @param setLogradouro Função para definir o logradouro
 * @param setCidade Função para definir a cidade
 * @param setBairro Função para definir o bairro
 * @returns Promise com o resultado da operação
 */
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

/**
 * Validação completa de formulário de cadastro
 * @param valores Valores do formulário
 * @param setErros Função para definir os erros no estado
 * @returns Resultado detalhado da validação
 */
export const validarFormularioCadastro = (
  valores: DadosFormulario,
  setErros: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
): ResultadoValidacao => {
  const novosErros: Record<string, boolean> = {};
  const mensagensErro: ErroValidacao[] = [];

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

  // Validações de campos básicos
  if (!validadores.campoPreenchido(nome)) {
    novosErros.nome = true;
    mensagensErro.push({ campo: 'nome', mensagem: 'Nome é obrigatório' });
  }

  if (!validadores.campoPreenchido(dataNascimento)) {
    novosErros.dataNascimento = true;
    mensagensErro.push({ campo: 'dataNascimento', mensagem: 'Data de nascimento é obrigatória' });
  } else if (!validadores.maiorIdade(dataNascimento)) {
    novosErros.dataNascimento = true;
    mensagensErro.push({ campo: 'dataNascimento', mensagem: 'Você precisa ser maior de idade para se registrar' });
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

  // Validação de senha
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
  if (!validadores.campoPreenchido(endereco.logradouro)) {
    novosErros.enderecoLogradouro = true;
    mensagensErro.push({ campo: 'enderecoLogradouro', mensagem: 'Logradouro é obrigatório' });
  }

  if (!validadores.campoPreenchido(endereco.numero) || !validadores.numeroValido(endereco.numero)) {
    novosErros.enderecoNumero = true;
    mensagensErro.push({ campo: 'enderecoNumero', mensagem: 'Número deve ser um valor positivo' });
  }

  if (!validadores.campoPreenchido(endereco.cep)) {
    novosErros.enderecoCep = true;
    mensagensErro.push({ campo: 'enderecoCep', mensagem: 'CEP é obrigatório' });
  }

  if (!validadores.campoPreenchido(endereco.cidade)) {
    novosErros.enderecoCidade = true;
    mensagensErro.push({ campo: 'enderecoCidade', mensagem: 'Cidade é obrigatória' });
  }

  // Validação de disponibilidade
  if (!validadores.arrayNaoVazio(diasDisponiveis)) {
    novosErros.diasDisponiveis = true;
    mensagensErro.push({ campo: 'diasDisponiveis', mensagem: 'Selecione pelo menos um dia de disponibilidade' });
  }

  // Atualiza o estado de erros
  setErros(novosErros);

  return {
    valido: mensagensErro.length === 0,
    erros: novosErros,
    mensagens: mensagensErro
  };
};

/**
 * Validação simplificada para login
 * @param email Email a ser validado
 * @param senha Senha a ser validada
 * @returns Resultado da validação com mensagens
 */
export const validarLogin = (
  email: string,
  senha: string
): ResultadoValidacao => {
  const novosErros: Record<string, boolean> = {};
  const mensagensErro: ErroValidacao[] = [];

  if (!validadores.campoPreenchido(email)) {
    novosErros.email = true;
    mensagensErro.push({ campo: 'email', mensagem: 'Email é obrigatório' });
  } else if (!validadores.email(email)) {
    novosErros.email = true;
    mensagensErro.push({ campo: 'email', mensagem: 'Email inválido' });
  }

  if (!validadores.campoPreenchido(senha)) {
    novosErros.senha = true;
    mensagensErro.push({ campo: 'senha', mensagem: 'Senha é obrigatória' });
  }

  return {
    valido: mensagensErro.length === 0,
    erros: novosErros,
    mensagens: mensagensErro
  };
};

/**
 * Obtém a primeira mensagem de erro para um campo específico
 * @param resultadoValidacao Resultado da validação
 * @param campo Nome do campo
 * @returns Primeira mensagem de erro ou undefined
 */
export const obterMensagemErro = (
  resultadoValidacao: ResultadoValidacao,
  campo: string
): string | undefined => {
  const erro = resultadoValidacao.mensagens.find(e => e.campo === campo);
  return erro?.mensagem;
};

/**
 * Exibe mensagens de erro para o usuário
 * @param resultadoValidacao Resultado da validação
 * @param exibirAlerta Se true, exibe um alerta com as mensagens
 * @returns Texto com todas as mensagens
 */
export const exibirErrosValidacao = (
  resultadoValidacao: ResultadoValidacao,
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
