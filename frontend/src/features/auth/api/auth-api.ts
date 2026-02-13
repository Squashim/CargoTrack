import { API } from '@/config/api-client';
import type { ApiResponse } from '@/types/api-types';
import { AUTH_ENDPOINTS } from './endpoints';
import type { LoginPayload, RegisterPayload } from './types';

const register = async (payload: RegisterPayload) => {
  const { data } = await API.post<ApiResponse>(AUTH_ENDPOINTS.REGISTER, payload);
  return data;
};

const login = async (payload: LoginPayload) => {
  const { data } = await API.post<ApiResponse>(AUTH_ENDPOINTS.LOGIN, payload);
  return data;
};

export { login, register };
