import { apiService } from './apiService';
import { API_ENDPOINTS } from '../constants/api';

interface FormValues {
  userType: string;
  [key: string]: any;
}

export const registrationService = {
  async registerUser(formValues: FormValues): Promise<{ id: string }> {
    const endpoint = formValues.userType === "ajudante" ? API_ENDPOINTS.helper : API_ENDPOINTS.assisted;
    return apiService.post<{ id: string }>(endpoint, formValues);
  },

  async uploadProfileImage(userType: string, userId: string, image: File): Promise<void> {
    const endpoint = userType === "ajudante" 
      ? API_ENDPOINTS.helperUploadImage(userId)
      : API_ENDPOINTS.assistedUploadImage(userId);
    
    await apiService.uploadFile(endpoint, image);
  },
};
