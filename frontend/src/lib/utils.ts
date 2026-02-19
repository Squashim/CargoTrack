import i18n from '@/i18n';
import type { ApiErrorResponse } from '@/types/api-types';
import type { AllowedKeys } from '@/types/common';
import { isAxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiError<T extends FieldValues>(error: unknown, setError?: UseFormSetError<T>) {
  const LOGIN_API_ERROR = 'INVALID_CREDENTIALS';

  if (isAxiosError<ApiErrorResponse>(error) && error.response?.data) {
    const { data } = error.response;

    if (data.Error) {
      const translatedMessage = i18n.t(`auth:apiErrors.${data.Error}`, data.Error);
      toast.error(translatedMessage);
      return;
    }

    if (data.errors && setError) {
      Object.entries(data.errors).forEach(([field, messages]) => {
        const fieldName = (field.charAt(0).toLowerCase() + field.slice(1)) as Path<T>;
        const errorCode = messages[0];

        if (errorCode === LOGIN_API_ERROR) {
          setError('root', { type: 'server', message: tZod('auth:apiErrors.INVALID_CREDENTIALS') });
          return;
        }

        setError(fieldName, { type: 'server', message: tZod(`auth:apiErrors.${errorCode}` as never) });
      });
      return;
    }
  }

  toast.error(i18n.t('auth:apiErrors.UNKNOWN_ERROR'));
}

export function tZod(key: AllowedKeys, params?: Record<string, string | number>) {
  return JSON.stringify({ key, ...params });
}
