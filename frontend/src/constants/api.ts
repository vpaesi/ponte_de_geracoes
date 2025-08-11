export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  helper: '/helper',
  assisted: '/assisted',
  helperUploadImage: (id: string) => `/helper/upload-image/${id}`,
  assistedUploadImage: (id: string) => `/assisted/upload-image/${id}`,
} as const;
