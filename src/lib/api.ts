import { create } from 'axios';

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL;
const API_BASE_URL = (configuredApiUrl || 'http://10.0.2.2:3000')
  .replace(/\/api\/?$/, '')
  .replace(/\/$/, '');

export const api = create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token: string | undefined = undefined;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);