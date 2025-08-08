import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { API_ENDPOINTS } from '../constants/api';
import type { RegisteredPerson, CarouselItem } from '../types';

export const useHelpers = () => {
  const [helpers, setHelpers] = useState<RegisteredPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHelpers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get<{ content: RegisteredPerson[] }>(API_ENDPOINTS.helper);
      setHelpers(response.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar ajudantes');
      console.error('Erro ao buscar ajudantes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpers();
  }, []);

  const getCarouselItems = (): CarouselItem[] => {
    return helpers.map((helper, index) => ({
      id: helper.id || index,
      nome: helper.nome,
      age: helper.birthDate ? new Date().getFullYear() - new Date(helper.birthDate).getFullYear() : 0,
      img: helper.profileImageUrl || '',
      description: helper.aboutYou || 'Sem descrição disponível',
      userType: 'helper' as const,
    }));
  };

  return {
    helpers,
    loading,
    error,
    refetch: fetchHelpers,
    getCarouselItems,
  };
};
