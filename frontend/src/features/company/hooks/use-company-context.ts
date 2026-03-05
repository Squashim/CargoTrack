import { use } from 'react';
import { CompanyContext } from '../context/company-context';

export function useCompanyContext() {
  const context = use(CompanyContext);
  if (!context) throw new Error('useCompanyContext must be used within CompanyProvider');
  return context;
}
