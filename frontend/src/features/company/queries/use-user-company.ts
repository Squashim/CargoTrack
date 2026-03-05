import { useQuery } from '@tanstack/react-query';
import { getCompany } from '../api/company-api';
import { companyStorage } from '../utils/company-storage';
import { companyKeys } from '../utils/query-keys';

const userCompanyQueryOptions = {
  queryKey: companyKeys.user(),
  queryFn: getCompany,
  retry: false,
  refetchOnWindowFocus: false,
};

function useUserCompany() {
  const knowNoCompany = companyStorage.hasNoCompanyFlag();
  return useQuery({
    ...userCompanyQueryOptions,
    enabled: !knowNoCompany,
  });
}

export { useUserCompany };
