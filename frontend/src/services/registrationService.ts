import apiService from './apiService';
import { API_ENDPOINTS } from '../constants/api';

interface FormValues {
  userType: string;
  [key: string]: any;
}

export const registrationService = {
  async registerUser(formValues: FormValues): Promise<{ id: string }> {
    const endpoint = formValues.userType === "ajudante" ? API_ENDPOINTS.USERS_HELPER : API_ENDPOINTS.USERS_ASSISTED;
    return apiService.post(endpoint, formValues);
  },

  async uploadProfileImage(userType: string, userId: string, image: File): Promise<void> {
    const endpoint = userType === "ajudante" 
      ? API_ENDPOINTS.helperUploadImage(userId)
      : API_ENDPOINTS.assistedUploadImage(userId);
    
    await apiService.uploadFile(endpoint, image);
  },
};
