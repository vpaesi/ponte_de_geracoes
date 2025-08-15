import { useState } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { cepService } from '../services/cepService';

interface EnderecoData {
  zipCode: string;
  city: string;
  street: string;
  number: string;
  complement: string;
}

interface FormularioData {
  name: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  tipoUsuario: string;
  endereco: EnderecoData;
  diasDisponiveis: string[];
  habilidades: string;
  necessidades: string;
  sobreMim: string;
}

export const useFormularioCadastro = () => {
  const [dadosFormulario, setDadosFormulario] = useState<FormularioData>({
    name: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: '',
    endereco: {
      zipCode: '',
      city: '',
      street: '',
      number: '',
      complement: ''
    },
    diasDisponiveis: [],
    habilidades: '',
    necessidades: '',
    sobreMim: ''
  });
  
  const [erros, setErros] = useState<Record<string, boolean | string>>({});
  const [enviando, setEnviando] = useState(false);
  const [imagemPerfilPreview, setImagemPerfilPreview] = useState<File | null>(null);
  const navigate = useNavigate();

  const atualizarCampo = (campo: string, valor: string | string[]) => {
    if (campo.includes('.')) {
      const [parent, child] = campo.split('.');
      setDadosFormulario(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormularioData] as EnderecoData),
          [child]: valor
        }
      }));
    } else {
      setDadosFormulario(prev => ({
        ...prev,
        [campo]: valor
      }));
    }
    
    // Limpar erro do campo quando usuário digitar
    if (erros[campo]) {
      setErros(prev => ({
        ...prev,
        [campo]: false
      }));
    }
  };

  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    console.log('🔍 VALIDANDO CAMPOS:');
    
    // Validações básicas
    if (!dadosFormulario.name.trim()) {
      novosErros.name = 'Nome é obrigatório';
      console.log('❌ Nome vazio');
    } else {
      console.log('✅ Nome:', dadosFormulario.name);
    }

    if (!dadosFormulario.email.trim()) {
      novosErros.email = 'Email é obrigatório';
      console.log('❌ Email vazio');
    } else if (!/\S+@\S+\.\S+/.test(dadosFormulario.email)) {
      novosErros.email = 'Email inválido';
      console.log('❌ Email inválido:', dadosFormulario.email);
    } else {
      console.log('✅ Email:', dadosFormulario.email);
    }

    if (!dadosFormulario.cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório';
      console.log('❌ CPF vazio');
    } else if (dadosFormulario.cpf.replace(/\D/g, '').length !== 11) { // ✅ CORRIGIR: era 10, deve ser 11
      novosErros.cpf = 'CPF deve ter 11 dígitos';
      console.log('❌ CPF inválido:', dadosFormulario.cpf);
    } else {
      console.log('✅ CPF:', dadosFormulario.cpf);
    }

    if (!dadosFormulario.senha) {
      novosErros.senha = 'Senha é obrigatória';
      console.log('❌ Senha vazia');
    } else if (dadosFormulario.senha.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
      console.log('❌ Senha muito curta');
    } else {
      console.log('✅ Senha válida');
    }

    if (dadosFormulario.senha !== dadosFormulario.confirmarSenha) {
      novosErros.confirmarSenha = 'Senhas não coincidem';
      console.log('❌ Senhas não coincidem');
    } else if (dadosFormulario.confirmarSenha) {
      console.log('✅ Senhas coincidem');
    }

    // ✅ ADICIONAR: Validação de tipo de usuário
    if (!dadosFormulario.tipoUsuario) {
      novosErros.tipoUsuario = 'Tipo de usuário é obrigatório';
      console.log('❌ Tipo de usuário não selecionado');
    } else {
      console.log('✅ Tipo de usuário:', dadosFormulario.tipoUsuario);
    }

    // ✅ ADICIONAR: Validação de dias disponíveis
    if (!dadosFormulario.diasDisponiveis || dadosFormulario.diasDisponiveis.length === 0) {
      novosErros.diasDisponiveis = 'Selecione pelo menos um dia disponível';
      console.log('❌ Nenhum dia disponível selecionado');
    } else {
      console.log('✅ Dias disponíveis:', dadosFormulario.diasDisponiveis);
    }

    // Validações de endereço
    if (!dadosFormulario.endereco.city.trim()) {
      novosErros['endereco.city'] = 'Cidade é obrigatória';
      console.log('❌ Cidade vazia');
    } else {
      console.log('✅ Cidade:', dadosFormulario.endereco.city);
    }

    if (!dadosFormulario.endereco.street.trim()) {
      novosErros['endereco.street'] = 'Rua é obrigatória';
      console.log('❌ Rua vazia');
    } else {
      console.log('✅ Rua:', dadosFormulario.endereco.street);
    }

    if (!dadosFormulario.endereco.number.trim()) {
      novosErros['endereco.number'] = 'Número é obrigatório';
      console.log('❌ Número vazio');
    } else {
      console.log('✅ Número:', dadosFormulario.endereco.number);
    }

    if (!dadosFormulario.endereco.zipCode.trim()) {
      novosErros['endereco.zipCode'] = 'CEP é obrigatório';
      console.log('❌ CEP vazio');
    } else {
      console.log('✅ CEP:', dadosFormulario.endereco.zipCode);
    }

    console.log('📊 RESUMO DA VALIDAÇÃO:');
    console.log('Total de erros:', Object.keys(novosErros).length);
    if (Object.keys(novosErros).length > 0) {
      console.log('Erros encontrados:', novosErros);
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const mapearDadosParaAPI = () => {
    return {
      userType: dadosFormulario.tipoUsuario === 'ajudante' ? 'helper' : 'assisted',
      name: dadosFormulario.name,
      birthDate: dadosFormulario.dataNascimento,
      cpf: dadosFormulario.cpf.replace(/\D/g, ''),
      email: dadosFormulario.email,
      phone: dadosFormulario.telefone.replace(/\D/g, ''),
      password: dadosFormulario.senha,
      confirmPassword: dadosFormulario.confirmarSenha,
      profileImageUrl: "string",
      availableDays: dadosFormulario.diasDisponiveis,
      needsAndSkills: dadosFormulario.tipoUsuario === 'ajudante' 
        ? (dadosFormulario.habilidades ? dadosFormulario.habilidades.split(', ') : [])
        : (dadosFormulario.necessidades ? dadosFormulario.necessidades.split(', ') : []),
      aboutYou: dadosFormulario.sobreMim.substring(0, 250) || 'Sem descrição', // ✅ LIMITAR a 250 caracteres
      address: {
        city: dadosFormulario.endereco.city,
        zipCode: dadosFormulario.endereco.zipCode.replace(/\D/g, ''),
        street: dadosFormulario.endereco.street,
        number: dadosFormulario.endereco.number,
        complement: dadosFormulario.endereco.complement || ''
      },
      isAvailable: true
    };
  };

  const enviarFormulario = async (e?: React.FormEvent) => {
    console.log('=== INÍCIO ENVIO FORMULÁRIO ===');
    
    if (e) {
      e.preventDefault();
      console.log('✅ PreventDefault executado');
    }
    
    // ✅ ADICIONAR: Debug completo dos dados
    console.log('📋 DADOS COMPLETOS DO FORMULÁRIO:');
    console.log('Nome:', dadosFormulario.name);
    console.log('Email:', dadosFormulario.email);
    console.log('CPF:', dadosFormulario.cpf);
    console.log('Senha:', dadosFormulario.senha ? '***' : 'VAZIO');
    console.log('Confirmar Senha:', dadosFormulario.confirmarSenha ? '***' : 'VAZIO');
    console.log('Tipo Usuario:', dadosFormulario.tipoUsuario);
    console.log('Dias Disponíveis:', dadosFormulario.diasDisponiveis);
    console.log('Endereço:', dadosFormulario.endereco);
    console.log('Habilidades:', dadosFormulario.habilidades);
    console.log('Necessidades:', dadosFormulario.necessidades);
    console.log('Sobre Mim:', dadosFormulario.sobreMim);
    
    console.log('🔍 Validando formulário...');
    if (!validarFormulario()) {
      console.log('❌ Validação falhou!');
      console.log('Erros encontrados:', erros);
      return;
    }
    console.log('✅ Validação passou!');

    setEnviando(true);
    setErros({});

    try {
      console.log('📋 Dados do formulário antes do mapeamento:');
      console.log(JSON.stringify(dadosFormulario, null, 2));
      
      const dadosParaAPI = mapearDadosParaAPI();
      console.log('📤 Dados mapeados para API:');
      console.log(JSON.stringify(dadosParaAPI, null, 2));
      
      console.log('🌐 Fazendo chamada para API...');
      const response = await userService.createUser(dadosParaAPI);
      
      console.log('✅ Resposta da API:');
      console.log(JSON.stringify(response, null, 2));
      
      console.log('🎉 Usuário criado com sucesso! Redirecionando...');
      navigate('/login');
      
    } catch (error: any) {
      console.error('❌ ERRO COMPLETO:');
      console.error('Tipo:', typeof error);
      console.error('Error object:', error);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      }
      
      if (error.request) {
        console.error('Request:', error.request);
      }
      
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
      
      if (error.response?.data?.message) {
        setErros({ submit: error.response.data.message });
      } else if (error.message) {
        setErros({ submit: error.message });
      } else {
        setErros({ submit: 'Erro ao criar conta. Tente novamente.' });
      }
    } finally {
      setEnviando(false);
      console.log('=== FIM ENVIO FORMULÁRIO ===');
    }
  };

  const alterarDiasDisponiveis = (dia: string, selecionado: boolean) => {
    setDadosFormulario(prev => ({
      ...prev,
      diasDisponiveis: selecionado 
        ? [...prev.diasDisponiveis, dia]
        : prev.diasDisponiveis.filter(d => d !== dia)
    }));
  };

  const buscarCep = async (cep: string) => {
    try {
      const cepLimpo = cep.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        const endereco = await cepService.fetchAddressByCep(cepLimpo);
        
        if (endereco) {
          setDadosFormulario(prev => ({
            ...prev,
            endereco: {
              ...prev.endereco,
              city: endereco.city || '',
              street: endereco.street || '',
              zipCode: cepLimpo
            }
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const atualizarErros = (novosErros: Record<string, boolean | string>) => {
    setErros(novosErros);
  };

  const setImagemPerfil = (file: File | null) => {
    setImagemPerfilPreview(file);
  };

  return {
    dadosFormulario,
    erros,
    enviando,
    imagemPerfilPreview,
    atualizarCampo,
    setImagemPerfilPreview: setImagemPerfil,
    alterarDiasDisponiveis,
    buscarCep,
    enviarFormulario,
    atualizarErros,
    validarFormulario
  };
};
