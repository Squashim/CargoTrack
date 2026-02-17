import { AUTH_ENDPOINTS } from '@/features/auth/api/endpoints';
import { authStorage } from '@/features/auth/utils/auth-storage';
import { AUTH_EVENTS } from '@/features/auth/utils/events';
import axios from 'axios';

if (!import.meta.env.VITE_API_URL) {
  throw new Error('env: VITE_API_URL is not defined');
}

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config?.url === AUTH_ENDPOINTS.GET_USER) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const wasLoggedIn = authStorage.isAuthenticated();

      if (wasLoggedIn) {
        window.dispatchEvent(new Event(AUTH_EVENTS.SESSION_EXPIRED));
      }
    }

    return Promise.reject(error);
  }
);

export { API };
