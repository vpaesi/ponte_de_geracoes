import { API_BASE_URL } from '../constants/api';
import mockUsers from '../data/mockUsers.json';

interface ApiResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

interface SearchParams {
  page?: number;
  size?: number;
  city?: string;
  isAvailable?: boolean;
  day?: string;
}

export const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  async uploadFile(endpoint: string, file: File): Promise<Response> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('API Upload error:', error);
      throw error;
    }
  },

  async getUsers(userType: "helper" | "assisted", params: SearchParams = {}): Promise<ApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${API_BASE_URL}/${userType}?${queryParams.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn('API não disponível, usando dados mockados');
        return userType === "helper" ? mockUsers.helpers : mockUsers.assisted;
      }
      
      return await response.json();
    } catch (error) {
      console.warn('Erro na API, usando dados mockados:', error);
      return userType === "helper" ? mockUsers.helpers : mockUsers.assisted;
    }
  },

  async getCities(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`);
      if (!response.ok) {
        return ["Porto Alegre", "Canoas", "Novo Hamburgo", "São Leopoldo", "Gravataí"];
      }
      return await response.json();
    } catch (error) {
      console.warn('Erro ao buscar cidades, usando dados mockados:', error);
      return ["Porto Alegre", "Canoas", "Novo Hamburgo", "São Leopoldo", "Gravataí"];
    }
  },
};
