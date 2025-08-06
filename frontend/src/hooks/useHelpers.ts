import { useState, useEffect } from 'react';
import { RegisteredPerson, CarouselItem } from '../types';
import { apiService } from '../services/apiService';
import { API_ENDPOINTS } from '../constants/api';

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
    return helpers.map((helper) => ({
      name: helper.name,
      age: new Date().getFullYear() - new Date(helper.birthDate || '').getFullYear(),
      img: `//localhost:8080${helper.profileImageUrl}`,
      description: helper.aboutYou,
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
