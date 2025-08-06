import { cepService } from '../../services/cepService';

export const handleCepBlur = async (
  cep: string,
  setAddress: (value: string) => void,
  setCity: (value: string) => void,
  setNeighborhood: (value: string) => void
) => {
  if (!cep.trim()) return;

  try {
    const data = await cepService.fetchAddressByCep(cep);
    
    setAddress(data.logradouro || "");
    setCity(data.localidade || "");
    setNeighborhood(data.bairro || "");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar CEP';
    alert(errorMessage);
    console.error("Erro ao buscar CEP:", error);
  }
};
  