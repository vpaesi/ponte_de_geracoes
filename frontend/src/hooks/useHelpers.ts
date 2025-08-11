import { useState, useCallback } from 'react';
import { userService } from '../services/userService';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: string;
  isAvailable: boolean;
  profileImageUrl?: string;
  availableDays?: string[];
  needsAndSkills?: string[];
  aboutYou?: string;
  address?: {
    city: string;
    street: string;
    number: string;
    zipCode: string;
  };
}

interface UseHelpersReturn {
  helpers: User[];
  loading: boolean;
  error: string | null;
  fetchHelpers: (params?: any) => Promise<void>;
}

export const useHelpers = (): UseHelpersReturn => {
  const [helpers, setHelpers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHelpers = useCallback(async (params: any = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.getHelpers(params);
      setHelpers(response.content || []);
    } catch (err) {
      console.error('Erro ao buscar ajudantes:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    helpers,
    loading,
    error,
    fetchHelpers,
  };
};
