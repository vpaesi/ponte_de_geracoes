interface CepResponse {
  city: string;
  street: string;
  logradouro?: string;
  localidade?: string;
  erro?: boolean;
}

export const cepService = {
  async fetchAddressByCep(cep: string): Promise<CepResponse> {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      throw new Error('CEP deve conter 8 dígitos');
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro ao consultar CEP');
    }

    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return data;
  },
};
