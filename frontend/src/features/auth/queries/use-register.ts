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
      toast.success("You've successfully registered! You can now log in with your new account.");
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: (error) => handleApiError(error, setError),
  });

  return {
    register: registerMutation,
  };
}
