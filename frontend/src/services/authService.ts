import apiService from './apiService';
import { API_ENDPOINTS } from '../constants/api';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    userType: string;
    phone: string;
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
      complement?: string;
    };
  };
  token?: string;
}

export const authService = {
  async login(data: LoginData): Promise<LoginResponse['user']> {
    try {
      const response = await apiService.post(API_ENDPOINTS.USER_LOGIN, {
        email: data.email,
        password: data.password
      });
      
      if (response && response.id) {
        return {
          id: response.id,
          name: response.name,
          email: response.email,
          userType: response.userType === 'helper' ? 'ajudante' : 'assistido',
          phone: response.phone,
          isAvailable: response.isAvailable,
          profileImageUrl: response.profileImageUrl,
          availableDays: response.availableDays,
          needsAndSkills: response.needsAndSkills,
          aboutYou: response.aboutYou,
          address: response.address
        };
      }
      
      throw new Error('Resposta inválida do servidor');
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Email ou senha incorretos');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Erro de conexão. Tente novamente.');
      }
    }
  },

  async logout() {
    // Limpar dados do usuário armazenados localmente
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getCurrentUser() {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  saveUser(user: LoginResponse['user']) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};