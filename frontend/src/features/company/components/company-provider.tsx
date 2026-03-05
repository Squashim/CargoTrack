import { isAxiosError } from 'axios';
import { useEffect, type PropsWithChildren } from 'react';
import { CompanyContext, type CompanyContextType } from '../context/company-context';
import { useUserCompany } from '../queries/use-user-company';
import { companyStorage } from '../utils/company-storage';

function CompanyProvider({ children }: PropsWithChildren) {
  const { data: company, error, isLoading, isFetching } = useUserCompany();

  const is404 = isAxiosError(error) && error.response?.status === 404;
  const knownNoCompany = companyStorage.hasNoCompanyFlag();

  const needsSetup = company ? false : is404 || knownNoCompany;
  const isActuallyLoading = isFetching || (isLoading && !knownNoCompany);

  useEffect(() => {
    if (is404) {
      companyStorage.setNoCompanyFlag();
    } else if (company) {
      companyStorage.clearNoCompanyFlag();
    }
  }, [is404, company]);

  const value: CompanyContextType = {
    company: company ?? null,
    isLoading: isActuallyLoading,
    needsSetup,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export { CompanyProvider };
