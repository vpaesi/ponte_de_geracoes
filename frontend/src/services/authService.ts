import { userService } from './userService';

interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const helpersResponse = await userService.getHelpers({ size: 1000 });
      const helpers = helpersResponse.content || [];
      
      const assistedResponse = await userService.getAssisted({ size: 1000 });
      const assisted = assistedResponse.content || [];
      
      const allUsers = [...helpers, ...assisted];
      
      const user = allUsers.find(u => 
        u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        return user;
      } else {
        throw new Error('Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }
};