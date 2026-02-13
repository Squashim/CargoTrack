import i18n from '@/i18n';
import { ROUTES } from '@/lib/constants';
import { handleApiError } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { login } from '../api/auth-api';
import type { LoginFormValues } from '../schemas/login-schema';

interface UseLoginProps {
  setError?: UseFormSetError<LoginFormValues>;
}

export function useLogin({ setError }: UseLoginProps = {}) {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success(i18n.t('success.login'));
      navigate(ROUTES.USER.DASHBOARD);
    },
    onError: (error) => handleApiError(error, setError),
  });

  return {
    login: loginMutation,
  };
}
