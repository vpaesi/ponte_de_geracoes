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
    
    console.log('=== API SERVICE REQUEST ===');
    console.log('🌐 URL:', url);
    console.log('🔧 Method:', options.method || 'GET');
    console.log('📋 Headers:', options.headers);
    
    if (options.body) {
      console.log('📤 Body:');
      console.log(options.body);
    }
    
    const config: RequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('⏳ Fazendo fetch...');
      const response = await fetch(url, config);
      
      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);
      
      if (!response.ok) {
        console.error('❌ Response não OK!');
        console.error('Status:', response.status);
        console.error('StatusText:', response.statusText);
        
        const errorText = await response.text();
        console.error('Error body:', errorText);
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Response data:');
      console.log(JSON.stringify(data, null, 2));
      console.log('=== FIM API SERVICE ===');
      
      return data;
    } catch (error) {
      console.error('❌ API SERVICE ERROR:');
      console.error(error);
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
