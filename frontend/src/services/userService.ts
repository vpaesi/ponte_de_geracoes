import { apiService } from "./apiService";
import { USER_TYPES } from "../constants/userTypes";
import type { User } from "../types";

interface SearchParams {
  page: number;
  size: number;
  city?: string;
  isAvailable?: boolean;
  day?: string;
}

interface PaginatedResponse {
  content: User[];
  page: {
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  };
}

export const userService = {
  async searchUsers(userType: string, params: SearchParams): Promise<PaginatedResponse> {
    try {
      if (userType === USER_TYPES.ALL) {
        // Buscar ambos os tipos de usuários
        const [helpersResponse, assistedResponse] = await Promise.all([
          apiService.getUsers("helper", params),
          apiService.getUsers("assisted", { ...params, page: 0 }) // Reset page for assisted
        ]);

        // Combinar os resultados
        const allUsers = [
          ...(helpersResponse.content || []),
          ...(assistedResponse.content || [])
        ];

        // Calcular paginação manual para todos os usuários
        const totalElements = allUsers.length;
        const totalPages = Math.ceil(totalElements / params.size);
        const startIndex = params.page * params.size;
        const endIndex = startIndex + params.size;
        const paginatedUsers = allUsers.slice(startIndex, endIndex);

        return {
          content: paginatedUsers as User[],
          page: {
            totalPages,
            totalElements,
            size: params.size,
            number: params.page
          }
        };
      } else {
        // Buscar tipo específico
        const endpoint = userType === USER_TYPES.HELPER ? "helper" : "assisted";
        return await apiService.getUsers(endpoint as "helper" | "assisted", params);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return {
        content: [],
        page: {
          totalPages: 0,
          totalElements: 0,
          size: params.size,
          number: params.page
        }
      };
    }
  }
};