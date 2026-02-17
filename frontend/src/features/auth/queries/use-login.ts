import i18n from '@/i18n';
import { ROUTES } from '@/lib/constants';
import { handleApiError } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { login as loginApi } from '../api/auth-api';
import { useAuth } from '../hooks/use-auth';
import type { LoginFormValues } from '../schemas/login-schema';
import { userQueryOptions } from './use-user-auth';

interface UseLoginProps {
  setError?: UseFormSetError<LoginFormValues>;
}

export function useLogin({ setError }: UseLoginProps = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { onLogin } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async () => {
      try {
        await queryClient.prefetchQuery(userQueryOptions);
      } catch {
        // Ignore prefetch errors
      }

      onLogin();

      toast.success(i18n.t('success.login'));
      navigate(ROUTES.USER.DASHBOARD, { replace: true });
    },
    onError: (error) => handleApiError(error, setError),
  });

  return {
    login: loginMutation,
  };
}
