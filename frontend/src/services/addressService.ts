import apiService from './apiService';
import { API_ENDPOINTS } from '../constants/api';

export const addressService = {
  async getCities(): Promise<string[]> {
    try {
      const response = await apiService.get(`${API_ENDPOINTS.ADDRESSES}/cities`);
      return response.content || [];
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      return [];
    }
  }
};