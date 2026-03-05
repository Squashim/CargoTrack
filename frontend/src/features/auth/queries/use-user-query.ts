import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/auth-api';
import { authKeys } from '../utils/query-keys';

const STALE_TIME = 1000 * 60 * 15; // 15 minutes

const userQueryOptions = {
  queryKey: authKeys.user(),
  queryFn: getUser,
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: STALE_TIME,
};

function useUserQuery() {
  return useQuery(userQueryOptions);
}

export { userQueryOptions, useUserQuery };
