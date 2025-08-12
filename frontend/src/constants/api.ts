export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  USERS: '/users',
  USERS_HELPER: '/users/helper',
  USERS_ASSISTED: '/users/assisted',
  USER_DETAILS: '/users/details',
  UPLOAD_IMAGE: '/users/upload-image',
  USER_CITIES: '/users/cities', // ✅ MUDAR para /users/cities
  
  ASSISTANCE_LOGS: '/help-session',
  
} as const;
