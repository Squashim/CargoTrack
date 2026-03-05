import { useQuery } from '@tanstack/react-query';
import { getCompany } from '../api/company-api';
import { companyStorage } from '../utils/company-storage';
import { companyKeys } from '../utils/query-keys';

const companyQueryOptions = {
  queryKey: companyKeys.user(),
  queryFn: getCompany,
  retry: false,
  refetchOnWindowFocus: false,
};

function useCompanyQuery() {
  const knowNoCompany = companyStorage.hasNoCompanyFlag();
  return useQuery({
    ...companyQueryOptions,
    enabled: !knowNoCompany,
  });
}

export { useCompanyQuery };
