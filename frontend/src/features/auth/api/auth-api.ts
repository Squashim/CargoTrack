import { API } from '@/config/api-client';
import type { ApiResponse } from '@/types/api-types';
import { AUTH_ENDPOINTS } from './endpoints';
import type { RegisterPayload } from './types';

const register = async (payload: RegisterPayload) => {
  const { data } = await API.post<ApiResponse>(AUTH_ENDPOINTS.REGISTER, payload);
  return data;
};

export { register };
