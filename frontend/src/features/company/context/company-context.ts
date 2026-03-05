import { createContext } from 'react';
import type { UserCompanyResponse } from '../api/types';

export interface CompanyContextType {
  company: UserCompanyResponse | null;
  isLoading: boolean;
  needsSetup: boolean;
}

export const CompanyContext = createContext<CompanyContextType | undefined>(undefined);
