import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

interface RequestConfig extends RequestInit {
  headers?: Record<string, string>;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestConfig = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API ${options.method || 'GET'} error:`, error);
      throw error;
    }
  }

  async get(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'DELETE' });
  }

  async uploadFile(endpoint: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request(endpoint, {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async getCities(): Promise<string[]> {
    try {
      const response = await this.get(`${API_ENDPOINTS.USER_CITIES}`);
      return response.content || [];
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      return [];
    }
  }
}

const apiService = new ApiService();
export default apiService;
