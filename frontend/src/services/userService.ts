import apiService from './apiService';
import { API_ENDPOINTS } from '../constants/api';

interface UserParams {
  page?: number;
  size?: number;
  isAvailable?: boolean;
  city?: string;
  day?: string;
}

export const userService = {
  // Buscar helpers
  async getHelpers(params: UserParams = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.isAvailable !== undefined) queryParams.append('isAvailable', params.isAvailable.toString());
    if (params.city) queryParams.append('city', params.city);
    if (params.day) queryParams.append('day', params.day);

    const queryString = queryParams.toString();
    const endpoint = `${API_ENDPOINTS.USERS_HELPER}${queryString ? `?${queryString}` : ''}`;
    
    return apiService.get(endpoint);
  },

  // Buscar assisted
  async getAssisted(params: UserParams = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.isAvailable !== undefined) queryParams.append('isAvailable', params.isAvailable.toString());
    if (params.city) queryParams.append('city', params.city);
    if (params.day) queryParams.append('day', params.day);

    const queryString = queryParams.toString();
    const endpoint = `${API_ENDPOINTS.USERS_ASSISTED}${queryString ? `?${queryString}` : ''}`;
    
    return apiService.get(endpoint);
  },

  // Buscar usuário por ID
  async getUserById(id: number) {
    return apiService.get(`${API_ENDPOINTS.USER_DETAILS}/${id}`);
  },

  // Criar usuário
  async createUser(userData: any) {
    return apiService.post(API_ENDPOINTS.USERS, userData);
  },

  // Atualizar usuário
  async updateUser(id: number, userData: any) {
    return apiService.put(`${API_ENDPOINTS.USERS}/${id}`, userData);
  },

  // Deletar usuário
  async deleteUser(id: number) {
    return apiService.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },

  // Upload de imagem
  async uploadImage(userId: number, file: File) {
    return apiService.uploadFile(`${API_ENDPOINTS.UPLOAD_IMAGE}/${userId}`, file);
  },
};