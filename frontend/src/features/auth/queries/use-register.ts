import i18n from '@/i18n';
import { ROUTES } from '@/lib/constants';
import { handleApiError } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { register } from '../api/auth-api';
import type { RegisterFormValues } from '../schemas/register-schema';

interface UseRegisterProps {
  setError?: UseFormSetError<RegisterFormValues>;
}

export function useRegister({ setError }: UseRegisterProps = {}) {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success(i18n.t('success.register'));
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: (error) => handleApiError(error, setError),
  });

  return {
    register: registerMutation,
  };
}
