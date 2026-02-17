import { API } from '@/config/api-client';
import type { ApiResponse } from '@/types/api-types';
import { AUTH_ENDPOINTS } from './endpoints';
import type { LoginPayload, RegisterPayload, UserAuthResponse } from './types';

const register = async (payload: RegisterPayload) => {
  const { data } = await API.post<ApiResponse>(AUTH_ENDPOINTS.REGISTER, payload);
  return data;
};

const login = async (payload: LoginPayload) => {
  const { data } = await API.post<ApiResponse>(AUTH_ENDPOINTS.LOGIN, payload);
  return data;
};

const getUser = async () => {
  const { data } = await API.get<UserAuthResponse | null>(AUTH_ENDPOINTS.GET_USER);
  return data;
};

const logout = async () => {
  const { data } = await API.post<ApiResponse>(AUTH_ENDPOINTS.LOGOUT);
  return data;
};

export { getUser, login, logout, register };
