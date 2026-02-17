import i18n from '@/i18n';
import { ROUTES } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { logout as logoutApi } from '../api/auth-api';
import { useAuth } from '../hooks/use-auth';

export function useLogout() {
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      onLogout();
      navigate(ROUTES.AUTH.LOGIN);
      toast.success(i18n.t('success.logout'));
    },
    onError: () => {
      toast.error(i18n.t('errors.unknownError'));
    },
  });

  return {
    logout: logoutMutation,
  };
}
