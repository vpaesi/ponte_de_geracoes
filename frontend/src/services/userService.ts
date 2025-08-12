import apiService from './apiService';
import { API_ENDPOINTS } from '../constants/api';

interface UserParams {
  page?: number;
  size?: number;
  isAvailable?: boolean;
  city?: string;
  day?: string;
  userType?: string;
}

export const userService = {
  async getAllUsers(params: UserParams = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.isAvailable !== undefined) queryParams.append('isAvailable', params.isAvailable.toString());
    if (params.city) queryParams.append('city', params.city);
    if (params.day) queryParams.append('day', params.day);
    if (params.userType) queryParams.append('userType', params.userType);

    const queryString = queryParams.toString();
    const endpoint = `${API_ENDPOINTS.USERS}${queryString ? `?${queryString}` : ''}`;
    
    return apiService.get(endpoint);
  },

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

  async getUserById(id: number) {
    return apiService.get(`${API_ENDPOINTS.USER_DETAILS}/${id}`);
  },

  async createUser(userData: any): Promise<any> {
    try {
      console.log('=== USER SERVICE: CREATE USER ===');
      console.log('📤 Dados recebidos para criação:');
      console.log(JSON.stringify(userData, null, 2));
      
      console.log('🌐 Fazendo POST para /users...');
      const response = await apiService.post('/users', userData);
      
      console.log('✅ Resposta do backend:');
      console.log(JSON.stringify(response, null, 2));
      console.log('=== FIM USER SERVICE ===');
      
      return response;
    } catch (error) {
      console.error('❌ ERRO NO USER SERVICE:');
      console.error(error);
      throw error;
    }
  },

  async updateUser(id: number, userData: any) {
    return apiService.put(`${API_ENDPOINTS.USERS}/${id}`, userData);
  },

  async deleteUser(id: number) {
    return apiService.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },

  async uploadImage(userId: number, file: File) {
    return apiService.uploadFile(`${API_ENDPOINTS.UPLOAD_IMAGE}/${userId}`, file);
  },
};