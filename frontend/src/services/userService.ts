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
        const [helpersResponse, assistedResponse] = await Promise.all([
          apiService.getUsers("helper", params),
          apiService.getUsers("assisted", { ...params, page: 0 })
        ]);

        const helpers = (helpersResponse.content || []).map((user: User) => ({
          ...user,
          userType: 'ajudante' as const,
          available: user.available ?? true
        }));

        const assisted = (assistedResponse.content || []).map((user: User) => ({
          ...user,
          userType: 'assistido' as const,
          available: user.available ?? !user.needsHelp
        }));

        const allUsers = [...helpers, ...assisted];

        const filteredUsers = params.city 
          ? allUsers.filter(user => user.address?.city === params.city)
          : allUsers;

        const totalElements = filteredUsers.length;
        const totalPages = Math.ceil(totalElements / params.size);
        const startIndex = params.page * params.size;
        const endIndex = startIndex + params.size;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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
        const endpoint = userType === USER_TYPES.HELPER ? "helper" : "assisted";
        const response = await apiService.getUsers(endpoint as "helper" | "assisted", params);
        
        const usersWithType = (response.content || []).map((user: User) => ({
          ...user,
          userType: userType as 'ajudante' | 'assistido',
          available: user.available ?? (userType === USER_TYPES.ASSISTED ? !user.needsHelp : true)
        }));

        return {
          content: usersWithType as User[],
          page: response.page
        };
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