import { API } from '@/config/api-client';
import { COMPANY_ENDPOINTS } from './endpoints';
import type { UserCompanyResponse } from './types';

const getCompany = async () => {
  const { data } = await API.get<UserCompanyResponse | null>(COMPANY_ENDPOINTS.BASE);
  return data;
};

export { getCompany };
