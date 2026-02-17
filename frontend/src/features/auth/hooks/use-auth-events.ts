import { useEffect, useEffectEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { AUTH_EVENTS } from '../utils/events';

interface UseAuthEventsProps {
  onLogout: () => void;
}

export function useAuthEvents({ onLogout }: UseAuthEventsProps) {
  const { t } = useTranslation();

  const onLogoutEvent = useEffectEvent(() => {
    onLogout();
  });

  useEffect(() => {
    const handleSessionExpired = () => {
      toast.info(t('errors.sessionExpired'));
      onLogoutEvent();
    };

    window.addEventListener(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);
    return () => {
      window.removeEventListener(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);
    };
  }, [t]);
}
