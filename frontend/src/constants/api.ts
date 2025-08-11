export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Usuários
  USERS: '/users',
  USERS_HELPER: '/users/helper',
  USERS_ASSISTED: '/users/assisted',
  USER_DETAILS: '/users/details',
  UPLOAD_IMAGE: '/users/upload-image',
  
  // Logs de assistência
  ASSISTANCE_LOGS: '/assistance-logs',
  
  // Endereços
  ADDRESSES: '/addresses',
} as const;
