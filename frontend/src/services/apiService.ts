import { API_BASE_URL } from '../constants/api';

interface RequestConfig extends RequestInit {
  headers?: Record<string, string>;
}

class ApiService {
  getCities() {
    throw new Error("Method not implemented.");
  }
  private baseURL = API_BASE_URL;

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
}

export default new ApiService();
