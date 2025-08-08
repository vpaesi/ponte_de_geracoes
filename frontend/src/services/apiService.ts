import { API_BASE_URL } from '../constants/api';
import mockData from '../data/mockUsers.json';

interface ApiResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  },

  async uploadFile(endpoint: string, file: File): Promise<Response> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response;
  },

  // Método específico para buscar usuários com fallback para dados mockados
  async getUsers(
    userType: 'helper' | 'assisted',
    params?: {
      page?: number;
      size?: number;
      city?: string;
      isAvailable?: boolean;
      day?: string;
    }
  ): Promise<ApiResponse<any>> {
    try {
      // Tenta buscar do backend primeiro
      const queryParams = new URLSearchParams();
      if (params?.page !== undefined) queryParams.append('page', params.page.toString());
      if (params?.size !== undefined) queryParams.append('size', params.size.toString());
      if (params?.city) queryParams.append('city', params.city);
      if (params?.isAvailable !== undefined) queryParams.append('isAvailable', params.isAvailable.toString());
      if (params?.day) queryParams.append('day', params.day);

      const response = await fetch(`${API_BASE_URL}/${userType}?${queryParams}`);
      
      if (response.ok) {
        return await response.json();
      }
      
      throw new Error('Backend não disponível');
    } catch (error) {
      console.warn('Backend não disponível para usuários, usando dados mockados:', error);
      
      // Fallback para dados mockados
      const data = userType === 'helper' ? mockData.helpers : mockData.assisted;
      let filteredContent = [...data.content];

      // Aplicar filtros se fornecidos
      if (params?.city) {
        filteredContent = filteredContent.filter(user => 
          user.address.city.toLowerCase().includes(params.city!.toLowerCase())
        );
      }

      if (params?.isAvailable !== undefined && userType === 'helper') {
        filteredContent = filteredContent.filter(user => 
          'available' in user ? user.available === params.isAvailable : true
        );
      }

      if (params?.day) {
        filteredContent = filteredContent.filter(user =>
          user.availableDays.some(day => 
            day.toLowerCase().includes(params.day!.toLowerCase())
          )
        );
      }

      // Aplicar paginação
      const page = params?.page || 0;
      const size = params?.size || 10;
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedContent = filteredContent.slice(startIndex, endIndex);

      return {
        content: paginatedContent,
        page: {
          size,
          number: page,
          totalElements: filteredContent.length,
          totalPages: Math.ceil(filteredContent.length / size)
        }
      };
    }
  },

  // Método específico para buscar cidades com fallback
  async getCities(): Promise<string[]> {
    try {
      // Tenta buscar do backend primeiro
      const response = await fetch(`${API_BASE_URL}/addresses/cities`);
      
      if (response.ok) {
        const data = await response.json();
        return data.content || [];
      }
      
      throw new Error('Backend não disponível');
    } catch (error) {
      console.warn('Backend não disponível para cidades, usando dados mockados:', error);
      
      // Fallback para cidades dos dados mockados
      const helperCities = mockData.helpers.content.map(user => user.address.city);
      const assistedCities = mockData.assisted.content.map(user => user.address.city);
      
      return Array.from(new Set([...helperCities, ...assistedCities])).sort();
    }
  },

  // Método para verificar se o backend está disponível
  async isBackendAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000) // timeout de 5 segundos
      });
      return response.ok;
    } catch {
      return false;
    }
  }
};
