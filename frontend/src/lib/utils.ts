import type { ApiErrorResponse } from '@/types/api-types';
import { isAxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiError<T extends FieldValues>(error: unknown, setError?: UseFormSetError<T>) {
  if (isAxiosError<ApiErrorResponse>(error) && error.response?.data) {
    const { data } = error.response;

    if (data.Error) {
      toast.error(data.Error);
      return;
    }

    if (data.errors && setError) {
      Object.entries(data.errors).forEach(([field, messages]) => {
        const fieldName = (field.charAt(0).toLowerCase() + field.slice(1)) as Path<T>;
        setError(fieldName, { type: 'server', message: messages[0] });
      });
      return;
    }
  }

  toast.error('An unexpected error occurred. Please try again.');
}
